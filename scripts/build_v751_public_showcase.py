#!/usr/bin/env python3
"""Build Kekki's public-safe v7.5.1 aggregate clinical network.

The private review asset is used only as a sealed layout/topology input.  The
public projection contains no question, incidence, fact/span, answer-key, or
named-source payload.  Specialty counts and anonymized source-robustness
statistics are recomputed from the complete incidence table rather than the
private website's capped evidence sample.
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
from pathlib import Path
from typing import Any


PUBLIC_RELEASE = "clinical_network_v751_nonloinc_public_r1"
PRIVATE_RELEASE = "clinical_network_v751_nonloinc_r1"
CORPUS_RELEASE = "clinical_corpus_v751_nonloinc_r1"
CORPUS_SHA256 = "d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec"
NETWORK_DB_SHA256 = "37bad394d95299c920dd2c255220afbc64a23ab5da5c43fdecb8e10e7132dee9"
PRIVATE_GZIP_SHA256 = "78178e470dba672a8bfbeefe96ef3736a99478376be15090f99a9d13cc2ec295"
METADATA_DB_SHA256 = "7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0"
V74_PUBLIC_RELEASE = "clinical_network_v74_nonlab_public_r1"
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

NODE_KEYS = (
    "id", "label", "displayLabel", "labelRank", "namespace", "code", "community",
    "degree", "weightedDegree", "pagerank", "questionSupport", "families",
    "types", "lanes", "specialties", "assertions", "polarities",
    "temporalities", "x", "y",
)
EDGE_KEYS = (
    "id", "source", "target", "support", "npmi", "lift", "jaccard",
    "specialties", "sourceCount", "maxSourceShare", "minLoso", "crossSource",
)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(8 * 1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def json_for_script(value: Any) -> str:
    return canonical_json(value).replace("<", "\\u003c")


def extract_script_json(document: str, script_id: str) -> Any:
    match = re.search(
        rf"<script\b[^>]*\bid=[\"']{re.escape(script_id)}[\"'][^>]*>(.*?)</script\s*>",
        document,
        re.IGNORECASE | re.DOTALL,
    )
    if not match:
        raise ValueError(f"missing JSON script #{script_id}")
    return json.loads(match.group(1).strip())


def load_private_payload(path: Path) -> dict[str, Any]:
    document = gzip.decompress(path.read_bytes()).decode("utf-8")
    payload = extract_script_json(document, "network-data")
    if not isinstance(payload, dict):
        raise ValueError("private network payload is not an object")
    return payload


def readonly(path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(f"file:{path.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    if connection.execute("PRAGMA quick_check").fetchone()[0] != "ok":
        connection.close()
        raise ValueError(f"SQLite quick_check failed: {path}")
    return connection


def release_meta(connection: sqlite3.Connection) -> dict[str, str]:
    return {row[0]: row[1] for row in connection.execute("SELECT key,value FROM release_meta")}


def distribution(values: list[str]) -> dict[str, int]:
    return dict(sorted(collections.Counter(values).items()))


def cleaned(values: set[Any]) -> list[str]:
    return sorted({str(value) for value in values if value is not None and str(value).strip()})


def load_inputs(
    corpus_path: Path,
    network_path: Path,
    metadata_path: Path,
    private: dict[str, Any],
) -> tuple[
    dict[str, dict[str, Any]],
    dict[str, set[str]],
    dict[str, tuple[str, str]],
    dict[str, dict[str, set[Any]]],
]:
    if private.get("release") != PRIVATE_RELEASE:
        raise ValueError(f"unexpected private release: {private.get('release')!r}")
    cohort = private.get("cohort", {})
    expected_private = {
        "payload_min_support": PAYLOAD_MIN_SUPPORT,
        "default_support": DEFAULT_SUPPORT,
        "default_node_count": DEFAULT_NODE_COUNT,
        "default_edge_count": DEFAULT_EDGE_COUNT,
    }
    for key, expected in expected_private.items():
        if cohort.get(key) != expected:
            raise ValueError(f"private cohort {key} changed: {cohort.get(key)!r}")
    if len(private.get("nodes", [])) != PAYLOAD_NODE_COUNT:
        raise ValueError("private support>=8 node payload count changed")
    if len(private.get("edges", [])) != PAYLOAD_EDGE_COUNT:
        raise ValueError("private support>=8 edge payload count changed")

    network = readonly(network_path)
    corpus = readonly(corpus_path)
    metadata = readonly(metadata_path)
    try:
        meta = release_meta(network)
        if meta.get("release_id") != PRIVATE_RELEASE:
            raise ValueError(f"network DB release changed: {meta.get('release_id')!r}")
        counts = {
            "concepts": network.execute("SELECT COUNT(*) FROM concepts").fetchone()[0],
            "incidences": network.execute("SELECT COUNT(*) FROM question_concept_incidence").fetchone()[0],
            "edges": network.execute("SELECT COUNT(*) FROM edges").fetchone()[0],
            "questions": corpus.execute("SELECT COUNT(*) FROM questions").fetchone()[0],
            "questions_with_facts": corpus.execute(
                "SELECT COUNT(*) FROM analysis_question_fact_coverage_v751 WHERE fact_count>0"
            ).fetchone()[0],
        }
        expected_counts = {
            "concepts": GRAPH_CONCEPT_COUNT,
            "incidences": GRAPH_INCIDENCE_COUNT,
            "edges": GRAPH_EDGE_COUNT_SUPPORT1,
            "questions": GRAPH_QUESTION_COUNT,
            "questions_with_facts": GRAPH_QUESTION_WITH_FACT_COUNT,
        }
        if counts != expected_counts:
            raise ValueError(f"sealed graph counts changed: {counts!r}")

        concepts = {row["concept_id"]: dict(row) for row in network.execute(
            "SELECT concept_id,external_namespace,external_code,preferred_label,"
            "entity_family,entity_type,question_support FROM concepts ORDER BY concept_id"
        )}
        visible_ids = {node["id"] for node in private["nodes"]}
        if not visible_ids <= set(concepts):
            raise ValueError("private payload contains concepts absent from the network DB")

        concept_questions: dict[str, set[str]] = collections.defaultdict(set)
        for row in network.execute(
            "SELECT question_id,concept_id FROM question_concept_incidence ORDER BY question_id,concept_id"
        ):
            if row["concept_id"] in visible_ids:
                concept_questions[row["concept_id"]].add(row["question_id"])

        question_metadata = {
            row["question_id"]: (
                row["source"] or "Unknown",
                row["specialty"] or "Unspecified",
            )
            for row in metadata.execute("SELECT question_id,source,specialty FROM questions ORDER BY question_id")
        }
        all_questions = {row[0] for row in corpus.execute("SELECT question_id FROM questions")}
        if not all_questions <= set(question_metadata):
            raise ValueError("v7.4 metadata does not cover every v7.5.1 active question")

        identity_to_id = {
            (concepts[concept_id]["external_namespace"], concepts[concept_id]["external_code"]): concept_id
            for concept_id in visible_ids
        }
        contexts: dict[str, dict[str, set[Any]]] = {
            concept_id: {
                "lanes": set(), "families": set(), "types": set(),
                "assertions": set(), "polarities": set(), "temporalities": set(),
            }
            for concept_id in visible_ids
        }
        for row in corpus.execute(
            "SELECT external_namespace,external_code,evidence_tier,entity_family,entity_type,"
            "assertion,polarity,temporality FROM analysis_network_facts_v751 "
            "ORDER BY question_id,fact_id"
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


def build_public_payload(
    private: dict[str, Any],
    concepts: dict[str, dict[str, Any]],
    concept_questions: dict[str, set[str]],
    question_metadata: dict[str, tuple[str, str]],
    contexts: dict[str, dict[str, set[Any]]],
) -> dict[str, Any]:
    private_nodes = {node["id"]: node for node in private["nodes"]}
    label_counts = collections.Counter(
        str(concepts[node_id]["preferred_label"]).strip().casefold() for node_id in private_nodes
    )
    nodes: list[dict[str, Any]] = []
    for node_id in sorted(private_nodes):
        source = private_nodes[node_id]
        concept = concepts[node_id]
        label = str(concept["preferred_label"]).strip()
        if not label:
            raise ValueError(f"blank canonical label: {node_id}")
        namespace = str(concept["external_namespace"])
        code = str(concept["external_code"])
        qualifier = "Local" if namespace.upper().startswith("LOCAL") else namespace
        display_label = f"{label} · {qualifier}" if label_counts[label.casefold()] > 1 else label
        qids = concept_questions[node_id]
        if int(source["questionSupport"]) != len(qids):
            raise ValueError(f"question support mismatch: {node_id}")
        context = contexts[node_id]
        specialties = distribution([question_metadata[qid][1] for qid in qids])
        nodes.append({
            "id": node_id,
            "label": label,
            "displayLabel": display_label,
            "labelRank": 0,
            "namespace": namespace,
            "code": code,
            "community": source["community"],
            "degree": source["degree"],
            "weightedDegree": source["weightedDegree"],
            "pagerank": source["pagerank"],
            "questionSupport": len(qids),
            "families": cleaned(context["families"]),
            "types": cleaned(context["types"]),
            "lanes": cleaned(context["lanes"]),
            "specialties": specialties,
            "assertions": cleaned(context["assertions"]),
            "polarities": cleaned(context["polarities"]),
            "temporalities": cleaned(context["temporalities"]),
            "x": source["x"],
            "y": source["y"],
        })

    ranked_nodes = sorted(
        nodes,
        key=lambda node: (
            -int(node["questionSupport"]),
            -float(node["pagerank"]),
            node["displayLabel"].casefold(),
            node["id"],
        ),
    )
    for rank, node in enumerate(ranked_nodes, start=1):
        node["labelRank"] = rank

    if len({node["displayLabel"].casefold() for node in nodes}) != len(nodes):
        raise ValueError("namespace qualification did not produce unique display labels")
    if any(node["displayLabel"].casefold().startswith("local atomic concept") for node in nodes):
        raise ValueError("opaque placeholder label survived")
    if any("local_atomic_v60" in node["displayLabel"].casefold() for node in nodes):
        raise ValueError("machine-local namespace leaked into a display label")

    total_questions = GRAPH_QUESTION_COUNT
    edges: list[dict[str, Any]] = []
    for private_edge in sorted(private["edges"], key=lambda edge: edge["id"]):
        left = private_edge["source"]
        right = private_edge["target"]
        shared = concept_questions[left] & concept_questions[right]
        support = len(shared)
        if support != int(private_edge["support"]):
            raise ValueError(f"edge support mismatch: {private_edge['id']}")
        left_support = len(concept_questions[left])
        right_support = len(concept_questions[right])
        pxy = support / total_questions
        pmi = math.log2((support * total_questions) / (left_support * right_support))
        npmi = pmi / -math.log2(pxy) if 0 < pxy < 1 else 0.0
        sources = collections.Counter(question_metadata[qid][0] for qid in shared)
        specialties = distribution([question_metadata[qid][1] for qid in shared])
        edges.append({
            "id": private_edge["id"],
            "source": left,
            "target": right,
            "support": support,
            "npmi": npmi,
            "lift": support * total_questions / (left_support * right_support),
            "jaccard": support / (left_support + right_support - support),
            "specialties": specialties,
            "sourceCount": len(sources),
            "maxSourceShare": max(sources.values()) / support,
            "minLoso": min(support - count for count in sources.values()),
            "crossSource": len(sources) > 1,
        })

    default_edges = [edge for edge in edges if edge["support"] >= DEFAULT_SUPPORT]
    default_ids = {value for edge in default_edges for value in (edge["source"], edge["target"])}
    if (len(default_ids), len(default_edges)) != (DEFAULT_NODE_COUNT, DEFAULT_EDGE_COUNT):
        raise ValueError("default threshold topology changed")

    thresholds = [
        {
            "threshold": int(row["threshold"]),
            "node_count": int(row["node_count"]),
            "edge_count": int(row["edge_count"]),
            "selected_default": int(row["threshold"] == DEFAULT_SUPPORT),
        }
        for row in private["thresholds"]
        if int(row["threshold"]) >= PAYLOAD_MIN_SUPPORT
    ]
    return {
        "release": PUBLIC_RELEASE,
        "label": "v7.5.1 exact-API non-lab public release",
        "parent": {
            "corpus_release": CORPUS_RELEASE,
            "corpus_sha256": CORPUS_SHA256,
            "network_release": PRIVATE_RELEASE,
            "network_database_sha256": NETWORK_DB_SHA256,
            "private_network_gzip_sha256": PRIVATE_GZIP_SHA256,
            "metadata_database_sha256": METADATA_DB_SHA256,
        },
        "cohort": {
            "cohort_id": "full",
            "label": "Full clinical network · v7.5.1 exact-API non-lab",
            "definition": "all active canonical questions; public payload retains associations at support ≥ 8",
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
        },
        "algorithms": private["algorithms"],
        "thresholds": thresholds,
        "nodes": nodes,
        "edges": edges,
        "interpretation": (
            "Edges are undirected question-level co-occurrence associations counted by distinct active "
            "canonical question. They do not imply causation, indication, contraindication, diagnosis, or ontology."
        ),
        "limitation": (
            "Laboratory/LOINC normalization remains pending until July 26, 2026 at 5:07 PM "
            "America/New_York. This is not the final all-lane corpus."
        ),
        "privacy": {
            "raw_question_text_included": False,
            "answer_keys_included": False,
            "question_or_fact_provenance_included": False,
            "source_labels_included": False,
            "source_selector_enabled": False,
            "robustness_is_anonymized_full_support": True,
        },
    }


NETWORK_TEMPLATE = r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Clinical Network 7.5.1 · Kekki</title><meta name="description" content="Public aggregate view of the v7.5.1 exact-API non-laboratory clinical concept network.">
<script defer src="/_vercel/insights/script.js"></script>
<style>
:root{color-scheme:dark;--bg:#080a0c;--panel:#0d1013;--raised:#11151a;--line:#252b31;--text:#eceeea;--muted:#8c949b;--accent:#a7c8b8;--warn:#e3bd72}*{box-sizing:border-box}html,body{margin:0;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font:14px/1.45 ui-monospace,SFMono-Regular,Consolas,monospace}button,input,select{font:inherit;color:inherit;background:#14181d;border:1px solid #30363e;border-radius:2px;padding:7px 9px}button{cursor:pointer}button:hover,button:focus-visible{border-color:var(--accent);outline:none}a{color:inherit}.app{height:100%;display:grid;grid-template-rows:auto auto 1fr}.notice{display:grid;grid-template-columns:auto 1fr;gap:14px;background:#17150f;color:#e8cf95;border-bottom:1px solid #494027;padding:8px 13px;font-size:11px}.notice b{color:var(--warn);text-transform:uppercase;letter-spacing:.07em}.bar{display:flex;gap:8px;align-items:center;padding:9px 12px;background:#0b0e11;border-bottom:1px solid var(--line);white-space:nowrap;overflow-x:auto}.back{text-decoration:none;color:var(--muted);margin-right:4px}.back:hover{color:var(--text)}.title{font-weight:700;margin-right:auto}.title small{color:var(--muted);font-weight:400}.workspace{position:relative;min-height:0;display:grid;grid-template-columns:224px 1fr 332px}.filters,.detail{background:var(--panel);padding:12px;overflow:auto}.filters{border-right:1px solid var(--line)}.detail{border-left:1px solid var(--line)}.field{margin:0 0 12px}.field label{display:block;color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}.field input,.field select{width:100%}.stage{position:relative;min-width:0;min-height:0;background:radial-gradient(circle at center,#10151a 0,#080a0c 70%)}canvas{width:100%;height:100%;display:block;touch-action:none}.stats{position:absolute;left:10px;bottom:10px;background:#0b0e11e8;border:1px solid var(--line);padding:7px 9px;color:var(--muted);font-size:11px;pointer-events:none}.muted{color:var(--muted)}.eyebrow{color:var(--accent);text-transform:uppercase;letter-spacing:.08em;font-size:10px}.detail h2{font:650 18px/1.25 ui-sans-serif,system-ui;margin:5px 0 9px}.detail h3{font-size:10px;text-transform:uppercase;color:var(--muted);letter-spacing:.07em;margin:18px 0 6px}.pill{display:inline-block;padding:2px 6px;border:1px solid #38404b;border-radius:99px;margin:2px 3px 2px 0;font-size:10px}.kv{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:11px;margin-top:12px}.kv b{color:var(--muted);font-weight:400}.empty{margin-top:28px;color:var(--muted)}.interpretation,.privacy{font-size:10px;color:var(--muted);padding-top:10px;border-top:1px solid var(--line);margin-top:16px}.privacy{color:#b7c5be}#detailClose{display:none}@media(max-width:820px){.notice{grid-template-columns:1fr;gap:2px}.workspace{grid-template-columns:1fr}.filters{position:absolute;z-index:4;left:0;top:0;bottom:0;width:min(270px,86vw);transform:translateX(-100%);transition:.15s}.filters.open{transform:none}.detail{position:absolute;z-index:5;left:0;right:0;bottom:0;max-height:62%;border-left:0;border-top:1px solid var(--line);transform:translateY(100%);transition:.15s}.detail.open{transform:none}.stage{grid-row:1;height:100%}#detailClose{display:block;float:right}.title small{display:none}}@media(prefers-reduced-motion:reduce){.filters,.detail{transition:none}}
@media(max-width:820px){.bar{gap:5px;padding:7px 8px;overflow:hidden}.bar button{flex:0 0 auto;padding:6px 7px}.back{margin-right:0}.title{min-width:0;overflow:hidden;text-overflow:ellipsis}}
</style></head><body><div class="app">
<div class="notice"><b>v7.5.1 non-laboratory release</b><span>Laboratory/LOINC lane pending until July 26, 2026 at 5:07 PM America/New_York. This is not the final all-lane corpus.</span></div>
<div class="bar"><a class="back" href="/">kekki /</a><button id="filtersBtn">filters</button><span class="title">Clinical network <small>/ public aggregate view</small></span><button id="fit">fit</button><button id="labels">labels on</button></div>
<div class="workspace"><aside class="filters" id="filters">
<div class="field"><label for="search">Search concept</label><input id="search" placeholder="label or terminology code"></div>
<div class="field"><label for="threshold">Minimum distinct-question support · <span id="thresholdValue"></span></label><input id="threshold" type="range" min="8" step="1"></div>
<div class="field"><label for="specialty">Explicit specialty</label><select id="specialty"><option value="">all specialties</option></select></div>
<div class="field"><label for="namespace">Terminology namespace</label><select id="namespace"><option value="">all namespaces</option></select></div>
<div class="field"><label for="lane">Evidence tier</label><select id="lane"><option value="">all evidence tiers</option></select></div>
<div class="field"><label for="family">Entity family</label><select id="family"><option value="">all families</option></select></div>
<div class="field"><label for="type">Entity type</label><select id="type"><option value="">all entity types</option></select></div>
<div class="field"><label for="assertion">Assertion</label><select id="assertion"><option value="">all assertions</option></select></div>
<div class="field"><label for="polarity">Polarity</label><select id="polarity"><option value="">all polarities</option></select></div>
<div class="field"><label for="temporality">Temporality</label><select id="temporality"><option value="">all temporalities</option></select></div>
<p class="interpretation">Edges are undirected question-level co-occurrence associations counted by distinct canonical question. They do not imply causation, indication, contraindication, diagnosis, or ontology.</p>
<p class="privacy">Public aggregate build. Raw questions, answer keys, named sources, and question/fact evidence are intentionally omitted.</p>
</aside><main class="stage"><canvas id="canvas" aria-label="Interactive clinical association network"></canvas><div class="stats" id="stats"></div></main><aside class="detail" id="detail"></aside></div></div>
<script id="network-data" type="application/json">__NETWORK_JSON__</script>
<script>
(()=>{'use strict';const D=JSON.parse(document.getElementById('network-data').textContent),$=s=>document.querySelector(s),canvas=$('#canvas'),ctx=canvas.getContext('2d'),detail=$('#detail');const nodes=new Map(D.nodes.map(n=>[n.id,n])),edges=D.edges;let view={x:0,y:0,k:1},drag=null,moved=false,selected=null,visibleNodes=[],visibleEdges=[],labels=true;const colors=['#a7c8b8','#7fabc0','#c0a7c8','#c8ba88','#b58d8d','#9ab58b','#89afb4','#aa9fbe','#ba987d','#8fb5a1'];
function options(id,vals){const el=$(id);[...new Set(vals.filter(Boolean))].sort().forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;el.append(o)})}
options('#specialty',D.edges.flatMap(e=>Object.keys(e.specialties||{})));options('#namespace',D.nodes.map(n=>n.namespace));options('#lane',D.nodes.flatMap(n=>n.lanes));options('#family',D.nodes.flatMap(n=>n.families));options('#type',D.nodes.flatMap(n=>n.types));options('#assertion',D.nodes.flatMap(n=>n.assertions));options('#polarity',D.nodes.flatMap(n=>n.polarities));options('#temporality',D.nodes.flatMap(n=>n.temporalities));
$('#threshold').value=D.cohort.default_support;$('#threshold').max=Math.max(...D.thresholds.map(x=>x.threshold));$('#thresholdValue').textContent=$('#threshold').value;
function resize(){const r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;canvas.width=Math.max(1,r.width*d);canvas.height=Math.max(1,r.height*d);ctx.setTransform(d,0,0,d,0,0);draw()}
function metaOk(n){const tests=[['#namespace','namespace'],['#lane','lanes'],['#family','families'],['#type','types'],['#assertion','assertions'],['#polarity','polarities'],['#temporality','temporalities']];return tests.every(([id,key])=>{const value=$(id).value;if(!value)return true;return Array.isArray(n[key])?n[key].includes(value):n[key]===value})}
function searchOk(n,q){return!q||(`${n.displayLabel} ${n.label} ${n.namespace}:${n.code}`).toLowerCase().includes(q)}
function apply(){const t=+$('#threshold').value,sp=$('#specialty').value,q=$('#search').value.trim().toLowerCase();$('#thresholdValue').textContent=t;visibleEdges=edges.filter(e=>{const a=nodes.get(e.source),b=nodes.get(e.target);return e.support>=t&&(!sp||(e.specialties||{})[sp])&&metaOk(a)&&metaOk(b)&&(searchOk(a,q)||searchOk(b,q))});const ids=new Set(visibleEdges.flatMap(e=>[e.source,e.target]));visibleNodes=[...ids].map(id=>nodes.get(id));$('#stats').textContent=`${visibleNodes.length.toLocaleString()} concepts · ${visibleEdges.length.toLocaleString()} associations · support ≥ ${t}`;draw()}
function screen(n){return{x:canvas.clientWidth/2+(n.x+view.x)*view.k*54,y:canvas.clientHeight/2+(n.y+view.y)*view.k*54}}
function draw(){if(!ctx)return;ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);ctx.lineCap='round';const q=$('#search').value.trim().toLowerCase(),matchesSearch=n=>q&&searchOk(n,q),labelBudget=Math.min(visibleNodes.length,Math.max(40,Math.floor(80*Math.max(1,view.k))));const labelIds=new Set([...visibleNodes].sort((a,b)=>a.labelRank-b.labelRank).slice(0,labelBudget).map(n=>n.id));for(const e of visibleEdges){const a=screen(nodes.get(e.source)),b=screen(nodes.get(e.target));ctx.strokeStyle=selected&&selected.id===e.id?'#e3bd72':`rgba(127,171,192,${Math.min(.48,.055+Math.log1p(e.support)*.055)})`;ctx.lineWidth=selected&&selected.id===e.id?2:Math.min(2.1,.38+Math.log1p(e.support)*.34);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}for(const n of visibleNodes){const p=screen(n),r=Math.max(2.2,Math.min(9,2+Math.log1p(n.questionSupport)));ctx.fillStyle=selected&&selected.id===n.id?'#fff':matchesSearch(n)?'#e3bd72':colors[Math.abs((n.community||1)-1)%colors.length];ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill()}if(!labels)return;ctx.fillStyle='#d9dde3';ctx.font='10px ui-monospace';const occupied=[];const candidates=[...visibleNodes].filter(n=>labelIds.has(n.id)||selected&&selected.id===n.id||matchesSearch(n)).sort((a,b)=>(selected&&b.id===selected.id)-(selected&&a.id===selected.id)||matchesSearch(b)-matchesSearch(a)||a.labelRank-b.labelRank);for(const n of candidates){const p=screen(n),r=Math.max(2.2,Math.min(9,2+Math.log1p(n.questionSupport))),text=n.displayLabel.slice(0,42),w=ctx.measureText(text).width,x=p.x+r+3,y=p.y+3,box={x:x-1,y:y-10,w:w+2,h:13};if(x>canvas.clientWidth||y<0||y>canvas.clientHeight||box.x+box.w<0)continue;const collides=occupied.some(o=>box.x<o.x+o.w&&box.x+box.w>o.x&&box.y<o.y+o.h&&box.y+box.h>o.y);if(collides&&(!selected||selected.id!==n.id)&&!matchesSearch(n))continue;ctx.fillText(text,x,y);occupied.push(box)}}
function fit(){if(!visibleNodes.length)return;const xs=visibleNodes.map(n=>n.x),ys=visibleNodes.map(n=>n.y),w=Math.max(...xs)-Math.min(...xs)||1,h=Math.max(...ys)-Math.min(...ys)||1;view.k=Math.max(.08,Math.min(4,Math.min((canvas.clientWidth-50)/(w*54),(canvas.clientHeight-50)/(h*54))));view.x=-(Math.max(...xs)+Math.min(...xs))/2;view.y=-(Math.max(...ys)+Math.min(...ys))/2;draw()}
function nearest(x,y){let best=null,dist=14;for(const n of visibleNodes){const p=screen(n),d=Math.hypot(x-p.x,y-p.y);if(d<dist){dist=d;best=n}}if(best)return best;let edge=null,edgeDist=7;for(const e of visibleEdges){const a=screen(nodes.get(e.source)),b=screen(nodes.get(e.target)),vx=b.x-a.x,vy=b.y-a.y,len=vx*vx+vy*vy,t=len?Math.max(0,Math.min(1,((x-a.x)*vx+(y-a.y)*vy)/len)):0,d=Math.hypot(x-(a.x+t*vx),y-(a.y+t*vy));if(d<edgeDist){edgeDist=d;edge=e}}return edge}
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function pills(xs){return(xs||[]).map(x=>`<span class="pill">${esc(x)}</span>`).join('')}
function show(item){selected=item;if(item)detail.classList.add('open');else detail.classList.remove('open');if(!item){detail.innerHTML='<div class="empty">Select a concept or association to inspect aggregate metrics. Raw question evidence is not included in this public build.</div>';draw();return}if(Object.prototype.hasOwnProperty.call(item,'target')){const a=nodes.get(item.source),b=nodes.get(item.target);detail.innerHTML=`<button id="detailClose">close</button><div class="eyebrow">question-level association</div><h2>${esc(a.displayLabel)} ↔ ${esc(b.displayLabel)}</h2><div class="kv"><b>distinct questions</b><span>${item.support}</span><b>NPMI · lift · Jaccard</b><span>${item.npmi.toFixed(3)} · ${item.lift.toFixed(2)} · ${item.jaccard.toFixed(3)}</span><b>aggregate robustness</b><span>${item.sourceCount} independent set(s); max share ${(item.maxSourceShare*100).toFixed(1)}%; minimum leave-one-set-out ${item.minLoso}</span></div><h3>Explicit specialties</h3>${pills(Object.keys(item.specialties||{}))}<p class="interpretation">${esc(D.interpretation)}</p><p class="privacy">Supporting questions, named sources, and evidence spans are intentionally unavailable in this public build.</p>`}else{detail.innerHTML=`<button id="detailClose">close</button><div class="eyebrow">concept identity</div><h2>${esc(item.displayLabel)}</h2><p>${esc(item.namespace)}:${esc(item.code)}</p>${pills(item.lanes)}${pills(item.families)}${pills(item.types)}<div class="kv"><b>question support</b><span>${item.questionSupport}</span><b>degree · weighted</b><span>${item.degree} · ${item.weightedDegree}</span><b>PageRank</b><span>${item.pagerank.toExponential(3)}</span><b>community</b><span>${item.community}</span></div><h3>Context aggregates</h3>${pills(item.assertions)}${pills(item.polarities)}${pills(item.temporalities)}<p class="interpretation">Identity is exactly (external_namespace, external_code). Namespace qualifiers appear only when canonical labels collide.</p><p class="privacy">Question incidences and raw span evidence are intentionally unavailable in this public build.</p>`}$('#detailClose')?.addEventListener('click',()=>detail.classList.remove('open'));draw()}
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};moved=false});canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>3)moved=true;view.x=drag.vx+dx/(view.k*54);view.y=drag.vy+dy/(view.k*54);draw()});canvas.addEventListener('pointerup',e=>{if(!moved){const r=canvas.getBoundingClientRect();show(nearest(e.clientX-r.left,e.clientY-r.top))}drag=null});canvas.addEventListener('pointercancel',()=>{drag=null;moved=false});canvas.addEventListener('wheel',e=>{e.preventDefault();view.k=Math.max(.05,Math.min(12,view.k*Math.exp(-e.deltaY*.001)));draw()},{passive:false});
['#threshold','#specialty','#namespace','#lane','#family','#type','#assertion','#polarity','#temporality'].forEach(id=>$(id).addEventListener('change',apply));$('#search').addEventListener('input',apply);$('#fit').onclick=fit;$('#labels').onclick=()=>{labels=!labels;$('#labels').textContent=labels?'labels on':'labels off';draw()};$('#filtersBtn').onclick=()=>$('#filters').classList.toggle('open');window.addEventListener('resize',resize);apply();resize();fit();show(null);window.__CLINICAL_NETWORK_READY__=true})();
</script></body></html>'''


def write_text(path: Path, value: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        handle.write(value)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="Kekki repository root")
    parser.add_argument("--corpus-db", type=Path, required=True, help="sealed v7.5.1 corpus SQLite")
    parser.add_argument("--network-db", type=Path, required=True, help="sealed v7.5.1 network SQLite")
    parser.add_argument("--metadata-db", type=Path, required=True, help="sealed v7.4 network DB with source/specialty metadata")
    parser.add_argument("--internal-network-gzip", type=Path, required=True, help="validated private v7.5.1 support>=8 HTML gzip")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.resolve()
    corpus_path = args.corpus_db.resolve()
    network_path = args.network_db.resolve()
    metadata_path = args.metadata_db.resolve()
    private_gzip = args.internal_network_gzip.resolve()
    expected_hashes = {
        corpus_path: CORPUS_SHA256,
        network_path: NETWORK_DB_SHA256,
        metadata_path: METADATA_DB_SHA256,
        private_gzip: PRIVATE_GZIP_SHA256,
    }
    for path, expected in expected_hashes.items():
        if not path.is_file() or sha256_file(path) != expected:
            raise SystemExit(f"sealed input hash mismatch: {path}")

    private = load_private_payload(private_gzip)
    concepts, concept_questions, question_metadata, contexts = load_inputs(
        corpus_path, network_path, metadata_path, private
    )
    public = build_public_payload(private, concepts, concept_questions, question_metadata, contexts)
    network_output = repo / "public" / "networks" / "7.5.1" / "index.html"
    manifest_output = repo / "public" / "releases" / "v7.5.1-public.json"
    write_text(network_output, NETWORK_TEMPLATE.replace("__NETWORK_JSON__", json_for_script(public)))

    duplicate_groups = collections.Counter(node["label"].casefold() for node in public["nodes"])
    qualified_nodes = sum(count for count in duplicate_groups.values() if count > 1)
    manifest = {
        "schema_version": 2,
        "release": PUBLIC_RELEASE,
        "release_date": "2026-07-22",
        "parents": public["parent"],
        "network": public["cohort"],
        "label_quality": {
            "canonical_duplicate_groups": sum(count > 1 for count in duplicate_groups.values()),
            "namespace_qualified_nodes": qualified_nodes,
            "unique_display_labels": len({node["displayLabel"].casefold() for node in public["nodes"]}),
            "ranked_label_nodes": len({node["labelRank"] for node in public["nodes"]}),
            "opaque_placeholder_labels": 0,
        },
        "privacy": public["privacy"],
        "limitation": public["limitation"],
        "historical_rollback": {
            "release": V74_PUBLIC_RELEASE,
            "network_path": "public/networks/7.4/index.html",
            "network_sha256": V74_PUBLIC_NETWORK_SHA256,
            "git_commit": "5afd6cf24280db7d875b7a62cd3f8c95e3ffba00",
        },
        "assets": [{
            "path": "public/networks/7.5.1/index.html",
            "sha256": sha256_file(network_output),
            "bytes": network_output.stat().st_size,
        }],
    }
    write_text(manifest_output, json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True) + "\n")
    print(json.dumps({
        "release": PUBLIC_RELEASE,
        "network": {
            "nodes": len(public["nodes"]),
            "edges": len(public["edges"]),
            "default_nodes": DEFAULT_NODE_COUNT,
            "default_edges": DEFAULT_EDGE_COUNT,
            "sha256": sha256_file(network_output),
        },
        "manifest": str(manifest_output),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
