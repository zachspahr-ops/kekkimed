#!/usr/bin/env python3
"""Independently validate the public v7.5.1 ten-question parse reviewer."""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import hashlib
import json
import re
import sqlite3
from pathlib import Path
from typing import Any

from build_v74_public_showcase import (
    EXPECTED_LEGACY_COUNTS,
    LEGACY_REVIEWER_SHA256,
    QUESTION_IDS,
    extract_script_json,
    load_legacy_reviewer,
    normalized_text_bytes,
    sha256_file,
)


CORPUS_SHA256 = "d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec"
RELEASE = "kekki_medqa_parse_comparison_v751_r1"
PUBLIC_RELEASE = "clinical_network_v751_nonloinc_public_r1"
EXPECTED_FACT_COUNTS = [49, 63, 15, 48, 79, 62, 79, 95, 64, 60]
EXPECTED_VISIBLE_COUNTS = [49, 61, 15, 44, 51, 56, 65, 53, 60, 57]
EXPECTED_INCIDENCE_COUNTS = [35, 34, 11, 24, 30, 39, 30, 15, 31, 20]


def count_values(rows: list[dict[str, Any]], field: str) -> dict[str, int]:
    values = (
        "unspecified" if row[field] is None or row[field] == "" else str(row[field])
        for row in rows
    )
    return dict(sorted(Counter(values).items()))


def original_aliases(
    legacy_question: dict[str, Any], public_question: dict[str, Any]
) -> tuple[dict[str, tuple[str, str]], dict[str, tuple[str, str]]]:
    visible: dict[str, tuple[str, str]] = {}
    aliases: dict[str, tuple[str, str]] = {}
    for section in public_question["sections"]:
        value = (section["section_id"], section["text"])
        visible[section["section_id"]] = (section["section"], section["text"])
        aliases[section["section_id"]] = value
    for choice in public_question["choices"]:
        value = (choice["choice_id"], choice["choice_text"])
        visible[choice["choice_id"]] = ("choice", choice["choice_text"])
        aliases[choice["choice_id"]] = value

    answer_sections = sorted(
        (section for section in legacy_question["sections"] if section["section"] == "answer"),
        key=lambda section: (section["section_order"], section["section_id"]),
    )
    choices = sorted(
        public_question["choices"], key=lambda choice: (choice["choice_order"], choice["choice_id"])
    )
    if len(answer_sections) != len(choices):
        raise AssertionError("answer-section alias count changed")
    for section, choice in zip(answer_sections, choices, strict=True):
        if section["text"] != choice["choice_text"]:
            raise AssertionError("answer-section alias text changed")
        aliases[section["section_id"]] = (choice["choice_id"], choice["choice_text"])
    return aliases, visible


def resolve_fact(
    fact: dict[str, Any],
    aliases: dict[str, tuple[str, str]],
    visible: dict[str, tuple[str, str]],
) -> tuple[str, str]:
    direct = aliases.get(str(fact.get("container_id") or ""))
    if direct:
        pool = [direct]
    elif fact["section"] == "stem":
        pool = [
            (location, text) for location, (section, text) in visible.items() if section == "stem"
        ]
    elif fact["section"] in {"answer", "choice"}:
        pool = [
            (location, text) for location, (section, text) in visible.items() if section == "choice"
        ]
    else:
        pool = [
            (location, text)
            for location, (section, text) in visible.items()
            if section == fact["section"]
        ]
    start, end = fact["start_char"], fact["end_char"]
    matches = {
        (location, text)
        for location, text in pool
        if isinstance(start, int)
        and isinstance(end, int)
        and 0 <= start < end <= len(text)
        and text[start:end] == fact["raw_surface"]
    }
    if len(matches) != 1:
        raise AssertionError(f"fact {fact['fact_id']} has {len(matches)} visible span targets")
    return next(iter(matches))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd())
    parser.add_argument("--parent-db", type=Path, required=True)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.resolve()
    database = args.parent_db.resolve()
    legacy_path = repo / "public" / "reviewer" / "index.html"
    comparison_path = repo / "public" / "reviewer" / "compare" / "index.html"
    manifest_path = repo / "public" / "releases" / "v7.5.1-public.json"
    failures: list[str] = []
    checks = 0

    def check(condition: bool, message: str) -> None:
        nonlocal checks
        checks += 1
        if not condition:
            failures.append(message)

    check(sha256_file(database) == CORPUS_SHA256, "sealed corpus SHA-256 mismatch")
    check(
        hashlib.sha256(normalized_text_bytes(legacy_path)).hexdigest() == LEGACY_REVIEWER_SHA256,
        "legacy reviewer changed",
    )
    document = comparison_path.read_text(encoding="utf-8")
    check("v7.5.1 non-LOINC preview" in document, "v7.5.1 preview label missing")
    check("Laboratory/LOINC normalization is pending" in document, "LOINC notice missing")
    check("kekki-medqa-parse-comparison-v751-r1" in document, "new localStorage key missing")
    check("kekki-medqa-v751-comparison-review.json" in document, "new export filename missing")
    check(re.search(r"\bv7\.4\b|\bv74\b", document, re.IGNORECASE) is None, "stale v7.4 label remains")

    try:
        payload = extract_script_json(document, "comparison-data")
    except Exception as exc:  # pragma: no cover - surfaced in validator output
        payload = {}
        failures.append(f"comparison JSON parse failed: {exc}")
    legacy = load_legacy_reviewer(legacy_path)
    legacy_questions = legacy.get("questions", [])
    public_questions = payload.get("questions", [])

    check(payload.get("release") == RELEASE, "comparison release mismatch")
    check([question.get("id") for question in public_questions] == QUESTION_IDS, "question order changed")
    check([question.get("id") for question in legacy_questions] == QUESTION_IDS, "legacy order changed")
    check(
        [len(question.get("mentions", [])) for question in legacy_questions] == EXPECTED_LEGACY_COUNTS,
        "legacy mention counts changed",
    )
    check(sum(EXPECTED_LEGACY_COUNTS) == 616, "legacy mention total changed")
    check(all(question.get("source") == "MedQA" for question in public_questions), "non-MedQA source exposed")
    check(payload.get("privacy", {}).get("additional_corpus_questions_included") is False, "privacy scope changed")
    check(payload.get("privacy", {}).get("candidate_spans_included") is False, "candidate spans exposed")
    check(payload.get("privacy", {}).get("underlying_fact_ids_included") is False, "fact IDs exposed")
    check("fact75:" not in document and "fact751:" not in document and "cand75:" not in document, "raw provenance IDs exposed")

    connection = sqlite3.connect(f"file:{database.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    try:
        check(connection.execute("PRAGMA integrity_check").fetchone()[0] == "ok", "SQLite integrity failed")
        output_by_id = {question["id"]: question for question in public_questions}
        legacy_by_id = {question["id"]: question for question in legacy_questions}
        total_facts = total_visible = total_incidences = total_candidates = 0

        for index, question_id in enumerate(QUESTION_IDS):
            if question_id not in output_by_id or question_id not in legacy_by_id:
                continue
            public_question = output_by_id[question_id]
            legacy_question = legacy_by_id[question_id]
            check(public_question["legacy"]["mentions"] == legacy_question["mentions"], f"legacy records changed for {question_id}")
            check(
                all(section["section"] != "answer" for section in public_question["sections"]),
                f"duplicated answer section remains for {question_id}",
            )
            check(
                public_question["sections"] == [
                    section for section in legacy_question["sections"] if section["section"] != "answer"
                ],
                f"non-answer section text changed for {question_id}",
            )
            check(public_question["choices"] == legacy_question["choices"], f"choice text changed for {question_id}")

            aliases, visible = original_aliases(legacy_question, public_question)
            annotations = public_question["v751"]["annotations"]
            annotation_keys: set[tuple[Any, ...]] = set()
            output_annotations: dict[tuple[Any, ...], dict[str, Any]] = {}
            for annotation in annotations:
                location_id = annotation["location_id"]
                location_text = visible.get(location_id, (None, None))[1]
                start, end = annotation["start_char"], annotation["end_char"]
                key = (
                    location_id,
                    start,
                    end,
                    annotation["external_namespace"],
                    annotation["external_code"],
                )
                check(key not in annotation_keys, f"duplicate visible annotation {key!r}")
                annotation_keys.add(key)
                output_annotations[key] = annotation
                check(
                    isinstance(location_text, str)
                    and 0 <= start < end <= len(location_text)
                    and location_text[start:end] == annotation["raw_surface"],
                    f"output span mismatch for {annotation['annotation_ref']}",
                )
                for field in (
                    "source_kind_counts", "evidence_tier_counts", "validation_method_counts",
                    "section_counts", "assertion_counts", "polarity_counts", "certainty_counts",
                    "temporality_counts", "experiencer_counts", "answer_role_counts",
                ):
                    check(
                        sum(annotation[field].values()) == annotation["fact_count"],
                        f"{field} does not recount facts for {annotation['annotation_ref']}",
                    )

            facts = [
                dict(row) for row in connection.execute(
                    "SELECT * FROM analysis_network_facts_v751 WHERE question_id=?",
                    (question_id,),
                )
            ]
            grouped: dict[tuple[Any, ...], list[dict[str, Any]]] = defaultdict(list)
            for fact in facts:
                location_id, source_text = resolve_fact(fact, aliases, visible)
                check(
                    source_text[fact["start_char"]:fact["end_char"]] == fact["raw_surface"],
                    f"database span mismatch for {fact['fact_id']}",
                )
                key = (
                    location_id,
                    fact["start_char"],
                    fact["end_char"],
                    fact["external_namespace"],
                    fact["external_code"],
                )
                grouped[key].append(fact)

            check(len(facts) == EXPECTED_FACT_COUNTS[index], f"database fact count changed for {question_id}")
            check(len(grouped) == EXPECTED_VISIBLE_COUNTS[index], f"visible count changed for {question_id}")
            incidences = {(fact["external_namespace"], fact["external_code"]) for fact in facts}
            check(len(incidences) == EXPECTED_INCIDENCE_COUNTS[index], f"incidence count changed for {question_id}")
            check(set(grouped) == set(output_annotations), f"annotation keys disagree with database for {question_id}")

            for key, records in grouped.items():
                annotation = output_annotations.get(key)
                if not annotation:
                    continue
                check(annotation["fact_count"] == len(records), f"fact multiplicity mismatch for {key!r}")
                check(annotation["source_record_count"] == len({row["source_record_id"] for row in records}), f"source record count mismatch for {key!r}")
                check(annotation["container_representation_count"] == len({row["container_id"] for row in records}), f"container count mismatch for {key!r}")
                for output_field, database_field in (
                    ("source_kind_counts", "source_kind"),
                    ("evidence_tier_counts", "evidence_tier"),
                    ("validation_method_counts", "validation_method"),
                    ("section_counts", "section"),
                    ("assertion_counts", "assertion"),
                    ("polarity_counts", "polarity"),
                    ("certainty_counts", "certainty"),
                    ("temporality_counts", "temporality"),
                    ("experiencer_counts", "experiencer"),
                    ("answer_role_counts", "answer_role"),
                ):
                    check(annotation[output_field] == count_values(records, database_field), f"{output_field} mismatch for {key!r}")
                for field in ("raw_surface", "canonical_name", "entity_family", "entity_type", "external_label"):
                    values = {row[field] for row in records}
                    check(len(values) == 1 and annotation[field] in values, f"{field} mismatch for {key!r}")

            candidate_count = connection.execute(
                "SELECT COUNT(*) FROM analysis_clinical_candidates_v751 WHERE question_id=?",
                (question_id,),
            ).fetchone()[0]
            check(public_question["v751"]["excluded_candidate_count"] == candidate_count, f"candidate count mismatch for {question_id}")
            check(public_question["v751"]["accepted_fact_count"] == len(facts), f"public fact count mismatch for {question_id}")
            check(public_question["v751"]["visible_annotation_count"] == len(grouped), f"public visible count mismatch for {question_id}")
            check(public_question["v751"]["distinct_question_concept_incidence_count"] == len(incidences), f"public incidence count mismatch for {question_id}")
            total_facts += len(facts)
            total_visible += len(grouped)
            total_incidences += len(incidences)
            total_candidates += candidate_count

        check(total_facts == 614, f"fact total is {total_facts}, expected 614")
        check(total_visible == 511, f"visible annotation total is {total_visible}, expected 511")
        check(total_incidences == 269, f"incidence total is {total_incidences}, expected 269")
        check(total_candidates == 355, f"candidate total is {total_candidates}, expected 355")
        parser = payload.get("v751_parser", {})
        check(parser.get("accepted_fact_count") == 614, "parser fact total mismatch")
        check(parser.get("visible_annotation_count") == 511, "parser visible total mismatch")
        check(parser.get("distinct_question_concept_incidence_count") == 269, "parser incidence total mismatch")
        check(parser.get("facts_on_question_count") == 10, "not all ten questions have facts")
        check(parser.get("pending_loinc_candidate_count") == 282, "pending LOINC candidate total mismatch")
        check(parser.get("unresolved_nonloinc_candidate_count") == 73, "non-LOINC candidate total mismatch")
    finally:
        connection.close()

    exposed_question_ids = set(re.findall(r"daq_[0-9a-f]+", json.dumps(payload, sort_keys=True)))
    check(exposed_question_ids == set(QUESTION_IDS), "payload exposes a question outside the ten-item allowlist")

    check(manifest_path.exists(), "combined v7.5.1 public manifest is missing")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    check(manifest.get("release") == PUBLIC_RELEASE, "combined manifest release mismatch")
    reviewer = manifest.get("reviewer", {})
    check(reviewer.get("release") == RELEASE, "manifest reviewer release mismatch")
    check(reviewer.get("question_source") == "MedQA", "manifest reviewer source mismatch")
    check(reviewer.get("question_count") == 10, "manifest reviewer question count mismatch")
    check(reviewer.get("legacy_mention_count") == 616, "manifest legacy count mismatch")
    check(reviewer.get("v751_accepted_fact_count") == 614, "manifest v7.5.1 fact count mismatch")
    check(reviewer.get("v751_visible_annotation_count") == 511, "manifest visible count mismatch")
    check(reviewer.get("v751_distinct_question_concept_incidence_count") == 269, "manifest incidence count mismatch")
    check(reviewer.get("pending_loinc_candidate_count") == 282, "manifest pending LOINC count mismatch")
    check(reviewer.get("unresolved_nonloinc_candidate_count") == 73, "manifest unresolved non-LOINC count mismatch")
    check(reviewer.get("additional_corpus_questions_included") is False, "manifest permits extra questions")
    assets = {item.get("path"): item for item in manifest.get("assets", []) if isinstance(item, dict)}
    comparison_asset = assets.get("public/reviewer/compare/index.html", {})
    legacy_asset = assets.get("public/reviewer/index.html", {})
    check(comparison_asset.get("sha256") == sha256_file(comparison_path), "manifest comparison SHA mismatch")
    check(comparison_asset.get("bytes") == comparison_path.stat().st_size, "manifest comparison bytes mismatch")
    check(legacy_asset.get("sha256") == LEGACY_REVIEWER_SHA256, "manifest legacy reviewer SHA mismatch")
    check(legacy_asset.get("preserved") is True, "manifest does not preserve legacy reviewer")
    replacement = manifest.get("replacement", {})
    check(replacement.get("canonical_network_route") == "/network/7.5.1", "manifest canonical route mismatch")
    check(replacement.get("comparison_route") == "/reviewer/compare", "manifest reviewer route mismatch")

    result = {
        "passed": not failures,
        "checks": checks,
        "failures": failures,
        "release": payload.get("release"),
        "comparison_sha256": sha256_file(comparison_path),
        "comparison_bytes": comparison_path.stat().st_size,
        "manifest_sha256": sha256_file(manifest_path) if manifest_path.exists() else None,
    }
    print(json.dumps(result, indent=2))
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())
