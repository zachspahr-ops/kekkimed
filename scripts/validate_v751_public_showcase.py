#!/usr/bin/env python3
"""Independently validate Kekki's public v7.5.1 aggregate network.

This validator deliberately does not import the builder.  It reopens every
sealed input, recounts the full incidence support and metadata distributions,
reconstructs node context aggregates, and validates the serialized public
projection field by field.
"""

from __future__ import annotations

import argparse
import collections
import gzip
import hashlib
import json
import math
import re
import sqlite3
import sys
from pathlib import Path
from typing import Any


PUBLIC_RELEASE = "clinical_network_v751_nonloinc_public_r1"
PRIVATE_RELEASE = "clinical_network_v751_nonloinc_r1"
CORPUS_SHA256 = "d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec"
NETWORK_DB_SHA256 = "37bad394d95299c920dd2c255220afbc64a23ab5da5c43fdecb8e10e7132dee9"
PRIVATE_GZIP_SHA256 = "78178e470dba672a8bfbeefe96ef3736a99478376be15090f99a9d13cc2ec295"
METADATA_DB_SHA256 = "7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0"
V74_PUBLIC_NETWORK_SHA256 = "253ebf642fe63db59c81bf919fe28c26af2d8a1a45cb34dd583cf63c94b35987"

GRAPH_QUESTION_COUNT = 17_166
GRAPH_QUESTION_WITH_FACT_COUNT = 16_347
GRAPH_CONCEPT_COUNT = 6_117
GRAPH_INCIDENCE_COUNT = 139_223
GRAPH_EDGE_COUNT_SUPPORT1 = 340_960
PAYLOAD_MIN_SUPPORT = 8
PAYLOAD_NODE_COUNT = 1_892
PAYLOAD_EDGE_COUNT = 14_676
DEFAULT_SUPPORT = 16
DEFAULT_NODE_COUNT = 892
DEFAULT_EDGE_COUNT = 4_959

NODE_KEYS = {
    "id", "label", "displayLabel", "labelRank", "namespace", "code", "community",
    "degree", "weightedDegree", "pagerank", "questionSupport", "families",
    "types", "lanes", "specialties", "assertions", "polarities",
    "temporalities", "x", "y",
}
EDGE_KEYS = {
    "id", "source", "target", "support", "npmi", "lift", "jaccard",
    "specialties", "sourceCount", "maxSourceShare", "minLoso", "crossSource",
}
TOP_LEVEL_KEYS = {
    "release", "label", "parent", "cohort", "algorithms", "thresholds",
    "nodes", "edges", "interpretation", "limitation", "privacy",
}


class Validation:
    def __init__(self) -> None:
        self.passes: list[str] = []
        self.errors: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        (self.passes if condition else self.errors).append(message)

    def equal(self, actual: Any, expected: Any, message: str) -> None:
        if actual == expected:
            self.passes.append(message)
        else:
            self.errors.append(f"{message} (expected {expected!r}, found {actual!r})")

    def close(self, actual: float, expected: float, message: str) -> None:
        self.check(math.isclose(actual, expected, rel_tol=1e-12, abs_tol=1e-12), message)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(8 * 1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def git_canonical_text_sha256(path: Path) -> str:
    """Hash text as stored/deployed by Git, independent of Windows checkout EOLs."""
    return hashlib.sha256(path.read_bytes().replace(b"\r\n", b"\n")).hexdigest()


def extract_script_json(document: str, script_id: str) -> Any:
    match = re.search(
        rf"<script\b[^>]*\bid=[\"']{re.escape(script_id)}[\"'][^>]*>(.*?)</script\s*>",
        document,
        re.IGNORECASE | re.DOTALL,
    )
    if not match:
        raise ValueError(f"missing JSON script #{script_id}")
    return json.loads(match.group(1).strip())


def readonly(path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(f"file:{path.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    return connection


def compact_distribution(values: list[str]) -> dict[str, int]:
    return dict(sorted(collections.Counter(values).items()))


def cleaned(values: set[Any]) -> list[str]:
    return sorted({str(value) for value in values if value is not None and str(value).strip()})


def validate_inputs(
    corpus_path: Path,
    network_path: Path,
    metadata_path: Path,
    private_gzip: Path,
    validation: Validation,
) -> None:
    expected = {
        corpus_path: CORPUS_SHA256,
        network_path: NETWORK_DB_SHA256,
        metadata_path: METADATA_DB_SHA256,
        private_gzip: PRIVATE_GZIP_SHA256,
    }
    for path, digest in expected.items():
        validation.check(path.is_file(), f"sealed input exists: {path}")
        if path.is_file():
            validation.equal(sha256_file(path), digest, f"sealed SHA-256: {path.name}")
    for path in (corpus_path, network_path, metadata_path):
        if not path.is_file():
            continue
        connection = readonly(path)
        try:
            validation.equal(connection.execute("PRAGMA quick_check").fetchone()[0], "ok", f"SQLite quick_check: {path.name}")
        finally:
            connection.close()


def load_authoritative(
    corpus_path: Path,
    network_path: Path,
    metadata_path: Path,
    visible_ids: set[str],
    validation: Validation,
) -> tuple[
    dict[str, dict[str, Any]],
    dict[str, set[str]],
    dict[str, tuple[str, str]],
    dict[str, dict[str, set[Any]]],
]:
    network = readonly(network_path)
    corpus = readonly(corpus_path)
    metadata = readonly(metadata_path)
    try:
        release = network.execute("SELECT value FROM release_meta WHERE key='release_id'").fetchone()
        validation.equal(release[0] if release else None, PRIVATE_RELEASE, "network DB release identity")
        counts = {
            "questions": corpus.execute("SELECT COUNT(*) FROM questions").fetchone()[0],
            "questions_with_facts": corpus.execute(
                "SELECT COUNT(*) FROM analysis_question_fact_coverage_v751 WHERE fact_count>0"
            ).fetchone()[0],
            "concepts": network.execute("SELECT COUNT(*) FROM concepts").fetchone()[0],
            "incidences": network.execute("SELECT COUNT(*) FROM question_concept_incidence").fetchone()[0],
            "edges": network.execute("SELECT COUNT(*) FROM edges").fetchone()[0],
            "duplicate_incidences": network.execute(
                "SELECT COUNT(*) FROM (SELECT question_id,concept_id,COUNT(*) n "
                "FROM question_concept_incidence GROUP BY question_id,concept_id HAVING n<>1)"
            ).fetchone()[0],
        }
        validation.equal(counts["questions"], GRAPH_QUESTION_COUNT, "active question count")
        validation.equal(counts["questions_with_facts"], GRAPH_QUESTION_WITH_FACT_COUNT, "questions with display facts")
        validation.equal(counts["concepts"], GRAPH_CONCEPT_COUNT, "full graph concept count")
        validation.equal(counts["incidences"], GRAPH_INCIDENCE_COUNT, "deduplicated incidence count")
        validation.equal(counts["edges"], GRAPH_EDGE_COUNT_SUPPORT1, "support-one edge count")
        validation.equal(counts["duplicate_incidences"], 0, "no duplicate question-concept incidence")

        concepts = {row["concept_id"]: dict(row) for row in network.execute(
            "SELECT concept_id,external_namespace,external_code,preferred_label,"
            "entity_family,entity_type,question_support FROM concepts ORDER BY concept_id"
        )}
        validation.check(visible_ids <= set(concepts), "every payload node exists in sealed network DB")
        concept_questions: dict[str, set[str]] = collections.defaultdict(set)
        for row in network.execute(
            "SELECT question_id,concept_id FROM question_concept_incidence ORDER BY question_id,concept_id"
        ):
            if row["concept_id"] in visible_ids:
                concept_questions[row["concept_id"]].add(row["question_id"])

        question_metadata = {
            row["question_id"]: (row["source"] or "Unknown", row["specialty"] or "Unspecified")
            for row in metadata.execute("SELECT question_id,source,specialty FROM questions ORDER BY question_id")
        }
        active_questions = {row[0] for row in corpus.execute("SELECT question_id FROM questions")}
        validation.check(active_questions <= set(question_metadata), "metadata covers every active v7.5.1 question")

        identity_to_id = {
            (concepts[concept_id]["external_namespace"], concepts[concept_id]["external_code"]): concept_id
            for concept_id in visible_ids
        }
        contexts = {
            concept_id: {
                "lanes": set(), "families": set(), "types": set(),
                "assertions": set(), "polarities": set(), "temporalities": set(),
            }
            for concept_id in visible_ids
        }
        for row in corpus.execute(
            "SELECT external_namespace,external_code,evidence_tier,entity_family,entity_type,"
            "assertion,polarity,temporality FROM analysis_network_facts_v751 ORDER BY question_id,fact_id"
        ):
            concept_id = identity_to_id.get((row["external_namespace"], row["external_code"]))
            if not concept_id:
                continue
            context = contexts[concept_id]
            context["lanes"].add(row["evidence_tier"])
            context["families"].add(row["entity_family"])
            context["types"].add(row["entity_type"])
            context["assertions"].add(row["assertion"])
            context["polarities"].add(row["polarity"])
            context["temporalities"].add(row["temporality"])
    finally:
        network.close()
        corpus.close()
        metadata.close()
    return concepts, concept_questions, question_metadata, contexts


def validate_privacy(document: str, payload: dict[str, Any], source_names: set[str], validation: Validation) -> None:
    validation.equal(set(payload), TOP_LEVEL_KEYS, "public payload has only approved top-level fields")
    validation.check(not ({"questions", "incidences", "evidence"} & set(payload)), "no question/incidence/evidence top-level payload")
    lowered = document.casefold()
    forbidden_controls = (
        'id="source"', "id='source'", ">question source<", "question source</label>",
        'id="container"', "id='container'", ">source section<", "source section</label>",
    )
    validation.check(not any(value in lowered for value in forbidden_controls), "no question-source or source-section controls")
    validation.check(not re.search(r"\bdaq_[0-9a-f]+\b", document, re.IGNORECASE), "no provenance question IDs")
    validation.check(not re.search(r"\b(?:EVI|INC|CTR|NOD):", document), "no fact/incidence/container provenance IDs")
    validation.check(not any(name.casefold() in lowered for name in source_names if name), "no named question sources")
    validation.check(
        "labelBudget" in document and "a.labelRank-b.labelRank" in document and "80*Math.max(1,view.k)" in document,
        "rendered overview uses deterministic zoom-aware label budgeting",
    )
    validation.check("raw questions" in lowered and "omitted" in lowered, "visible raw-question privacy notice")
    validation.check("laboratory/loinc" in lowered and "not the final all-lane corpus" in lowered, "visible LOINC-pending limitation")


def validate_payload(
    public: dict[str, Any],
    private: dict[str, Any],
    concepts: dict[str, dict[str, Any]],
    concept_questions: dict[str, set[str]],
    question_metadata: dict[str, tuple[str, str]],
    contexts: dict[str, dict[str, set[Any]]],
    validation: Validation,
) -> None:
    validation.equal(public.get("release"), PUBLIC_RELEASE, "public release identity")
    validation.equal(private.get("release"), PRIVATE_RELEASE, "private release identity")
    nodes = public.get("nodes", [])
    edges = public.get("edges", [])
    private_nodes = {node["id"]: node for node in private.get("nodes", [])}
    private_edges = {edge["id"]: edge for edge in private.get("edges", [])}
    validation.equal(len(nodes), PAYLOAD_NODE_COUNT, "support>=8 payload node count")
    validation.equal(len(edges), PAYLOAD_EDGE_COUNT, "support>=8 payload edge count")
    validation.check(all(set(node) == NODE_KEYS for node in nodes), "exact aggregate-only node schema")
    validation.check(all(set(edge) == EDGE_KEYS for edge in edges), "exact aggregate-only edge schema")
    public_nodes = {node["id"]: node for node in nodes}
    public_edges = {edge["id"]: edge for edge in edges}
    validation.equal(len(public_nodes), len(nodes), "unique public node IDs")
    validation.equal(len(public_edges), len(edges), "unique public edge IDs")
    validation.equal(set(public_nodes), set(private_nodes), "public/private support>=8 node topology agreement")
    validation.equal(set(public_edges), set(private_edges), "public/private support>=8 edge topology agreement")

    canonical_counts = collections.Counter(
        str(concepts[node_id]["preferred_label"]).strip().casefold() for node_id in public_nodes
    )
    expected_display_labels: dict[str, str] = {}
    for node_id in public_nodes:
        concept = concepts[node_id]
        label = str(concept["preferred_label"]).strip()
        namespace = str(concept["external_namespace"])
        qualifier = "Local" if namespace.upper().startswith("LOCAL") else namespace
        expected_display_labels[node_id] = (
            f"{label} · {qualifier}" if canonical_counts[label.casefold()] > 1 else label
        )
    ranked_ids = sorted(
        public_nodes,
        key=lambda node_id: (
            -len(concept_questions[node_id]),
            -float(private_nodes[node_id]["pagerank"]),
            expected_display_labels[node_id].casefold(),
            node_id,
        ),
    )
    expected_ranks = {node_id: rank for rank, node_id in enumerate(ranked_ids, start=1)}
    display_labels: list[str] = []
    exact_nodes = True
    for node_id, node in public_nodes.items():
        concept = concepts[node_id]
        private_node = private_nodes[node_id]
        label = str(concept["preferred_label"]).strip()
        namespace = str(concept["external_namespace"])
        expected_display = expected_display_labels[node_id]
        qids = concept_questions[node_id]
        context = contexts[node_id]
        expected = {
            "id": node_id,
            "label": label,
            "displayLabel": expected_display,
            "labelRank": expected_ranks[node_id],
            "namespace": namespace,
            "code": str(concept["external_code"]),
            "community": private_node["community"],
            "degree": private_node["degree"],
            "weightedDegree": private_node["weightedDegree"],
            "pagerank": private_node["pagerank"],
            "questionSupport": len(qids),
            "families": cleaned(context["families"]),
            "types": cleaned(context["types"]),
            "lanes": cleaned(context["lanes"]),
            "specialties": compact_distribution([question_metadata[qid][1] for qid in qids]),
            "assertions": cleaned(context["assertions"]),
            "polarities": cleaned(context["polarities"]),
            "temporalities": cleaned(context["temporalities"]),
            "x": private_node["x"],
            "y": private_node["y"],
        }
        if node != expected:
            exact_nodes = False
            break
        display_labels.append(node["displayLabel"])
    validation.check(exact_nodes, "every public node equals independently reconstructed canonical/context projection")
    validation.equal(sum(count > 1 for count in canonical_counts.values()), 265, "canonical duplicate-label group count")
    validation.equal(sum(count for count in canonical_counts.values() if count > 1), 532, "namespace-qualified node count")
    validation.equal(len({label.casefold() for label in display_labels}), len(display_labels), "case-insensitive display labels are unique")
    validation.check(all(label.strip() for label in display_labels), "no blank display labels")
    validation.check(not any(label.casefold().startswith("local atomic concept") for label in display_labels), "zero opaque local-atomic placeholder labels")
    validation.check(not any("local_atomic_v60" in label.casefold() for label in display_labels), "machine-local namespace absent from display labels")
    validation.equal(
        {node["labelRank"] for node in nodes},
        set(range(1, PAYLOAD_NODE_COUNT + 1)),
        "deterministic label ranks are unique and contiguous",
    )

    exact_edges = True
    all_source_names: set[str] = set()
    for edge_id, edge in public_edges.items():
        private_edge = private_edges[edge_id]
        left, right = edge["source"], edge["target"]
        if (left, right) != (private_edge["source"], private_edge["target"]):
            exact_edges = False
            break
        shared = concept_questions[left] & concept_questions[right]
        support = len(shared)
        left_support = len(concept_questions[left])
        right_support = len(concept_questions[right])
        pxy = support / GRAPH_QUESTION_COUNT
        pmi = math.log2((support * GRAPH_QUESTION_COUNT) / (left_support * right_support))
        expected_npmi = pmi / -math.log2(pxy) if 0 < pxy < 1 else 0.0
        sources = collections.Counter(question_metadata[qid][0] for qid in shared)
        all_source_names.update(sources)
        expected_specialties = compact_distribution([question_metadata[qid][1] for qid in shared])
        scalar_ok = (
            support == edge["support"] == private_edge["support"]
            and edge["sourceCount"] == len(sources)
            and edge["minLoso"] == min(support - count for count in sources.values())
            and edge["crossSource"] == (len(sources) > 1)
            and edge["specialties"] == expected_specialties
            and math.isclose(edge["npmi"], expected_npmi, rel_tol=1e-12, abs_tol=1e-12)
            and math.isclose(edge["lift"], support * GRAPH_QUESTION_COUNT / (left_support * right_support), rel_tol=1e-12, abs_tol=1e-12)
            and math.isclose(edge["jaccard"], support / (left_support + right_support - support), rel_tol=1e-12, abs_tol=1e-12)
            and math.isclose(edge["maxSourceShare"], max(sources.values()) / support, rel_tol=1e-12, abs_tol=1e-12)
        )
        if not scalar_ok:
            exact_edges = False
            break
    validation.check(exact_edges, "every edge support, specialty distribution, metric, and anonymized robustness recounts from full incidence")

    default_edges = [edge for edge in edges if edge["support"] >= DEFAULT_SUPPORT]
    default_nodes = {value for edge in default_edges for value in (edge["source"], edge["target"])}
    validation.equal(len(default_edges), DEFAULT_EDGE_COUNT, "default support-16 edge count")
    validation.equal(len(default_nodes), DEFAULT_NODE_COUNT, "default support-16 node count")
    validation.equal(min(edge["support"] for edge in edges), PAYLOAD_MIN_SUPPORT, "payload minimum edge support")

    cohort = public.get("cohort", {})
    expected_cohort_counts = {
        "question_count": GRAPH_QUESTION_COUNT,
        "question_with_fact_count": GRAPH_QUESTION_WITH_FACT_COUNT,
        "graph_total_concept_count": GRAPH_CONCEPT_COUNT,
        "graph_total_incidence_count": GRAPH_INCIDENCE_COUNT,
        "graph_total_edge_count_support1": GRAPH_EDGE_COUNT_SUPPORT1,
        "payload_min_support": PAYLOAD_MIN_SUPPORT,
        "payload_node_count": PAYLOAD_NODE_COUNT,
        "payload_edge_count": PAYLOAD_EDGE_COUNT,
        "default_support": DEFAULT_SUPPORT,
        "default_node_count": DEFAULT_NODE_COUNT,
        "default_edge_count": DEFAULT_EDGE_COUNT,
    }
    for key, expected in expected_cohort_counts.items():
        validation.equal(cohort.get(key), expected, f"cohort count: {key}")
    validation.check("concept_count_support1" not in cohort and "edge_count_support1" not in cohort, "payload counts are not mislabeled as support-one graph totals")
    validation.equal(public.get("privacy", {}).get("robustness_is_anonymized_full_support"), True, "manifested full-support robustness contract")
    return all_source_names


def validate_manifest(manifest: dict[str, Any], network_path: Path, validation: Validation) -> None:
    validation.equal(manifest.get("schema_version"), 2, "manifest schema version")
    validation.equal(manifest.get("release"), PUBLIC_RELEASE, "manifest release identity")
    serialized = json.dumps(manifest, sort_keys=True)
    for digest, label in (
        (CORPUS_SHA256, "corpus"),
        (NETWORK_DB_SHA256, "network database"),
        (PRIVATE_GZIP_SHA256, "private gzip"),
        (METADATA_DB_SHA256, "metadata database"),
        (V74_PUBLIC_NETWORK_SHA256, "v7.4 rollback network"),
    ):
        validation.check(digest in serialized, f"manifest pins {label} SHA-256")
    assets = {item.get("path"): item for item in manifest.get("assets", []) if isinstance(item, dict)}
    asset = assets.get("public/networks/7.5.1/index.html", {})
    validation.equal(asset.get("sha256"), sha256_file(network_path), "manifest/network SHA-256 agreement")
    validation.equal(asset.get("bytes"), network_path.stat().st_size, "manifest/network byte agreement")
    labels = manifest.get("label_quality", {})
    validation.equal(labels.get("canonical_duplicate_groups"), 265, "manifest duplicate-label groups")
    validation.equal(labels.get("namespace_qualified_nodes"), 532, "manifest qualified-label node count")
    validation.equal(labels.get("unique_display_labels"), PAYLOAD_NODE_COUNT, "manifest unique display-label count")
    validation.equal(labels.get("ranked_label_nodes"), PAYLOAD_NODE_COUNT, "manifest ranked-label node count")
    validation.equal(labels.get("opaque_placeholder_labels"), 0, "manifest opaque-placeholder count")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="Kekki repository root")
    parser.add_argument("--corpus-db", type=Path, required=True)
    parser.add_argument("--network-db", type=Path, required=True)
    parser.add_argument("--metadata-db", type=Path, required=True)
    parser.add_argument("--internal-network-gzip", type=Path, required=True)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.resolve()
    corpus_path = args.corpus_db.resolve()
    network_db_path = args.network_db.resolve()
    metadata_path = args.metadata_db.resolve()
    private_gzip = args.internal_network_gzip.resolve()
    network_path = repo / "public" / "networks" / "7.5.1" / "index.html"
    manifest_path = repo / "public" / "releases" / "v7.5.1-public.json"
    v74_path = repo / "public" / "networks" / "7.4" / "index.html"
    validation = Validation()

    validate_inputs(corpus_path, network_db_path, metadata_path, private_gzip, validation)
    for path in (network_path, manifest_path, v74_path):
        validation.check(path.is_file(), f"required public/rollback asset exists: {path}")
    if not all(path.is_file() for path in (corpus_path, network_db_path, metadata_path, private_gzip, network_path, manifest_path, v74_path)):
        for error in validation.errors:
            print(f"FAIL  {error}")
        return 1
    validation.equal(
        git_canonical_text_sha256(v74_path),
        V74_PUBLIC_NETWORK_SHA256,
        "Git-canonical byte-identical v7.4 rollback network",
    )

    try:
        private_document = gzip.decompress(private_gzip.read_bytes()).decode("utf-8")
        private = extract_script_json(private_document, "network-data")
        public_document = network_path.read_text(encoding="utf-8")
        public = extract_script_json(public_document, "network-data")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, ValueError, json.JSONDecodeError) as exc:
        validation.errors.append(f"payload parsing: {exc}")
    else:
        validation.equal(private.get("release"), PRIVATE_RELEASE, "private gzip release identity")
        validation.equal(len(private.get("nodes", [])), PAYLOAD_NODE_COUNT, "private support>=8 node count")
        validation.equal(len(private.get("edges", [])), PAYLOAD_EDGE_COUNT, "private support>=8 edge count")
        visible_ids = {node["id"] for node in private.get("nodes", [])}
        concepts, concept_questions, question_metadata, contexts = load_authoritative(
            corpus_path, network_db_path, metadata_path, visible_ids, validation
        )
        source_names = validate_payload(
            public, private, concepts, concept_questions, question_metadata, contexts, validation
        )
        validate_privacy(public_document, public, source_names, validation)
        validate_manifest(manifest, network_path, validation)

    print(f"Public v7.5.1 network validation: {len(validation.passes)} passed, {len(validation.errors)} failed")
    for message in validation.passes:
        print(f"PASS  {message}")
    for message in validation.errors:
        print(f"FAIL  {message}")
    return 1 if validation.errors else 0


if __name__ == "__main__":
    sys.exit(main())
