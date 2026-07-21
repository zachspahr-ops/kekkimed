#!/usr/bin/env python3
"""Independent release/privacy validator for the public Kekki v7.4 preview.

This validator deliberately does not import the builder.  It reads the sealed
parent SQLite database, the validated private full-network gzip, and the files
that will be published.  The ten-question reviewer is the sole exception to
the public raw-question prohibition: it must contain exactly the previously
published MedQA sample, in the same order, and no other question IDs.
"""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import re
import sqlite3
import sys
from collections import Counter
from pathlib import Path
from typing import Any, Iterable


PUBLIC_RELEASE = "clinical_network_v74_nonlab_public_r1"
PRIVATE_RELEASE = "clinical_network_v74_nonlab_preview_r1"
PARENT_SHA256 = "4c5acfd4f86e9af1b4702cbeb403ac680d8830e7c86e34c06c370436dcbac521"
PRIVATE_GZIP_SHA256 = "dcb9f6a211434028a3c2d25c835367b86a93fc48a00f087b2a0a08b98ced96fe"
CANONICAL_GRAPH_SHA256 = "213f59e74d49e3de47c1e8fa49d3f5a666fadedc2348cb82269f224d25598677"
LEGACY_REVIEWER_SHA256 = "e5f3b2a55e5cdb9da54e5c8977231c05aa3c4928d896a15e3900ea3521318d77"
LEGACY_REVIEWER_BYTES = 378653

QUESTION_IDS = [
    "daq_44d46f278f7536af",
    "daq_3e7314e312344f4a",
    "daq_64078bfeb0674821",
    "daq_689dd35cf88a669c",
    "daq_bcc8a8f32eb863b7",
    "daq_bcfdb3ea41c20d36",
    "daq_43ea91d004328587",
    "daq_45b7ed7ba6bdaffd",
    "daq_c7981505cccf8fe1",
    "daq_733cc261da1983e9",
]
LEGACY_MENTION_COUNTS = [71, 63, 62, 62, 62, 62, 60, 60, 58, 56]
V74_FACT_COUNTS = [7, 4, 0, 9, 5, 15, 15, 6, 12, 8]
LEGACY_TYPE_COUNTS = {
    "diagnostic_test": 11,
    "disease_condition_syndrome": 74,
    "lab_test": 171,
    "imaging_test": 11,
    "medication": 177,
    "etiology_factor": 78,
    "physical_exam_symptom": 29,
    "physical_exam": 27,
    "diagnostic_result": 28,
    "lab_result": 9,
    "intervention": 1,
}

PUBLIC_NODE_KEYS = {
    "id", "label", "namespace", "code", "community", "degree",
    "weightedDegree", "pagerank", "questionSupport", "families", "types",
    "lanes", "specialties", "assertions", "polarities", "temporalities",
    "x", "y",
}
PUBLIC_EDGE_KEYS = {
    "id", "source", "target", "support", "npmi", "lift", "jaccard",
    "specialties", "sourceCount", "maxSourceShare", "minLoso", "crossSource",
}
REQUIRED_NODE_KEYS = {"id", "label", "namespace", "code", "questionSupport", "x", "y"}
REQUIRED_EDGE_KEYS = {"id", "source", "target", "support", "npmi", "lift", "jaccard"}
NETWORK_BANNED_TOP_KEYS = {"questions", "incidences", "evidence"}
NETWORK_BANNED_ANY_KEYS = {
    "stem", "answer", "answerLabel", "raw_text", "rawText", "raw_surface",
    "source_question_json", "source_scope_json", "source_row_json",
}


class Validation:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.passes: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        if condition:
            self.passes.append(message)
        else:
            self.errors.append(message)

    def equal(self, actual: Any, expected: Any, message: str) -> None:
        if actual == expected:
            self.passes.append(message)
        else:
            self.errors.append(f"{message}: expected {expected!r}, found {actual!r}")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def git_canonical_bytes(path: Path) -> bytes:
    """Return bytes as deployed from the LF-canonical Git blob on Linux."""
    return path.read_bytes().replace(b"\r\n", b"\n")


def git_canonical_sha256(path: Path) -> str:
    return hashlib.sha256(git_canonical_bytes(path)).hexdigest()


def canonical_json_sha256(value: Any) -> str:
    encoded = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def extract_script_json(document: str, script_id: str) -> Any:
    pattern = re.compile(
        rf"<script\b[^>]*\bid=[\"']{re.escape(script_id)}[\"'][^>]*>(.*?)</script\s*>",
        re.IGNORECASE | re.DOTALL,
    )
    match = pattern.search(document)
    if not match:
        raise ValueError(f"missing JSON script #{script_id}")
    return json.loads(match.group(1).strip())


def extract_assignment_json(document: str, names: Iterable[str]) -> Any:
    """Extract a JSON object assigned to a JavaScript variable, without eval."""
    for name in names:
        match = re.search(rf"(?:window\.)?{re.escape(name)}\s*=\s*", document)
        if not match:
            continue
        start = next((i for i in range(match.end(), len(document)) if document[i] in "[{"), -1)
        if start < 0:
            continue
        opening = document[start]
        closing = "}" if opening == "{" else "]"
        depth = 0
        in_string = False
        escaped = False
        for index in range(start, len(document)):
            char = document[index]
            if in_string:
                if escaped:
                    escaped = False
                elif char == "\\":
                    escaped = True
                elif char == '"':
                    in_string = False
                continue
            if char == '"':
                in_string = True
            elif char == opening:
                depth += 1
            elif char == closing:
                depth -= 1
                if depth == 0:
                    return json.loads(document[start:index + 1])
    raise ValueError(f"missing JSON assignment among {', '.join(names)}")


def network_payload(document: str) -> dict[str, Any]:
    value = extract_script_json(document, "network-data")
    if not isinstance(value, dict):
        raise ValueError("network-data is not a JSON object")
    return value


def reviewer_payload(document: str) -> dict[str, Any]:
    for script_id in ("comparison-data", "review-data"):
        try:
            value = extract_script_json(document, script_id)
            if isinstance(value, dict):
                return value
        except (ValueError, json.JSONDecodeError):
            pass
    value = extract_assignment_json(document, ("COMPARISON_DATA", "REVIEW_DATA"))
    if not isinstance(value, dict):
        raise ValueError("reviewer data is not a JSON object")
    return value


def walk_json(value: Any, path: str = "$") -> Iterable[tuple[str, Any]]:
    yield path, value
    if isinstance(value, dict):
        for key, child in value.items():
            yield from walk_json(child, f"{path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            yield from walk_json(child, f"{path}[{index}]")


def all_keys(value: Any) -> set[str]:
    keys: set[str] = set()
    for _, item in walk_json(value):
        if isinstance(item, dict):
            keys.update(str(key) for key in item)
    return keys


def occurrence_count(group: dict[str, Any]) -> int:
    occurrences = group.get("occurrences", group.get("count", 1))
    if isinstance(occurrences, list):
        return len(occurrences)
    if isinstance(occurrences, int):
        return occurrences
    return 1


def parser_count(block: Any, direct_keys: tuple[str, ...]) -> int | None:
    if not isinstance(block, dict):
        return None
    for key in direct_keys:
        value = block.get(key)
        if isinstance(value, int):
            return value
    for key in ("mentions", "facts"):
        if isinstance(block.get(key), list):
            return len(block[key])
    groups = block.get("groups")
    if isinstance(groups, list) and all(isinstance(group, dict) for group in groups):
        return sum(occurrence_count(group) for group in groups)
    return None


def get_question_id(question: dict[str, Any]) -> str | None:
    for key in ("id", "question_id", "source_id"):
        value = question.get(key)
        if isinstance(value, str) and value.startswith("daq_"):
            return value
    return None


def manifest_path_hashes(value: Any) -> dict[str, str]:
    found: dict[str, str] = {}
    for _, item in walk_json(value):
        if not isinstance(item, dict):
            continue
        path = item.get("path") or item.get("file") or item.get("relative_path")
        digest = item.get("sha256") or item.get("sha_256")
        if isinstance(path, str) and isinstance(digest, str):
            found[path.replace("\\", "/").lstrip("./")] = digest.lower()
    return found


def find_manifest_hash(path_hashes: dict[str, str], suffix: str) -> str | None:
    suffix = suffix.replace("\\", "/")
    matches = [digest for path, digest in path_hashes.items() if path.endswith(suffix)]
    return matches[0] if len(set(matches)) == 1 else None


def load_authoritative(
    db_path: Path,
    validation: Validation,
) -> tuple[dict[str, dict[str, Any]], dict[str, list[dict[str, Any]]], dict[str, set[tuple[str, str]]]]:
    questions: dict[str, dict[str, Any]] = {}
    facts: dict[str, list[dict[str, Any]]] = {question_id: [] for question_id in QUESTION_IDS}
    containers: dict[str, set[tuple[str, str]]] = {question_id: set() for question_id in QUESTION_IDS}
    connection = sqlite3.connect(f"file:{db_path.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    try:
        integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
        validation.equal(integrity, "ok", "parent SQLite integrity")
        placeholders = ",".join("?" for _ in QUESTION_IDS)
        rows = connection.execute(
            f"""
            SELECT question_id, canonical_question_id, dedup_disposition,
                   scope_status, analysis_included, answer_key_complete,
                   question_hash, raw_stem_sha256, source_question_json
            FROM analysis_pure_clinical_questions_v74
            WHERE question_id IN ({placeholders})
            """,
            QUESTION_IDS,
        ).fetchall()
        for row in rows:
            questions[row["question_id"]] = dict(row)
        validation.equal(set(questions), set(QUESTION_IDS), "all ten reviewer questions are in the analysis-pure interface")
        for question_id in QUESTION_IDS:
            row = questions.get(question_id)
            if not row:
                continue
            validation.check(
                row["canonical_question_id"] == question_id
                and row["dedup_disposition"] == "unique"
                and row["scope_status"] == "active"
                and row["analysis_included"] == 1
                and row["answer_key_complete"] == 1,
                f"{question_id} is canonical, unique, active, analysis-included, and answer-key complete",
            )
        fact_rows = connection.execute(
            f"""
            SELECT f.*, c.source_id, c.container_kind, c.raw_text
            FROM analysis_pure_clinical_facts_v74 AS f
            JOIN clinical_text_container_v73 AS c ON c.container_id = f.container_id
            WHERE f.question_id IN ({placeholders})
            ORDER BY f.question_id, f.node_id
            """,
            QUESTION_IDS,
        ).fetchall()
        for row in fact_rows:
            facts[row["question_id"]].append(dict(row))
        container_rows = connection.execute(
            f"""
            SELECT question_id, source_id, raw_text
            FROM clinical_text_container_v73
            WHERE question_id IN ({placeholders})
            """,
            QUESTION_IDS,
        ).fetchall()
        for row in container_rows:
            containers[row["question_id"]].add((row["source_id"], row["raw_text"]))
    finally:
        connection.close()
    validation.equal([len(facts[q]) for q in QUESTION_IDS], V74_FACT_COUNTS, "authoritative v7.4 per-question fact counts")
    return questions, facts, containers


def validate_network(
    public_html: str,
    public_data: dict[str, Any],
    private_html: str,
    private_data: dict[str, Any],
    validation: Validation,
) -> None:
    validation.equal(public_data.get("release"), PUBLIC_RELEASE, "public network release identity")
    validation.equal(private_data.get("release"), PRIVATE_RELEASE, "private network release identity")
    validation.check(not (NETWORK_BANNED_TOP_KEYS & set(public_data)), "network omits questions, incidences, and evidence payloads")
    banned_paths = []
    for path, item in walk_json(public_data):
        if isinstance(item, dict):
            for key in NETWORK_BANNED_ANY_KEYS & set(item):
                banned_paths.append(f"{path}.{key}")
    validation.check(not banned_paths, "network omits raw text/stem/answer payload keys")

    public_nodes = public_data.get("nodes")
    public_edges = public_data.get("edges")
    private_nodes = private_data.get("nodes")
    private_edges = private_data.get("edges")
    validation.check(isinstance(public_nodes, list) and isinstance(public_edges, list), "public network has node and edge arrays")
    validation.check(isinstance(private_nodes, list) and isinstance(private_edges, list), "private network has node and edge arrays")
    if not all(isinstance(value, list) for value in (public_nodes, public_edges, private_nodes, private_edges)):
        return

    validation.equal(len(public_nodes), 2354, "support-1 public node count")
    validation.equal(len(public_edges), 24639, "support-1 public edge count")
    validation.equal(len(private_nodes), len(public_nodes), "public/private node topology count")
    validation.equal(len(private_edges), len(public_edges), "public/private edge topology count")
    validation.check(all(isinstance(node, dict) for node in public_nodes), "all public nodes are objects")
    validation.check(all(isinstance(edge, dict) for edge in public_edges), "all public edges are objects")
    if not all(isinstance(node, dict) for node in public_nodes) or not all(isinstance(edge, dict) for edge in public_edges):
        return

    bad_node_keys = sorted({key for node in public_nodes for key in node if key not in PUBLIC_NODE_KEYS})
    bad_edge_keys = sorted({key for edge in public_edges for key in edge if key not in PUBLIC_EDGE_KEYS})
    validation.check(not bad_node_keys, f"public node schema contains only aggregate fields (unexpected: {bad_node_keys})")
    validation.check(not bad_edge_keys, f"public edge schema contains only aggregate fields (unexpected: {bad_edge_keys})")
    validation.check(all(REQUIRED_NODE_KEYS <= set(node) for node in public_nodes), "all public nodes contain required identity/layout fields")
    validation.check(all(REQUIRED_EDGE_KEYS <= set(edge) for edge in public_edges), "all public edges contain required association fields")

    public_node_map = {node.get("id"): node for node in public_nodes}
    private_node_map = {node.get("id"): node for node in private_nodes if isinstance(node, dict)}
    public_edge_map = {edge.get("id"): edge for edge in public_edges}
    private_edge_map = {edge.get("id"): edge for edge in private_edges if isinstance(edge, dict)}
    validation.equal(len(public_node_map), len(public_nodes), "public node IDs are unique")
    validation.equal(len(public_edge_map), len(public_edges), "public edge IDs are unique")
    validation.equal(set(public_node_map), set(private_node_map), "public node identity set equals private graph")
    validation.equal(set(public_edge_map), set(private_edge_map), "public edge identity set equals private graph")
    private_question_texts = {
        value.casefold()
        for question in private_data.get("questions", {}).values()
        if isinstance(question, dict)
        for key in ("stem", "answer")
        for value in (question.get(key),)
        if isinstance(value, str) and value
    } if isinstance(private_data.get("questions"), dict) else set()
    identity_redactions: list[tuple[dict[str, Any], dict[str, Any], bool]] = []
    retained_nodes_match = True
    for node_id, node in public_node_map.items():
        private_node = private_node_map.get(node_id, {})
        is_local = str(private_node.get("namespace", "")).startswith("LOCAL")
        label_matches_question = str(private_node.get("label", "")).casefold() in private_question_texts
        needs_redaction = is_local or label_matches_question
        if needs_redaction:
            identity_redactions.append((node, private_node, is_local))
        for key, value in node.items():
            if needs_redaction and key in {"namespace", "code", "label"}:
                continue
            if private_node.get(key) != value:
                retained_nodes_match = False
                break
    retained_edges_match = all(
        all(private_edge_map.get(edge_id, {}).get(key) == value for key, value in edge.items())
        for edge_id, edge in public_edge_map.items()
    )
    validation.check(retained_nodes_match, "every retained node value equals the private validated graph")
    validation.check(retained_edges_match, "every retained edge value equals the private validated graph")
    redaction_values_match = True
    for public, private, _is_local in identity_redactions:
        seed = f"{private.get('namespace')}\0{private.get('code')}".encode("utf-8")
        digest = hashlib.sha256(seed).hexdigest()
        if public.get("namespace") != "LOCAL_REDACTED" or public.get("code") != f"atomic-{digest[:12]}" or public.get("label") != f"Local atomic concept {digest[:8]}":
            redaction_values_match = False
            break
    validation.check(redaction_values_match, "all sensitive identities use the exact deterministic public redaction")
    public_local_codes = [public.get("code") for public, _private, _is_local in identity_redactions]
    public_local_labels = [public.get("label") for public, _private, _is_local in identity_redactions]
    validation.equal(len(set(public_local_codes)), len(public_local_codes), "redacted identity codes are unique")
    validation.equal(len(set(public_local_labels)), len(public_local_labels), "redacted identity labels are unique")
    redacted_ids = {public.get("id") for public, _private, _is_local in identity_redactions}
    safe_public_label_counts = Counter(
        node.get("label") for node in public_nodes
        if node.get("id") not in redacted_ids and isinstance(node.get("label"), str)
    )
    leaked_local_identity = False
    for _public, private, is_local in identity_redactions:
        values = [private.get("code")]
        if is_local:
            values.append(private.get("namespace"))
        # A LOCAL label such as "Anxiety" may independently be the public label
        # of a safe HPO/MONDO concept.  Require every serialized occurrence to
        # be accounted for by those safe node identity fields; no extra copy may
        # survive in metadata, provenance, or UI source.
        private_label = private.get("label")
        if isinstance(private_label, str) and private_label:
            encoded_label = json.dumps(private_label, ensure_ascii=False)
            if public_html.count(encoded_label) != safe_public_label_counts[private_label]:
                leaked_local_identity = True
                break
        if any(
            isinstance(value, str) and value and json.dumps(value, ensure_ascii=False) in public_html
            for value in values
        ):
            leaked_local_identity = True
            break
    validation.check(not leaked_local_identity, "private sensitive identity strings are absent except safe-node label duplicates")
    for key in ("algorithms", "cohort", "thresholds"):
        validation.equal(public_data.get(key), private_data.get(key), f"public/private {key} agreement")
    cohort = public_data.get("cohort", {})
    if isinstance(cohort, dict):
        validation.equal(cohort.get("default_support"), 3, "default support threshold")
        validation.equal(cohort.get("default_node_count"), 832, "default-threshold node count")
        validation.equal(cohort.get("default_edge_count"), 2930, "default-threshold edge count")

    lowered = public_html.lower()
    forbidden_ui = (
        'id="source"', "id='source'", ">question source<", "question source</label>",
        'id="container"', "id='container'", ">source container<", "source container</label>",
    )
    validation.check(not any(token in lowered for token in forbidden_ui), "network has no question-source or source-container controls")
    validation.check("laboratory/loinc lane pending" in lowered and "not the final all-lane corpus" in lowered, "network visibly labels the LOINC-pending non-final limitation")
    validation.check("raw question" in lowered and ("omitted" in lowered or "not included" in lowered), "network visibly states that raw questions are omitted")

    banned_literals = ("daq_", "EVI:", "INC:", "CTR:", "NOD:", "Medical School boards", "IM boards", "Cards boards")
    validation.check(not any(token.lower() in lowered for token in banned_literals), "network contains no question/provenance IDs or source labels")
    leaked_question_text = False
    private_questions = private_data.get("questions", {})
    if isinstance(private_questions, dict):
        for question in private_questions.values():
            if not isinstance(question, dict):
                continue
            for key in ("stem", "answer"):
                text = question.get(key)
                if isinstance(text, str) and len(text.strip()) >= 32 and text in public_html:
                    leaked_question_text = True
                    break
            if leaked_question_text:
                break
    validation.check(not leaked_question_text, "network contains no exact private stem or answer text")


def validate_reviewer(
    document: str,
    payload: dict[str, Any],
    legacy_payload: dict[str, Any],
    authoritative_questions: dict[str, dict[str, Any]],
    authoritative_facts: dict[str, list[dict[str, Any]]],
    authoritative_containers: dict[str, set[tuple[str, str]]],
    validation: Validation,
) -> None:
    questions = payload.get("questions")
    legacy_questions = legacy_payload.get("questions")
    validation.check(isinstance(questions, list), "comparison reviewer has a questions array")
    validation.check(isinstance(legacy_questions, list), "preserved legacy reviewer has a questions array")
    if not isinstance(questions, list) or not isinstance(legacy_questions, list):
        return
    validation.equal(len(questions), 10, "comparison reviewer publishes exactly ten questions")
    validation.equal(len(legacy_questions), 10, "legacy reviewer publishes exactly ten questions")
    validation.check(all(isinstance(question, dict) for question in questions), "all comparison questions are objects")
    validation.check(all(isinstance(question, dict) for question in legacy_questions), "all legacy questions are objects")
    if not all(isinstance(question, dict) for question in questions + legacy_questions):
        return
    embedded_ids = [get_question_id(question) for question in questions]
    legacy_ids = [get_question_id(question) for question in legacy_questions]
    validation.equal(embedded_ids, QUESTION_IDS, "comparison question IDs and order equal the established sample")
    validation.equal(legacy_ids, QUESTION_IDS, "legacy question IDs and order equal the established sample")
    document_ids = set(re.findall(r"daq_[0-9a-f]{16}", document))
    validation.equal(document_ids, set(QUESTION_IDS), "comparison HTML contains no additional question IDs")

    comparison_legacy_counts: list[int | None] = []
    baseline_legacy_counts: list[int] = []
    v74_counts: list[int | None] = []
    exact_legacy_payloads = True
    exact_public_content = True
    exact_v74_facts = True
    public_metadata_keys = (
        "id", "source", "target", "correct_label", "correct_answer", "sections", "choices",
    )
    optional_metadata_keys = ("source_id", "origin_lane", "target_confidence")
    fact_keys = (
        "source_id", "container_kind", "raw_surface", "start_char", "end_char",
        "lane_role", "entity_family", "entity_type", "canonical_name", "assertion",
        "polarity", "certainty", "temporality", "experiencer", "conditionality",
        "external_namespace", "external_code", "external_label", "terminology_version",
    )
    for index, (question, baseline_question) in enumerate(zip(questions, legacy_questions)):
        legacy = question.get("legacy", {})
        v74 = question.get("v74", question.get("v7_4", {}))
        comparison_legacy_counts.append(parser_count(legacy, ("mention_count", "legacy_mention_count")))
        baseline_mentions = baseline_question.get("mentions", [])
        baseline_legacy_counts.append(len(baseline_mentions) if isinstance(baseline_mentions, list) else -1)
        v74_counts.append(parser_count(v74, ("accepted_fact_count", "fact_count", "v74_fact_count")))
        question_id = QUESTION_IDS[index]
        expected = authoritative_questions.get(question_id, {})
        for key in public_metadata_keys:
            if question.get(key) != baseline_question.get(key):
                exact_public_content = False
        for key in optional_metadata_keys:
            if key in question and question.get(key) != baseline_question.get(key):
                exact_public_content = False
        if not isinstance(legacy, dict) or legacy.get("mentions") != baseline_mentions:
            exact_legacy_payloads = False

        displayed: set[tuple[str, str]] = set()
        for key in ("sections", "choices"):
            rows = baseline_question.get(key)
            if not isinstance(rows, list):
                continue
            for row in rows:
                if not isinstance(row, dict):
                    continue
                source_id = row.get("section_id") or row.get("choice_id") or row.get("source_id")
                raw_text = row.get("text") if key == "sections" else row.get("choice_text")
                if isinstance(source_id, str) and isinstance(raw_text, str):
                    displayed.add((source_id, raw_text))
        validation.check(displayed <= authoritative_containers[question_id], f"{question_id} legacy raw sections/choices equal authoritative containers")
        stem = next(
            (row.get("text") for row in baseline_question.get("sections", [])
             if isinstance(row, dict) and row.get("section") == "stem"),
            None,
        )
        source = json.loads(expected.get("source_question_json") or "{}") if expected else {}
        validation.equal(stem, source.get("stem_text"), f"{question_id} displayed stem equals parent")

        public_facts = v74.get("facts") if isinstance(v74, dict) else None
        if not isinstance(public_facts, list):
            exact_v74_facts = False
        else:
            public_counter = Counter(
                tuple(fact.get(key) for key in fact_keys)
                for fact in public_facts if isinstance(fact, dict)
            )
            expected_counter = Counter(
                tuple(fact.get(key) for key in fact_keys)
                for fact in authoritative_facts[question_id]
            )
            if not all(isinstance(fact, dict) for fact in public_facts) or sum(public_counter.values()) != len(public_facts) or public_counter != expected_counter:
                exact_v74_facts = False

    validation.check(exact_public_content, "comparison preserves all legacy question metadata and raw content byte-for-byte")
    validation.check(exact_legacy_payloads, "comparison embeds the complete original legacy mention payloads")
    validation.check(exact_v74_facts, "comparison v7.4 facts equal the authoritative analysis-pure rows")
    validation.equal(baseline_legacy_counts, LEGACY_MENTION_COUNTS, "preserved legacy per-question mention counts")
    validation.equal(comparison_legacy_counts, LEGACY_MENTION_COUNTS, "comparison legacy per-question mention counts")
    validation.equal(v74_counts, V74_FACT_COUNTS, "v7.4 per-question accepted-fact counts")
    validation.equal(sum(count or 0 for count in comparison_legacy_counts), 616, "legacy total mention count")
    validation.equal(sum(count or 0 for count in v74_counts), 81, "v7.4 total accepted-fact count")

    type_counts = payload.get("type_counts")
    validation.equal(type_counts, LEGACY_TYPE_COUNTS, "comparison legacy aggregate type counts")
    validation.equal(legacy_payload.get("type_counts"), LEGACY_TYPE_COUNTS, "preserved legacy aggregate type counts")

    validation.check(
        "strict" in document.lower() and ("zero accepted" in document.lower() or "0 accepted" in document.lower()),
        "comparison reviewer explains the intentionally zero-fact strict-filter result",
    )
    validation.check("legacy" in document.lower() and "v7.4" in document.lower(), "comparison reviewer visibly labels both parse versions")


def validate_manifest(
    manifest: dict[str, Any],
    network_path: Path,
    comparison_path: Path,
    legacy_reviewer_path: Path,
    validation: Validation,
) -> None:
    serialized = json.dumps(manifest, sort_keys=True)
    validation.check(PUBLIC_RELEASE in serialized, "manifest pins the public release identity")
    validation.check(PRIVATE_RELEASE in serialized, "manifest pins the private parent network release")
    validation.check(PARENT_SHA256 in serialized, "manifest pins the parent database hash")
    validation.check(PRIVATE_GZIP_SHA256 in serialized, "manifest pins the unchanged private gzip hash")
    validation.check(CANONICAL_GRAPH_SHA256 in serialized, "manifest pins the canonical graph hash")
    validation.check("LOINC" in serialized or "loinc" in serialized, "manifest records the LOINC-pending limitation")
    validation.check("81" in serialized and "616" in serialized, "manifest records both reviewer parse totals")
    validation.check("2354" in serialized and "24639" in serialized and "2930" in serialized, "manifest records graph topology/default counts")

    path_hashes = manifest_path_hashes(manifest)
    expected_assets = {
        "networks/7.4/index.html": sha256_file(network_path),
        "reviewer/compare/index.html": sha256_file(comparison_path),
        "reviewer/index.html": git_canonical_sha256(legacy_reviewer_path),
    }
    for suffix, expected_hash in expected_assets.items():
        validation.equal(find_manifest_hash(path_hashes, suffix), expected_hash, f"manifest/output hash agreement for {suffix}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="Kekki repository root")
    parser.add_argument("--parent-db", type=Path, required=True, help="sealed v7.4 non-lab parent SQLite database")
    parser.add_argument("--internal-network-gzip", type=Path, required=True, help="validated private full-v7.4 HTML gzip")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.resolve()
    parent_db = args.parent_db.resolve()
    private_gzip = args.internal_network_gzip.resolve()
    network_path = repo / "public" / "networks" / "7.4" / "index.html"
    legacy_reviewer_path = repo / "public" / "reviewer" / "index.html"
    comparison_path = repo / "public" / "reviewer" / "compare" / "index.html"
    legacy_path = repo / "public" / "reviewer" / "legacy.html"
    manifest_path = repo / "public" / "releases" / "v7.4-public.json"

    validation = Validation()
    required = (parent_db, private_gzip, network_path, legacy_reviewer_path, comparison_path, manifest_path)
    for path in required:
        validation.check(path.is_file(), f"required file exists: {path}")
    validation.check(not legacy_path.exists(), "no separately published legacy reviewer asset exists")
    if any(not path.is_file() for path in required):
        for error in validation.errors:
            print(f"FAIL  {error}")
        return 1

    validation.equal(sha256_file(parent_db), PARENT_SHA256, "immutable parent database SHA-256")
    validation.equal(sha256_file(private_gzip), PRIVATE_GZIP_SHA256, "unchanged private full-network gzip SHA-256")
    validation.equal(git_canonical_sha256(legacy_reviewer_path), LEGACY_REVIEWER_SHA256, "legacy reviewer Git-canonical SHA-256 equals the deployed baseline")
    validation.equal(len(git_canonical_bytes(legacy_reviewer_path)), LEGACY_REVIEWER_BYTES, "legacy reviewer Git-canonical byte count")

    authoritative_questions, authoritative_facts, authoritative_containers = load_authoritative(parent_db, validation)
    public_network_html = network_path.read_text(encoding="utf-8")
    legacy_reviewer_html = legacy_reviewer_path.read_text(encoding="utf-8")
    comparison_html = comparison_path.read_text(encoding="utf-8")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    try:
        private_network_html = gzip.decompress(private_gzip.read_bytes()).decode("utf-8")
        public_network_data = network_payload(public_network_html)
        private_network_data = network_payload(private_network_html)
        legacy_data = extract_assignment_json(legacy_reviewer_html, ("REVIEW_DATA",))
        comparison_data = reviewer_payload(comparison_html)
    except (OSError, UnicodeDecodeError, ValueError, json.JSONDecodeError) as exc:
        validation.errors.append(f"embedded payload parse: {exc}")
    else:
        validate_network(public_network_html, public_network_data, private_network_html, private_network_data, validation)
        validate_reviewer(
            comparison_html,
            comparison_data,
            legacy_data,
            authoritative_questions,
            authoritative_facts,
            authoritative_containers,
            validation,
        )
        validate_manifest(manifest, network_path, comparison_path, legacy_reviewer_path, validation)

    print(f"Public v7.4 showcase validation: {len(validation.passes)} passed, {len(validation.errors)} failed")
    for message in validation.passes:
        print(f"PASS  {message}")
    for message in validation.errors:
        print(f"FAIL  {message}")
    return 1 if validation.errors else 0


if __name__ == "__main__":
    sys.exit(main())
