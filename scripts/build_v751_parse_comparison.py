#!/usr/bin/env python3
"""Build the public ten-question legacy versus v7.5.1 MedQA reviewer.

Only the existing, explicitly allowlisted MedQA samples are copied into the
public artifact. The legacy parser payload is preserved byte-for-byte at the
record level; the replacement panel is derived from the sealed v7.5.1
``analysis_network_facts_v751`` interface.

The v7.5.1 interface contains parallel answer/choice container
representations. They are normalized to the one visible answer-choice
location and collapsed by question, location, span, and terminology identity.
Underlying fact counts and provenance-category counts remain attached to each
visible annotation.
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import hashlib
import json
import re
import sqlite3
from pathlib import Path
from typing import Any, Iterable

from build_v74_public_showcase import (
    COMPARISON_TEMPLATE,
    EXPECTED_LEGACY_COUNTS,
    LEGACY_PARSER_CHECKSUM,
    LEGACY_PARSER_RUN,
    LEGACY_REVIEWER_SHA256,
    QUESTION_IDS,
    json_for_script,
    load_legacy_reviewer,
    normalized_text_bytes,
    sha256_file,
    write_text,
)


CORPUS_RELEASE = "clinical_corpus_v751_nonloinc_r1"
CORPUS_SHA256 = "d55134e21799b8f0e692f10e902d17e89822f468cefdcb493194fa1dc79ce4ec"
COMPARISON_RELEASE = "kekki_medqa_parse_comparison_v751_r1"
PUBLIC_RELEASE = "clinical_network_v751_nonloinc_public_r1"
FACT_INTERFACE = "analysis_network_facts_v751"
EXPECTED_FACT_COUNTS = [49, 63, 15, 48, 79, 62, 79, 95, 64, 60]
EXPECTED_VISIBLE_COUNTS = [49, 61, 15, 44, 51, 56, 65, 53, 60, 57]
EXPECTED_INCIDENCE_COUNTS = [35, 34, 11, 24, 30, 39, 30, 15, 31, 20]
EXPECTED_CANDIDATE_COUNTS = [62, 44, 72, 53, 26, 56, 10, 22, 10, 0]
EXPECTED_QUESTION_HASHES = {
    "daq_44d46f278f7536af": "c883f2c206247337be0e018b825957cf",
    "daq_3e7314e312344f4a": "4fe0e97736dd65adfde61105712c4b0d",
    "daq_64078bfeb0674821": "aa23189aa95158d2c760d9bfcede1dbc",
    "daq_689dd35cf88a669c": "a119f416a2364a7c7c76f32f3c684804",
    "daq_bcc8a8f32eb863b7": "17f6095638c4879a643b8275d93f7e4f",
    "daq_bcfdb3ea41c20d36": "13ee9fc3cbac5c27fe03380608a502de",
    "daq_43ea91d004328587": "bef01d36b198edc9d29f16a66de3a30f",
    "daq_45b7ed7ba6bdaffd": "01556816d2bbc3a724443d8167bf7361",
    "daq_c7981505cccf8fe1": "39b7350f978d46db5c6233a33f246df2",
    "daq_733cc261da1983e9": "6c569bc969f394e281d1f81418d3f517",
}
EXPECTED_STEM_SHA256 = {
    "daq_44d46f278f7536af": "ad84bd71b2ae85daf5204c06e5b76c3981db1c64c2e8921dbcc0cfdefe8822b5",
    "daq_3e7314e312344f4a": "9689ea6dfeba5d03240484112806b8f36839fc2a6ae24ec5e910fc608e37421f",
    "daq_64078bfeb0674821": "f83e6ae7cd062a5130e505cae4d8bc708bc085974642fe31669f5506147384f5",
    "daq_689dd35cf88a669c": "3ef1f2ff6f48cb2bb26b2fae73fabef5a7671a81912f8991a005bdf8865d58f1",
    "daq_bcc8a8f32eb863b7": "f484e84a681cd0a6ecda1948e1295bd4a97dd9e7a0b9461e0802dcf57f168a9e",
    "daq_bcfdb3ea41c20d36": "6a54bbcdb871b0690afa05cd41fa0aa224348be18efa68f5f7b15f1d02a508d9",
    "daq_43ea91d004328587": "f364372236d51718f1bca45c39643c32dea3f98fa91f8c14ab76b9ebe4a0b42d",
    "daq_45b7ed7ba6bdaffd": "21ffc6ae30295b9ecfdd9984da38dbbf5ecb04056621197caec042131da1e4ca",
    "daq_c7981505cccf8fe1": "1934e10f41c8a76594db0cfda583d3de2017c3e6d5d2267819fe277e4092e814",
    "daq_733cc261da1983e9": "7f8a98c02363a6e440ae4831ba143109f03fd8a9870778e305558d40eda0f7a3",
}

SOURCE_PRIORITY = {
    "v751_api_promoted": 1,
    "v751_accepted_lexicon_reuse": 2,
    "v43_api_span": 3,
    "v74_api_promoted": 4,
    "api_dictionary_scan": 5,
    "v74_accepted": 6,
}


def compact_counts(values: Iterable[Any]) -> dict[str, int]:
    normalized = ("unspecified" if value is None or value == "" else str(value) for value in values)
    return dict(sorted(Counter(normalized).items()))


def exact_one(values: Iterable[Any], field: str, key: tuple[Any, ...]) -> Any:
    distinct = {value for value in values}
    if len(distinct) != 1:
        raise ValueError(f"conflicting {field} values for visible annotation {key!r}: {distinct!r}")
    return next(iter(distinct))


def validate_legacy_cohort(legacy: dict[str, Any]) -> list[dict[str, Any]]:
    questions = legacy.get("questions")
    if not isinstance(questions, list):
        raise ValueError("legacy reviewer payload has no questions array")
    ids = [question.get("id") for question in questions]
    if ids != QUESTION_IDS:
        raise ValueError(f"legacy reviewer question order changed: {ids!r}")
    counts = [len(question.get("mentions", [])) for question in questions]
    if counts != EXPECTED_LEGACY_COUNTS or sum(counts) != 616:
        raise ValueError(f"legacy mention cohort changed: {counts!r}")
    if any(question.get("source") != "MedQA" for question in questions):
        raise ValueError("the public raw-text allowlist is no longer MedQA-only")
    return questions


def location_contract(question: dict[str, Any]) -> tuple[
    dict[str, tuple[str, str]], dict[str, tuple[str, str]], dict[str, int]
]:
    """Return original-id aliases, canonical visible locations, and order."""
    aliases: dict[str, tuple[str, str]] = {}
    visible: dict[str, tuple[str, str]] = {}
    order: dict[str, int] = {}

    non_answer_sections = sorted(
        (section for section in question["sections"] if section["section"] != "answer"),
        key=lambda section: (section["section_order"], section["section_id"]),
    )
    answer_sections = sorted(
        (section for section in question["sections"] if section["section"] == "answer"),
        key=lambda section: (section["section_order"], section["section_id"]),
    )
    choices = sorted(question["choices"], key=lambda choice: (choice["choice_order"], choice["choice_id"]))

    for section in non_answer_sections:
        location_id = section["section_id"]
        aliases[location_id] = (location_id, section["text"])
        visible[location_id] = (section["section"], section["text"])
        order[location_id] = int(section["section_order"])

    if len(answer_sections) != len(choices):
        raise ValueError(f"answer section/choice count mismatch for {question['id']}")
    for answer_section, choice in zip(answer_sections, choices, strict=True):
        if answer_section["text"] != choice["choice_text"]:
            raise ValueError(f"answer section/choice text mismatch for {question['id']}")
        location_id = choice["choice_id"]
        value = (location_id, choice["choice_text"])
        aliases[location_id] = value
        aliases[answer_section["section_id"]] = value
        visible[location_id] = ("choice", choice["choice_text"])
        order[location_id] = 10 + int(choice["choice_order"])

    return aliases, visible, order


def resolve_location(
    fact: dict[str, Any],
    aliases: dict[str, tuple[str, str]],
    visible: dict[str, tuple[str, str]],
) -> tuple[str, str]:
    direct = aliases.get(str(fact.get("container_id") or ""))
    if direct is not None:
        candidates = [direct]
    elif fact["section"] == "stem":
        candidates = [
            (location_id, text)
            for location_id, (section, text) in visible.items()
            if section == "stem"
        ]
    elif fact["section"] in {"answer", "choice"}:
        candidates = [
            (location_id, text)
            for location_id, (section, text) in visible.items()
            if section == "choice"
        ]
    else:
        candidates = [
            (location_id, text)
            for location_id, (section, text) in visible.items()
            if section == fact["section"]
        ]

    start = fact["start_char"]
    end = fact["end_char"]
    if not isinstance(start, int) or not isinstance(end, int):
        raise ValueError(f"non-integer span for {fact['fact_id']}")
    matches = [
        (location_id, text)
        for location_id, text in candidates
        if 0 <= start < end <= len(text) and text[start:end] == fact["raw_surface"]
    ]
    unique = {(location_id, text) for location_id, text in matches}
    if len(unique) != 1:
        raise ValueError(
            f"fact {fact['fact_id']} maps to {len(unique)} visible locations, expected exactly one"
        )
    return next(iter(unique))


def build_visible_annotations(
    question: dict[str, Any], facts: list[dict[str, Any]]
) -> tuple[list[dict[str, Any]], int]:
    aliases, visible, location_order = location_contract(question)
    grouped: dict[tuple[Any, ...], list[dict[str, Any]]] = defaultdict(list)

    for fact in facts:
        location_id, text = resolve_location(fact, aliases, visible)
        start, end = int(fact["start_char"]), int(fact["end_char"])
        if text[start:end] != fact["raw_surface"]:
            raise ValueError(f"literal span mismatch for {fact['fact_id']}")
        key = (
            location_id,
            start,
            end,
            fact["external_namespace"],
            fact["external_code"],
        )
        grouped[key].append(fact)

    annotations: list[dict[str, Any]] = []
    ordered_groups = sorted(
        grouped.items(),
        key=lambda item: (
            location_order[item[0][0]], item[0][1], item[0][2], str(item[0][3]), str(item[0][4])
        ),
    )
    for index, (key, records) in enumerate(ordered_groups, start=1):
        location_id, start, end, namespace, code = key
        primary = min(
            records,
            key=lambda record: (SOURCE_PRIORITY.get(record["source_kind"], 99), record["fact_id"]),
        )
        annotations.append({
            "annotation_ref": f"v751-{question['sample']}-{index:03d}",
            "location_id": location_id,
            "start_char": start,
            "end_char": end,
            "raw_surface": exact_one((record["raw_surface"] for record in records), "raw_surface", key),
            "normalized_surface": primary["normalized_surface"],
            "canonical_name": exact_one((record["canonical_name"] for record in records), "canonical_name", key),
            "entity_family": exact_one((record["entity_family"] for record in records), "entity_family", key),
            "entity_type": exact_one((record["entity_type"] for record in records), "entity_type", key),
            "external_namespace": namespace,
            "external_code": code,
            "external_label": exact_one((record["external_label"] for record in records), "external_label", key),
            "fact_count": len(records),
            "source_record_count": len({record["source_record_id"] for record in records}),
            "container_representation_count": len({record["container_id"] for record in records}),
            "source_kind_counts": compact_counts(record["source_kind"] for record in records),
            "evidence_tier_counts": compact_counts(record["evidence_tier"] for record in records),
            "validation_method_counts": compact_counts(record["validation_method"] for record in records),
            "section_counts": compact_counts(record["section"] for record in records),
            "assertion_counts": compact_counts(record["assertion"] for record in records),
            "polarity_counts": compact_counts(record["polarity"] for record in records),
            "certainty_counts": compact_counts(record["certainty"] for record in records),
            "temporality_counts": compact_counts(record["temporality"] for record in records),
            "experiencer_counts": compact_counts(record["experiencer"] for record in records),
            "answer_role_counts": compact_counts(record["answer_role"] for record in records),
        })

    incidences = {
        (fact["external_namespace"], fact["external_code"])
        for fact in facts
    }
    return annotations, len(incidences)


def load_v751_questions(database: Path, legacy: dict[str, Any]) -> tuple[list[dict[str, Any]], dict[str, int]]:
    legacy_questions = validate_legacy_cohort(legacy)
    by_id = {question["id"]: question for question in legacy_questions}

    connection = sqlite3.connect(f"file:{database.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    output: list[dict[str, Any]] = []
    totals = Counter()
    try:
        if connection.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
            raise ValueError("v7.5.1 corpus failed SQLite integrity_check")
        release = connection.execute(
            "SELECT value FROM release_meta WHERE key='release_id'"
        ).fetchone()
        if release is None or release[0] != CORPUS_RELEASE:
            raise ValueError(f"unexpected corpus release: {None if release is None else release[0]!r}")

        for index, question_id in enumerate(QUESTION_IDS):
            legacy_question = by_id[question_id]
            row = connection.execute("SELECT * FROM questions WHERE question_id=?", (question_id,)).fetchone()
            if row is None:
                raise ValueError(f"missing v7.5.1 question {question_id}")
            current = dict(row)
            if current["canonical_question_id"] != question_id or current["dedup_disposition"] != "unique":
                raise ValueError(f"question is outside canonical unique scope: {question_id}")
            if current["origin_lane"] != "Medical School boards":
                raise ValueError(f"question left the Medical School boards lane: {question_id}")
            if current["question_hash"] != EXPECTED_QUESTION_HASHES[question_id]:
                raise ValueError(f"question hash changed for {question_id}")
            stem_sha = hashlib.sha256(current["stem_text"].encode("utf-8")).hexdigest()
            if stem_sha != EXPECTED_STEM_SHA256[question_id]:
                raise ValueError(f"stem hash changed for {question_id}")

            sections = [
                dict(section) for section in connection.execute(
                    "SELECT section_id,section,section_order,text FROM sections "
                    "WHERE question_id=? ORDER BY section_order,section_id",
                    (question_id,),
                )
            ]
            choices = [
                dict(choice) for choice in connection.execute(
                    "SELECT choice_id,choice_label,choice_order,choice_text,is_correct "
                    "FROM answer_choices WHERE question_id=? ORDER BY choice_order,choice_id",
                    (question_id,),
                )
            ]
            if sections != legacy_question["sections"]:
                raise ValueError(f"displayed section text changed for {question_id}")
            if choices != legacy_question["choices"]:
                raise ValueError(f"displayed answer choices changed for {question_id}")
            if current["correct_choice_label"] != legacy_question.get("correct_label"):
                raise ValueError(f"answer key label changed for {question_id}")
            if current["correct_answer_text"] != legacy_question.get("correct_answer"):
                raise ValueError(f"answer key text changed for {question_id}")

            facts = [
                dict(fact) for fact in connection.execute(
                    f"SELECT * FROM {FACT_INTERFACE} WHERE question_id=? "
                    "ORDER BY section,container_id,start_char,end_char,external_namespace,external_code,fact_id",
                    (question_id,),
                )
            ]
            if len(facts) != EXPECTED_FACT_COUNTS[index]:
                raise ValueError(f"fact count changed for {question_id}: {len(facts)}")

            question_for_locations = dict(legacy_question)
            question_for_locations["sample"] = f"Q{index + 1:02d}"
            annotations, incidence_count = build_visible_annotations(question_for_locations, facts)
            if len(annotations) != EXPECTED_VISIBLE_COUNTS[index]:
                raise ValueError(f"visible annotation count changed for {question_id}: {len(annotations)}")
            if incidence_count != EXPECTED_INCIDENCE_COUNTS[index]:
                raise ValueError(f"incidence count changed for {question_id}: {incidence_count}")

            candidate_rows = connection.execute(
                "SELECT disposition,COUNT(*) AS n FROM analysis_clinical_candidates_v751 "
                "WHERE question_id=? GROUP BY disposition ORDER BY disposition",
                (question_id,),
            ).fetchall()
            candidate_counts = {candidate["disposition"]: candidate["n"] for candidate in candidate_rows}
            candidate_count = sum(candidate_counts.values())
            if candidate_count != EXPECTED_CANDIDATE_COUNTS[index]:
                raise ValueError(f"candidate count changed for {question_id}: {candidate_count}")

            output.append({
                "id": question_id,
                "source": legacy_question["source"],
                "target": legacy_question.get("target"),
                "target_confidence": legacy_question.get("target_confidence"),
                "correct_label": legacy_question.get("correct_label"),
                "correct_answer": legacy_question.get("correct_answer"),
                # Answer sections duplicate choices. Keep the raw text once, in choices.
                "sections": [section for section in sections if section["section"] != "answer"],
                "choices": choices,
                "legacy": {
                    "mention_count": len(legacy_question["mentions"]),
                    "mentions": legacy_question["mentions"],
                },
                "v751": {
                    "accepted_fact_count": len(facts),
                    "visible_annotation_count": len(annotations),
                    "distinct_question_concept_incidence_count": incidence_count,
                    "collapsed_duplicate_representation_count": len(facts) - len(annotations),
                    "excluded_candidate_count": candidate_count,
                    "excluded_candidate_counts": candidate_counts,
                    "annotations": annotations,
                },
                "question_hash": current["question_hash"],
                "raw_stem_sha256": stem_sha,
                "sample": f"Q{index + 1:02d}",
            })
            totals.update({
                "facts": len(facts),
                "annotations": len(annotations),
                "incidences": incidence_count,
                "candidates": candidate_count,
                "pending_loinc": candidate_counts.get("pending_loinc", 0),
                "nonloinc_candidates": candidate_counts.get("needs_api", 0),
            })
    finally:
        connection.close()

    expected_totals = {
        "facts": 614,
        "annotations": 511,
        "incidences": 269,
        "candidates": 355,
        "pending_loinc": 282,
        "nonloinc_candidates": 73,
    }
    if dict(totals) != expected_totals:
        raise ValueError(f"v7.5.1 reviewer totals changed: {dict(totals)!r}")
    return output, expected_totals


def build_comparison(legacy: dict[str, Any], database: Path) -> dict[str, Any]:
    questions, totals = load_v751_questions(database, legacy)
    return {
        "release": COMPARISON_RELEASE,
        "legacy_parser": {
            "label": "Legacy v4.3 parser mentions",
            "mention_count": 616,
            "parser": "im_parser_v4.3_precision_first",
            "run": LEGACY_PARSER_RUN,
            "code_checksum": LEGACY_PARSER_CHECKSUM,
        },
        "v751_parser": {
            "label": "v7.5.1 promoted non-LOINC facts",
            "release": CORPUS_RELEASE,
            "parent_database_sha256": CORPUS_SHA256,
            "interface": FACT_INTERFACE,
            "accepted_fact_count": totals["facts"],
            "visible_annotation_count": totals["annotations"],
            "collapsed_duplicate_representation_count": totals["facts"] - totals["annotations"],
            "distinct_question_concept_incidence_count": totals["incidences"],
            "facts_on_question_count": sum(1 for question in questions if question["v751"]["accepted_fact_count"]),
            "excluded_candidate_count": totals["candidates"],
            "pending_loinc_candidate_count": totals["pending_loinc"],
            "unresolved_nonloinc_candidate_count": totals["nonloinc_candidates"],
        },
        "questions": questions,
        "type_counts": legacy.get("type_counts", {}),
        "privacy": {
            "raw_text_scope": "exactly ten pre-existing public MedQA examples",
            "additional_corpus_questions_included": False,
            "candidate_spans_included": False,
            "underlying_fact_ids_included": False,
            "fact_provenance_count_metadata_included": True,
        },
        "limitation": (
            "v7.5.1 is a non-LOINC preview. Laboratory/LOINC normalization remains pending "
            "until July 26, 2026 at 5:07 PM America/New_York."
        ),
    }


COMPARISON_JS = r"""
(()=>{'use strict';const D=JSON.parse(document.getElementById('comparison-data').textContent),Q=D.questions,$=s=>document.querySelector(s),key='kekki-medqa-parse-comparison-v751-r1';let idx=0,view='compare',selected=null,reviews={};try{reviews=JSON.parse(localStorage.getItem(key)||'{}')}catch{};
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function current(){return Q[idx]}function counts(x){return Object.entries(x||{}).map(([k,v])=>`${esc(k)} (${v})`).join(' · ')||'none'}function locateItems(q,location,parser){const all=parser==='legacy'?q.legacy.mentions:q.v751.annotations;return all.map((item,index)=>({item,index})).filter(x=>parser==='legacy'?(x.item.choice_id||x.item.section_id)===location:x.item.location_id===location)}
function highlighted(text,items,parser){const valid=items.map(({item,index})=>({item,key:`${parser}-${index}`,start:+item.start_char,end:+item.end_char})).filter(x=>Number.isInteger(x.start)&&Number.isInteger(x.end)&&x.start>=0&&x.end>x.start&&x.end<=text.length);const cuts=[...new Set([0,text.length,...valid.flatMap(x=>[x.start,x.end])])].sort((a,b)=>a-b);let out='';for(let i=0;i<cuts.length-1;i++){const start=cuts[i],end=cuts[i+1],part=esc(text.slice(start,end)),active=valid.filter(x=>x.start<end&&x.end>start);if(active.length)out+=`<mark tabindex="0" data-parser="${parser}" data-keys="${active.map(x=>x.key).join(',')}">${part}</mark>`;else out+=part}return out}
function pane(q,location,text,parser){const items=locateItems(q,location,parser),label=parser==='legacy'?'Legacy v4.3':'v7.5.1 promoted';return `<article class="parse ${parser==='legacy'?'old':'new'}"><div class="parseHead"><span>${label}</span><span>${items.length} ${parser==='legacy'?'mentions':'annotations'}</span></div><div class="text">${highlighted(text,items,parser)}</div></article>`}
function sectionBlock(q,section){return `<section class="section"><h2 class="sectionTitle"><span>${esc(section.section)}</span><span>same source text</span></h2><div class="compare">${pane(q,section.section_id,section.text,'legacy')}${pane(q,section.section_id,section.text,'v751')}</div></section>`}
function choiceBlock(q,choice){return `<section class="section choice"><h2 class="sectionTitle"><span>Choice ${esc(choice.choice_label)}</span><span>${choice.is_correct?'answer key':''}</span></h2><div class="compare">${pane(q,choice.choice_id,choice.choice_text,'legacy')}${pane(q,choice.choice_id,choice.choice_text,'v751')}</div></section>`}
function nav(){const list=$('#sampleList'),select=$('#mobileSelect');list.innerHTML=Q.map((q,i)=>`<button class="sample ${i===idx?'active':''}" data-index="${i}"><strong>${q.sample}</strong><span>${q.legacy.mention_count} legacy · ${q.v751.visible_annotation_count} v7.5.1</span><span class="delta">${q.v751.visible_annotation_count}</span></button>`).join('');select.innerHTML=Q.map((q,i)=>`<option value="${i}" ${i===idx?'selected':''}>${q.sample} · ${q.legacy.mention_count} / ${q.v751.visible_annotation_count}</option>`).join('');list.querySelectorAll('button').forEach(b=>b.onclick=()=>{idx=+b.dataset.index;selected=null;render()});select.onchange=()=>{idx=+select.value;selected=null;render()}}
function render(){const q=current(),zero=q.v751.accepted_fact_count===0;document.body.className=`view-${view}`;$('#main').innerHTML=`<header class="questionHead"><div><div class="eyebrow">${q.sample} · MedQA public example</div><h1>One question. Two parsers.</h1><p>The unchanged legacy extraction is shown beside promoted v7.5.1 facts over identical source text.</p></div><div class="score"><div><b>${q.legacy.mention_count}</b><span>legacy mentions</span></div><div><b>${q.v751.visible_annotation_count}</b><span>v7.5.1 annotations</span></div></div></header><div class="mode"><button data-view="compare" class="${view==='compare'?'active':''}">compare</button><button data-view="legacy" class="${view==='legacy'?'active':''}">legacy</button><button data-view="v751" class="${view==='v751'?'active':''}">v7.5.1</button></div>${zero?'<div class="zero">0 accepted v7.5.1 facts. Candidate rows remain excluded; nothing is silently promoted.</div>':''}${q.sections.map(s=>sectionBlock(q,s)).join('')}<h2 class="sectionTitle"><span>Answer choices</span><span>${q.choices.length} choices</span></h2>${q.choices.map(c=>choiceBlock(q,c)).join('')}<div class="scope">Counts are not a quality score. This sample contains ${q.v751.accepted_fact_count} promoted facts collapsed to ${q.v751.visible_annotation_count} unique visible annotations and ${q.v751.distinct_question_concept_incidence_count} distinct question–concept incidences. ${q.v751.excluded_candidate_count} unresolved candidate spans remain excluded. LOINC laboratory normalization remains pending.</div>`;$('#main').querySelectorAll('.mode button').forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});$('#main').querySelectorAll('mark').forEach(mark=>{const open=()=>show(mark.dataset.parser,mark.dataset.keys.split(','));mark.onclick=open;mark.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}});if(!selected){$('#detail').innerHTML='Select a highlighted span from either parser.';$('#inspector').classList.remove('open')}nav();reviewState()}
function show(parser,keys){const q=current(),all=parser==='legacy'?q.legacy.mentions:q.v751.annotations,indices=keys.map(k=>+k.split('-').pop()),items=indices.map(i=>all[i]).filter(Boolean);selected={parser,items};const cards=items.map(item=>parser==='legacy'?`<div><div class="surface">${esc(item.raw_span)}</div><div class="kv"><b>canonical</b><span>${esc(item.canonical_name)}</span><b>type</b><span>${esc(item.concept_type)}</span><b>section · role</b><span>${esc(item.section)} · ${esc(item.answer_role)}</span><b>context</b><span>${esc(item.assertion)} · ${esc(item.temporality)} · ${esc(item.experiencer)}</span><b>parser rule</b><span>${esc(item.source_parser_rule)}</span><b>confidence</b><span>${esc(item.confidence)}</span></div></div>`:`<div><div class="surface">${esc(item.raw_surface)}</div><div class="kv"><b>canonical</b><span>${esc(item.canonical_name)}</span><b>identity</b><span>${esc(item.external_namespace)}:${esc(item.external_code)}</span><b>family · type</b><span>${esc(item.entity_family)} · ${esc(item.entity_type)}</span><b>underlying facts</b><span>${item.fact_count} across ${item.container_representation_count} container representation(s)</span><b>source layers</b><span>${counts(item.source_kind_counts)}</span><b>evidence</b><span>${counts(item.evidence_tier_counts)}</span><b>validation</b><span>${counts(item.validation_method_counts)}</span><b>context</b><span>${counts(item.assertion_counts)} · ${counts(item.temporality_counts)} · ${counts(item.experiencer_counts)}</span></div></div>`).join('<hr style="border:0;border-top:1px solid var(--line);margin:15px 0">');$('#detail').innerHTML=`<div class="eyebrow">${parser==='legacy'?'legacy parser mention':'v7.5.1 promoted annotation'}${items.length>1?` · ${items.length} overlapping records`:''}</div>${cards}`;$('#inspector').classList.add('open')}
function reviewState(){const q=current(),r=reviews[q.id]||{};$('#accept').classList.toggle('active',r.status==='reviewed');$('#flag').classList.toggle('active',r.status==='follow-up');$('#notes').value=r.notes||''}
function save(status,refresh=true){const q=current(),r=reviews[q.id]||{};if(status)r.status=r.status===status?'':status;r.notes=$('#notes').value;r.updated_at=new Date().toISOString();reviews[q.id]=r;localStorage.setItem(key,JSON.stringify(reviews));$('#saved').textContent='saved locally';setTimeout(()=>$('#saved').textContent='',900);if(refresh)reviewState()}
$('#prev').onclick=()=>{idx=(idx-1+Q.length)%Q.length;selected=null;render();scrollTo(0,0)};$('#next').onclick=()=>{idx=(idx+1)%Q.length;selected=null;render();scrollTo(0,0)};$('#accept').onclick=()=>save('reviewed');$('#flag').onclick=()=>save('follow-up');$('#notes').oninput=()=>save('',false);$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({release:D.release,reviews},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kekki-medqa-v751-comparison-review.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};render();window.__PARSE_COMPARISON_READY__=true})();
"""


def comparison_template() -> str:
    marker = '<script id="comparison-data" type="application/json">__COMPARISON_JSON__</script>'
    if marker not in COMPARISON_TEMPLATE:
        raise ValueError("v7.4 comparison template marker changed")
    prefix = COMPARISON_TEMPLATE.split(marker, 1)[0]
    prefix = prefix.replace(
        "Side-by-side comparison of legacy and v7.4 clinical entity parsing",
        "Side-by-side comparison of legacy and v7.5.1 clinical entity parsing",
    )
    prefix = prefix.replace(".view-v74", ".view-v751")
    prefix = prefix.replace("v7.4 non-laboratory preview", "v7.5.1 non-LOINC preview")
    prefix = prefix.replace(
        "Same ten public MedQA examples, two parse layers.",
        "Same ten public MedQA examples, unchanged legacy parsing beside v7.5.1.",
    )
    return prefix + marker + "\n<script>\n" + COMPARISON_JS.strip() + "\n</script></body></html>"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd(), help="Kekki repository root")
    parser.add_argument("--parent-db", type=Path, required=True, help="sealed v7.5.1 non-LOINC SQLite")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo = args.repo.resolve()
    database = args.parent_db.resolve()
    legacy_path = repo / "public" / "reviewer" / "index.html"
    comparison_path = repo / "public" / "reviewer" / "compare" / "index.html"
    manifest_path = repo / "public" / "releases" / "v7.5.1-public.json"

    if sha256_file(database) != CORPUS_SHA256:
        raise SystemExit("sealed v7.5.1 corpus hash mismatch")
    legacy_sha = hashlib.sha256(normalized_text_bytes(legacy_path)).hexdigest()
    if legacy_sha != LEGACY_REVIEWER_SHA256:
        raise SystemExit("legacy reviewer changed; refusing to change the comparison cohort")

    legacy = load_legacy_reviewer(legacy_path)
    comparison = build_comparison(legacy, database)
    document = comparison_template().replace("__COMPARISON_JSON__", json_for_script(comparison))
    if re.search(r"\bv7\.4\b|\bv74\b", document, re.IGNORECASE):
        raise SystemExit("stale v7.4 labeling remains in generated comparison")
    write_text(comparison_path, document)

    if not manifest_path.exists():
        raise SystemExit("build the v7.5.1 public network before assembling the reviewer release")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("release") != PUBLIC_RELEASE:
        raise SystemExit("unexpected v7.5.1 public network manifest")
    manifest["reviewer"] = {
        "release": COMPARISON_RELEASE,
        "question_source": "MedQA",
        "question_count": 10,
        "legacy_mention_count": 616,
        "v751_accepted_fact_count": 614,
        "v751_visible_annotation_count": 511,
        "v751_collapsed_duplicate_representation_count": 103,
        "v751_distinct_question_concept_incidence_count": 269,
        "facts_on_question_count": 10,
        "excluded_candidate_count": 355,
        "pending_loinc_candidate_count": 282,
        "unresolved_nonloinc_candidate_count": 73,
        "raw_text_scope": "exactly the ten previously public MedQA examples",
        "additional_corpus_questions_included": False,
    }
    manifest["replacement"] = {
        "supersedes_public_release": "clinical_network_v74_nonlab_public_r1",
        "canonical_network_route": "/network/7.5.1",
        "legacy_network_route_redirect": "/network/7.4 -> /network/7.5.1 (temporary)",
        "comparison_route": "/reviewer/compare",
    }
    assets = {
        item["path"]: item
        for item in manifest.get("assets", [])
        if isinstance(item, dict) and isinstance(item.get("path"), str)
    }
    assets["public/reviewer/compare/index.html"] = {
        "path": "public/reviewer/compare/index.html",
        "sha256": sha256_file(comparison_path),
        "bytes": comparison_path.stat().st_size,
    }
    assets["public/reviewer/index.html"] = {
        "path": "public/reviewer/index.html",
        "sha256": LEGACY_REVIEWER_SHA256,
        "bytes": len(normalized_text_bytes(legacy_path)),
        "preserved": True,
    }
    manifest["assets"] = [assets[path] for path in sorted(assets)]
    write_text(
        manifest_path,
        json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True) + "\n",
    )
    print(json.dumps({
        "release": COMPARISON_RELEASE,
        "output": str(comparison_path),
        "sha256": sha256_file(comparison_path),
        "bytes": comparison_path.stat().st_size,
        "questions": 10,
        "legacy_mentions": 616,
        "v751_facts": 614,
        "v751_visible_annotations": 511,
        "v751_question_concept_incidences": 269,
        "manifest": str(manifest_path),
        "manifest_sha256": sha256_file(manifest_path),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
