#!/usr/bin/env python3
"""Build the public-safe v7.4 network and ten-question parse comparison.

The sealed v7.4 database is read only at build time.  No database, corpus-wide
question payload, provenance record, or source label is copied into the public
site.  The sole raw-text exception is the existing, explicitly allowlisted set
of ten MedQA examples already published by Kekki's legacy reviewer.
"""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import re
import sqlite3
from pathlib import Path
from typing import Any


PUBLIC_RELEASE = "clinical_network_v74_nonlab_public_r1"
PRIVATE_RELEASE = "clinical_network_v74_nonlab_preview_r1"
PARENT_SHA256 = "4c5acfd4f86e9af1b4702cbeb403ac680d8830e7c86e34c06c370436dcbac521"
PRIVATE_GZIP_SHA256 = "dcb9f6a211434028a3c2d25c835367b86a93fc48a00f087b2a0a08b98ced96fe"
PRIVATE_NETWORK_DB_SHA256 = "7faccbd5231015194b9835041fce4fbe211a3bfd2324cfe092c415468ee4b7d0"
CANONICAL_GRAPH_SHA256 = "213f59e74d49e3de47c1e8fa49d3f5a666fadedc2348cb82269f224d25598677"
LEGACY_REVIEWER_SHA256 = "e5f3b2a55e5cdb9da54e5c8977231c05aa3c4928d896a15e3900ea3521318d77"
LEGACY_PARSER_RUN = "run_1fe8ea80a48746763317_v43_full_dryrun"
LEGACY_PARSER_CHECKSUM = "c77806abf1b108d2ae76bfd8b3a028949b1ab635edc44c5e745e6fb133fb8a2f"
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
EXPECTED_LEGACY_COUNTS = [71, 63, 62, 62, 62, 62, 60, 60, 58, 56]
EXPECTED_V74_COUNTS = [7, 4, 0, 9, 5, 15, 15, 6, 12, 8]

NODE_KEYS = (
    "id", "label", "namespace", "code", "community", "degree",
    "weightedDegree", "pagerank", "questionSupport", "families", "types",
    "lanes", "specialties", "assertions", "polarities", "temporalities",
    "x", "y",
)
EDGE_KEYS = (
    "id", "source", "target", "support", "npmi", "lift", "jaccard",
    "specialties", "sourceCount", "maxSourceShare", "minLoso", "crossSource",
)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def normalized_text_bytes(path: Path) -> bytes:
    """Return Git-canonical LF bytes for preserved text assets on Windows."""
    return path.read_bytes().replace(b"\r\n", b"\n")


def canonical_sha(value: Any) -> str:
    raw = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return sha256_bytes(raw)


def json_for_script(value: Any) -> str:
    # Escaping '<' prevents an embedded source string from terminating a JSON
    # script element while JSON.parse still restores the exact original text.
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).replace("<", "\\u003c")


def extract_script_json(document: str, script_id: str) -> Any:
    match = re.search(
        rf"<script\b[^>]*\bid=[\"']{re.escape(script_id)}[\"'][^>]*>(.*?)</script\s*>",
        document,
        re.IGNORECASE | re.DOTALL,
    )
    if not match:
        raise ValueError(f"missing JSON script #{script_id}")
    # application/json script bodies are raw text, not HTML attribute values;
    # entity-unescaping can corrupt literal clinical strings such as &quot;.
    return json.loads(match.group(1).strip())


def extract_assignment_json(document: str, variable: str) -> Any:
    match = re.search(rf"(?:window\.)?{re.escape(variable)}\s*=\s*", document)
    if not match:
        raise ValueError(f"missing assignment {variable}")
    start = next((i for i in range(match.end(), len(document)) if document[i] in "[{"), -1)
    if start < 0:
        raise ValueError(f"missing JSON value for {variable}")
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
    raise ValueError(f"unterminated JSON value for {variable}")


def load_legacy_reviewer(path: Path) -> dict[str, Any]:
    document = path.read_text(encoding="utf-8")
    try:
        value = extract_script_json(document, "legacy-data")
    except ValueError:
        value = extract_assignment_json(document, "REVIEW_DATA")
    if not isinstance(value, dict):
        raise ValueError("legacy reviewer payload is not an object")
    return value


def load_private_network(path: Path) -> tuple[str, dict[str, Any]]:
    document = gzip.decompress(path.read_bytes()).decode("utf-8")
    value = extract_script_json(document, "network-data")
    if not isinstance(value, dict):
        raise ValueError("private network payload is not an object")
    return document, value


def public_node(node: dict[str, Any], sensitive_exact: set[str]) -> dict[str, Any]:
    projected = {key: node[key] for key in NODE_KEYS}
    namespace = str(projected["namespace"])
    label = str(projected["label"])
    code = str(projected["code"])
    must_redact = namespace.upper().startswith("LOCAL") or label.strip().casefold() in sensitive_exact
    if must_redact:
        token = hashlib.sha256(f"{namespace}\0{code}".encode("utf-8")).hexdigest()
        projected["namespace"] = "LOCAL_REDACTED"
        projected["code"] = f"atomic-{token[:12]}"
        projected["label"] = f"Local atomic concept {token[:8]}"
    return projected


def build_public_network(private: dict[str, Any]) -> dict[str, Any]:
    if private.get("release") != PRIVATE_RELEASE:
        raise ValueError(f"unexpected private release: {private.get('release')!r}")
    raw_questions = private.get("questions")
    if not isinstance(raw_questions, dict):
        raise ValueError("private payload does not contain its expected question dictionary")
    sensitive_exact: set[str] = set()
    for question in raw_questions.values():
        if not isinstance(question, dict):
            continue
        for key in ("stem", "answer"):
            value = question.get(key)
            if isinstance(value, str) and value.strip():
                sensitive_exact.add(value.strip().casefold())
    nodes = [public_node(node, sensitive_exact) for node in private["nodes"]]
    edges = [{key: edge[key] for key in EDGE_KEYS} for edge in private["edges"]]
    return {
        "algorithms": private["algorithms"],
        "cohort": private["cohort"],
        "edges": edges,
        "interpretation": private["interpretation"],
        "label": "v7.4 non-laboratory public preview",
        "limitation": private["limitation"],
        "nodes": nodes,
        "parent": {
            "canonical_graph_sha256": CANONICAL_GRAPH_SHA256,
            "database_sha256": PARENT_SHA256,
            "private_release": PRIVATE_RELEASE,
        },
        "privacy": {
            "raw_question_text_included": False,
            "answer_keys_included": False,
            "question_or_fact_provenance_included": False,
            "source_labels_included": False,
            "source_selector_enabled": False,
        },
        "release": PUBLIC_RELEASE,
        "thresholds": private["thresholds"],
    }


def load_v74_facts(database: Path, legacy: dict[str, Any]) -> tuple[list[dict[str, Any]], int]:
    questions = legacy.get("questions")
    if not isinstance(questions, list):
        raise ValueError("legacy payload has no questions array")
    ids = [question.get("id") for question in questions]
    if ids != QUESTION_IDS:
        raise ValueError(f"legacy reviewer question order changed: {ids!r}")
    legacy_counts = [len(question.get("mentions", [])) for question in questions]
    if legacy_counts != EXPECTED_LEGACY_COUNTS:
        raise ValueError(f"legacy mention counts changed: {legacy_counts!r}")
    if sum(legacy_counts) != 616:
        raise ValueError("legacy mention total is not 616")
    if any(question.get("source") != "MedQA" for question in questions):
        raise ValueError("the public comparison allowlist is no longer MedQA-only")

    by_id = {question["id"]: question for question in questions}
    location_text: dict[str, dict[str, str]] = {}
    for question in questions:
        mapping: dict[str, str] = {}
        for section in question.get("sections", []):
            mapping[section["section_id"]] = section["text"]
        for choice in question.get("choices", []):
            mapping[choice["choice_id"]] = choice["choice_text"]
        location_text[question["id"]] = mapping

    connection = sqlite3.connect(f"file:{database.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    try:
        integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
        if integrity != "ok":
            raise ValueError(f"parent database integrity check failed: {integrity}")
        placeholders = ",".join("?" for _ in QUESTION_IDS)
        scope_rows = connection.execute(
            f"""
            SELECT question_id, canonical_question_id, dedup_disposition,
                   scope_status, analysis_included, answer_key_complete,
                   question_hash, raw_stem_sha256
            FROM analysis_pure_clinical_questions_v74
            WHERE question_id IN ({placeholders})
            """,
            QUESTION_IDS,
        ).fetchall()
        scope = {row["question_id"]: dict(row) for row in scope_rows}
        if set(scope) != set(QUESTION_IDS):
            raise ValueError("not every reviewer question is present in the analysis-pure interface")
        for question_id in QUESTION_IDS:
            row = scope[question_id]
            if not (
                row["canonical_question_id"] == question_id
                and row["dedup_disposition"] == "unique"
                and row["scope_status"] == "active"
                and row["analysis_included"] == 1
                and row["answer_key_complete"] == 1
            ):
                raise ValueError(f"reviewer question is outside canonical analysis scope: {question_id}")
        rows = connection.execute(
            f"""
            SELECT f.node_id, f.question_id, f.lane_role, f.node_kind,
                   f.entity_family, f.entity_type, f.canonical_name,
                   f.normalized_surface, f.start_char, f.end_char,
                   f.raw_surface, f.assertion, f.polarity, f.certainty,
                   f.temporality, f.experiencer, f.conditionality,
                   f.external_namespace, f.external_code, f.external_label,
                   f.terminology_version, c.source_id, c.container_kind,
                   c.section_kind, c.choice_label, c.raw_text
            FROM analysis_pure_clinical_facts_v74 AS f
            JOIN clinical_text_container_v73 AS c ON c.container_id = f.container_id
            WHERE f.question_id IN ({placeholders})
            ORDER BY f.question_id, c.ordinal, f.start_char, f.end_char, f.node_id
            """,
            QUESTION_IDS,
        ).fetchall()
    finally:
        connection.close()

    facts: dict[str, list[dict[str, Any]]] = {question_id: [] for question_id in QUESTION_IDS}
    for row in rows:
        record = dict(row)
        question_id = record.pop("question_id")
        raw_text = record.pop("raw_text")
        source_id = record["source_id"]
        if source_id not in location_text[question_id]:
            raise ValueError(f"v7.4 fact maps outside the established reviewer text: {source_id}")
        displayed_text = location_text[question_id][source_id]
        if displayed_text != raw_text:
            raise ValueError(f"reviewer/container text mismatch for {source_id}")
        start = int(record["start_char"])
        end = int(record["end_char"])
        if displayed_text[start:end] != record["raw_surface"]:
            raise ValueError(f"v7.4 fact span mismatch for {record['node_id']}")
        record["fact_ref"] = f"v74-{len(facts[question_id]) + 1:03d}"
        record.pop("node_id")
        facts[question_id].append(record)

    counts = [len(facts[question_id]) for question_id in QUESTION_IDS]
    if counts != EXPECTED_V74_COUNTS:
        raise ValueError(f"v7.4 fact counts changed: {counts!r}")

    output: list[dict[str, Any]] = []
    for index, question_id in enumerate(QUESTION_IDS):
        legacy_question = by_id[question_id]
        output.append({
            "id": question_id,
            "source": legacy_question["source"],
            "target": legacy_question.get("target"),
            "target_confidence": legacy_question.get("target_confidence"),
            "correct_label": legacy_question.get("correct_label"),
            "correct_answer": legacy_question.get("correct_answer"),
            "sections": legacy_question.get("sections", []),
            "choices": legacy_question.get("choices", []),
            "legacy": {
                "mention_count": len(legacy_question.get("mentions", [])),
                "mentions": legacy_question.get("mentions", []),
            },
            "v74": {
                "accepted_fact_count": len(facts[question_id]),
                "facts": facts[question_id],
            },
            "question_hash": scope[question_id]["question_hash"],
            "raw_stem_sha256": scope[question_id]["raw_stem_sha256"],
            "sample": f"Q{index + 1:02d}",
        })

    distinct_incidences = {
        (question["id"], fact["external_namespace"], fact["external_code"])
        for question in output for fact in question["v74"]["facts"]
    }
    return output, len(distinct_incidences)


def build_comparison(legacy: dict[str, Any], database: Path) -> dict[str, Any]:
    questions, incidence_count = load_v74_facts(database, legacy)
    return {
        "legacy_parser": {
            "label": "Legacy v4.3 parser mentions",
            "mention_count": 616,
            "parser": "im_parser_v4.3_precision_first",
            "run": LEGACY_PARSER_RUN,
            "code_checksum": LEGACY_PARSER_CHECKSUM,
        },
        "release": "kekki_medqa_parse_comparison_v74_r1",
        "type_counts": legacy.get("type_counts", {}),
        "questions": questions,
        "v74_parser": {
            "accepted_fact_count": 81,
            "distinct_question_concept_incidence_count": incidence_count,
            "facts_on_question_count": sum(1 for question in questions if question["v74"]["accepted_fact_count"]),
            "label": "v7.4 promoted non-laboratory facts",
            "parent_database_sha256": PARENT_SHA256,
            "release": PRIVATE_RELEASE,
        },
        "privacy": {
            "raw_text_scope": "exactly ten pre-existing public MedQA examples",
            "additional_corpus_questions_included": False,
        },
    }


NETWORK_TEMPLATE = r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Clinical Network 7.4 · Kekki</title><meta name="description" content="Public aggregate view of the v7.4 non-laboratory clinical concept network.">
<script defer src="/_vercel/insights/script.js"></script>
<style>
:root{color-scheme:dark;--bg:#080a0c;--panel:#0d1013;--raised:#11151a;--line:#252b31;--text:#eceeea;--muted:#8c949b;--accent:#a7c8b8;--warn:#e3bd72}*{box-sizing:border-box}html,body{margin:0;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font:14px/1.45 ui-monospace,SFMono-Regular,Consolas,monospace}button,input,select{font:inherit;color:inherit;background:#14181d;border:1px solid #30363e;border-radius:2px;padding:7px 9px}button{cursor:pointer}button:hover,button:focus-visible{border-color:var(--accent);outline:none}a{color:inherit}.app{height:100%;display:grid;grid-template-rows:auto auto 1fr}.notice{display:grid;grid-template-columns:auto 1fr;gap:14px;background:#17150f;color:#e8cf95;border-bottom:1px solid #494027;padding:8px 13px;font-size:11px}.notice b{color:var(--warn);text-transform:uppercase;letter-spacing:.07em}.bar{display:flex;gap:8px;align-items:center;padding:9px 12px;background:#0b0e11;border-bottom:1px solid var(--line);white-space:nowrap;overflow-x:auto}.back{text-decoration:none;color:var(--muted);margin-right:4px}.back:hover{color:var(--text)}.title{font-weight:700;margin-right:auto}.title small{color:var(--muted);font-weight:400}.workspace{position:relative;min-height:0;display:grid;grid-template-columns:224px 1fr 332px}.filters,.detail{background:var(--panel);padding:12px;overflow:auto}.filters{border-right:1px solid var(--line)}.detail{border-left:1px solid var(--line)}.field{margin:0 0 12px}.field label{display:block;color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}.field input,.field select{width:100%}.stage{position:relative;min-width:0;min-height:0;background:radial-gradient(circle at center,#10151a 0,#080a0c 70%)}canvas{width:100%;height:100%;display:block;touch-action:none}.stats{position:absolute;left:10px;bottom:10px;background:#0b0e11e8;border:1px solid var(--line);padding:7px 9px;color:var(--muted);font-size:11px;pointer-events:none}.muted{color:var(--muted)}.eyebrow{color:var(--accent);text-transform:uppercase;letter-spacing:.08em;font-size:10px}.detail h2{font:650 18px/1.25 ui-sans-serif,system-ui;margin:5px 0 9px}.detail h3{font-size:10px;text-transform:uppercase;color:var(--muted);letter-spacing:.07em;margin:18px 0 6px}.pill{display:inline-block;padding:2px 6px;border:1px solid #38404b;border-radius:99px;margin:2px 3px 2px 0;font-size:10px}.kv{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:11px;margin-top:12px}.kv b{color:var(--muted);font-weight:400}.empty{margin-top:28px;color:var(--muted)}.interpretation,.privacy{font-size:10px;color:var(--muted);padding-top:10px;border-top:1px solid var(--line);margin-top:16px}.privacy{color:#b7c5be}.filterCount{color:var(--accent);font-size:10px;margin:4px 0 14px}#detailClose{display:none}@media(max-width:820px){.notice{grid-template-columns:1fr;gap:2px}.workspace{grid-template-columns:1fr}.filters{position:absolute;z-index:4;left:0;top:0;bottom:0;width:min(270px,86vw);transform:translateX(-100%);transition:.15s}.filters.open{transform:none}.detail{position:absolute;z-index:5;left:0;right:0;bottom:0;max-height:62%;border-left:0;border-top:1px solid var(--line);transform:translateY(100%);transition:.15s}.detail.open{transform:none}.stage{grid-row:1;height:100%}#detailClose{display:block;float:right}.title small{display:none}}@media(prefers-reduced-motion:reduce){.filters,.detail{transition:none}}
</style></head><body><div class="app">
<div class="notice"><b>v7.4 non-laboratory preview</b><span>Laboratory/LOINC lane pending until July 26, 2026 at 5:07 PM America/New_York. This is not the final all-lane corpus.</span></div>
<div class="bar"><a class="back" href="/">kekki /</a><button id="filtersBtn">filters</button><span class="title">Clinical network <small>/ public aggregate view</small></span><button id="fit">fit</button><button id="labels">labels on</button></div>
<div class="workspace"><aside class="filters" id="filters">
<div class="field"><label for="search">Search concept</label><input id="search" placeholder="label or terminology code"></div>
<div class="field"><label for="threshold">Minimum distinct-question support · <span id="thresholdValue"></span></label><input id="threshold" type="range" min="1" step="1"></div>
<div class="field"><label for="specialty">Explicit specialty</label><select id="specialty"><option value="">all specialties</option></select></div>
<div class="field"><label for="namespace">Terminology namespace</label><select id="namespace"><option value="">all namespaces</option></select></div>
<div class="field"><label for="lane">Lane</label><select id="lane"><option value="">all lanes</option></select></div>
<div class="field"><label for="family">Entity family</label><select id="family"><option value="">all families</option></select></div>
<div class="field"><label for="type">Entity type</label><select id="type"><option value="">all entity types</option></select></div>
<div class="field"><label for="assertion">Assertion</label><select id="assertion"><option value="">all assertions</option></select></div>
<div class="field"><label for="polarity">Polarity</label><select id="polarity"><option value="">all polarities</option></select></div>
<div class="field"><label for="temporality">Temporality</label><select id="temporality"><option value="">all temporalities</option></select></div>
<p class="interpretation">Edges are undirected question-level co-occurrence associations counted by distinct canonical question. They do not imply causation, indication, contraindication, diagnosis, or ontology.</p>
<p class="privacy">Public aggregate build. Raw questions, answer keys, source labels, and question/fact evidence are intentionally omitted.</p>
</aside><main class="stage"><canvas id="canvas" aria-label="Interactive clinical association network"></canvas><div class="stats" id="stats"></div></main><aside class="detail" id="detail"></aside></div></div>
<script id="network-data" type="application/json">__NETWORK_JSON__</script>
<script>
(()=>{'use strict';const D=JSON.parse(document.getElementById('network-data').textContent),$=s=>document.querySelector(s),canvas=$('#canvas'),ctx=canvas.getContext('2d'),detail=$('#detail');const nodes=new Map(D.nodes.map(n=>[n.id,n])),edges=D.edges;let view={x:0,y:0,k:1},drag=null,moved=false,selected=null,visibleNodes=[],visibleEdges=[],labels=true;const colors=['#a7c8b8','#7fabc0','#c0a7c8','#c8ba88','#b58d8d','#9ab58b','#89afb4','#aa9fbe','#ba987d','#8fb5a1'];
function options(id,vals){const el=$(id);[...new Set(vals.filter(Boolean))].sort().forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;el.append(o)})}
options('#specialty',D.edges.flatMap(e=>Object.keys(e.specialties||{})));options('#namespace',D.nodes.map(n=>n.namespace));options('#lane',D.nodes.flatMap(n=>n.lanes));options('#family',D.nodes.flatMap(n=>n.families));options('#type',D.nodes.flatMap(n=>n.types));options('#assertion',D.nodes.flatMap(n=>n.assertions));options('#polarity',D.nodes.flatMap(n=>n.polarities));options('#temporality',D.nodes.flatMap(n=>n.temporalities));
$('#threshold').value=D.cohort.default_support;$('#threshold').max=Math.max(...D.thresholds.map(x=>x.threshold));$('#thresholdValue').textContent=$('#threshold').value;
function resize(){const r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;canvas.width=Math.max(1,r.width*d);canvas.height=Math.max(1,r.height*d);ctx.setTransform(d,0,0,d,0,0);draw()}
function metaOk(n){const tests=[['#namespace','namespace'],['#lane','lanes'],['#family','families'],['#type','types'],['#assertion','assertions'],['#polarity','polarities'],['#temporality','temporalities']];return tests.every(([id,key])=>{const value=$(id).value;if(!value)return true;return Array.isArray(n[key])?n[key].includes(value):n[key]===value})}
function searchOk(n,q){return!q||(`${n.label} ${n.namespace}:${n.code}`).toLowerCase().includes(q)}
function apply(){const t=+$('#threshold').value,sp=$('#specialty').value,q=$('#search').value.trim().toLowerCase();$('#thresholdValue').textContent=t;visibleEdges=edges.filter(e=>{const a=nodes.get(e.source),b=nodes.get(e.target);return e.support>=t&&(!sp||(e.specialties||{})[sp])&&metaOk(a)&&metaOk(b)&&(searchOk(a,q)||searchOk(b,q))});const ids=new Set(visibleEdges.flatMap(e=>[e.source,e.target]));visibleNodes=[...ids].map(id=>nodes.get(id));$('#stats').textContent=`${visibleNodes.length.toLocaleString()} concepts · ${visibleEdges.length.toLocaleString()} associations · support ≥ ${t}`;draw()}
function screen(n){return{x:canvas.clientWidth/2+(n.x+view.x)*view.k*54,y:canvas.clientHeight/2+(n.y+view.y)*view.k*54}}
function draw(){if(!ctx)return;ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);ctx.lineCap='round';for(const e of visibleEdges){const a=screen(nodes.get(e.source)),b=screen(nodes.get(e.target));ctx.strokeStyle=selected&&selected.id===e.id?'#e3bd72':`rgba(127,171,192,${Math.min(.48,.055+Math.log1p(e.support)*.055)})`;ctx.lineWidth=selected&&selected.id===e.id?2:Math.min(2.1,.38+Math.log1p(e.support)*.34);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}for(const n of visibleNodes){const p=screen(n),r=Math.max(2.2,Math.min(9,2+Math.log1p(n.questionSupport)));ctx.fillStyle=selected&&selected.id===n.id?'#fff':colors[Math.abs((n.community||1)-1)%colors.length];ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();if(labels&&view.k>.8&&(n.questionSupport>=Math.max(3,+$('#threshold').value)||selected&&selected.id===n.id)){ctx.fillStyle='#d9dde3';ctx.font='10px ui-monospace';ctx.fillText(n.label.slice(0,34),p.x+r+3,p.y+3)}}}
function fit(){if(!visibleNodes.length)return;const xs=visibleNodes.map(n=>n.x),ys=visibleNodes.map(n=>n.y),w=Math.max(...xs)-Math.min(...xs)||1,h=Math.max(...ys)-Math.min(...ys)||1;view.k=Math.max(.08,Math.min(4,Math.min((canvas.clientWidth-50)/(w*54),(canvas.clientHeight-50)/(h*54))));view.x=-(Math.max(...xs)+Math.min(...xs))/2;view.y=-(Math.max(...ys)+Math.min(...ys))/2;draw()}
function nearest(x,y){let best=null,dist=14;for(const n of visibleNodes){const p=screen(n),d=Math.hypot(x-p.x,y-p.y);if(d<dist){dist=d;best=n}}if(best)return best;let edge=null,edgeDist=7;for(const e of visibleEdges){const a=screen(nodes.get(e.source)),b=screen(nodes.get(e.target)),vx=b.x-a.x,vy=b.y-a.y,len=vx*vx+vy*vy,t=len?Math.max(0,Math.min(1,((x-a.x)*vx+(y-a.y)*vy)/len)):0,d=Math.hypot(x-(a.x+t*vx),y-(a.y+t*vy));if(d<edgeDist){edgeDist=d;edge=e}}return edge}
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function pills(xs){return(xs||[]).map(x=>`<span class="pill">${esc(x)}</span>`).join('')}
function show(item){selected=item;detail.classList.add('open');if(!item){detail.innerHTML='<div class="empty">Select a concept or association to inspect aggregate metrics. Raw question evidence is not included in this public build.</div>';draw();return}if(Object.prototype.hasOwnProperty.call(item,'target')){const a=nodes.get(item.source),b=nodes.get(item.target);detail.innerHTML=`<button id="detailClose">close</button><div class="eyebrow">question-level association</div><h2>${esc(a.label)} ↔ ${esc(b.label)}</h2><div class="kv"><b>distinct questions</b><span>${item.support}</span><b>NPMI · lift · Jaccard</b><span>${item.npmi.toFixed(3)} · ${item.lift.toFixed(2)} · ${item.jaccard.toFixed(3)}</span><b>aggregate robustness</b><span>${item.sourceCount} independent set(s); max share ${(item.maxSourceShare*100).toFixed(1)}%; minimum leave-one-set-out ${item.minLoso}</span></div><h3>Explicit specialties</h3>${pills(Object.keys(item.specialties||{}))}<p class="interpretation">${esc(D.interpretation)}</p><p class="privacy">Supporting questions and evidence spans are intentionally unavailable in this public build.</p>`}else{detail.innerHTML=`<button id="detailClose">close</button><div class="eyebrow">concept identity</div><h2>${esc(item.label)}</h2><p>${esc(item.namespace)}:${esc(item.code)}</p>${pills(item.lanes)}${pills(item.families)}${pills(item.types)}<div class="kv"><b>question support</b><span>${item.questionSupport}</span><b>degree · weighted</b><span>${item.degree} · ${item.weightedDegree}</span><b>PageRank</b><span>${item.pagerank.toExponential(3)}</span><b>community</b><span>${item.community}</span></div><h3>Context aggregates</h3>${pills(item.assertions)}${pills(item.polarities)}${pills(item.temporalities)}<p class="interpretation">Identity is exactly (external_namespace, external_code). Labels are display metadata.</p><p class="privacy">Question incidences and raw span evidence are intentionally unavailable in this public build.</p>`}$('#detailClose')?.addEventListener('click',()=>detail.classList.remove('open'));draw()}
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};moved=false});canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>3)moved=true;view.x=drag.vx+dx/(view.k*54);view.y=drag.vy+dy/(view.k*54);draw()});canvas.addEventListener('pointerup',e=>{if(!moved){const r=canvas.getBoundingClientRect();show(nearest(e.clientX-r.left,e.clientY-r.top))}drag=null});canvas.addEventListener('pointercancel',()=>{drag=null;moved=false});canvas.addEventListener('wheel',e=>{e.preventDefault();view.k=Math.max(.05,Math.min(12,view.k*Math.exp(-e.deltaY*.001)));draw()},{passive:false});
['#threshold','#specialty','#namespace','#lane','#family','#type','#assertion','#polarity','#temporality'].forEach(id=>$(id).addEventListener('change',apply));$('#search').addEventListener('input',apply);$('#fit').onclick=fit;$('#labels').onclick=()=>{labels=!labels;$('#labels').textContent=labels?'labels on':'labels off';draw()};$('#filtersBtn').onclick=()=>$('#filters').classList.toggle('open');window.addEventListener('resize',resize);apply();resize();fit();show(null);window.__CLINICAL_NETWORK_READY__=true})();
</script></body></html>'''


COMPARISON_TEMPLATE = r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>MedQA parse comparison · Kekki</title><meta name="description" content="Side-by-side comparison of legacy and v7.4 clinical entity parsing on ten public MedQA examples.">
<script defer src="/_vercel/insights/script.js"></script>
<style>
:root{color-scheme:dark;--bg:#080a0c;--panel:#0d1013;--raised:#11151a;--line:#252b31;--text:#eceeea;--muted:#8c949b;--old:#d4ad73;--new:#9fc8b6;--danger:#d68d8d}*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:var(--bg);color:var(--text);font:14px/1.55 ui-sans-serif,system-ui,-apple-system,sans-serif}button,select,textarea{font:inherit;color:inherit;background:#14181d;border:1px solid #30363e;border-radius:2px}button,select{padding:7px 9px}button{cursor:pointer}button:hover,button:focus-visible{border-color:var(--new);outline:none}a{color:inherit}.top{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:9px;min-height:54px;padding:8px 14px;background:#080a0cf2;border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.brand{font:650 13px/1 ui-monospace,monospace;margin-right:auto}.back{text-decoration:none;color:var(--muted);font:12px ui-monospace,monospace}.banner{display:grid;grid-template-columns:auto 1fr;gap:14px;padding:9px 14px;background:#17150f;color:#e6ce99;border-bottom:1px solid #494027;font:11px/1.45 ui-monospace,monospace}.banner b{text-transform:uppercase;letter-spacing:.06em}.layout{display:grid;grid-template-columns:214px minmax(0,1fr) 300px;min-height:calc(100vh - 91px)}.nav,.inspector{position:sticky;top:91px;height:calc(100vh - 91px);overflow:auto;background:var(--panel);padding:12px}.nav{border-right:1px solid var(--line)}.inspector{border-left:1px solid var(--line)}.nav h2,.inspector h2{margin:0 0 10px;font:650 11px ui-monospace,monospace;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}.sample{display:grid;grid-template-columns:1fr auto;gap:4px 8px;width:100%;padding:10px 8px;margin:0 0 5px;text-align:left;border-color:transparent;background:transparent}.sample.active{background:var(--raised);border-color:var(--line)}.sample strong{font:650 12px ui-monospace,monospace}.sample span{font:10px ui-monospace,monospace;color:var(--muted)}.sample .delta{grid-row:1/3;grid-column:2;align-self:center;color:var(--new)}.main{min-width:0;padding:clamp(18px,3vw,40px)}.questionHead{display:grid;grid-template-columns:1fr auto;gap:18px;border-bottom:1px solid var(--line);padding-bottom:24px}.eyebrow{color:var(--new);font:10px ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}.questionHead h1{margin:7px 0 6px;font-size:clamp(28px,4vw,54px);font-weight:500;letter-spacing:-.045em;line-height:1}.questionHead p{margin:0;color:var(--muted);max-width:720px}.score{display:grid;grid-template-columns:repeat(2,auto);gap:1px;background:var(--line);align-self:start}.score div{background:var(--panel);padding:10px 13px}.score b{display:block;font:650 22px ui-monospace,monospace}.score span{font:9px ui-monospace,monospace;text-transform:uppercase;color:var(--muted)}.mode{display:flex;gap:5px;margin:18px 0}.mode button.active{border-color:var(--text);background:#20252b}.section{margin:24px 0}.sectionTitle{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 8px;color:var(--muted);font:10px ui-monospace,monospace;text-transform:uppercase;letter-spacing:.07em}.compare{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line)}.parse{min-width:0;background:var(--panel)}.parseHead{display:flex;justify-content:space-between;gap:12px;padding:9px 11px;border-bottom:1px solid var(--line);font:10px ui-monospace,monospace;text-transform:uppercase}.parse.old .parseHead{color:var(--old)}.parse.new .parseHead{color:var(--new)}.text{white-space:pre-wrap;overflow-wrap:anywhere;padding:14px;font-size:13px;line-height:1.72}.text mark{color:inherit;border-radius:2px;padding:1px 0;cursor:pointer}.parse.old mark{background:#7b572f80;box-shadow:inset 0 -1px var(--old)}.parse.new mark{background:#3d675580;box-shadow:inset 0 -1px var(--new)}.text mark:hover,.text mark:focus{outline:1px solid #fff}.choice{margin-top:8px}.choiceLabel{display:inline-flex;width:24px;color:var(--muted);font:11px ui-monospace,monospace}.zero{padding:16px;color:var(--muted);font:11px ui-monospace,monospace;border:1px dashed #38404a}.scope{margin-top:30px;padding:13px;border:1px solid var(--line);color:var(--muted);font:11px ui-monospace,monospace}.kv{display:grid;grid-template-columns:auto 1fr;gap:5px 10px;font-size:11px}.kv b{font-weight:400;color:var(--muted)}.surface{font-size:17px;line-height:1.35;margin:6px 0 15px}.pill{display:inline-block;border:1px solid #38404b;border-radius:99px;padding:2px 6px;margin:2px 3px 2px 0;font:10px ui-monospace,monospace}.empty{color:var(--muted);font-size:12px}.review{margin-top:22px;padding-top:14px;border-top:1px solid var(--line)}.reviewButtons{display:flex;gap:5px;margin:7px 0}.reviewButtons button.active{border-color:var(--new)}.reviewButtons .flag.active{border-color:var(--danger)}textarea{width:100%;min-height:90px;padding:8px;resize:vertical}.saved{min-height:18px;color:var(--new);font:10px ui-monospace,monospace;margin-top:4px}.mobileSelect{display:none}.legacyOnly{color:var(--muted);font:11px ui-monospace,monospace}.view-legacy .parse.new{display:none}.view-legacy .compare{grid-template-columns:1fr}.view-v74 .parse.old{display:none}.view-v74 .compare{grid-template-columns:1fr}@media(max-width:1050px){.layout{grid-template-columns:180px minmax(0,1fr)}.inspector{position:fixed;z-index:25;left:0;right:0;bottom:0;top:auto;height:auto;max-height:54vh;border-left:0;border-top:1px solid var(--line);transform:translateY(100%);transition:.15s}.inspector.open{transform:none}.compare{grid-template-columns:1fr}.parseHead{position:sticky;top:54px;background:var(--panel);z-index:2}}@media(max-width:700px){.top .desktop{display:none}.banner{grid-template-columns:1fr;gap:2px}.layout{display:block}.nav{position:static;height:auto;border-right:0;border-bottom:1px solid var(--line);padding:10px 14px}.nav h2,.sampleList{display:none}.mobileSelect{display:block;width:100%}.main{padding:18px 14px}.questionHead{grid-template-columns:1fr}.score{justify-self:start}.compare{display:block;background:transparent;border:0}.parse{border:1px solid var(--line);margin-bottom:8px}.mode{position:sticky;top:54px;z-index:10;background:var(--bg);padding:8px 0;margin:10px 0}.inspector{max-height:67vh}.legacyOnly{display:none}}@media(prefers-reduced-motion:reduce){.inspector{transition:none}}
</style></head><body>
<header class="top"><a class="back" href="/">kekki /</a><div class="brand">MedQA parse comparison</div><a class="legacyOnly" href="/reviewer">legacy-only reviewer</a><button class="desktop" id="prev">← previous</button><button class="desktop" id="next">next →</button><button id="export">export review</button></header>
<div class="banner"><b>v7.4 non-laboratory preview</b><span>Same ten public MedQA examples, two parse layers. Laboratory/LOINC normalization is pending until July 26, 2026 at 5:07 PM America/New_York.</span></div>
<div class="layout"><nav class="nav"><h2>Ten-sample cohort</h2><select class="mobileSelect" id="mobileSelect" aria-label="Choose sample"></select><div class="sampleList" id="sampleList"></div></nav><main class="main" id="main"></main><aside class="inspector" id="inspector"><h2>Entity detail</h2><div id="detail" class="empty">Select a highlighted span from either parser.</div><div class="review"><h2>Sample review</h2><div class="reviewButtons"><button id="accept">reviewed</button><button class="flag" id="flag">needs follow-up</button></div><textarea id="notes" placeholder="Notes saved in this browser only"></textarea><div class="saved" id="saved"></div></div></aside></div>
<script id="comparison-data" type="application/json">__COMPARISON_JSON__</script>
<script>
(()=>{'use strict';const D=JSON.parse(document.getElementById('comparison-data').textContent),Q=D.questions,$=s=>document.querySelector(s),key='kekki-medqa-parse-comparison-v74-r1';let idx=0,view='compare',selected=null,reviews={};try{reviews=JSON.parse(localStorage.getItem(key)||'{}')}catch{};
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function current(){return Q[idx]}function locateItems(q,location,parser){const all=parser==='legacy'?q.legacy.mentions:q.v74.facts;return all.map((item,index)=>({item,index})).filter(x=>parser==='legacy'?(x.item.section_id||x.item.choice_id)===location:x.item.source_id===location)}
function highlighted(text,items,parser){const valid=items.map(({item,index})=>({item,key:`${parser}-${index}`,start:+item.start_char,end:+item.end_char})).filter(x=>Number.isInteger(x.start)&&Number.isInteger(x.end)&&x.start>=0&&x.end>x.start&&x.end<=text.length);const cuts=[...new Set([0,text.length,...valid.flatMap(x=>[x.start,x.end])])].sort((a,b)=>a-b);let out='';for(let i=0;i<cuts.length-1;i++){const start=cuts[i],end=cuts[i+1],part=esc(text.slice(start,end)),active=valid.filter(x=>x.start<end&&x.end>start);if(active.length)out+=`<mark tabindex="0" data-parser="${parser}" data-keys="${active.map(x=>x.key).join(',')}">${part}</mark>`;else out+=part}return out}
function pane(q,location,text,parser){const items=locateItems(q,location,parser),label=parser==='legacy'?'Legacy v4.3':'v7.4 accepted';return `<article class="parse ${parser==='legacy'?'old':'new'}"><div class="parseHead"><span>${label}</span><span>${items.length} ${parser==='legacy'?'mentions':'facts'}</span></div><div class="text">${highlighted(text,items,parser)}</div></article>`}
function sectionBlock(q,section){return `<section class="section"><h2 class="sectionTitle"><span>${esc(section.section)}</span><span>same source text</span></h2><div class="compare">${pane(q,section.section_id,section.text,'legacy')}${pane(q,section.section_id,section.text,'v74')}</div></section>`}
function choiceBlock(q,choice){return `<section class="section choice"><h2 class="sectionTitle"><span>Choice ${esc(choice.choice_label)}</span><span>${choice.is_correct?'answer key':''}</span></h2><div class="compare">${pane(q,choice.choice_id,choice.choice_text,'legacy')}${pane(q,choice.choice_id,choice.choice_text,'v74')}</div></section>`}
function nav(){const list=$('#sampleList'),select=$('#mobileSelect');list.innerHTML=Q.map((q,i)=>`<button class="sample ${i===idx?'active':''}" data-index="${i}"><strong>${q.sample}</strong><span>${q.legacy.mention_count} legacy · ${q.v74.accepted_fact_count} v7.4</span><span class="delta">${q.v74.accepted_fact_count?q.v74.accepted_fact_count:'—'}</span></button>`).join('');select.innerHTML=Q.map((q,i)=>`<option value="${i}" ${i===idx?'selected':''}>${q.sample} · ${q.legacy.mention_count} / ${q.v74.accepted_fact_count}</option>`).join('');list.querySelectorAll('button').forEach(b=>b.onclick=()=>{idx=+b.dataset.index;selected=null;render()});select.onchange=()=>{idx=+select.value;selected=null;render()}}
function render(){const q=current(),zero=q.v74.accepted_fact_count===0;document.body.className=`view-${view}`;$('#main').innerHTML=`<header class="questionHead"><div><div class="eyebrow">${q.sample} · MedQA public example</div><h1>One question. Two parsers.</h1><p>Legacy extraction is shown beside the promoted analysis-pure v7.4 facts over identical source text.</p></div><div class="score"><div><b>${q.legacy.mention_count}</b><span>legacy mentions</span></div><div><b>${q.v74.accepted_fact_count}</b><span>v7.4 facts</span></div></div></header><div class="mode"><button data-view="compare" class="${view==='compare'?'active':''}">compare</button><button data-view="legacy" class="${view==='legacy'?'active':''}">legacy</button><button data-view="v74" class="${view==='v74'?'active':''}">v7.4</button></div>${zero?'<div class="zero">0 accepted v7.4 facts. This sample has candidate-only rows under the strict analysis-pure contract; nothing is silently promoted.</div>':''}${q.sections.map(s=>sectionBlock(q,s)).join('')}<h2 class="sectionTitle"><span>Answer choices</span><span>${q.choices.length} choices</span></h2>${q.choices.map(c=>choiceBlock(q,c)).join('')}<div class="scope">Counts are not a quality score. The legacy parser covered stems, explanations, objectives, and answers; v7.4 shows promoted non-laboratory facts from a stricter analytical interface. LOINC laboratory normalization remains pending.</div>`;$('#main').querySelectorAll('.mode button').forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});$('#main').querySelectorAll('mark').forEach(mark=>{const open=()=>show(mark.dataset.parser,mark.dataset.keys.split(','));mark.onclick=open;mark.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}});if(!selected){$('#detail').innerHTML='Select a highlighted span from either parser.';$('#inspector').classList.remove('open')}nav();reviewState()}
function itemLookup(parser,keyName){const q=current(),i=+keyName.split('-').pop();return parser==='legacy'?q.legacy.mentions.filter(m=>(m.section_id||m.choice_id)).find((_,n)=>n===i):q.v74.facts.find((_,n)=>n===i)}
function show(parser,keys){const q=current(),all=parser==='legacy'?q.legacy.mentions:q.v74.facts;const indices=keys.map(k=>+k.split('-').pop()),items=indices.map(i=>all[i]).filter(Boolean);selected={parser,items};const cards=items.map(item=>parser==='legacy'?`<div><div class="surface">${esc(item.raw_span)}</div><div class="kv"><b>canonical</b><span>${esc(item.canonical_name)}</span><b>type</b><span>${esc(item.concept_type)}</span><b>section · role</b><span>${esc(item.section)} · ${esc(item.answer_role)}</span><b>context</b><span>${esc(item.assertion)} · ${esc(item.temporality)} · ${esc(item.experiencer)}</span><b>parser rule</b><span>${esc(item.source_parser_rule)}</span><b>confidence</b><span>${esc(item.confidence)}</span></div></div>`:`<div><div class="surface">${esc(item.raw_surface)}</div><div class="kv"><b>canonical</b><span>${esc(item.canonical_name)}</span><b>identity</b><span>${esc(item.external_namespace)}:${esc(item.external_code)}</span><b>lane · family</b><span>${esc(item.lane_role)} · ${esc(item.entity_family)}/${esc(item.entity_type)}</span><b>context</b><span>${esc(item.assertion)} · ${esc(item.polarity)} · ${esc(item.temporality)}</span><b>certainty</b><span>${esc(item.certainty)}</span><b>experiencer</b><span>${esc(item.experiencer)}</span></div></div>`).join('<hr style="border:0;border-top:1px solid var(--line);margin:15px 0">');$('#detail').innerHTML=`<div class="eyebrow">${parser==='legacy'?'legacy parser mention':'v7.4 promoted fact'}${items.length>1?` · ${items.length} overlapping records`:''}</div>${cards}`;$('#inspector').classList.add('open')}
function reviewState(){const q=current(),r=reviews[q.id]||{};$('#accept').classList.toggle('active',r.status==='reviewed');$('#flag').classList.toggle('active',r.status==='follow-up');$('#notes').value=r.notes||''}
function save(status,refresh=true){const q=current(),r=reviews[q.id]||{};if(status)r.status=r.status===status?'':status;r.notes=$('#notes').value;r.updated_at=new Date().toISOString();reviews[q.id]=r;localStorage.setItem(key,JSON.stringify(reviews));$('#saved').textContent='saved locally';setTimeout(()=>$('#saved').textContent='',900);if(refresh)reviewState()}
$('#prev').onclick=()=>{idx=(idx-1+Q.length)%Q.length;selected=null;render();scrollTo(0,0)};$('#next').onclick=()=>{idx=(idx+1)%Q.length;selected=null;render();scrollTo(0,0)};$('#accept').onclick=()=>save('reviewed');$('#flag').onclick=()=>save('follow-up');$('#notes').oninput=()=>save('',false);$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({release:D.release,reviews},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kekki-medqa-v74-comparison-review.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};render();window.__PARSE_COMPARISON_READY__=true})();
</script></body></html>'''


def write_text(path: Path, value: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        handle.write(value)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="Kekki repository root")
    parser.add_argument("--parent-db", type=Path, required=True, help="sealed v7.4 non-lab SQLite")
    parser.add_argument("--internal-network-gzip", type=Path, required=True, help="validated private full-network HTML gzip")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.resolve()
    database = args.parent_db.resolve()
    internal_gzip = args.internal_network_gzip.resolve()
    legacy_path = repo / "public" / "reviewer" / "index.html"
    network_path = repo / "public" / "networks" / "7.4" / "index.html"
    comparison_path = repo / "public" / "reviewer" / "compare" / "index.html"
    manifest_path = repo / "public" / "releases" / "v7.4-public.json"

    if sha256_file(database) != PARENT_SHA256:
        raise SystemExit("immutable v7.4 parent database hash mismatch")
    if sha256_file(internal_gzip) != PRIVATE_GZIP_SHA256:
        raise SystemExit("validated private network gzip hash mismatch")
    legacy_canonical_sha = sha256_bytes(normalized_text_bytes(legacy_path))
    if legacy_canonical_sha != LEGACY_REVIEWER_SHA256:
        raise SystemExit(
            "legacy reviewer changed; refusing to alter the comparison cohort "
            f"(found {legacy_canonical_sha})"
        )

    legacy = load_legacy_reviewer(legacy_path)
    _private_document, private_data = load_private_network(internal_gzip)
    public_data = build_public_network(private_data)
    comparison_data = build_comparison(legacy, database)

    network_document = NETWORK_TEMPLATE.replace("__NETWORK_JSON__", json_for_script(public_data))
    comparison_document = COMPARISON_TEMPLATE.replace("__COMPARISON_JSON__", json_for_script(comparison_data))
    write_text(network_path, network_document)
    write_text(comparison_path, comparison_document)

    manifest = {
        "schema_version": 1,
        "release": PUBLIC_RELEASE,
        "release_date": "2026-07-21",
        "parent": {
            "database": {
                "path": "outputs/im_boards_clinical_corpus_v74_nonlab.sqlite",
                "sha256": PARENT_SHA256,
            },
            "private_network_release": PRIVATE_RELEASE,
            "private_network_database_sha256": PRIVATE_NETWORK_DB_SHA256,
            "private_network_gzip_sha256": PRIVATE_GZIP_SHA256,
            "canonical_graph_sha256": CANONICAL_GRAPH_SHA256,
        },
        "network": {
            "support_1_node_count": len(public_data["nodes"]),
            "support_1_edge_count": len(public_data["edges"]),
            "default_support": public_data["cohort"]["default_support"],
            "default_node_count": public_data["cohort"]["default_node_count"],
            "default_edge_count": public_data["cohort"]["default_edge_count"],
            "raw_question_text_included": False,
            "answer_keys_included": False,
            "source_selector_enabled": False,
            "source_labels_included": False,
        },
        "reviewer": {
            "question_source": "MedQA",
            "question_count": 10,
            "question_allowlist_sha256": canonical_sha(QUESTION_IDS),
            "legacy_mention_count": 616,
            "v74_accepted_fact_count": 81,
            "v74_distinct_question_concept_incidence_count": comparison_data["v74_parser"]["distinct_question_concept_incidence_count"],
            "raw_text_scope": "the exact ten previously public MedQA examples only",
            "additional_corpus_questions_included": False,
        },
        "limitation": "Laboratory/LOINC lane pending until 2026-07-26 17:07 America/New_York; this is not the final all-lane corpus.",
        "assets": [
            {"path": "public/networks/7.4/index.html", "sha256": sha256_file(network_path), "bytes": network_path.stat().st_size},
            {"path": "public/reviewer/compare/index.html", "sha256": sha256_file(comparison_path), "bytes": comparison_path.stat().st_size},
            {"path": "public/reviewer/index.html", "sha256": LEGACY_REVIEWER_SHA256, "bytes": len(normalized_text_bytes(legacy_path)), "preserved": True},
        ],
    }
    write_text(manifest_path, json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True) + "\n")

    print(json.dumps({
        "release": PUBLIC_RELEASE,
        "network": {"nodes": len(public_data["nodes"]), "edges": len(public_data["edges"]), "sha256": sha256_file(network_path)},
        "reviewer": {"questions": 10, "legacy_mentions": 616, "v74_facts": 81, "sha256": sha256_file(comparison_path)},
        "manifest": str(manifest_path),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
