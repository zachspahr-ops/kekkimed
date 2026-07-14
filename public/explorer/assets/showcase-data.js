window.SHOWCASE_DATA = {
  "generatedFrom": "Local CSV, JSON, and markdown-derived analysis artifacts",
  "projects": {
    "v43": {
      "id": "v43",
      "title": "Current v4.3 Parser QA",
      "shortTitle": "v4.3 current",
      "badge": "Current analysis",
      "thesis": "Precision-first parser QA that makes the final network generation trustworthy.",
      "metrics": [
        {
          "label": "Questions",
          "value": 22132,
          "format": "integer"
        },
        {
          "label": "Parser errors",
          "value": 0,
          "format": "integer"
        },
        {
          "label": "Accepted-high coverage",
          "value": 66.16,
          "format": "percent"
        },
        {
          "label": "Reviewed high precision",
          "value": 100.0,
          "format": "percent"
        },
        {
          "label": "Canonical concepts",
          "value": 4216,
          "format": "integer"
        },
        {
          "label": "Synonym tokens",
          "value": 30326,
          "format": "integer"
        },
        {
          "label": "Relationships",
          "value": 10930,
          "format": "integer"
        },
        {
          "label": "Valid-answer denominator",
          "value": 21841,
          "format": "integer"
        }
      ],
      "pipeline": [
        "Raw question database",
        "Correct-answer repair",
        "Full clinical lexicon",
        "Strict target acceptance",
        "Validated network inputs"
      ],
      "graph": {
        "nodes": [
          {
            "id": "concept_bb2fca09cb60ec22b6d6",
            "label": "Renal biopsy",
            "type": "diagnostic_test",
            "weight": 46.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_5c84bc3967d37a1962f5",
            "label": "IgA mesangial deposition",
            "type": "other_review_required",
            "weight": 22.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_9da9dd412071609e65d6",
            "label": "Fasciculations",
            "type": "physical_exam_symptom",
            "weight": 23.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_69def33462d45f909462",
            "label": "Syringomyelia",
            "type": "other_review_required",
            "weight": 26.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_aec157fce111869ff94f",
            "label": "Hyperactive bowel sounds",
            "type": "physical_exam",
            "weight": 7.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_044a5394a944cbfc7a48",
            "label": "Entamoeba histolytica",
            "type": "other_review_required",
            "weight": 10.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_d907d2d6f0db531701e6",
            "label": "Hypotension",
            "type": "physical_exam",
            "weight": 7.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_e151b830408b1576e660",
            "label": "Splenic artery",
            "type": "risk_factor_or_etiology_reasoning",
            "weight": 9.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_f57487d7dfcae6500f00",
            "label": "Necrosis",
            "type": "diagnostic_result",
            "weight": 321.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "target_3a58ed487d6650dcb917",
            "label": "Ureter",
            "type": "other_review_required",
            "weight": 6.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_641f13a8b8dbfa38babf",
            "label": "Prolonged bleeding",
            "type": "physical_exam_symptom",
            "weight": 12.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_8d2a31cd6bebdc9c0bc1",
            "label": "Factor VIII",
            "type": "other_review_required",
            "weight": 10.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_180b9e30f6667e2141d9",
            "label": "Renal artery duplex ultrasound",
            "type": "imaging_test",
            "weight": 22.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_43aa74b4fd52307aaf5a",
            "label": "Hyperplasia of juxtaglomerular cells",
            "type": "other_review_required",
            "weight": 19.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_389fc85c83ed0e8b6330",
            "label": "lidocaine",
            "type": "medication",
            "weight": 47.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_f4ee0b20409775c35a8e",
            "label": "Rotator cuff tear",
            "type": "other_review_required",
            "weight": 7.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_53665089aaa430a91ba7",
            "label": "lithium",
            "type": "medication",
            "weight": 127.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_3fbe6fb117c6af9a0436",
            "label": "Serum thyroid-stimulating hormone",
            "type": "laboratory_test_selection",
            "weight": 8.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_3c2edc81dc98a12e3072",
            "label": "Cervical cytology and high-risk HPV testing",
            "type": "diagnostic_test",
            "weight": 39.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_cc75e067116f12c74d30",
            "label": "Diethylstilbestrol exposure in utero",
            "type": "risk_factor_or_etiology_reasoning",
            "weight": 14.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_81a6a475806a2b9ad2cc",
            "label": "Alpha-fetoprotein (AFP), serum",
            "type": "lab_test",
            "weight": 23.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_76fc6345221a16a2c1ed",
            "label": "Amniocentesis",
            "type": "other_review_required",
            "weight": 12.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_dda0afdca5640a9c6713",
            "label": "Bipolar disorder",
            "type": "disease_condition_syndrome",
            "weight": 87.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "target_3e610619b4a05b58622d",
            "label": "Collecting duct",
            "type": "other_review_required",
            "weight": 16.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_8919d9a7af2f4f56164a",
            "label": "Influenza virus",
            "type": "etiology_factor",
            "weight": 72.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_2e7d6e9154c557d1acdc",
            "label": "Administer inactivated influenza vaccine",
            "type": "risk_factor_or_etiology_reasoning",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_3d305a1afa8108fd1abc",
            "label": "Perfusion-only lung scan",
            "type": "imaging_test",
            "weight": 2.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "target_c00228de53ceae516118",
            "label": "Activation of antithrombin III",
            "type": "other_review_required",
            "weight": 24.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_c744dc4c470e1cf37387",
            "label": "Depression and suicide",
            "type": "disease_condition_syndrome",
            "weight": 147.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "target_dd25d0940606a314a31e",
            "label": "2.5",
            "type": "other_review_required",
            "weight": 19.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_3c121d0048f996a2bdd6",
            "label": "Hallucinations",
            "type": "physical_exam_symptom",
            "weight": 75.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_08bdb828991d4cc6f041",
            "label": "Haloperidol",
            "type": "medication_or_pharmacologic_management",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b24be939253127a6de25",
            "label": "Nocturia",
            "type": "physical_exam_symptom",
            "weight": 9.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_825b1c7ff498413b3118",
            "label": "Somatic symptom disorder",
            "type": "diagnosis_identification",
            "weight": 16.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_768b713e2820130aae69",
            "label": "Sodium, serum",
            "type": "lab_test",
            "weight": 503.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_b2b9959fe94540fd286e",
            "label": "Aldosteronoma",
            "type": "other_review_required",
            "weight": 23.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_13e3d44b50460ed86eba",
            "label": "Urine culture",
            "type": "diagnostic_test",
            "weight": 64.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_dbe3f04c5c2c26927386",
            "label": "Staphylococcus saprophyticus",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_bff3b692ce6c337ea54d",
            "label": "Absent bowel sounds",
            "type": "physical_exam",
            "weight": 8.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_a41464bb973443bf0520",
            "label": "Imbalance of fluid secretion and resorption by the tunica vaginalis",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b22c9e24fe939820d1f1",
            "label": "Blood urea nitrogen (BUN)",
            "type": "lab_test",
            "weight": 189.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_8ad53973b5565e21770c",
            "label": "Diabetes mellitus",
            "type": "other_review_required",
            "weight": 11.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_3388f6b1e2d62b22ac3c",
            "label": "Delusions",
            "type": "physical_exam_symptom",
            "weight": 16.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_ac8963931e69f6f403a6",
            "label": "Elevated serum TSH",
            "type": "diagnostic_or_result_interpretation",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_014659a6a5d4c0876ce6",
            "label": "Healthcare exposure",
            "type": "etiology_factor",
            "weight": 565.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_e5cc7c99add3be52626c",
            "label": "Transfusion reaction",
            "type": "other_review_required",
            "weight": 15.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_0d065f95fc2f3af87dc0",
            "label": "atorvastatin",
            "type": "medication",
            "weight": 388.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_2dd2096d06ad45709be7",
            "label": "Abdominal ultrasonography",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_a7c62276f9a3c7d6bb73",
            "label": "lisinopril",
            "type": "medication",
            "weight": 490.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_01811926f084da12166f",
            "label": "Hormonal therapy (contraception, postmenopausal replacement therapy, abnormal u...",
            "type": "disease_condition_syndrome",
            "weight": 74.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_be09e192e19a37b3e577",
            "label": "Pelvic ultrasound",
            "type": "imaging_selection",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_e325917eaea65b2db0e6",
            "label": "Axillary lymphadenopathy",
            "type": "physical_exam",
            "weight": 29.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_852f108fb1c49ca5506a",
            "label": "Capsular invasion",
            "type": "other_review_required",
            "weight": 17.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_882f7ac8484d8b7b1f84",
            "label": "Seizure",
            "type": "physical_exam_symptom",
            "weight": 113.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_96f63ebd579dbee9e7f9",
            "label": "Seizures",
            "type": "disease_condition_syndrome",
            "weight": 179.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_2955ae3384c37da53674",
            "label": "Pruritus",
            "type": "physical_exam_symptom",
            "weight": 108.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_46e1b4e700e8c14d09a1",
            "label": "Angiosarcoma",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_4f2aca3457b8f61e5f3a",
            "label": "Peripheral edema",
            "type": "physical_exam",
            "weight": 219.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_c01a5f5df0efac5aeaaa",
            "label": "End-diastolic pressure",
            "type": "other_review_required",
            "weight": 11.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_06db0b1da6e854acaa21",
            "label": "Dysuria",
            "type": "physical_exam_symptom",
            "weight": 63.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_52d1579d9e9c6e57eedd",
            "label": "Levator ani",
            "type": "other_review_required",
            "weight": 6.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_cdf4a9082ec92a50b796",
            "label": "Cough",
            "type": "physical_exam_symptom",
            "weight": 70.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_61785a12df8a2e4b78ac",
            "label": "Depressed mood",
            "type": "physical_exam_symptom",
            "weight": 80.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_3f75d1628bb1e4b6ca40",
            "label": "Pregnancy",
            "type": "etiology_factor",
            "weight": 420.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_e721f663ba392d231cba",
            "label": "Duodenal atresia",
            "type": "other_review_required",
            "weight": 11.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_22103c5ceba570be2bf2",
            "label": "Maternal phenytoin therapy",
            "type": "medication_or_pharmacologic_management",
            "weight": 23.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_a27333cec40f73a1f595",
            "label": "Palpitations",
            "type": "physical_exam_symptom",
            "weight": 292.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_b30a89d93ed36d8564e1",
            "label": "Hypertrophic cardiomyopathy",
            "type": "diagnosis_identification",
            "weight": 27.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_269a4223c2ec5debf594",
            "label": "Swelling",
            "type": "physical_exam_symptom",
            "weight": 503.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_c1afff040320520ba394",
            "label": "Stress fracture",
            "type": "diagnosis_identification",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b37e3f03082a7f6401ec",
            "label": "Jugular venous distention",
            "type": "physical_exam",
            "weight": 96.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_60481edbc2f417ea2167",
            "label": "Immunization",
            "type": "disease_condition_syndrome",
            "weight": 275.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "concept_d37d5a5e8be9a6be7f6b",
            "label": "Chest pain",
            "type": "physical_exam_symptom",
            "weight": 435.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_4b8a338123652f14f494",
            "label": "Increased alveolar-arterial gradient",
            "type": "other_review_required",
            "weight": 17.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_869a0f544f8d77c8164a",
            "label": "Prolonged QT interval",
            "type": "other_review_required",
            "weight": 20.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_f12f0bba4b3d7f4f0353",
            "label": "Creatinine, serum",
            "type": "lab_test",
            "weight": 149.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_425719a278f225fcb95a",
            "label": "Increased venous valve reflux",
            "type": "other_review_required",
            "weight": 20.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_a1e2af2a59645aadc6ce",
            "label": "Shortness of breath",
            "type": "physical_exam_symptom",
            "weight": 593.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_a00b5d36214fc9d86e83",
            "label": "Abdominal guarding",
            "type": "physical_exam",
            "weight": 90.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_a5a2dd935139fc89c79c",
            "label": "Elevated serum CA-125 level",
            "type": "diagnostic_or_result_interpretation",
            "weight": 12.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_69548656a926cd11c11b",
            "label": "Neostigmine therapy",
            "type": "medication_or_pharmacologic_management",
            "weight": 38.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_c67e0a1c2d31eb0756b1",
            "label": "Tenderness",
            "type": "physical_exam_symptom",
            "weight": 541.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_dc7eba93d5598e6cd6a5",
            "label": "Laparoscopy",
            "type": "diagnostic_test_selection",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_a3405ae0b10480fae9ca",
            "label": "Monosodium urate",
            "type": "other_review_required",
            "weight": 16.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_67d66fcd2d70f0942e27",
            "label": "Transvaginal ultrasound",
            "type": "imaging_selection",
            "weight": 10.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_47821c8eebcb97b9c37c",
            "label": "Hemoglobin, blood",
            "type": "lab_test",
            "weight": 508.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_f4404627d314bf96ba37",
            "label": "Conjugated estrogen therapy",
            "type": "procedural_or_nonpharmacologic_intervention",
            "weight": 8.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_540b414a6527789a3334",
            "label": "Urinalysis",
            "type": "lab_test",
            "weight": 345.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_a7e14fc87817c9ff2135",
            "label": "Anxiety",
            "type": "physical_exam_symptom",
            "weight": 114.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_cfc4c1e5941f849383cc",
            "label": "Personality disorders",
            "type": "disease_condition_syndrome",
            "weight": 111.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_5dfbcc7b6270e5e14dd0",
            "label": "azithromycin",
            "type": "medication",
            "weight": 220.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_a353bdee09d8c461de8e",
            "label": "ceftriaxone",
            "type": "medication",
            "weight": 290.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_d366aee9a8cb5f64834d",
            "label": "Potassium, serum",
            "type": "lab_test",
            "weight": 412.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_b897d675badbfe965fa8",
            "label": "vancomycin",
            "type": "medication",
            "weight": 340.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_b0f86d3ecc5fb4482363",
            "label": "warfarin",
            "type": "medication",
            "weight": 249.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_d1347ea0f17e958c31db",
            "label": "aspirin",
            "type": "medication",
            "weight": 600.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_a72d7b76b0b3f82dc3c5",
            "label": "doxycycline",
            "type": "medication",
            "weight": 187.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_1739ba9369248f90e602",
            "label": "Magnesium, serum",
            "type": "lab_test",
            "weight": 110.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_da3210fc8ff2ba18fa06",
            "label": "Phosphorus, serum",
            "type": "lab_test",
            "weight": 248.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_0e3ec5cd173ebde4497e",
            "label": "albuterol",
            "type": "medication",
            "weight": 236.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_400778ba474021c4fdaa",
            "label": "tiotropium",
            "type": "medication",
            "weight": 108.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_e03a666b844e04b921c6",
            "label": "cefepime",
            "type": "medication",
            "weight": 79.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_4082164fa589eaac1250",
            "label": "theophylline",
            "type": "medication",
            "weight": 74.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_9c03657c38e066ad88d1",
            "label": "ampicillin",
            "type": "medication",
            "weight": 150.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_b6e7e8b0541e65193e2c",
            "label": "gentamicin",
            "type": "medication",
            "weight": 145.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_ad347bf2061c398b0715",
            "label": "Chloride, serum",
            "type": "lab_test",
            "weight": 207.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_10794a453109750eed79",
            "label": "rifampin",
            "type": "medication",
            "weight": 185.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_dee1c098518a09430172",
            "label": "pyrazinamide",
            "type": "medication",
            "weight": 68.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_3d3ab8ec5a11009e15ad",
            "label": "Respiratory alkalosis",
            "type": "disease_condition_syndrome",
            "weight": 53.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_69b4184b1723636f8eac",
            "label": "Metabolic acidosis",
            "type": "disease_condition_syndrome",
            "weight": 81.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_d100873584c43dbd7201",
            "label": "ethambutol",
            "type": "medication",
            "weight": 56.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_b142598153646a78c945",
            "label": "Obsessive-compulsive disorder",
            "type": "disease_condition_syndrome",
            "weight": 39.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_1c0beaf2829e21fab3bd",
            "label": "Sarcoidosis",
            "type": "disease_condition_syndrome",
            "weight": 90.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_3e13bc38c5190475717d",
            "label": "Carcinoma / malignant epithelial neoplasm",
            "type": "diagnostic_result",
            "weight": 246.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_2c8e1362e401d9477cef",
            "label": "Bicarbonate / CO2, serum",
            "type": "lab_test",
            "weight": 222.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_5a339dc389717b9b2d69",
            "label": "methimazole",
            "type": "medication",
            "weight": 81.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_877ac5604f4b1b29cde5",
            "label": "propranolol",
            "type": "medication",
            "weight": 217.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_35b985131688b3381e9e",
            "label": "calcium gluconate",
            "type": "medication",
            "weight": 88.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_964ffb1e96b185a202c5",
            "label": "magnesium sulfate",
            "type": "medication",
            "weight": 91.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_6f62cb7366f2a8e5aec5",
            "label": "Glucose, plasma, fasting",
            "type": "lab_test",
            "weight": 566.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_daf4e9a21808f9b31cf5",
            "label": "lorazepam",
            "type": "medication",
            "weight": 136.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_5b4d8272c4bfe7856275",
            "label": "clopidogrel",
            "type": "medication",
            "weight": 113.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_7bcd0bb181898031ec56",
            "label": "metronidazole",
            "type": "medication",
            "weight": 101.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_9e4ef3b4cf542a79e4bb",
            "label": "cefazolin",
            "type": "medication",
            "weight": 60.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_1b1f2d61b745f77d2c60",
            "label": "Regurgitation",
            "type": "physical_exam_symptom",
            "weight": 124.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_3af81d4a021a9ac71763",
            "label": "Staphylococcus aureus",
            "type": "etiology_factor",
            "weight": 86.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_e1236377aa4557dd761c",
            "label": "Folate, serum",
            "type": "lab_test",
            "weight": 71.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_e24f104eda9ad8c802d7",
            "label": "Vitamin B12, serum",
            "type": "lab_test",
            "weight": 125.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_081196a0c8762116d434",
            "label": "salmeterol",
            "type": "medication",
            "weight": 60.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_304d648ad82376977722",
            "label": "CT angiography",
            "type": "imaging_test",
            "weight": 108.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_9adb0b2aa38fc77d221e",
            "label": "Echocardiography",
            "type": "imaging_test",
            "weight": 198.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_d7f1909644e4018c81dd",
            "label": "empagliflozin",
            "type": "medication",
            "weight": 139.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_f6bb4ab154c48817c2e3",
            "label": "metformin",
            "type": "medication",
            "weight": 517.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_ea8be020a35c67b81a34",
            "label": "Primarily ethics",
            "type": "disease_condition_syndrome",
            "weight": 55.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_596421b721a1e14fbf14",
            "label": "Alcohol use disorder or heavy alcohol use",
            "type": "etiology_factor",
            "weight": 437.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_868560127f8def54da61",
            "label": "Tobacco smoking",
            "type": "etiology_factor",
            "weight": 173.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_5088946db4d78d9a44c3",
            "label": "Neoplasms",
            "type": "disease_condition_syndrome",
            "weight": 279.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_61be5ae19c7e5db9852e",
            "label": "isoniazid",
            "type": "medication",
            "weight": 75.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_437e199ec345d14ba0ce",
            "label": "CT scan",
            "type": "imaging_test",
            "weight": 593.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_a67c9f5fb13439312b18",
            "label": "Diagnostic laparoscopy",
            "type": "diagnostic_test",
            "weight": 44.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_456cad8ce4d3794748ec",
            "label": "phenytoin",
            "type": "medication",
            "weight": 124.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_4a91ee49af25fc3c3c57",
            "label": "fluoxetine",
            "type": "medication",
            "weight": 131.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_c1432dc92dcc1bebf3f1",
            "label": "bupropion",
            "type": "medication",
            "weight": 63.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_b01ce3b3c9d1cfce9c69",
            "label": "labetalol",
            "type": "medication",
            "weight": 153.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_421d3df870c5d3f1a771",
            "label": "amlodipine",
            "type": "medication",
            "weight": 335.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_bd4a33df7faabf88a67f",
            "label": "Chest radiograph PA/lateral",
            "type": "imaging_test",
            "weight": 120.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_c7eba495c033350cdc34",
            "label": "penicillin G",
            "type": "medication",
            "weight": 87.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_0e0986535101659e2f76",
            "label": "montelukast",
            "type": "medication",
            "weight": 67.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_1035b14af62e3f294c1e",
            "label": "Prothrombin time (PT)",
            "type": "lab_test",
            "weight": 117.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_26826c01cf1c2054173f",
            "label": "Arthrocentesis / synovial fluid analysis",
            "type": "diagnostic_test",
            "weight": 77.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "archetype_cf31a1f3a422908f4ac0",
            "label": "diagnosis_identification",
            "type": "answer_target_category",
            "weight": 193.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "archetype_0b4fd1d6a77c85605881",
            "label": "laboratory_test_selection",
            "type": "answer_target_category",
            "weight": 132.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_eb41bbac4bf66948f32a",
            "label": "Protein, total, serum",
            "type": "lab_test",
            "weight": 630.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "archetype_5b85ef2a9f7722a6f3b6",
            "label": "imaging_selection",
            "type": "answer_target_category",
            "weight": 45.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "archetype_c2a971faff9e0f8b28bf",
            "label": "diagnostic_or_result_interpretation",
            "type": "answer_target_category",
            "weight": 69.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "archetype_3698038f6d397a14574a",
            "label": "medication_or_pharmacologic_management",
            "type": "answer_target_category",
            "weight": 438.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_a6487c33e311ae7d5289",
            "label": "dopamine",
            "type": "medication",
            "weight": 146.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_2b2dfcea38576639ac35",
            "label": "Thyroid-stimulating hormone (TSH)",
            "type": "lab_test",
            "weight": 238.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_fd2f3a6afa9995dfb357",
            "label": "adenosine",
            "type": "medication",
            "weight": 99.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "archetype_9e16249cfb70c15d14cc",
            "label": "procedural_or_nonpharmacologic_intervention",
            "type": "answer_target_category",
            "weight": 16.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_73ab991c702a01a523be",
            "label": "surgery",
            "type": "intervention",
            "weight": 390.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "archetype_fb2116ded8ca94711496",
            "label": "risk_factor_or_etiology_reasoning",
            "type": "answer_target_category",
            "weight": 61.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_cc5d3a9f14a1bf68251b",
            "label": "epinephrine",
            "type": "medication",
            "weight": 142.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_290670df52784980ebd0",
            "label": "Adrenocorticotropic hormone (ACTH), serum",
            "type": "lab_test",
            "weight": 88.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_ca44e9c3a41eb0bc7ee0",
            "label": "allopurinol",
            "type": "medication",
            "weight": 96.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_b4f56410f373585723c9",
            "label": "alteplase",
            "type": "medication",
            "weight": 58.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_f70bebf4ce992c27f93c",
            "label": "amiodarone",
            "type": "medication",
            "weight": 107.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_1ccdff4c2f0fb9cac3d4",
            "label": "ciprofloxacin",
            "type": "medication",
            "weight": 149.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "archetype_f31db5b41cc2a81391a4",
            "label": "diagnostic_test_selection",
            "type": "answer_target_category",
            "weight": 38.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_cd16c425739b3043353f",
            "label": "Diagnostic colonoscopy",
            "type": "diagnostic_test",
            "weight": 162.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_cfa0f70ca35eb761462e",
            "label": "Beryllium exposure",
            "type": "etiology_factor",
            "weight": 151.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_3d2d59141bddde276d07",
            "label": "HLA-DQ2 / HLA-DQ8",
            "type": "etiology_factor",
            "weight": 12.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_85c1ea2de4b8eb5bb3cd",
            "label": "Ionizing radiation exposure",
            "type": "etiology_factor",
            "weight": 204.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_20e0cd22d968f122b6b0",
            "label": "Adenocarcinoma",
            "type": "diagnostic_result",
            "weight": 50.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "archetype_aa5fcaf8df5be47f3415",
            "label": "other_review_required",
            "type": "answer_target_category",
            "weight": 69.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_d7b4b77b19f43c7ac21e",
            "label": "Purpura",
            "type": "physical_exam",
            "weight": 139.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_5e16cd9e7ab1b974eff0",
            "label": "Triglycerides",
            "type": "lab_test",
            "weight": 103.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_9d9bbf5a404947bc1dc8",
            "label": "Atrioventricular septal defect",
            "type": "disease_condition_syndrome",
            "weight": 16.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b8ff492eb864d2a4f59e",
            "label": "Breast cancer",
            "type": "disease_condition_syndrome",
            "weight": 152.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "concept_8084c9a31464d5fa400f",
            "label": "Hyperthyroidism",
            "type": "disease_condition_syndrome",
            "weight": 139.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_0d84511072bec92445f0",
            "label": "Stroke",
            "type": "disease_condition_syndrome",
            "weight": 177.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "concept_9b8587835ef6ea54433a",
            "label": "carbamazepine",
            "type": "medication",
            "weight": 126.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_b6134eb131e2ebc40ae1",
            "label": "acetazolamide",
            "type": "medication",
            "weight": 95.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_ec8d268c5a9bfd8d8795",
            "label": "Tetralogy of Fallot",
            "type": "disease_condition_syndrome",
            "weight": 11.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_9d0663c2929f35e94879",
            "label": "naltrexone",
            "type": "medication",
            "weight": 49.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_fdc7a230e56d5fb79067",
            "label": "disulfiram",
            "type": "medication",
            "weight": 27.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_f9dca1dcdf3afc1069b4",
            "label": "probenecid",
            "type": "medication",
            "weight": 55.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_abd727a32fbcf3da323f",
            "label": "colchicine",
            "type": "medication",
            "weight": 93.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_b169a9675295ac591be3",
            "label": "lamotrigine",
            "type": "medication",
            "weight": 61.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_dff0d79eb8b81985745b",
            "label": "phenoxybenzamine",
            "type": "medication",
            "weight": 43.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_3b79b2b8d20e1ac804b2",
            "label": "losartan",
            "type": "medication",
            "weight": 223.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_9cc23d9b3c61b4affcec",
            "label": "atropine",
            "type": "medication",
            "weight": 58.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_fdb1ba01da5506cc4ea2",
            "label": "amoxicillin",
            "type": "medication",
            "weight": 89.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_804362bbc2e73da9ee1f",
            "label": "nitrofurantoin",
            "type": "medication",
            "weight": 31.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_7d394d6a60f18975f056",
            "label": "digoxin",
            "type": "medication",
            "weight": 96.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_0b8e9fafe19fac9146d3",
            "label": "fluticasone",
            "type": "medication",
            "weight": 78.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_0da67fdf9a7f9a3f1e0e",
            "label": "Benign paroxysmal positional vertigo",
            "type": "disease_condition_syndrome",
            "weight": 28.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_8c28f0cafa718f74ca83",
            "label": "Meniere disease",
            "type": "disease_condition_syndrome",
            "weight": 10.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_3026574d82685c198fec",
            "label": "Intraventricular hemorrhage",
            "type": "diagnostic_result",
            "weight": 8.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_548a9a1f05d0ec4b31f5",
            "label": "Hydrocephalus",
            "type": "diagnostic_result",
            "weight": 28.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_ec03571fa07f60c907c1",
            "label": "Lung cancer (clinical presentation and diagnosis)",
            "type": "disease_condition_syndrome",
            "weight": 12.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_227ae7908b228fee9669",
            "label": "Malignant mesothelioma on pleural biopsy",
            "type": "diagnostic_result",
            "weight": 28.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_8b2bc8e1492d1da695dd",
            "label": "Diagnostic hysteroscopy/endometrial biopsy",
            "type": "diagnostic_test",
            "weight": 26.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_dc41d982b065b14f0cc7",
            "label": "oseltamivir",
            "type": "medication",
            "weight": 21.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_a5a1ca2320c9c727e6bd",
            "label": "Other hemolytic anemia",
            "type": "disease_condition_syndrome",
            "weight": 40.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_7f35dd8fb51404771609",
            "label": "Hyperparathyroidism",
            "type": "disease_condition_syndrome",
            "weight": 53.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_d057b19dbbabf6eb73af",
            "label": "Pelvic ultrasound transabdominal/transvaginal",
            "type": "imaging_test",
            "weight": 18.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_12f0cdfddf6668e3e85b",
            "label": "Biopsy target / needle position",
            "type": "diagnostic_result",
            "weight": 90.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "concept_e758c250e179355575b9",
            "label": "Orthostatic hypotension",
            "type": "physical_exam",
            "weight": 32.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_338b5c8653066d765f88",
            "label": "Resting tremor",
            "type": "physical_exam",
            "weight": 31.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_688b83f1c3322eb425ef",
            "label": "Paresthesia",
            "type": "physical_exam_symptom",
            "weight": 104.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_1c973509f0c9f2d7daf7",
            "label": "Pallor",
            "type": "physical_exam",
            "weight": 113.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_549ddbc37bf3c37e60fd",
            "label": "Gastric or duodenal ulcer",
            "type": "diagnostic_result",
            "weight": 13.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_4dc2b9e1cfa5bd6edbee",
            "label": "Gastroesophageal reflux",
            "type": "disease_condition_syndrome",
            "weight": 114.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_bd0d701b60920b936a55",
            "label": "Anemia",
            "type": "lab_result",
            "weight": 162.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_f73bf9789aabe0f18326",
            "label": "Polycythemia vera and other erythrocytosis",
            "type": "disease_condition_syndrome",
            "weight": 52.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_0e3999e4bf255a754258",
            "label": "Megaloblastic anemia",
            "type": "disease_condition_syndrome",
            "weight": 35.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_2ed681d4233d6f104af3",
            "label": "succinylcholine",
            "type": "medication",
            "weight": 14.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_7d9781b3bfe1cf2a0ad1",
            "label": "rocuronium",
            "type": "medication",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_84f3525d9f209537a8a7",
            "label": "tizanidine",
            "type": "medication",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_edc34b62f787a59e5811",
            "label": "Hyporeflexia",
            "type": "physical_exam",
            "weight": 27.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_b99099671c55bddf3546",
            "label": "Babinski sign",
            "type": "physical_exam",
            "weight": 61.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_6d90d60a61a016ac2adb",
            "label": "Pronator drift",
            "type": "physical_exam",
            "weight": 15.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_99e1504de59caa549b78",
            "label": "Peptic ulcer disease (other than Helicobacter pylori)",
            "type": "disease_condition_syndrome",
            "weight": 49.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_1c739e6229d6e7361acf",
            "label": "Folate deficiency",
            "type": "laboratory_test_selection",
            "weight": 71.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_ae3e4191b7a5e0607946",
            "label": "Phenytoin",
            "type": "medication_or_pharmacologic_management",
            "weight": 22.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_f7218728b64a2ef72fee",
            "label": "Subglottic larynx",
            "type": "other_review_required",
            "weight": 21.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b086dd488eac3e121552",
            "label": "Congenital malformations of aortic and mitral valves",
            "type": "disease_condition_syndrome",
            "weight": 41.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_e373b2b12643da8672cc",
            "label": "Streptococcus sanguinis",
            "type": "other_review_required",
            "weight": 25.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_30bdc8df7c42e153e626",
            "label": "Type 2 diabetes mellitus",
            "type": "disease_condition_syndrome",
            "weight": 673.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_9b1f7812c0fd22e36137",
            "label": "Metoprolol",
            "type": "medication_or_pharmacologic_management",
            "weight": 39.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_5564fcbd85fc4e7af164",
            "label": "Antiphospholipid antibody syndrome",
            "type": "disease_condition_syndrome",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_0697e3b47efa1c9afd27",
            "label": "Dilation of the coronary sinus",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_10efe8bd2c30e64690f8",
            "label": "Generalized anxiety disorder",
            "type": "disease_condition_syndrome",
            "weight": 23.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_ae55753dc75d8fe624a6",
            "label": "Type I hypersensitivity reaction",
            "type": "other_review_required",
            "weight": 19.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_ca680497995687d4faaf",
            "label": "Nephrolithiasis",
            "type": "disease_condition_syndrome",
            "weight": 36.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_d785ae353aa3fa2c74d7",
            "label": "Hemoglobinopathies",
            "type": "disease_condition_syndrome",
            "weight": 22.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_cb850750f226808ae27e",
            "label": "Positive direct Coombs test",
            "type": "diagnostic_or_result_interpretation",
            "weight": 15.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_e8743f5279a3e0b4915f",
            "label": "Bladder carcinoma",
            "type": "disease_condition_syndrome",
            "weight": 22.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_8d9c25807e9c525269b9",
            "label": "Amifostine",
            "type": "other_review_required",
            "weight": 22.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_3bf7a32ed8a44f94db39",
            "label": "Protozoan and helminthic diseases (including malaria)",
            "type": "disease_condition_syndrome",
            "weight": 46.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_2249bf058a8d1beef978",
            "label": "60",
            "type": "other_review_required",
            "weight": 5.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_d0a649fb0bca7686c36b",
            "label": "Subarachnoid hemorrhage",
            "type": "diagnostic_result",
            "weight": 25.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_6b3f98411923467e69a5",
            "label": "Iatrogenic and postoperative CNS infections",
            "type": "disease_condition_syndrome",
            "weight": 59.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_489e22cbc9f78a18eaab",
            "label": "Spastic paralysis",
            "type": "other_review_required",
            "weight": 5.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_5803e31cb702fe903f6f",
            "label": "(including kidney failure)",
            "type": "disease_condition_syndrome",
            "weight": 16.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_8497664398a3b9e13bc1",
            "label": "Cerebral saccular aneurysm",
            "type": "other_review_required",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_375e7a57737896998110",
            "label": "Celiac disease",
            "type": "disease_condition_syndrome",
            "weight": 64.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_2fa5504de19b1e72f5fe",
            "label": "Presensitized T cells",
            "type": "other_review_required",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_c8ff3d9c77f62d7c6765",
            "label": "Cystic kidney disease (polycystic, medullary sponge, medullary cystic)",
            "type": "disease_condition_syndrome",
            "weight": 72.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_94fa3ef1335a34eaac57",
            "label": "Serum transaminase levels and platelet count",
            "type": "laboratory_test_selection",
            "weight": 24.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_f20fb406ce6d17802fe7",
            "label": "Iron deficiency anemia",
            "type": "disease_condition_syndrome",
            "weight": 40.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_7b2ec86331b9e72f03d8",
            "label": "Malignant cells present on cytology",
            "type": "diagnostic_result",
            "weight": 13.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_ad5c27cad2cb69f810ae",
            "label": "Para-aortic",
            "type": "other_review_required",
            "weight": 16.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b2719f67e28449dbf762",
            "label": "Thrombocytopenia",
            "type": "lab_result",
            "weight": 82.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_d825469d41c259a915dd",
            "label": "Neoplastic lymphocytes that stain positive for tartrate-resistant acid phosphat...",
            "type": "diagnostic_or_result_interpretation",
            "weight": 20.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_09ddbc085374fad4d3cc",
            "label": "Crohn disease including Crohn colitis",
            "type": "disease_condition_syndrome",
            "weight": 59.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_e38c20331d129f4eaf12",
            "label": "Night blindness",
            "type": "other_review_required",
            "weight": 20.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_2ecee0a3bd38b64d6cda",
            "label": "Hemorrhoids and fissures",
            "type": "disease_condition_syndrome",
            "weight": 25.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_7d67edc1a5e468283294",
            "label": "Ventricular tachycardia",
            "type": "diagnostic_result",
            "weight": 59.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "target_754f258fb85793612a19",
            "label": "Lamotrigine",
            "type": "medication_or_pharmacologic_management",
            "weight": 15.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_02c52030efcc53466af9",
            "label": "Multiple sclerosis and other demyelinating diseases",
            "type": "disease_condition_syndrome",
            "weight": 81.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_6c7b2b51b9a9a1a971a9",
            "label": "Femoral nerve",
            "type": "other_review_required",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_69b774b40e4f354ca4db",
            "label": "Parkinson disease and parkinsonism",
            "type": "disease_condition_syndrome",
            "weight": 68.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_50bda7d7751dead830b7",
            "label": "Amantadine",
            "type": "medication_or_pharmacologic_management",
            "weight": 18.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_63e1699ffabcda4dafa3",
            "label": "Phthirus pubis",
            "type": "other_review_required",
            "weight": 11.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_c117076357e138d0474d",
            "label": "Kidney transplantation",
            "type": "disease_condition_syndrome",
            "weight": 52.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_5853553d1b322c5ee583",
            "label": "MLH1",
            "type": "other_review_required",
            "weight": 16.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_84c0fd6a9a7736ffa4b2",
            "label": "Proteinuria",
            "type": "lab_result",
            "weight": 97.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_19ba37d7a45326993c44",
            "label": "Elevated c-ANCA titers",
            "type": "diagnostic_or_result_interpretation",
            "weight": 11.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_f8c34e416834e17609c6",
            "label": "Breast carcinoma or DCIS",
            "type": "diagnostic_result",
            "weight": 55.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_6fc2a259604afdd4eeb1",
            "label": "Hyperthyroidism",
            "type": "diagnosis_identification",
            "weight": 32.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_5f7bb3bc73ad0145e88c",
            "label": "Chronic bronchitis and emphysema",
            "type": "disease_condition_syndrome",
            "weight": 124.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_3c3ce37668c0d606973f",
            "label": "Albuterol",
            "type": "medication_or_pharmacologic_management",
            "weight": 15.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_6d8ba75a0c5d6864d899",
            "label": "Charcoal yeast extract agar",
            "type": "other_review_required",
            "weight": 12.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_071462e25080d91efe72",
            "label": "Adverse effect of medication",
            "type": "contraindication_or_adverse_effect",
            "weight": 43.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_61aa6f4e69d7863767ca",
            "label": "Long thoracic nerve",
            "type": "other_review_required",
            "weight": 8.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_9f5b4656b37cdfa37e69",
            "label": "Hypercholesterolemia",
            "type": "disease_condition_syndrome",
            "weight": 123.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_57139b8fb57192d8a66b",
            "label": "Accumulation of fluid in the pericardial space",
            "type": "diagnostic_or_result_interpretation",
            "weight": 19.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_9c69e30ad695f1cbce74",
            "label": "Occlusion of the posterior cerebral artery",
            "type": "risk_factor_or_etiology_reasoning",
            "weight": 12.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_14e2d8453a94c9be2505",
            "label": "Hypothyroidism",
            "type": "disease_condition_syndrome",
            "weight": 264.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "target_626d9476b10648266999",
            "label": "Gastric adenocarcinoma",
            "type": "diagnostic_or_result_interpretation",
            "weight": 12.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_c458c725e1e6452bb48d",
            "label": "Type 1 diabetes mellitus",
            "type": "disease_condition_syndrome",
            "weight": 135.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_f3abb5ecf2ee1627b920",
            "label": "Rhizopus microsporus",
            "type": "other_review_required",
            "weight": 17.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_500df01fe351d533e6fb",
            "label": "Normal sinus rhythm",
            "type": "diagnostic_result",
            "weight": 59.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_51f3b72da0c2909d56db",
            "label": "Laser photocoagulation",
            "type": "other_review_required",
            "weight": 19.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_d82aa2abf3ccf805f672",
            "label": "Retinol",
            "type": "other_review_required",
            "weight": 9.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_6de2cf669fe38eeb2cbf",
            "label": "Coronary atherosclerosis",
            "type": "disease_condition_syndrome",
            "weight": 237.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_0f2cb2adc85908024b89",
            "label": "Normal perfusion with bilateral ventilation defects",
            "type": "other_review_required",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_485d86a7d6ed645e3f80",
            "label": "General clinical presentation",
            "type": "disease_condition_syndrome",
            "weight": 49.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_3109635d747f7a7931f2",
            "label": "[object Object]",
            "type": "other_review_required",
            "weight": 132.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_e68c5a3024174cd279b5",
            "label": "spironolactone",
            "type": "medication",
            "weight": 179.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_e62a0108b8e0782c1df7",
            "label": "Spironolactone",
            "type": "medication_or_pharmacologic_management",
            "weight": 64.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_76102cf2d6b7bde1748b",
            "label": "Immunosuppression",
            "type": "etiology_factor",
            "weight": 213.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_8d151d70755df715dfa8",
            "label": "Anhedonia",
            "type": "physical_exam_symptom",
            "weight": 3.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "target_619a8b16b529524d948f",
            "label": "Major depressive disorder",
            "type": "diagnosis_identification",
            "weight": 24.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_61e8c82954049684c4c9",
            "label": "Erythema multiforme",
            "type": "disease_condition_syndrome",
            "weight": 28.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_38747590adfd0269c262",
            "label": "Erythema multiforme",
            "type": "diagnosis_identification",
            "weight": 21.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_d96939068864aafd45da",
            "label": "Gingival hyperplasia",
            "type": "physical_exam",
            "weight": 30.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_91413d7f15136598b9e6",
            "label": "Amlodipine",
            "type": "medication_or_pharmacologic_management",
            "weight": 23.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_2be202762b553115ea00",
            "label": "celecoxib",
            "type": "medication",
            "weight": 40.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_17a46625f0969bb38e1b",
            "label": "Celecoxib",
            "type": "medication_or_pharmacologic_management",
            "weight": 45.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_a4a279fb0b879fd9df86",
            "label": "Rifampin",
            "type": "medication_or_pharmacologic_management",
            "weight": 16.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_814f35355b0ddf3fb5d1",
            "label": "Hirsutism",
            "type": "physical_exam",
            "weight": 19.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_e9790d73ccc4e41d8539",
            "label": "Hypertrophic cardiomyopathies",
            "type": "disease_condition_syndrome",
            "weight": 34.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_fbeea51e1147ba199067",
            "label": "Nystagmus",
            "type": "physical_exam",
            "weight": 65.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_90ea86fa44e34af66da2",
            "label": "Dyspnea on exertion",
            "type": "physical_exam_symptom",
            "weight": 89.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_08150b5ba2797832ce98",
            "label": "fresh frozen plasma",
            "type": "medication",
            "weight": 59.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_98c9d7a8cdf981399ffa",
            "label": "No additional treatment",
            "type": "medication_or_pharmacologic_management",
            "weight": 84.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_88f3f99a2d179aee05f4",
            "label": "Autoimmune hemolytic anemia",
            "type": "disease_condition_syndrome",
            "weight": 45.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_65fd0b8f8863b1d6153d",
            "label": "Fibrinogen, plasma",
            "type": "lab_test",
            "weight": 44.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_e71bf66308d78ccfdd16",
            "label": "Travel to malaria-endemic region",
            "type": "etiology_factor",
            "weight": 59.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_0e0c5132273a5207415b",
            "label": "Barking cough",
            "type": "physical_exam_symptom",
            "weight": 6.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_3a04f9e9f70a40a31f54",
            "label": "Stridor",
            "type": "physical_exam",
            "weight": 23.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_47c78bb78f65c727872d",
            "label": "Floaters",
            "type": "physical_exam_symptom",
            "weight": 3.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "target_2d0c26b0f9434af05bdc",
            "label": "Retinal detachment",
            "type": "diagnosis_identification",
            "weight": 39.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_f3086dfd177094c7f41d",
            "label": "Photopsia",
            "type": "physical_exam_symptom",
            "weight": 6.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_a3218e0fbe07eaa6ab54",
            "label": "lacosamide",
            "type": "medication",
            "weight": 19.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_bd9a9e9fd6a75ef745a1",
            "label": "Valproate",
            "type": "other_review_required",
            "weight": 45.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b305d8366e266575048c",
            "label": "Hoarseness",
            "type": "physical_exam_symptom",
            "weight": 26.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_d66d0cd03c34428a4ecc",
            "label": "Retinal detachment",
            "type": "disease_condition_syndrome",
            "weight": 18.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_2956a28883b16213aed6",
            "label": "Bupropion",
            "type": "medication_or_pharmacologic_management",
            "weight": 28.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "target_1baccef10d45940a7bc0",
            "label": "Oral azithromycin",
            "type": "medication_or_pharmacologic_management",
            "weight": 15.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_f72f1b921858242383ac",
            "label": "Diagnostic cystoscopy",
            "type": "diagnostic_test",
            "weight": 33.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_4f982913b33058da3849",
            "label": "Cystoscopy",
            "type": "diagnostic_test_selection",
            "weight": 37.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_48a4592443431ce0a742",
            "label": "levetiracetam",
            "type": "medication",
            "weight": 34.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_47ad70daeb3d0b55f0a3",
            "label": "Squamous cell carcinoma",
            "type": "diagnostic_result",
            "weight": 28.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_4f789ce1b970cfef920d",
            "label": "Squamous cell lung carcinoma",
            "type": "diagnostic_or_result_interpretation",
            "weight": 24.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_cb5f1ba42ced2a93a9d2",
            "label": "chlorthalidone",
            "type": "medication",
            "weight": 50.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_fca50d1e6c3ac6ea7479",
            "label": "Chlorthalidone",
            "type": "medication_or_pharmacologic_management",
            "weight": 45.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_a7f93e97ec6916519d39",
            "label": "fosphenytoin",
            "type": "medication",
            "weight": 24.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_db9fa0bc4970cd2baf6e",
            "label": "Glanzmann thrombasthenia",
            "type": "other_review_required",
            "weight": 24.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_97459f542bc1669fc392",
            "label": "Magnesium sulfate",
            "type": "medication_or_pharmacologic_management",
            "weight": 30.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_a5339d00efbde9a399b2",
            "label": "ibuprofen",
            "type": "medication",
            "weight": 191.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_57e9ef0b0589df9fce85",
            "label": "Ibuprofen therapy",
            "type": "medication_or_pharmacologic_management",
            "weight": 15.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_b1971d0ef38476b3ddb6",
            "label": "Transthoracic echocardiography",
            "type": "imaging_test",
            "weight": 90.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_320c54b1e29be08aaad1",
            "label": "Transthoracic echocardiography",
            "type": "imaging_selection",
            "weight": 40.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_3446d2a398d5d328e438",
            "label": "cryoprecipitate",
            "type": "medication",
            "weight": 22.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_2d0c913ccdf3006f758d",
            "label": "Cryoprecipitate",
            "type": "medication_or_pharmacologic_management",
            "weight": 58.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_bf64749a390fc244ad7e",
            "label": "Diagnostic EGD / upper endoscopy",
            "type": "diagnostic_test",
            "weight": 137.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "target_f6640b665282615df32f",
            "label": "Upper endoscopy",
            "type": "diagnostic_test_selection",
            "weight": 27.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_0c51d72f21cdcc4ce15c",
            "label": "acetaminophen",
            "type": "medication",
            "weight": 178.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_e4fee753b2cd009550e7",
            "label": "metoprolol",
            "type": "medication",
            "weight": 310.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_92439e0139371d47ba96",
            "label": "Parathyroid hormone (PTH), serum",
            "type": "lab_test",
            "weight": 120.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_0086a2b5bdee34e1b257",
            "label": "methotrexate",
            "type": "medication",
            "weight": 132.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_9d2596fdb1181920f65f",
            "label": "Methotrexate",
            "type": "medication_or_pharmacologic_management",
            "weight": 30.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_83b638779e2673b7ac8c",
            "label": "Platelet count",
            "type": "lab_test",
            "weight": 322.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_3c445d5a408d8de48920",
            "label": "Transthoracic echocardiogram",
            "type": "imaging_test",
            "weight": 97.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_bca2cdda9fa07b7919e8",
            "label": "Female sex",
            "type": "etiology_factor",
            "weight": 2913.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_da6af5e3f18c00be7bb3",
            "label": "Pancreatic carcinoma",
            "type": "diagnostic_or_result_interpretation",
            "weight": 13.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_2ed41eb7c84ed31b6090",
            "label": "Rhinorrhea",
            "type": "physical_exam_symptom",
            "weight": 71.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_cb072af91c32f40e04cd",
            "label": "omeprazole",
            "type": "medication",
            "weight": 53.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_67959b5c74bb8ac11d9b",
            "label": "Weight gain",
            "type": "physical_exam_symptom",
            "weight": 108.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_c8dfa228c042c18704d9",
            "label": "Loss of antithrombin III",
            "type": "other_review_required",
            "weight": 49.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "target_6c74e7967a2328d86de2",
            "label": "Phenoxybenzamine",
            "type": "medication_or_pharmacologic_management",
            "weight": 19.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_4fd0df83341957be37dc",
            "label": "Jejunal atresia",
            "type": "other_review_required",
            "weight": 20.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_1a8622a7010d3e8fcd61",
            "label": "Flank pain",
            "type": "physical_exam_symptom",
            "weight": 113.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_ec4f60ef1c1e2f287929",
            "label": "Confusion",
            "type": "physical_exam_symptom",
            "weight": 197.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_16e291331f587c9423e8",
            "label": "Crackles",
            "type": "physical_exam",
            "weight": 320.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_44756420df306eceb51a",
            "label": "Amiodarone",
            "type": "medication_or_pharmacologic_management",
            "weight": 27.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_b42de94db09c0c61834f",
            "label": "Fatigue",
            "type": "physical_exam_symptom",
            "weight": 657.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_bc18e3f52ddb15850d44",
            "label": "Atrioventricular septal defect",
            "type": "diagnosis_identification",
            "weight": 5.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "target_dca5708a54e683362a48",
            "label": "Mycoplasma pneumoniae",
            "type": "other_review_required",
            "weight": 25.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_f5d3350d2ec23df4435a",
            "label": "Leukocyte count (WBC)",
            "type": "lab_test",
            "weight": 367.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "target_215569a07c73a063cd18",
            "label": "Borderline personality disorder",
            "type": "diagnosis_identification",
            "weight": 13.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_fdbf3e48e004d142841c",
            "label": "meloxicam",
            "type": "medication",
            "weight": 13.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_2e4b5676ea2cdacfe095",
            "label": "Staphylococcus epidermidis",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_1b2636c1f20ab3bd7fb8",
            "label": "Metanephrines, fractionated, plasma/urine",
            "type": "lab_test",
            "weight": 75.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_3a5d14b8faa674579ab9",
            "label": "Psychomotor retardation",
            "type": "physical_exam",
            "weight": 16.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_a91bd5a85738bc1aff6f",
            "label": "Conjunctival injection",
            "type": "physical_exam",
            "weight": 31.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_1c12e06d342abaa033e2",
            "label": "Impaired reaction time",
            "type": "diagnostic_or_result_interpretation",
            "weight": 10.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_ab14c46ff47dc69a074f",
            "label": "Macule",
            "type": "physical_exam",
            "weight": 17.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "target_98d38e19550bdc9e6984",
            "label": "Parvovirus arthritis",
            "type": "other_review_required",
            "weight": 26.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_1ce52d3e0743ba3a4a96",
            "label": "Lethargy",
            "type": "physical_exam",
            "weight": 173.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_3a263f9a7bc58fc974bf",
            "label": "Complex partial seizure",
            "type": "other_review_required",
            "weight": 3.0,
            "layerCount": 1,
            "project": "v43"
          },
          {
            "id": "concept_6e42e1b75d7e68f22390",
            "label": "Calcium, serum, total",
            "type": "lab_test",
            "weight": 91.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_3eab946400982c5fdaf5",
            "label": "Poor concentration",
            "type": "physical_exam_symptom",
            "weight": 46.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_0ccff62217d700744565",
            "label": "Flat affect",
            "type": "physical_exam",
            "weight": 55.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_e318518c8fd1e6ae52b2",
            "label": "Dry mucous membranes",
            "type": "physical_exam",
            "weight": 84.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_5051429094348ad14836",
            "label": "Hypothyroidism",
            "type": "diagnosis_identification",
            "weight": 44.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_27cf44a149ef4e4a8a77",
            "label": "Tremor",
            "type": "physical_exam_symptom",
            "weight": 102.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "target_fd7bfc6d80a0e366f356",
            "label": "Coxsackievirus",
            "type": "other_review_required",
            "weight": 14.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_94c1524ddbbaabed7315",
            "label": "Naproxen",
            "type": "medication_or_pharmacologic_management",
            "weight": 24.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "target_2c5ed7f125f2bdef04d6",
            "label": "Alteplase",
            "type": "medication_or_pharmacologic_management",
            "weight": 21.0,
            "layerCount": 2,
            "project": "v43"
          },
          {
            "id": "concept_4e1e688b6937f083ad15",
            "label": "Globulins, total",
            "type": "lab_test",
            "weight": 114.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_5af2b51ab304684b017b",
            "label": "Adenomatous polyp / tubular adenoma",
            "type": "diagnostic_result",
            "weight": 111.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_add7ea5fb2761e849357",
            "label": "Hemoglobin A1c, blood",
            "type": "lab_test",
            "weight": 134.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_7f62169d64be2eaacb23",
            "label": "Testosterone, total, serum",
            "type": "lab_test",
            "weight": 106.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_b4e92c9330c68c62ab1a",
            "label": "Dyslipidemias",
            "type": "disease_condition_syndrome",
            "weight": 365.0,
            "layerCount": 8,
            "project": "v43"
          },
          {
            "id": "concept_6ca4be11e412e322e3c5",
            "label": "Human papillomavirus",
            "type": "etiology_factor",
            "weight": 46.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_895348e9ae847ec64342",
            "label": "Albumin-creatinine ratio, urine",
            "type": "lab_test",
            "weight": 36.0,
            "layerCount": 6,
            "project": "v43"
          },
          {
            "id": "concept_ddff67b5c34505183193",
            "label": "Headache",
            "type": "physical_exam_symptom",
            "weight": 380.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_772202d6e97ee1174412",
            "label": "sumatriptan",
            "type": "medication",
            "weight": 94.0,
            "layerCount": 7,
            "project": "v43"
          },
          {
            "id": "concept_6c2c41b224e0bd83fef3",
            "label": "Malaise",
            "type": "physical_exam_symptom",
            "weight": 130.0,
            "layerCount": 3,
            "project": "v43"
          },
          {
            "id": "concept_152f519e7722b04cb99f",
            "label": "oxytocin",
            "type": "medication",
            "weight": 33.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_359a6f5ef7804b1e7a3a",
            "label": "Arterial PO2 / oxygen saturation",
            "type": "lab_test",
            "weight": 390.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_80ef96be4d3927b90247",
            "label": "Bradycardia",
            "type": "physical_exam",
            "weight": 75.0,
            "layerCount": 5,
            "project": "v43"
          },
          {
            "id": "concept_9bc3798cdc10c8393462",
            "label": "Abdominal pain",
            "type": "physical_exam_symptom",
            "weight": 445.0,
            "layerCount": 4,
            "project": "v43"
          },
          {
            "id": "concept_cdba5233b7f1855c9506",
            "label": "Weakness",
            "type": "physical_exam_symptom",
            "weight": 344.0,
            "layerCount": 6,
            "project": "v43"
          }
        ],
        "edges": [
          {
            "source": "concept_bb2fca09cb60ec22b6d6",
            "target": "target_5c84bc3967d37a1962f5",
            "sourceLabel": "Renal biopsy",
            "targetLabel": "IgA mesangial deposition",
            "sourceType": "diagnostic_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 3,
            "confidence": 1.0,
            "lift": 669.8,
            "stability": 0.9,
            "questions": "daq_1a8c5dfa1926bf1b|daq_9d97f9b909bf2f0f|daq_f19bfa21919218a6"
          },
          {
            "source": "concept_9da9dd412071609e65d6",
            "target": "target_69def33462d45f909462",
            "sourceLabel": "Fasciculations",
            "targetLabel": "Syringomyelia",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 3,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 0.7,
            "questions": "daq_0196ac17eb7bec81|daq_ad0579e471e7da38|daq_f854e66f7b095850"
          },
          {
            "source": "concept_aec157fce111869ff94f",
            "target": "target_044a5394a944cbfc7a48",
            "sourceLabel": "Hyperactive bowel sounds",
            "targetLabel": "Entamoeba histolytica",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_36f62e0e95cebe3f|daq_f17bcf80cd531cc3"
          },
          {
            "source": "concept_d907d2d6f0db531701e6",
            "target": "target_e151b830408b1576e660",
            "sourceLabel": "Hypotension",
            "targetLabel": "Splenic artery",
            "sourceType": "physical_exam",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_78d7b5bae79ac98b|daq_ccfd035db42ac156"
          },
          {
            "source": "concept_f57487d7dfcae6500f00",
            "target": "target_3a58ed487d6650dcb917",
            "sourceLabel": "Necrosis",
            "targetLabel": "Ureter",
            "sourceType": "diagnostic_result",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_16eedc386c972a97|daq_6ab5d9174d75c177"
          },
          {
            "source": "concept_641f13a8b8dbfa38babf",
            "target": "target_8d2a31cd6bebdc9c0bc1",
            "sourceLabel": "Prolonged bleeding",
            "targetLabel": "Factor VIII",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_c15431983425a23b|daq_db1bba2b4a7b6a56"
          },
          {
            "source": "concept_180b9e30f6667e2141d9",
            "target": "target_43aa74b4fd52307aaf5a",
            "sourceLabel": "Renal artery duplex ultrasound",
            "targetLabel": "Hyperplasia of juxtaglomerular cells",
            "sourceType": "imaging_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_34d2abe55cb6f578|daq_965d26e2f014a4da"
          },
          {
            "source": "concept_389fc85c83ed0e8b6330",
            "target": "target_f4ee0b20409775c35a8e",
            "sourceLabel": "lidocaine",
            "targetLabel": "Rotator cuff tear",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_0642121bb27cda6b|daq_1e65d8f885662611"
          },
          {
            "source": "concept_53665089aaa430a91ba7",
            "target": "target_3fbe6fb117c6af9a0436",
            "sourceLabel": "lithium",
            "targetLabel": "Serum thyroid-stimulating hormone",
            "sourceType": "medication",
            "targetType": "laboratory_test_selection",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_500b007f7761326a|daq_874d7c1bd79f9764"
          },
          {
            "source": "concept_3c2edc81dc98a12e3072",
            "target": "target_cc75e067116f12c74d30",
            "sourceLabel": "Cervical cytology and high-risk HPV testing",
            "targetLabel": "Diethylstilbestrol exposure in utero",
            "sourceType": "diagnostic_test",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.667,
            "lift": 1116.3,
            "stability": 1.0,
            "questions": "daq_cea0eb0d64624619|daq_e0aa8d94cdba9896"
          },
          {
            "source": "concept_81a6a475806a2b9ad2cc",
            "target": "target_76fc6345221a16a2c1ed",
            "sourceLabel": "Alpha-fetoprotein (AFP), serum",
            "targetLabel": "Amniocentesis",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_8bd9560eaab59772|daq_f70acfe651363fc8"
          },
          {
            "source": "concept_dda0afdca5640a9c6713",
            "target": "target_3e610619b4a05b58622d",
            "sourceLabel": "Bipolar disorder",
            "targetLabel": "Collecting duct",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_1447640f27432832|daq_bb942ba3ac8a60be"
          },
          {
            "source": "concept_8919d9a7af2f4f56164a",
            "target": "target_2e7d6e9154c557d1acdc",
            "sourceLabel": "Influenza virus",
            "targetLabel": "Administer inactivated influenza vaccine",
            "sourceType": "etiology_factor",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_0d9d8838dd71c925|daq_67865c5d21050302"
          },
          {
            "source": "concept_3d305a1afa8108fd1abc",
            "target": "target_c00228de53ceae516118",
            "sourceLabel": "Perfusion-only lung scan",
            "targetLabel": "Activation of antithrombin III",
            "sourceType": "imaging_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_fcd1b5c243d12990|daq_ffc23e51c39172ee"
          },
          {
            "source": "concept_c744dc4c470e1cf37387",
            "target": "target_dd25d0940606a314a31e",
            "sourceLabel": "Depression and suicide",
            "targetLabel": "2.5",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_ee106ce103b97747|daq_f8e519f8d8e52477"
          },
          {
            "source": "concept_3c121d0048f996a2bdd6",
            "target": "target_08bdb828991d4cc6f041",
            "sourceLabel": "Hallucinations",
            "targetLabel": "Haloperidol",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.333,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_1133dc5bf9a4b03a|daq_e62b33d9a6fda587"
          },
          {
            "source": "concept_b24be939253127a6de25",
            "target": "target_825b1c7ff498413b3118",
            "sourceLabel": "Nocturia",
            "targetLabel": "Somatic symptom disorder",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_a46c174a131edaba|daq_c88a4ae1ecdba00a"
          },
          {
            "source": "concept_768b713e2820130aae69",
            "target": "target_b2b9959fe94540fd286e",
            "sourceLabel": "Sodium, serum",
            "targetLabel": "Aldosteronoma",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.333,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_0ce80bd303dbecbe|daq_175a57dcf9667523"
          },
          {
            "source": "concept_13e3d44b50460ed86eba",
            "target": "target_dbe3f04c5c2c26927386",
            "sourceLabel": "Urine culture",
            "targetLabel": "Staphylococcus saprophyticus",
            "sourceType": "diagnostic_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 478.4,
            "stability": 1.0,
            "questions": "daq_53ca5123e6c0581a|daq_f0dd040eff13a0e2"
          },
          {
            "source": "concept_bff3b692ce6c337ea54d",
            "target": "target_a41464bb973443bf0520",
            "sourceLabel": "Absent bowel sounds",
            "targetLabel": "Imbalance of fluid secretion and resorption by the tunica vaginalis",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_0151c44234ca4cf9|daq_8535e0bfe06f4d8c"
          },
          {
            "source": "concept_b22c9e24fe939820d1f1",
            "target": "target_8ad53973b5565e21770c",
            "sourceLabel": "Blood urea nitrogen (BUN)",
            "targetLabel": "Diabetes mellitus",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_1f734b71c20bb3bf|daq_7ab4194ae2b1165e"
          },
          {
            "source": "concept_3388f6b1e2d62b22ac3c",
            "target": "target_ac8963931e69f6f403a6",
            "sourceLabel": "Delusions",
            "targetLabel": "Elevated serum TSH",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_d5ca5f2e249f77b9|daq_fe803cf634394bb1"
          },
          {
            "source": "concept_014659a6a5d4c0876ce6",
            "target": "target_e5cc7c99add3be52626c",
            "sourceLabel": "Healthcare exposure",
            "targetLabel": "Transfusion reaction",
            "sourceType": "etiology_factor",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_1bc73d6b818e6572|daq_3f5d10d598342db9"
          },
          {
            "source": "concept_0d065f95fc2f3af87dc0",
            "target": "target_2dd2096d06ad45709be7",
            "sourceLabel": "atorvastatin",
            "targetLabel": "Abdominal ultrasonography",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.667,
            "lift": 372.1,
            "stability": 1.0,
            "questions": "daq_105e2a9e0bc23d9a|daq_9195cbc9184ab51f"
          },
          {
            "source": "concept_a7c62276f9a3c7d6bb73",
            "target": "target_2dd2096d06ad45709be7",
            "sourceLabel": "lisinopril",
            "targetLabel": "Abdominal ultrasonography",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.667,
            "lift": 372.1,
            "stability": 1.0,
            "questions": "daq_105e2a9e0bc23d9a|daq_9195cbc9184ab51f"
          },
          {
            "source": "concept_01811926f084da12166f",
            "target": "target_be09e192e19a37b3e577",
            "sourceLabel": "Hormonal therapy (contraception, postmenopausal replacement therapy, abnormal uterine ble...",
            "targetLabel": "Pelvic ultrasound",
            "sourceType": "disease_condition_syndrome",
            "targetType": "imaging_selection",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.2,
            "lift": 334.9,
            "stability": 1.0,
            "questions": "daq_0919a77df452eb24|daq_3ce61c2cd065eebe"
          },
          {
            "source": "concept_e325917eaea65b2db0e6",
            "target": "target_852f108fb1c49ca5506a",
            "sourceLabel": "Axillary lymphadenopathy",
            "targetLabel": "Capsular invasion",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.182,
            "lift": 304.5,
            "stability": 1.0,
            "questions": "daq_0c67b61a1559a127|daq_455ae3129df72100"
          },
          {
            "source": "concept_3c121d0048f996a2bdd6",
            "target": "target_ac8963931e69f6f403a6",
            "sourceLabel": "Hallucinations",
            "targetLabel": "Elevated serum TSH",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.333,
            "lift": 279.1,
            "stability": 1.0,
            "questions": "daq_d5ca5f2e249f77b9|daq_fe803cf634394bb1"
          },
          {
            "source": "concept_882f7ac8484d8b7b1f84",
            "target": "target_dd25d0940606a314a31e",
            "sourceLabel": "Seizure",
            "targetLabel": "2.5",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 279.1,
            "stability": 1.0,
            "questions": "daq_ee106ce103b97747|daq_f8e519f8d8e52477"
          },
          {
            "source": "concept_96f63ebd579dbee9e7f9",
            "target": "target_dd25d0940606a314a31e",
            "sourceLabel": "Seizures",
            "targetLabel": "2.5",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 279.1,
            "stability": 1.0,
            "questions": "daq_ee106ce103b97747|daq_f8e519f8d8e52477"
          },
          {
            "source": "concept_2955ae3384c37da53674",
            "target": "target_46e1b4e700e8c14d09a1",
            "sourceLabel": "Pruritus",
            "targetLabel": "Angiosarcoma",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.143,
            "lift": 239.2,
            "stability": 1.0,
            "questions": "daq_0debc7f389935f5a|daq_bf01a7c672b5fddd"
          },
          {
            "source": "concept_4f2aca3457b8f61e5f3a",
            "target": "target_c01a5f5df0efac5aeaaa",
            "sourceLabel": "Peripheral edema",
            "targetLabel": "End-diastolic pressure",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.133,
            "lift": 223.3,
            "stability": 1.0,
            "questions": "daq_0b2e1d9e77cbd5e0|daq_59084e2549b3183e"
          },
          {
            "source": "concept_06db0b1da6e854acaa21",
            "target": "target_52d1579d9e9c6e57eedd",
            "sourceLabel": "Dysuria",
            "targetLabel": "Levator ani",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.111,
            "lift": 186.1,
            "stability": 1.0,
            "questions": "daq_96be54b864b6a317|daq_e67cf55e7438e45d"
          },
          {
            "source": "concept_cdf4a9082ec92a50b796",
            "target": "target_a41464bb973443bf0520",
            "sourceLabel": "Cough",
            "targetLabel": "Imbalance of fluid secretion and resorption by the tunica vaginalis",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.2,
            "lift": 167.4,
            "stability": 1.0,
            "questions": "daq_0151c44234ca4cf9|daq_8535e0bfe06f4d8c"
          },
          {
            "source": "concept_61785a12df8a2e4b78ac",
            "target": "target_825b1c7ff498413b3118",
            "sourceLabel": "Depressed mood",
            "targetLabel": "Somatic symptom disorder",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 159.5,
            "stability": 1.0,
            "questions": "daq_a46c174a131edaba|daq_c88a4ae1ecdba00a"
          },
          {
            "source": "concept_3f75d1628bb1e4b6ca40",
            "target": "target_e721f663ba392d231cba",
            "sourceLabel": "Pregnancy",
            "targetLabel": "Duodenal atresia",
            "sourceType": "etiology_factor",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.091,
            "lift": 152.2,
            "stability": 1.0,
            "questions": "daq_6a0173c487da0de8|daq_913ea6e98e3113e8"
          },
          {
            "source": "concept_3f75d1628bb1e4b6ca40",
            "target": "target_22103c5ceba570be2bf2",
            "sourceLabel": "Pregnancy",
            "targetLabel": "Maternal phenytoin therapy",
            "sourceType": "etiology_factor",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.091,
            "lift": 152.2,
            "stability": 1.0,
            "questions": "daq_aef966e25b92cb75|daq_f7c2f781c4ef8eee"
          },
          {
            "source": "concept_a27333cec40f73a1f595",
            "target": "target_b30a89d93ed36d8564e1",
            "sourceLabel": "Palpitations",
            "targetLabel": "Hypertrophic cardiomyopathy",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 139.5,
            "stability": 1.0,
            "questions": "daq_eaa6916ad5c7e352|daq_fa2f75962b80e682"
          },
          {
            "source": "concept_269a4223c2ec5debf594",
            "target": "target_c1afff040320520ba394",
            "sourceLabel": "Swelling",
            "targetLabel": "Stress fracture",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.083,
            "lift": 139.5,
            "stability": 1.0,
            "questions": "daq_255a3c4e11ca07f9|daq_89630ed348f1f837"
          },
          {
            "source": "concept_b37e3f03082a7f6401ec",
            "target": "target_c00228de53ceae516118",
            "sourceLabel": "Jugular venous distention",
            "targetLabel": "Activation of antithrombin III",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.154,
            "lift": 128.8,
            "stability": 1.0,
            "questions": "daq_fcd1b5c243d12990|daq_ffc23e51c39172ee"
          },
          {
            "source": "concept_60481edbc2f417ea2167",
            "target": "target_2e7d6e9154c557d1acdc",
            "sourceLabel": "Immunization",
            "targetLabel": "Administer inactivated influenza vaccine",
            "sourceType": "disease_condition_syndrome",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.143,
            "lift": 119.6,
            "stability": 1.0,
            "questions": "daq_0d9d8838dd71c925|daq_67865c5d21050302"
          },
          {
            "source": "concept_d37d5a5e8be9a6be7f6b",
            "target": "target_4b8a338123652f14f494",
            "sourceLabel": "Chest pain",
            "targetLabel": "Increased alveolar-arterial gradient",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.059,
            "lift": 98.5,
            "stability": 1.0,
            "questions": "daq_b92941345e08d586|daq_e37e6f1a4c87480d"
          },
          {
            "source": "concept_d37d5a5e8be9a6be7f6b",
            "target": "target_869a0f544f8d77c8164a",
            "sourceLabel": "Chest pain",
            "targetLabel": "Prolonged QT interval",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.059,
            "lift": 98.5,
            "stability": 1.0,
            "questions": "daq_7a1f73dfbea5a041|daq_f17242be7f1c0290"
          },
          {
            "source": "concept_f12f0bba4b3d7f4f0353",
            "target": "target_425719a278f225fcb95a",
            "sourceLabel": "Creatinine, serum",
            "targetLabel": "Increased venous valve reflux",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_44ee18b01ba4f909|daq_75520075d341d9a4"
          },
          {
            "source": "concept_06db0b1da6e854acaa21",
            "target": "target_3e610619b4a05b58622d",
            "sourceLabel": "Dysuria",
            "targetLabel": "Collecting duct",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.111,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_1447640f27432832|daq_bb942ba3ac8a60be"
          },
          {
            "source": "concept_b37e3f03082a7f6401ec",
            "target": "target_425719a278f225fcb95a",
            "sourceLabel": "Jugular venous distention",
            "targetLabel": "Increased venous valve reflux",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.154,
            "lift": 85.9,
            "stability": 1.0,
            "questions": "daq_44ee18b01ba4f909|daq_75520075d341d9a4"
          },
          {
            "source": "concept_a1e2af2a59645aadc6ce",
            "target": "target_b30a89d93ed36d8564e1",
            "sourceLabel": "Shortness of breath",
            "targetLabel": "Hypertrophic cardiomyopathy",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.143,
            "lift": 79.7,
            "stability": 1.0,
            "questions": "daq_eaa6916ad5c7e352|daq_fa2f75962b80e682"
          },
          {
            "source": "concept_a00b5d36214fc9d86e83",
            "target": "target_a5a2dd935139fc89c79c",
            "sourceLabel": "Abdominal guarding",
            "targetLabel": "Elevated serum CA-125 level",
            "sourceType": "physical_exam",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.043,
            "lift": 71.3,
            "stability": 1.0,
            "questions": "daq_558f65dd86317378|daq_a6f128390a0cdd22"
          },
          {
            "source": "concept_a00b5d36214fc9d86e83",
            "target": "target_69548656a926cd11c11b",
            "sourceLabel": "Abdominal guarding",
            "targetLabel": "Neostigmine therapy",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.043,
            "lift": 71.3,
            "stability": 1.0,
            "questions": "daq_4e25e5b69a104f1f|daq_d3f9070dd1a2faa0"
          },
          {
            "source": "concept_06db0b1da6e854acaa21",
            "target": "target_825b1c7ff498413b3118",
            "sourceLabel": "Dysuria",
            "targetLabel": "Somatic symptom disorder",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.111,
            "lift": 62.0,
            "stability": 1.0,
            "questions": "daq_a46c174a131edaba|daq_c88a4ae1ecdba00a"
          },
          {
            "source": "concept_c67e0a1c2d31eb0756b1",
            "target": "target_dc7eba93d5598e6cd6a5",
            "sourceLabel": "Tenderness",
            "targetLabel": "Laparoscopy",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnostic_test_selection",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.036,
            "lift": 59.8,
            "stability": 1.0,
            "questions": "daq_30a098d3c46d53d2|daq_d2fb450d404c2a5f"
          },
          {
            "source": "concept_c67e0a1c2d31eb0756b1",
            "target": "target_a3405ae0b10480fae9ca",
            "sourceLabel": "Tenderness",
            "targetLabel": "Monosodium urate",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.036,
            "lift": 59.8,
            "stability": 1.0,
            "questions": "daq_10f110bce47d343a|daq_25eda06665e504b4"
          },
          {
            "source": "concept_c67e0a1c2d31eb0756b1",
            "target": "target_67d66fcd2d70f0942e27",
            "sourceLabel": "Tenderness",
            "targetLabel": "Transvaginal ultrasound",
            "sourceType": "physical_exam_symptom",
            "targetType": "imaging_selection",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.036,
            "lift": 59.8,
            "stability": 1.0,
            "questions": "daq_7283718f9c401a08|daq_ac0456fac65168b9"
          },
          {
            "source": "concept_47821c8eebcb97b9c37c",
            "target": "target_f4404627d314bf96ba37",
            "sourceLabel": "Hemoglobin, blood",
            "targetLabel": "Conjugated estrogen therapy",
            "sourceType": "lab_test",
            "targetType": "procedural_or_nonpharmacologic_intervention",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.034,
            "lift": 56.8,
            "stability": 1.0,
            "questions": "daq_6ce96a0f652f8767|daq_c357c7ce01da3c92"
          },
          {
            "source": "concept_540b414a6527789a3334",
            "target": "target_425719a278f225fcb95a",
            "sourceLabel": "Urinalysis",
            "targetLabel": "Increased venous valve reflux",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "absent_or_negated_clue_network",
            "weight": 2,
            "confidence": 0.077,
            "lift": 42.9,
            "stability": 1.0,
            "questions": "daq_44ee18b01ba4f909|daq_75520075d341d9a4"
          },
          {
            "source": "concept_a7e14fc87817c9ff2135",
            "target": "concept_cfc4c1e5941f849383cc",
            "sourceLabel": "Anxiety",
            "targetLabel": "Personality disorders",
            "sourceType": "physical_exam_symptom",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 13,
            "confidence": 0.5,
            "lift": 104.7,
            "stability": 1.0,
            "questions": "daq_037dcc6c55e6b0ed|daq_1b6bb8ce7ddf39c7|daq_6398a7a454b542ec|daq_8e9874d87f23d278|daq_9a1686b58c0cf803|daq_bddac85f1b1e9fd0|daq_de6156693..."
          },
          {
            "source": "concept_5dfbcc7b6270e5e14dd0",
            "target": "concept_a353bdee09d8c461de8e",
            "sourceLabel": "azithromycin",
            "targetLabel": "ceftriaxone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 13,
            "confidence": 0.256,
            "lift": 14.3,
            "stability": 1.0,
            "questions": "daq_097fd7c6eceb1862|daq_1e37adb0578d3802|daq_2b3e6376eb9ec827|daq_6410a0c34cbfa67d|daq_680db61af9de964a|daq_759ff3bdfcb0059f|daq_96c415909..."
          },
          {
            "source": "concept_768b713e2820130aae69",
            "target": "concept_d366aee9a8cb5f64834d",
            "sourceLabel": "Sodium, serum",
            "targetLabel": "Potassium, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 11,
            "confidence": 0.312,
            "lift": 27.5,
            "stability": 1.0,
            "questions": "daq_040d844b178d32bb|daq_0a3a0fe3d944cd23|daq_1ee1df498a5d1a49|daq_2c489e2a81197445|daq_4014d46f6a9e6b9b|daq_4e087af4138dd433|daq_8328d1b26..."
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_b897d675badbfe965fa8",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 10,
            "confidence": 0.273,
            "lift": 15.5,
            "stability": 1.0,
            "questions": "daq_0225803f42736654|daq_0368b2b3628a147f|daq_09078defa1c44e51|daq_117ca1e95171d8ef|daq_834ec936dc046758|daq_8902e578a26f28fb|daq_bf42cdb0a..."
          },
          {
            "source": "concept_b0f86d3ecc5fb4482363",
            "target": "concept_d1347ea0f17e958c31db",
            "sourceLabel": "warfarin",
            "targetLabel": "aspirin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 10,
            "confidence": 0.29,
            "lift": 13.0,
            "stability": 1.0,
            "questions": "daq_025107da0eed9395|daq_050d885973e15e10|daq_16020d5b86dd8926|daq_2dcaa049be239a5b|daq_3dd25f1129c79936|daq_7a2f0ade1508edae|daq_ae774774e..."
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_a72d7b76b0b3f82dc3c5",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "doxycycline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 9,
            "confidence": 0.242,
            "lift": 17.3,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_0ae0771d0eee1c76|daq_2b3e6376eb9ec827|daq_33ee0f57e29e721d|daq_3d6e943b3909d221|daq_4e11a5034a4bb2c2|daq_6410a0c34..."
          },
          {
            "source": "concept_c744dc4c470e1cf37387",
            "target": "concept_dda0afdca5640a9c6713",
            "sourceLabel": "Depression and suicide",
            "targetLabel": "Bipolar disorder",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 8,
            "confidence": 0.778,
            "lift": 173.7,
            "stability": 1.0,
            "questions": "daq_118faa48ec10e085|daq_2b110c199bd67a69|daq_501c7ae2605f4efc|daq_56a05a7af2c1dcf4|daq_9a16390c1d80ad61|daq_bddac85f1b1e9fd0|daq_e5e61c052..."
          },
          {
            "source": "concept_1739ba9369248f90e602",
            "target": "concept_da3210fc8ff2ba18fa06",
            "sourceLabel": "Magnesium, serum",
            "targetLabel": "Phosphorus, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 8,
            "confidence": 0.3,
            "lift": 34.6,
            "stability": 1.0,
            "questions": "daq_10f110bce47d343a|daq_25eda06665e504b4|daq_512b471895a03350|daq_bf72c1e337ada69d|daq_d3de645a42e904ff|daq_f9ed5a88dcf61299"
          },
          {
            "source": "concept_0e3ec5cd173ebde4497e",
            "target": "concept_400778ba474021c4fdaa",
            "sourceLabel": "albuterol",
            "targetLabel": "tiotropium",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 8,
            "confidence": 0.188,
            "lift": 33.0,
            "stability": 1.0,
            "questions": "daq_02add236a44b73b7|daq_293f01ac91f065f2|daq_29877509974dee13|daq_4cd530f9fa957bfd|daq_58cee4ab0518b42f|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_882f7ac8484d8b7b1f84",
            "target": "concept_96f63ebd579dbee9e7f9",
            "sourceLabel": "Seizure",
            "targetLabel": "Seizures",
            "sourceType": "physical_exam_symptom",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 7,
            "confidence": 1.0,
            "lift": 372.1,
            "stability": 1.0,
            "questions": "daq_0ab15ca3246a3f5f|daq_37d46e5d2e189b4b|daq_50c1f46cc336f610|daq_f0c92e6caf6dfde0"
          },
          {
            "source": "concept_b897d675badbfe965fa8",
            "target": "concept_e03a666b844e04b921c6",
            "sourceLabel": "vancomycin",
            "targetLabel": "cefepime",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 7,
            "confidence": 0.318,
            "lift": 41.0,
            "stability": 1.0,
            "questions": "daq_1dc7ea14514c07ce|daq_6a67520993ba905e|daq_73b79cf65ce0f065|daq_bb55c5b330f2209c|daq_bf42cdb0ab1f9d70|daq_c9a00f1875ad66e2|daq_db255d18e..."
          },
          {
            "source": "concept_0e3ec5cd173ebde4497e",
            "target": "concept_4082164fa589eaac1250",
            "sourceLabel": "albuterol",
            "targetLabel": "theophylline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 7,
            "confidence": 0.156,
            "lift": 30.8,
            "stability": 1.0,
            "questions": "daq_293f01ac91f065f2|daq_29877509974dee13|daq_4cd530f9fa957bfd|daq_58cee4ab0518b42f|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_9c03657c38e066ad88d1",
            "target": "concept_b6e7e8b0541e65193e2c",
            "sourceLabel": "ampicillin",
            "targetLabel": "gentamicin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 7,
            "confidence": 0.2,
            "lift": 29.1,
            "stability": 1.0,
            "questions": "daq_0390c18e5616c14a|daq_05e1e11ca6dd05f1|daq_2f08843cfcc95c13|daq_5e719d6a9442b4d8|daq_dc2b79e3a8337695"
          },
          {
            "source": "concept_768b713e2820130aae69",
            "target": "concept_ad347bf2061c398b0715",
            "sourceLabel": "Sodium, serum",
            "targetLabel": "Chloride, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 7,
            "confidence": 0.125,
            "lift": 23.3,
            "stability": 1.0,
            "questions": "daq_2c489e2a81197445|daq_689dd35cf88a669c|daq_c0cf49a867d77a8c|daq_f22340938fead836"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_dee1c098518a09430172",
            "sourceLabel": "rifampin",
            "targetLabel": "pyrazinamide",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 7,
            "confidence": 0.113,
            "lift": 10.8,
            "stability": 1.0,
            "questions": "daq_0729394cdb452e25|daq_28f34b90735065d3|daq_3855e111fd2d51fa|daq_4996068a9f6af2da|daq_8cebbf1c5a8227fb|daq_df6122e6c484bab3|daq_f036e74c4..."
          },
          {
            "source": "concept_3d3ab8ec5a11009e15ad",
            "target": "concept_69b4184b1723636f8eac",
            "sourceLabel": "Respiratory alkalosis",
            "targetLabel": "Metabolic acidosis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.5,
            "lift": 209.3,
            "stability": 1.0,
            "questions": "daq_74f868b78a99ac68|daq_c00e7050ae9ee461"
          },
          {
            "source": "concept_d100873584c43dbd7201",
            "target": "concept_dee1c098518a09430172",
            "sourceLabel": "ethambutol",
            "targetLabel": "pyrazinamide",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.857,
            "lift": 82.0,
            "stability": 1.0,
            "questions": "daq_0729394cdb452e25|daq_28f34b90735065d3|daq_3855e111fd2d51fa|daq_8cebbf1c5a8227fb|daq_df6122e6c484bab3|daq_f036e74c40d0ae72"
          },
          {
            "source": "concept_b142598153646a78c945",
            "target": "concept_cfc4c1e5941f849383cc",
            "sourceLabel": "Obsessive-compulsive disorder",
            "targetLabel": "Personality disorders",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.444,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_56a05a7af2c1dcf4|daq_6398a7a454b542ec|daq_9a1686b58c0cf803|daq_bddac85f1b1e9fd0"
          },
          {
            "source": "concept_1c0beaf2829e21fab3bd",
            "target": "concept_3e13bc38c5190475717d",
            "sourceLabel": "Sarcoidosis",
            "targetLabel": "Carcinoma / malignant epithelial neoplasm",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_result",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.222,
            "lift": 82.7,
            "stability": 1.0,
            "questions": "daq_062112b83ca48e8c|daq_ace5aa3f171e33f8|daq_ad122febb35c1a2c|daq_d8a7d257bc06151c"
          },
          {
            "source": "concept_2c8e1362e401d9477cef",
            "target": "concept_768b713e2820130aae69",
            "sourceLabel": "Bicarbonate / CO2, serum",
            "targetLabel": "Sodium, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.462,
            "lift": 48.3,
            "stability": 1.0,
            "questions": "daq_0a3a0fe3d944cd23|daq_260f61013a68281a|daq_61b7e6216d6977eb|daq_d9200463f3bd3082|daq_f22340938fead836|daq_ff190d6b0d887f2b"
          },
          {
            "source": "concept_5a339dc389717b9b2d69",
            "target": "concept_877ac5604f4b1b29cde5",
            "sourceLabel": "methimazole",
            "targetLabel": "propranolol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.375,
            "lift": 32.2,
            "stability": 1.0,
            "questions": "daq_1e94ee4ea52ccffa|daq_2bb442afc7239d36|daq_2e2ef11baeead067|daq_956a0be814b43a53|daq_c604ead58030b289|daq_dc2b79e3a8337695"
          },
          {
            "source": "concept_35b985131688b3381e9e",
            "target": "concept_964ffb1e96b185a202c5",
            "sourceLabel": "calcium gluconate",
            "targetLabel": "magnesium sulfate",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.148,
            "lift": 38.2,
            "stability": 1.0,
            "questions": "daq_097562331a1d9199|daq_111cdb66f89cb593|daq_a148d1faaeff72cd|daq_cda3020fd1d701d5"
          },
          {
            "source": "concept_6f62cb7366f2a8e5aec5",
            "target": "concept_d366aee9a8cb5f64834d",
            "sourceLabel": "Glucose, plasma, fasting",
            "targetLabel": "Potassium, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.333,
            "lift": 29.4,
            "stability": 1.0,
            "questions": "daq_1ee1df498a5d1a49|daq_3f6587d90258ac77|daq_4e087af4138dd433|daq_8328d1b2603e14d0|daq_8f77cae7da9f56da|daq_9245948a105c23ba"
          },
          {
            "source": "concept_964ffb1e96b185a202c5",
            "target": "concept_daf4e9a21808f9b31cf5",
            "sourceLabel": "magnesium sulfate",
            "targetLabel": "lorazepam",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.267,
            "lift": 21.8,
            "stability": 1.0,
            "questions": "daq_097562331a1d9199|daq_8ff8d0c9ecb515bb|daq_a148d1faaeff72cd|daq_cda3020fd1d701d5"
          },
          {
            "source": "concept_5b4d8272c4bfe7856275",
            "target": "concept_d1347ea0f17e958c31db",
            "sourceLabel": "clopidogrel",
            "targetLabel": "aspirin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.316,
            "lift": 14.1,
            "stability": 1.0,
            "questions": "daq_078aa446a3fa82f9|daq_07d6a8bfc0073e2e|daq_2dcaa049be239a5b|daq_3dd25f1129c79936|daq_7d93271ed7e2f658|daq_b8e0de5b0029f59f"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_d100873584c43dbd7201",
            "sourceLabel": "rifampin",
            "targetLabel": "ethambutol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.097,
            "lift": 12.5,
            "stability": 1.0,
            "questions": "daq_0729394cdb452e25|daq_28f34b90735065d3|daq_3855e111fd2d51fa|daq_8cebbf1c5a8227fb|daq_df6122e6c484bab3|daq_f036e74c40d0ae72"
          },
          {
            "source": "concept_7bcd0bb181898031ec56",
            "target": "concept_b897d675badbfe965fa8",
            "sourceLabel": "metronidazole",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.188,
            "lift": 10.6,
            "stability": 1.0,
            "questions": "daq_117ca1e95171d8ef|daq_137d4e9269f8a100|daq_8902e578a26f28fb"
          },
          {
            "source": "concept_5dfbcc7b6270e5e14dd0",
            "target": "concept_a72d7b76b0b3f82dc3c5",
            "sourceLabel": "azithromycin",
            "targetLabel": "doxycycline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.103,
            "lift": 7.3,
            "stability": 1.0,
            "questions": "daq_2b3e6376eb9ec827|daq_5201831610cd082f|daq_6410a0c34cbfa67d|daq_9c6a81c615f7a2fb"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_b897d675badbfe965fa8",
            "sourceLabel": "rifampin",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.032,
            "lift": 1.8,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_0f814eb7ed524750"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_9e4ef3b4cf542a79e4bb",
            "sourceLabel": "rifampin",
            "targetLabel": "cefazolin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 6,
            "confidence": 0.048,
            "lift": 23.1,
            "stability": 0.8,
            "questions": "daq_0f814eb7ed524750|daq_2f08843cfcc95c13|daq_dce482de2ccaf00c"
          },
          {
            "source": "concept_1b1f2d61b745f77d2c60",
            "target": "concept_3af81d4a021a9ac71763",
            "sourceLabel": "Regurgitation",
            "targetLabel": "Staphylococcus aureus",
            "sourceType": "physical_exam_symptom",
            "targetType": "etiology_factor",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.455,
            "lift": 253.7,
            "stability": 1.0,
            "questions": "daq_74cab80041989439|daq_7af833374bfa12b0|daq_7dc590dd34315fbd|daq_c8dfac79405efbe4|daq_da846ee540a5e15a"
          },
          {
            "source": "concept_e1236377aa4557dd761c",
            "target": "concept_e24f104eda9ad8c802d7",
            "sourceLabel": "Folate, serum",
            "targetLabel": "Vitamin B12, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.714,
            "lift": 184.0,
            "stability": 1.0,
            "questions": "daq_0825ec8bff0f7922|daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_400778ba474021c4fdaa",
            "target": "concept_4082164fa589eaac1250",
            "sourceLabel": "tiotropium",
            "targetLabel": "theophylline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.385,
            "lift": 75.8,
            "stability": 1.0,
            "questions": "daq_293f01ac91f065f2|daq_29877509974dee13|daq_4cd530f9fa957bfd|daq_58cee4ab0518b42f|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_081196a0c8762116d434",
            "target": "concept_0e3ec5cd173ebde4497e",
            "sourceLabel": "salmeterol",
            "targetLabel": "albuterol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.267,
            "lift": 81.2,
            "stability": 1.0,
            "questions": "daq_011ad0c92392d50a|daq_02c924bf75940d12|daq_293f01ac91f065f2|daq_29877509974dee13"
          },
          {
            "source": "concept_304d648ad82376977722",
            "target": "concept_9adb0b2aa38fc77d221e",
            "sourceLabel": "CT angiography",
            "targetLabel": "Echocardiography",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.357,
            "lift": 59.8,
            "stability": 1.0,
            "questions": "daq_1e041e5c988b9a4b|daq_25c4120d5ed2172b|daq_3e340c286658e5df|daq_a0ead18b78e0d4ef|daq_c299cae0105268bc"
          },
          {
            "source": "concept_d7f1909644e4018c81dd",
            "target": "concept_f6bb4ab154c48817c2e3",
            "sourceLabel": "empagliflozin",
            "targetLabel": "metformin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 1.0,
            "lift": 67.0,
            "stability": 1.0,
            "questions": "daq_09db2f69fc1a24e1|daq_0c02a7d778f6e59c|daq_15a1011944ef9269|daq_2152771caadc5199"
          },
          {
            "source": "concept_014659a6a5d4c0876ce6",
            "target": "concept_ea8be020a35c67b81a34",
            "sourceLabel": "Healthcare exposure",
            "targetLabel": "Primarily ethics",
            "sourceType": "etiology_factor",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.156,
            "lift": 58.1,
            "stability": 1.0,
            "questions": "daq_06cad90e2697e97b|daq_74c6738838e852c1|daq_aeeb8261eb172e23|daq_cf5701c3d471e949|daq_edc19dbc237a74fb"
          },
          {
            "source": "concept_596421b721a1e14fbf14",
            "target": "concept_868560127f8def54da61",
            "sourceLabel": "Alcohol use disorder or heavy alcohol use",
            "targetLabel": "Tobacco smoking",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.179,
            "lift": 54.4,
            "stability": 1.0,
            "questions": "daq_2304e95514fd6f85|daq_79746d25c03af922|daq_cea0eb0d64624619|daq_d11daec43f06b48a|daq_e0aa8d94cdba9896"
          },
          {
            "source": "concept_3e13bc38c5190475717d",
            "target": "concept_5088946db4d78d9a44c3",
            "sourceLabel": "Carcinoma / malignant epithelial neoplasm",
            "targetLabel": "Neoplasms",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.238,
            "lift": 53.2,
            "stability": 1.0,
            "questions": "daq_08b2eeedcc0f75a5|daq_4360ad530a3c954b|daq_596a83ad330f2046|daq_ad122febb35c1a2c|daq_fcd8edf654077b9a"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_61be5ae19c7e5db9852e",
            "sourceLabel": "rifampin",
            "targetLabel": "isoniazid",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.081,
            "lift": 30.0,
            "stability": 1.0,
            "questions": "daq_0729394cdb452e25|daq_28f34b90735065d3|daq_3855e111fd2d51fa|daq_df6122e6c484bab3|daq_f036e74c40d0ae72"
          },
          {
            "source": "concept_437e199ec345d14ba0ce",
            "target": "concept_a67c9f5fb13439312b18",
            "sourceLabel": "CT scan",
            "targetLabel": "Diagnostic laparoscopy",
            "sourceType": "imaging_test",
            "targetType": "diagnostic_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.079,
            "lift": 29.5,
            "stability": 1.0,
            "questions": "daq_06184582af6d37fb|daq_0919a77df452eb24|daq_46241f1dd42f06fa|daq_59f91d3908226796|daq_d2fb450d404c2a5f"
          },
          {
            "source": "concept_6f62cb7366f2a8e5aec5",
            "target": "concept_768b713e2820130aae69",
            "sourceLabel": "Glucose, plasma, fasting",
            "targetLabel": "Sodium, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.278,
            "lift": 29.1,
            "stability": 1.0,
            "questions": "daq_122d66fd9acad22c|daq_1ee1df498a5d1a49|daq_4e087af4138dd433|daq_8328d1b2603e14d0|daq_f690e33739aad76d"
          },
          {
            "source": "concept_61be5ae19c7e5db9852e",
            "target": "concept_d100873584c43dbd7201",
            "sourceLabel": "isoniazid",
            "targetLabel": "ethambutol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.208,
            "lift": 26.8,
            "stability": 1.0,
            "questions": "daq_0729394cdb452e25|daq_28f34b90735065d3|daq_3855e111fd2d51fa|daq_df6122e6c484bab3|daq_f036e74c40d0ae72"
          },
          {
            "source": "concept_456cad8ce4d3794748ec",
            "target": "concept_596421b721a1e14fbf14",
            "sourceLabel": "phenytoin",
            "targetLabel": "Alcohol use disorder or heavy alcohol use",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.119,
            "lift": 23.5,
            "stability": 1.0,
            "questions": "daq_0d84066956b04bcc|daq_868b533973f6096e|daq_aef966e25b92cb75|daq_d066e1452dcac389|daq_f7c2f781c4ef8eee"
          },
          {
            "source": "concept_4a91ee49af25fc3c3c57",
            "target": "concept_c1432dc92dcc1bebf3f1",
            "sourceLabel": "fluoxetine",
            "targetLabel": "bupropion",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.143,
            "lift": 25.2,
            "stability": 1.0,
            "questions": "daq_0f449320f6b0b7b0|daq_8290e4620407ecb9|daq_b8b96d8fa4375acc|daq_dcb51a747a404b59"
          },
          {
            "source": "concept_61be5ae19c7e5db9852e",
            "target": "concept_dee1c098518a09430172",
            "sourceLabel": "isoniazid",
            "targetLabel": "pyrazinamide",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.208,
            "lift": 19.9,
            "stability": 1.0,
            "questions": "daq_0729394cdb452e25|daq_28f34b90735065d3|daq_3855e111fd2d51fa|daq_df6122e6c484bab3|daq_f036e74c40d0ae72"
          },
          {
            "source": "concept_964ffb1e96b185a202c5",
            "target": "concept_b01ce3b3c9d1cfce9c69",
            "sourceLabel": "magnesium sulfate",
            "targetLabel": "labetalol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.2,
            "lift": 24.8,
            "stability": 1.0,
            "questions": "daq_07edd8e7fca483dc|daq_097562331a1d9199|daq_cda3020fd1d701d5"
          },
          {
            "source": "concept_421d3df870c5d3f1a771",
            "target": "concept_a7c62276f9a3c7d6bb73",
            "sourceLabel": "amlodipine",
            "targetLabel": "lisinopril",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.156,
            "lift": 19.4,
            "stability": 1.0,
            "questions": "daq_05feabbb75d87a15|daq_07f3993951786115|daq_0914430af8b6caa8|daq_17149cfcc80b056e|daq_95daf40422bc21bd"
          },
          {
            "source": "concept_437e199ec345d14ba0ce",
            "target": "concept_bd4a33df7faabf88a67f",
            "sourceLabel": "CT scan",
            "targetLabel": "Chest radiograph PA/lateral",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.079,
            "lift": 15.6,
            "stability": 1.0,
            "questions": "daq_27f3973b87cd39eb|daq_2eaa611b67989854|daq_5eaa0e3f66c2d660|daq_6c88dbb42bdeb484|daq_db157ae3baaac70d"
          },
          {
            "source": "concept_9c03657c38e066ad88d1",
            "target": "concept_a353bdee09d8c461de8e",
            "sourceLabel": "ampicillin",
            "targetLabel": "ceftriaxone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.2,
            "lift": 11.2,
            "stability": 1.0,
            "questions": "daq_0225803f42736654|daq_09078defa1c44e51|daq_2f08843cfcc95c13|daq_dce482de2ccaf00c|daq_e680cd57f44d1bda"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_c7eba495c033350cdc34",
            "sourceLabel": "rifampin",
            "targetLabel": "penicillin G",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.081,
            "lift": 8.7,
            "stability": 1.0,
            "questions": "daq_28f34b90735065d3|daq_2f08843cfcc95c13|daq_6b96fd6d97120087|daq_84350a9fa6341477|daq_df6122e6c484bab3"
          },
          {
            "source": "concept_9c03657c38e066ad88d1",
            "target": "concept_b897d675badbfe965fa8",
            "sourceLabel": "ampicillin",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.16,
            "lift": 9.1,
            "stability": 1.0,
            "questions": "daq_0225803f42736654|daq_09078defa1c44e51|daq_7ae5b40aaa435eb3|daq_e680cd57f44d1bda"
          },
          {
            "source": "concept_0e0986535101659e2f76",
            "target": "concept_400778ba474021c4fdaa",
            "sourceLabel": "montelukast",
            "targetLabel": "tiotropium",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.208,
            "lift": 36.7,
            "stability": 0.9,
            "questions": "daq_12f6545d6a321bf7|daq_293f01ac91f065f2|daq_4cd530f9fa957bfd|daq_68577862c44ea283|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_0e0986535101659e2f76",
            "target": "concept_0e3ec5cd173ebde4497e",
            "sourceLabel": "montelukast",
            "targetLabel": "albuterol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.125,
            "lift": 38.1,
            "stability": 0.9,
            "questions": "daq_293f01ac91f065f2|daq_4cd530f9fa957bfd|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_1035b14af62e3f294c1e",
            "target": "concept_26826c01cf1c2054173f",
            "sourceLabel": "Prothrombin time (PT)",
            "targetLabel": "Arthrocentesis / synovial fluid analysis",
            "sourceType": "lab_test",
            "targetType": "diagnostic_test",
            "layer": "answer_choice_cooccurrence",
            "weight": 5,
            "confidence": 0.214,
            "lift": 239.2,
            "stability": 0.8,
            "questions": "daq_25ff55bb05cda7f1|daq_7693e8c751b8af23|daq_9fbf8fef05bc4bdb"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_cfc4c1e5941f849383cc",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Personality disorders",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 18,
            "confidence": 0.093,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_037dcc6c55e6b0ed|daq_0c972e2b3d53c9be|daq_177d3dc483e3b584|daq_1b6bb8ce7ddf39c7|daq_24b5db217d3868d8|daq_2dd56237047258ca|daq_56a05a7af..."
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_eb41bbac4bf66948f32a",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Protein, total, serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 17,
            "confidence": 0.129,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_003265cb17534dab|daq_00ab29e8345ef6e6|daq_0284687d9f7f8805|daq_050e79c1d7177a24|daq_1ae5101e87050bdf|daq_36c25985f62b6d7d|daq_3e8a124c7..."
          },
          {
            "source": "archetype_5b85ef2a9f7722a6f3b6",
            "target": "concept_437e199ec345d14ba0ce",
            "sourceLabel": "imaging_selection",
            "targetLabel": "CT scan",
            "sourceType": "answer_target_category",
            "targetType": "imaging_test",
            "layer": "answer_target_archetype_network",
            "weight": 13,
            "confidence": 0.289,
            "lift": 74.4,
            "stability": 1.0,
            "questions": "daq_01d28fda3685c2e2|daq_06184582af6d37fb|daq_07efb4695becc490|daq_0af0377c8ee5b99a|daq_27f3973b87cd39eb|daq_2fa039a1463ee32e|daq_46241f1dd..."
          },
          {
            "source": "archetype_c2a971faff9e0f8b28bf",
            "target": "concept_3e13bc38c5190475717d",
            "sourceLabel": "diagnostic_or_result_interpretation",
            "targetLabel": "Carcinoma / malignant epithelial neoplasm",
            "sourceType": "answer_target_category",
            "targetType": "diagnostic_result",
            "layer": "answer_target_archetype_network",
            "weight": 13,
            "confidence": 0.188,
            "lift": 48.5,
            "stability": 1.0,
            "questions": "daq_002b57cb819c1ca4|daq_04b98d5614d2e41b|daq_062112b83ca48e8c|daq_07ae3e90bd0868e3|daq_08b2eeedcc0f75a5|daq_0bef6913d9a270dd|daq_571a069aa..."
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_768b713e2820130aae69",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Sodium, serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 11,
            "confidence": 0.083,
            "lift": 23.3,
            "stability": 1.0,
            "questions": "daq_000b8649f11903e9|daq_009685935680dd5b|daq_0a3a0fe3d944cd23|daq_61b7e6216d6977eb|daq_689dd35cf88a669c|daq_c13a1d68b4dc4972|daq_c5f8733c5..."
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_a6487c33e311ae7d5289",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "dopamine",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 10,
            "confidence": 0.023,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_002b78d32764d39e|daq_0e6a809d0460f475|daq_1fb9ef9207fba435|daq_3485597de9b77ce5|daq_3bf7cd86aa60c3d2|daq_48bc8ce174313ae1|daq_929547f7f..."
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_d366aee9a8cb5f64834d",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Potassium, serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 9,
            "confidence": 0.068,
            "lift": 22.8,
            "stability": 1.0,
            "questions": "daq_1233576e6f59679c|daq_2c489e2a81197445|daq_3f6587d90258ac77|daq_4e087af4138dd433|daq_50faea0ace10f788|daq_73bcefb6875d8583|daq_8328d1b26..."
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_a353bdee09d8c461de8e",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "ceftriaxone",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 9,
            "confidence": 0.021,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_0ae0771d0eee1c76|daq_117ca1e95171d8ef|daq_2f08843cfcc95c13|daq_33ee0f57e29e721d|daq_3d6e943b3909d221|daq_4e11a5034..."
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_6f62cb7366f2a8e5aec5",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Glucose, plasma, fasting",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 8,
            "confidence": 0.061,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_04af3fdfe5cad444|daq_0ab890911e8454d9|daq_3753b5bdb31e21ac|daq_717b9d8c8d9f7e83|daq_c00440a06ebbc5d5|daq_d066e1452dcac389|daq_f1df003b9..."
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_da3210fc8ff2ba18fa06",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Phosphorus, serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 8,
            "confidence": 0.061,
            "lift": 22.6,
            "stability": 1.0,
            "questions": "daq_31802c22fc4ecacb|daq_52de6e0fa3e57dd0|daq_6732556ce6469629|daq_a2642eb40cfe2a92|daq_a6c10ed3584bfa55|daq_d3de645a42e904ff|daq_e852cf5a1..."
          },
          {
            "source": "archetype_c2a971faff9e0f8b28bf",
            "target": "concept_f57487d7dfcae6500f00",
            "sourceLabel": "diagnostic_or_result_interpretation",
            "targetLabel": "Necrosis",
            "sourceType": "answer_target_category",
            "targetType": "diagnostic_result",
            "layer": "answer_target_archetype_network",
            "weight": 7,
            "confidence": 0.101,
            "lift": 48.5,
            "stability": 1.0,
            "questions": "daq_018617a8f64aec12|daq_2fec11b53ddf1cbd|daq_4f930acf405da072|daq_7b91ced9e9411d13|daq_88c1ec8a9c55deaf|daq_8fac679544cdfe9c|daq_9e484ef49..."
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_2b2dfcea38576639ac35",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Thyroid-stimulating hormone (TSH)",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 7,
            "confidence": 0.053,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_081072adaca9b19a|daq_15d6686e10c44b28|daq_500b007f7761326a|daq_874d7c1bd79f9764|daq_890a9fc60f33760a|daq_9be329072da43c00|daq_c7e8060a6..."
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_fd2f3a6afa9995dfb357",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "adenosine",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 7,
            "confidence": 0.016,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_07c252eaa20f202d|daq_1115e128af0b1ae2|daq_11a4b601f2b56182|daq_4c8149a842f0d749|daq_81dc32549292bb6c|daq_922aa9334ed2d637|daq_e3de7adb1..."
          },
          {
            "source": "archetype_9e16249cfb70c15d14cc",
            "target": "concept_73ab991c702a01a523be",
            "sourceLabel": "procedural_or_nonpharmacologic_intervention",
            "targetLabel": "surgery",
            "sourceType": "answer_target_category",
            "targetType": "intervention",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.375,
            "lift": 179.4,
            "stability": 1.0,
            "questions": "daq_076d991d25ec242c|daq_07d6a8bfc0073e2e|daq_097fd7c6eceb1862|daq_139a09c07ab88db0|daq_9b455012e668d8ea|daq_cf5701c3d471e949"
          },
          {
            "source": "archetype_fb2116ded8ca94711496",
            "target": "concept_014659a6a5d4c0876ce6",
            "sourceLabel": "risk_factor_or_etiology_reasoning",
            "targetLabel": "Healthcare exposure",
            "sourceType": "answer_target_category",
            "targetType": "etiology_factor",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.098,
            "lift": 47.1,
            "stability": 1.0,
            "questions": "daq_04737650ed8a777f|daq_04818f7b5940ba02|daq_048b3ebfdf6e32df|daq_09bb352b08aac5cd|daq_2a990e46d9e65ec7|daq_3b2c0d6d3ea29b96"
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_e1236377aa4557dd761c",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Folate, serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.045,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_0825ec8bff0f7922|daq_60a7c5a443219f07|daq_75689c69e674dec4|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_60481edbc2f417ea2167",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Immunization",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.031,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_27a515511f86b0b7|daq_785097135bdd5934|daq_c5f59725d5f45708|daq_d8e3c080f6818528|daq_e567556996fb7d76|daq_e91f6a494a179bf5"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_5dfbcc7b6270e5e14dd0",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "azithromycin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.014,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_01c28c2be16e8b98|daq_2b3e6376eb9ec827|daq_4f1d72b6a6e2bfae|daq_6410a0c34cbfa67d|daq_b009cc2e66e5a112|daq_db255d18ecadbd98"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_e03a666b844e04b921c6",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "cefepime",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.014,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_1dc7ea14514c07ce|daq_6a67520993ba905e|daq_bb55c5b330f2209c|daq_bf42cdb0ab1f9d70|daq_c9a00f1875ad66e2|daq_db255d18ecadbd98"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_456cad8ce4d3794748ec",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "phenytoin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.014,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_1a22e60389c28bb0|daq_710c59970e124f74|daq_aef966e25b92cb75|daq_f34da857718ea3e2|daq_f7c2f781c4ef8eee"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_877ac5604f4b1b29cde5",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "propranolol",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.014,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_1e94ee4ea52ccffa|daq_2bb442afc7239d36|daq_309b4dbfd6a5c8a2|daq_956a0be814b43a53|daq_dc2b79e3a8337695|daq_ec53a6de86352b35"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_10794a453109750eed79",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "rifampin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.014,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_0f814eb7ed524750|daq_4996068a9f6af2da|daq_6b96fd6d97120087|daq_84350a9fa6341477|daq_f036e74c40d0ae72"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_cc5d3a9f14a1bf68251b",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "epinephrine",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 6,
            "confidence": 0.014,
            "lift": 7.6,
            "stability": 0.9,
            "questions": "daq_2e84cafe938fe9e3|daq_5855ae4dab3bb082|daq_5f5209e4f26991b9|daq_61aaacb95ffcd61f|daq_9760b48260b307c0|daq_cf6022bac33b6eb2"
          },
          {
            "source": "archetype_5b85ef2a9f7722a6f3b6",
            "target": "concept_9adb0b2aa38fc77d221e",
            "sourceLabel": "imaging_selection",
            "targetLabel": "Echocardiography",
            "sourceType": "answer_target_category",
            "targetType": "imaging_test",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.111,
            "lift": 74.4,
            "stability": 1.0,
            "questions": "daq_01f081c7a4031f2c|daq_0470c638eecd48c0|daq_0c7298d31694b965|daq_1d20c0d9b1aed6fc|daq_25c4120d5ed2172b"
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_290670df52784980ebd0",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Adrenocorticotropic hormone (ACTH), serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.038,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_186deda73911e7b2|daq_2a8975c12101eacc|daq_830bc2a23792d7d2|daq_8ad0941d00e07d91|daq_a691f56936b63eab"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_1c0beaf2829e21fab3bd",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Sarcoidosis",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.026,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_13c193b90f86c700|daq_17c32411d7386c7e|daq_84aeae5ac8d3f2b8|daq_a8e22cfd03398e63|daq_f577335fca85bfea"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_0e3ec5cd173ebde4497e",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "albuterol",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_011ad0c92392d50a|daq_293f01ac91f065f2|daq_29877509974dee13|daq_58cee4ab0518b42f|daq_93c7f089d6a06942"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_ca44e9c3a41eb0bc7ee0",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "allopurinol",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_04da9fc7b4aa7dcd|daq_0f19c6ed3d2cc21d|daq_22b0c97080b6bd7a|daq_250f834bf7486a7d|daq_44eba3d70892b005"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_b4f56410f373585723c9",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "alteplase",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_0b59a7b02b8c9a6e|daq_1bc4410d07504797|daq_24ea68ce572c3d27|daq_74babf08eb766b82|daq_bd73f3c67b554a0b"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_f70bebf4ce992c27f93c",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "amiodarone",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_027a49ce86c9800b|daq_0552541931b12050|daq_0722b07c67488e50|daq_14cb8b0903c4a17b|daq_9e7e8289947d0f0c"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_421d3df870c5d3f1a771",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "amlodipine",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_04e9484064ddeb73|daq_06f81197ea8b485c|daq_07f3993951786115|daq_17149cfcc80b056e|daq_49bbb198ed6ea8eb"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_9c03657c38e066ad88d1",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "ampicillin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_04a601c1dc5ca88c|daq_399ae4e3d513958c|daq_7ae5b40aaa435eb3|daq_a3d81996353daa0d|daq_e680cd57f44d1bda"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_1ccdff4c2f0fb9cac3d4",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "ciprofloxacin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_1c82442e143e4ca7|daq_47c5d38f287797ad|daq_b37debe3e6e6d7f8|daq_d52cec4b40399388|daq_f3c94981e1697941"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_b01ce3b3c9d1cfce9c69",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "labetalol",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_079764f1dfc719d9|daq_296b79ed1748a712|daq_5ca12f3a3a1c8bad|daq_d84a78a4668e57e4|daq_dd9cae1ad57bfb4c"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_a7c62276f9a3c7d6bb73",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "lisinopril",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_03a0d966fd62154e|daq_053e03cf7eb14f45|daq_05feabbb75d87a15|daq_0a5f88eed767642f|daq_0a8b17e679e7a88e"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_964ffb1e96b185a202c5",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "magnesium sulfate",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_097562331a1d9199|daq_111cdb66f89cb593|daq_8ff8d0c9ecb515bb|daq_a148d1faaeff72cd|daq_cda3020fd1d701d5"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_400778ba474021c4fdaa",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "tiotropium",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 5,
            "confidence": 0.011,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_02add236a44b73b7|daq_0542908d397d263e|daq_12f6545d6a321bf7|daq_4cd530f9fa957bfd|daq_68577862c44ea283"
          },
          {
            "source": "archetype_f31db5b41cc2a81391a4",
            "target": "concept_cd16c425739b3043353f",
            "sourceLabel": "diagnostic_test_selection",
            "targetLabel": "Diagnostic colonoscopy",
            "sourceType": "answer_target_category",
            "targetType": "diagnostic_test",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.105,
            "lift": 88.1,
            "stability": 1.0,
            "questions": "daq_059156ce7837e087|daq_449e1917a819c3cd|daq_efc16569e7cf87f1|daq_fab20c92670d811d"
          },
          {
            "source": "archetype_fb2116ded8ca94711496",
            "target": "concept_cfa0f70ca35eb761462e",
            "sourceLabel": "risk_factor_or_etiology_reasoning",
            "targetLabel": "Beryllium exposure",
            "sourceType": "answer_target_category",
            "targetType": "etiology_factor",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.066,
            "lift": 54.9,
            "stability": 1.0,
            "questions": "daq_405ad9158188d9b6|daq_45cda539ce4487da|daq_a97381822c84ca6f|daq_e24fd4d03edb2116"
          },
          {
            "source": "archetype_fb2116ded8ca94711496",
            "target": "concept_3d2d59141bddde276d07",
            "sourceLabel": "risk_factor_or_etiology_reasoning",
            "targetLabel": "HLA-DQ2 / HLA-DQ8",
            "sourceType": "answer_target_category",
            "targetType": "etiology_factor",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.066,
            "lift": 54.9,
            "stability": 1.0,
            "questions": "daq_3f95e9a1840eea36|daq_4594305806a6cfea|daq_d33d5576e1e1c556|daq_ef770e3e686beea1"
          },
          {
            "source": "archetype_fb2116ded8ca94711496",
            "target": "concept_85c1ea2de4b8eb5bb3cd",
            "sourceLabel": "risk_factor_or_etiology_reasoning",
            "targetLabel": "Ionizing radiation exposure",
            "sourceType": "answer_target_category",
            "targetType": "etiology_factor",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.066,
            "lift": 54.9,
            "stability": 1.0,
            "questions": "daq_02aefe97cee7942e|daq_098e016b6e8ff62f|daq_0b90ffb02f8b3236|daq_d4bc0992e797db47"
          },
          {
            "source": "archetype_fb2116ded8ca94711496",
            "target": "concept_868560127f8def54da61",
            "sourceLabel": "risk_factor_or_etiology_reasoning",
            "targetLabel": "Tobacco smoking",
            "sourceType": "answer_target_category",
            "targetType": "etiology_factor",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.066,
            "lift": 54.9,
            "stability": 1.0,
            "questions": "daq_04a83dfc2cee5a96|daq_2304e95514fd6f85|daq_79746d25c03af922|daq_d11daec43f06b48a"
          },
          {
            "source": "archetype_c2a971faff9e0f8b28bf",
            "target": "concept_20e0cd22d968f122b6b0",
            "sourceLabel": "diagnostic_or_result_interpretation",
            "targetLabel": "Adenocarcinoma",
            "sourceType": "answer_target_category",
            "targetType": "diagnostic_result",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.058,
            "lift": 48.5,
            "stability": 1.0,
            "questions": "daq_ad122febb35c1a2c|daq_bc7fb0bc35d14073|daq_e9b2288b650ae7ff|daq_fcd8edf654077b9a"
          },
          {
            "source": "archetype_aa5fcaf8df5be47f3415",
            "target": "concept_d7b4b77b19f43c7ac21e",
            "sourceLabel": "other_review_required",
            "targetLabel": "Purpura",
            "sourceType": "answer_target_category",
            "targetType": "physical_exam",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.058,
            "lift": 48.5,
            "stability": 1.0,
            "questions": "daq_1680e3474aeb1c88|daq_1e21394f3002ed53|daq_ea294bd6c82c5179|daq_eb08d8c08c02ac4a"
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_ad347bf2061c398b0715",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Chloride, serum",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.03,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_0c651c05392a0baa|daq_3f67c2b1493f5410|daq_689dd35cf88a669c|daq_c5eee4c9f118cd08"
          },
          {
            "source": "archetype_0b4fd1d6a77c85605881",
            "target": "concept_5e16cd9e7ab1b974eff0",
            "sourceLabel": "laboratory_test_selection",
            "targetLabel": "Triglycerides",
            "sourceType": "answer_target_category",
            "targetType": "lab_test",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.03,
            "lift": 25.4,
            "stability": 1.0,
            "questions": "daq_0ea5c460614bd4f4|daq_3f2d191a53b2b0d0|daq_4d9d5473d52a90d8|daq_efe3e14080eac833"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_9d9bbf5a404947bc1dc8",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Atrioventricular septal defect",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.021,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_57acbc00d2243e63|daq_99574d593b7e41a5|daq_ace2775355423d89|daq_d50b619423cae41e"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_b8ff492eb864d2a4f59e",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Breast cancer",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.021,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_10c2bc219f9d9b30|daq_781a150056c1d20c|daq_a5928614ef8c7f51|daq_be3d29e3927613f4"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_c744dc4c470e1cf37387",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Depression and suicide",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.021,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_05aaeeb36648aaf7|daq_5952b673a45b9273|daq_911ef49fefae5041|daq_9a16390c1d80ad61"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_8084c9a31464d5fa400f",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Hyperthyroidism",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.021,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_0dce3b541e9705c8|daq_90738b708e4a9c76|daq_cd285b441867d5c9|daq_d723681211f5b003"
          },
          {
            "source": "archetype_cf31a1f3a422908f4ac0",
            "target": "concept_0d84511072bec92445f0",
            "sourceLabel": "diagnosis_identification",
            "targetLabel": "Stroke",
            "sourceType": "answer_target_category",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.021,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_a0c9bb1340b21aaf|daq_dbc78c3b97beafcb|daq_e7b7652717385f5d|daq_fe464b38012ddde8"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_9b8587835ef6ea54433a",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "carbamazepine",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.009,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_79ef4c72abffa434|daq_a5f177eaa0969fed|daq_d74b2acd9a354bbf|daq_fa703438416762e4"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_d7f1909644e4018c81dd",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "empagliflozin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.009,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_09db2f69fc1a24e1|daq_0c02a7d778f6e59c|daq_2d2e7ca8ae9f84a9|daq_f470d857a253c79b"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_4a91ee49af25fc3c3c57",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "fluoxetine",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.009,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_07a6a1ec3fc3d892|daq_12929f3298d13ffd|daq_6b11f61787c9c91a|daq_dcb51a747a404b59"
          },
          {
            "source": "archetype_3698038f6d397a14574a",
            "target": "concept_b6e7e8b0541e65193e2c",
            "sourceLabel": "medication_or_pharmacologic_management",
            "targetLabel": "gentamicin",
            "sourceType": "answer_target_category",
            "targetType": "medication",
            "layer": "answer_target_archetype_network",
            "weight": 4,
            "confidence": 0.009,
            "lift": 7.6,
            "stability": 1.0,
            "questions": "daq_05e1e11ca6dd05f1|daq_096b8dbfd009f551|daq_0f814eb7ed524750|daq_5e719d6a9442b4d8"
          },
          {
            "source": "concept_cfc4c1e5941f849383cc",
            "target": "concept_a7e14fc87817c9ff2135",
            "sourceLabel": "Personality disorders",
            "targetLabel": "Anxiety",
            "sourceType": "disease_condition_syndrome",
            "targetType": "physical_exam_symptom",
            "layer": "correct_vs_distractor_contrast",
            "weight": 7,
            "confidence": 0.368,
            "lift": 176.3,
            "stability": 1.0,
            "questions": "daq_037dcc6c55e6b0ed|daq_1b6bb8ce7ddf39c7|daq_6398a7a454b542ec|daq_8e9874d87f23d278|daq_9a1686b58c0cf803|daq_bddac85f1b1e9fd0|daq_de6156693..."
          },
          {
            "source": "concept_e03a666b844e04b921c6",
            "target": "concept_b897d675badbfe965fa8",
            "sourceLabel": "cefepime",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 6,
            "confidence": 0.273,
            "lift": 38.1,
            "stability": 1.0,
            "questions": "daq_1dc7ea14514c07ce|daq_6a67520993ba905e|daq_bb55c5b330f2209c|daq_bf42cdb0ab1f9d70|daq_c9a00f1875ad66e2|daq_db255d18ecadbd98"
          },
          {
            "source": "concept_e1236377aa4557dd761c",
            "target": "concept_e24f104eda9ad8c802d7",
            "sourceLabel": "Folate, serum",
            "targetLabel": "Vitamin B12, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 5,
            "confidence": 0.5,
            "lift": 239.2,
            "stability": 1.0,
            "questions": "daq_0825ec8bff0f7922|daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_882f7ac8484d8b7b1f84",
            "target": "concept_96f63ebd579dbee9e7f9",
            "sourceLabel": "Seizure",
            "targetLabel": "Seizures",
            "sourceType": "physical_exam_symptom",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.8,
            "lift": 446.5,
            "stability": 1.0,
            "questions": "daq_0ab15ca3246a3f5f|daq_37d46e5d2e189b4b|daq_50c1f46cc336f610|daq_f0c92e6caf6dfde0"
          },
          {
            "source": "concept_0e3ec5cd173ebde4497e",
            "target": "concept_400778ba474021c4fdaa",
            "sourceLabel": "albuterol",
            "targetLabel": "tiotropium",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.25,
            "lift": 167.4,
            "stability": 1.0,
            "questions": "daq_293f01ac91f065f2|daq_29877509974dee13|daq_58cee4ab0518b42f|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_768b713e2820130aae69",
            "target": "concept_2c8e1362e401d9477cef",
            "sourceLabel": "Sodium, serum",
            "targetLabel": "Bicarbonate / CO2, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.235,
            "lift": 157.6,
            "stability": 1.0,
            "questions": "daq_0a3a0fe3d944cd23|daq_61b7e6216d6977eb|daq_f22340938fead836|daq_ff190d6b0d887f2b"
          },
          {
            "source": "concept_cfc4c1e5941f849383cc",
            "target": "concept_b142598153646a78c945",
            "sourceLabel": "Personality disorders",
            "targetLabel": "Obsessive-compulsive disorder",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.211,
            "lift": 141.0,
            "stability": 1.0,
            "questions": "daq_56a05a7af2c1dcf4|daq_6398a7a454b542ec|daq_9a1686b58c0cf803|daq_bddac85f1b1e9fd0"
          },
          {
            "source": "concept_0e3ec5cd173ebde4497e",
            "target": "concept_4082164fa589eaac1250",
            "sourceLabel": "albuterol",
            "targetLabel": "theophylline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.25,
            "lift": 119.6,
            "stability": 1.0,
            "questions": "daq_293f01ac91f065f2|daq_29877509974dee13|daq_58cee4ab0518b42f|daq_93c7f089d6a06942"
          },
          {
            "source": "concept_d366aee9a8cb5f64834d",
            "target": "concept_6f62cb7366f2a8e5aec5",
            "sourceLabel": "Potassium, serum",
            "targetLabel": "Glucose, plasma, fasting",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.235,
            "lift": 98.5,
            "stability": 1.0,
            "questions": "daq_3f6587d90258ac77|daq_4e087af4138dd433|daq_8328d1b2603e14d0|daq_8f77cae7da9f56da"
          },
          {
            "source": "concept_768b713e2820130aae69",
            "target": "concept_d366aee9a8cb5f64834d",
            "sourceLabel": "Sodium, serum",
            "targetLabel": "Potassium, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.235,
            "lift": 71.6,
            "stability": 1.0,
            "questions": "daq_040d844b178d32bb|daq_0a3a0fe3d944cd23|daq_c13a1d68b4dc4972|daq_c5f8733c522e7b3c"
          },
          {
            "source": "concept_d366aee9a8cb5f64834d",
            "target": "concept_768b713e2820130aae69",
            "sourceLabel": "Potassium, serum",
            "targetLabel": "Sodium, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.235,
            "lift": 60.6,
            "stability": 1.0,
            "questions": "daq_2c489e2a81197445|daq_4e087af4138dd433|daq_8328d1b2603e14d0|daq_c0cf49a867d77a8c"
          },
          {
            "source": "concept_964ffb1e96b185a202c5",
            "target": "concept_daf4e9a21808f9b31cf5",
            "sourceLabel": "magnesium sulfate",
            "targetLabel": "lorazepam",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.235,
            "lift": 60.6,
            "stability": 1.0,
            "questions": "daq_097562331a1d9199|daq_8ff8d0c9ecb515bb|daq_a148d1faaeff72cd|daq_cda3020fd1d701d5"
          },
          {
            "source": "concept_5dfbcc7b6270e5e14dd0",
            "target": "concept_a353bdee09d8c461de8e",
            "sourceLabel": "azithromycin",
            "targetLabel": "ceftriaxone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.211,
            "lift": 44.1,
            "stability": 1.0,
            "questions": "daq_2b3e6376eb9ec827|daq_6410a0c34cbfa67d|daq_b009cc2e66e5a112|daq_db255d18ecadbd98"
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_a72d7b76b0b3f82dc3c5",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "doxycycline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.133,
            "lift": 27.9,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_0ae0771d0eee1c76|daq_33ee0f57e29e721d|daq_3d6e943b3909d221"
          },
          {
            "source": "concept_cc5d3a9f14a1bf68251b",
            "target": "concept_b6134eb131e2ebc40ae1",
            "sourceLabel": "epinephrine",
            "targetLabel": "acetazolamide",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 4,
            "confidence": 0.308,
            "lift": 114.5,
            "stability": 0.9,
            "questions": "daq_2e84cafe938fe9e3|daq_5f5209e4f26991b9|daq_61aaacb95ffcd61f|daq_9760b48260b307c0"
          },
          {
            "source": "concept_9d9bbf5a404947bc1dc8",
            "target": "concept_ec8d268c5a9bfd8d8795",
            "sourceLabel": "Atrioventricular septal defect",
            "targetLabel": "Tetralogy of Fallot",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.5,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_99574d593b7e41a5|daq_ace2775355423d89|daq_d50b619423cae41e"
          },
          {
            "source": "concept_9d0663c2929f35e94879",
            "target": "concept_fdc7a230e56d5fb79067",
            "sourceLabel": "naltrexone",
            "targetLabel": "disulfiram",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.429,
            "lift": 358.8,
            "stability": 1.0,
            "questions": "daq_32f927bc1352d8fe|daq_ad1f90106db856a9|daq_c2f0c38596533c9e"
          },
          {
            "source": "concept_3e13bc38c5190475717d",
            "target": "concept_1c0beaf2829e21fab3bd",
            "sourceLabel": "Carcinoma / malignant epithelial neoplasm",
            "targetLabel": "Sarcoidosis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.333,
            "lift": 223.3,
            "stability": 1.0,
            "questions": "daq_062112b83ca48e8c|daq_ace5aa3f171e33f8|daq_d8a7d257bc06151c"
          },
          {
            "source": "concept_ca44e9c3a41eb0bc7ee0",
            "target": "concept_f9dca1dcdf3afc1069b4",
            "sourceLabel": "allopurinol",
            "targetLabel": "probenecid",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.214,
            "lift": 179.4,
            "stability": 1.0,
            "questions": "daq_22b0c97080b6bd7a|daq_250f834bf7486a7d|daq_44eba3d70892b005"
          },
          {
            "source": "concept_0e3ec5cd173ebde4497e",
            "target": "concept_081196a0c8762116d434",
            "sourceLabel": "albuterol",
            "targetLabel": "salmeterol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.188,
            "lift": 157.0,
            "stability": 1.0,
            "questions": "daq_011ad0c92392d50a|daq_293f01ac91f065f2|daq_29877509974dee13"
          },
          {
            "source": "concept_ca44e9c3a41eb0bc7ee0",
            "target": "concept_abd727a32fbcf3da323f",
            "sourceLabel": "allopurinol",
            "targetLabel": "colchicine",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.214,
            "lift": 143.5,
            "stability": 1.0,
            "questions": "daq_0f19c6ed3d2cc21d|daq_22b0c97080b6bd7a|daq_44eba3d70892b005"
          },
          {
            "source": "concept_456cad8ce4d3794748ec",
            "target": "concept_b169a9675295ac591be3",
            "sourceLabel": "phenytoin",
            "targetLabel": "lamotrigine",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.176,
            "lift": 118.2,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_1a22e60389c28bb0|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_fd2f3a6afa9995dfb357",
            "target": "concept_d366aee9a8cb5f64834d",
            "sourceLabel": "adenosine",
            "targetLabel": "Potassium, serum",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.333,
            "lift": 101.5,
            "stability": 1.0,
            "questions": "daq_4c8149a842f0d749|daq_922aa9334ed2d637|daq_e3de7adb1fc29b7a"
          },
          {
            "source": "concept_dff0d79eb8b81985745b",
            "target": "concept_877ac5604f4b1b29cde5",
            "sourceLabel": "phenoxybenzamine",
            "targetLabel": "propranolol",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.333,
            "lift": 101.5,
            "stability": 1.0,
            "questions": "daq_03860fa1c09e3c91|daq_1d7970f1bfadecda|daq_a5d5b6a7978aadba"
          },
          {
            "source": "concept_456cad8ce4d3794748ec",
            "target": "concept_9b8587835ef6ea54433a",
            "sourceLabel": "phenytoin",
            "targetLabel": "carbamazepine",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.176,
            "lift": 84.4,
            "stability": 1.0,
            "questions": "daq_1a22e60389c28bb0|daq_710c59970e124f74|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_421d3df870c5d3f1a771",
            "target": "concept_3b79b2b8d20e1ac804b2",
            "sourceLabel": "amlodipine",
            "targetLabel": "losartan",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.231,
            "lift": 59.4,
            "stability": 1.0,
            "questions": "daq_06f81197ea8b485c|daq_17149cfcc80b056e|daq_49bbb198ed6ea8eb"
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_9cc23d9b3c61b4affcec",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "atropine",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.1,
            "lift": 55.8,
            "stability": 1.0,
            "questions": "daq_0ae0771d0eee1c76|daq_33ee0f57e29e721d|daq_3d6e943b3909d221"
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_fdb1ba01da5506cc4ea2",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "amoxicillin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.1,
            "lift": 41.9,
            "stability": 1.0,
            "questions": "daq_0ae0771d0eee1c76|daq_117ca1e95171d8ef|daq_3d6e943b3909d221"
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_9c03657c38e066ad88d1",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "ampicillin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.1,
            "lift": 30.4,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_2f08843cfcc95c13|daq_dce482de2ccaf00c"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "concept_a72d7b76b0b3f82dc3c5",
            "sourceLabel": "rifampin",
            "targetLabel": "doxycycline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.136,
            "lift": 28.5,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_6b96fd6d97120087|daq_84350a9fa6341477"
          },
          {
            "source": "concept_a353bdee09d8c461de8e",
            "target": "concept_10794a453109750eed79",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "rifampin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.1,
            "lift": 23.9,
            "stability": 1.0,
            "questions": "daq_09078defa1c44e51|daq_2f08843cfcc95c13|daq_dce482de2ccaf00c"
          },
          {
            "source": "concept_1ccdff4c2f0fb9cac3d4",
            "target": "concept_804362bbc2e73da9ee1f",
            "sourceLabel": "ciprofloxacin",
            "targetLabel": "nitrofurantoin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.231,
            "lift": 257.6,
            "stability": 0.9,
            "questions": "daq_47c5d38f287797ad|daq_d52cec4b40399388|daq_f3c94981e1697941"
          },
          {
            "source": "concept_437e199ec345d14ba0ce",
            "target": "concept_a67c9f5fb13439312b18",
            "sourceLabel": "CT scan",
            "targetLabel": "Diagnostic laparoscopy",
            "sourceType": "imaging_test",
            "targetType": "diagnostic_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.125,
            "lift": 139.5,
            "stability": 0.9,
            "questions": "daq_06184582af6d37fb|daq_46241f1dd42f06fa|daq_59f91d3908226796"
          },
          {
            "source": "concept_868560127f8def54da61",
            "target": "concept_596421b721a1e14fbf14",
            "sourceLabel": "Tobacco smoking",
            "targetLabel": "Alcohol use disorder or heavy alcohol use",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.5,
            "lift": 128.8,
            "stability": 0.9,
            "questions": "daq_2304e95514fd6f85|daq_79746d25c03af922|daq_d11daec43f06b48a"
          },
          {
            "source": "concept_a7c62276f9a3c7d6bb73",
            "target": "concept_7d394d6a60f18975f056",
            "sourceLabel": "lisinopril",
            "targetLabel": "digoxin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.25,
            "lift": 119.6,
            "stability": 0.9,
            "questions": "daq_03a0d966fd62154e|daq_0a5f88eed767642f|daq_0a8b17e679e7a88e"
          },
          {
            "source": "concept_400778ba474021c4fdaa",
            "target": "concept_0e0986535101659e2f76",
            "sourceLabel": "tiotropium",
            "targetLabel": "montelukast",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.176,
            "lift": 98.5,
            "stability": 0.8,
            "questions": "daq_12f6545d6a321bf7|daq_4cd530f9fa957bfd|daq_68577862c44ea283"
          },
          {
            "source": "concept_400778ba474021c4fdaa",
            "target": "concept_0b8e9fafe19fac9146d3",
            "sourceLabel": "tiotropium",
            "targetLabel": "fluticasone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 3,
            "confidence": 0.176,
            "lift": 147.8,
            "stability": 0.7,
            "questions": "daq_02add236a44b73b7|daq_4cd530f9fa957bfd|daq_68577862c44ea283"
          },
          {
            "source": "concept_0da67fdf9a7f9a3f1e0e",
            "target": "concept_8c28f0cafa718f74ca83",
            "sourceLabel": "Benign paroxysmal positional vertigo",
            "targetLabel": "Meniere disease",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_210214b584d478e8|daq_bfe8ae954a6e0b73"
          },
          {
            "source": "concept_3026574d82685c198fec",
            "target": "concept_548a9a1f05d0ec4b31f5",
            "sourceLabel": "Intraventricular hemorrhage",
            "targetLabel": "Hydrocephalus",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_result",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_24195d514181fd20|daq_e3d9512988f6750b"
          },
          {
            "source": "concept_ec03571fa07f60c907c1",
            "target": "concept_227ae7908b228fee9669",
            "sourceLabel": "Lung cancer (clinical presentation and diagnosis)",
            "targetLabel": "Malignant mesothelioma on pleural biopsy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_result",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_4eaa961fb02f625f|daq_bb2808c5ff75ca46"
          },
          {
            "source": "concept_a67c9f5fb13439312b18",
            "target": "concept_8b2bc8e1492d1da695dd",
            "sourceLabel": "Diagnostic laparoscopy",
            "targetLabel": "Diagnostic hysteroscopy/endometrial biopsy",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_test",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.667,
            "lift": 1116.3,
            "stability": 1.0,
            "questions": "daq_30a098d3c46d53d2|daq_d2fb450d404c2a5f"
          },
          {
            "source": "concept_8919d9a7af2f4f56164a",
            "target": "concept_dc41d982b065b14f0cc7",
            "sourceLabel": "Influenza virus",
            "targetLabel": "oseltamivir",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.667,
            "lift": 1116.3,
            "stability": 1.0,
            "questions": "daq_0d9d8838dd71c925|daq_67865c5d21050302"
          },
          {
            "source": "concept_a5a1ca2320c9c727e6bd",
            "target": "concept_7f35dd8fb51404771609",
            "sourceLabel": "Other hemolytic anemia",
            "targetLabel": "Hyperparathyroidism",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1116.3,
            "stability": 1.0,
            "questions": "daq_a2ee60631fd69fd2|daq_cf9af2c87250a9bd"
          },
          {
            "source": "concept_d057b19dbbabf6eb73af",
            "target": "concept_12f0cdfddf6668e3e85b",
            "sourceLabel": "Pelvic ultrasound transabdominal/transvaginal",
            "targetLabel": "Biopsy target / needle position",
            "sourceType": "imaging_test",
            "targetType": "diagnostic_result",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.667,
            "lift": 1116.3,
            "stability": 1.0,
            "questions": "daq_7283718f9c401a08|daq_ac0456fac65168b9"
          },
          {
            "source": "concept_e758c250e179355575b9",
            "target": "concept_338b5c8653066d765f88",
            "sourceLabel": "Orthostatic hypotension",
            "targetLabel": "Resting tremor",
            "sourceType": "physical_exam",
            "targetType": "physical_exam",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.5,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_3a1ec28aae204073|daq_a3035544da91867a"
          },
          {
            "source": "concept_688b83f1c3322eb425ef",
            "target": "concept_1c973509f0c9f2d7daf7",
            "sourceLabel": "Paresthesia",
            "targetLabel": "Pallor",
            "sourceType": "physical_exam_symptom",
            "targetType": "physical_exam",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.5,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_7fb4a70eef2abad4|daq_b6cd12472527e679"
          },
          {
            "source": "concept_688b83f1c3322eb425ef",
            "target": "concept_c67e0a1c2d31eb0756b1",
            "sourceLabel": "Paresthesia",
            "targetLabel": "Tenderness",
            "sourceType": "physical_exam_symptom",
            "targetType": "physical_exam_symptom",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.5,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_7fb4a70eef2abad4|daq_b6cd12472527e679"
          },
          {
            "source": "concept_549ddbc37bf3c37e60fd",
            "target": "concept_4dc2b9e1cfa5bd6edbee",
            "sourceLabel": "Gastric or duodenal ulcer",
            "targetLabel": "Gastroesophageal reflux",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.667,
            "lift": 744.2,
            "stability": 1.0,
            "questions": "daq_a286b5a31eb271b9|daq_c905dc78bfa3c212"
          },
          {
            "source": "concept_bd0d701b60920b936a55",
            "target": "concept_d7b4b77b19f43c7ac21e",
            "sourceLabel": "Anemia",
            "targetLabel": "Purpura",
            "sourceType": "lab_result",
            "targetType": "physical_exam",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 1.0,
            "lift": 669.8,
            "stability": 1.0,
            "questions": "daq_8d7d900a8d35ec5f|daq_97c21c16128eb2c6"
          },
          {
            "source": "concept_f73bf9789aabe0f18326",
            "target": "concept_0e3999e4bf255a754258",
            "sourceLabel": "Polycythemia vera and other erythrocytosis",
            "targetLabel": "Megaloblastic anemia",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.4,
            "lift": 669.8,
            "stability": 1.0,
            "questions": "daq_2c85c8b66a152b5c|daq_4f83375c093be4d9"
          },
          {
            "source": "concept_2ed681d4233d6f104af3",
            "target": "concept_7d9781b3bfe1cf2a0ad1",
            "sourceLabel": "succinylcholine",
            "targetLabel": "rocuronium",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.4,
            "lift": 669.8,
            "stability": 1.0,
            "questions": "daq_5c0151355615c6c1|daq_bf430b063ac3f8c3"
          },
          {
            "source": "concept_2ed681d4233d6f104af3",
            "target": "concept_84f3525d9f209537a8a7",
            "sourceLabel": "succinylcholine",
            "targetLabel": "tizanidine",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.4,
            "lift": 669.8,
            "stability": 1.0,
            "questions": "daq_5c0151355615c6c1|daq_bf430b063ac3f8c3"
          },
          {
            "source": "concept_edc34b62f787a59e5811",
            "target": "concept_b99099671c55bddf3546",
            "sourceLabel": "Hyporeflexia",
            "targetLabel": "Babinski sign",
            "sourceType": "physical_exam",
            "targetType": "physical_exam",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.333,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_67d5879d638b892e|daq_9fa5b60ede33a175"
          },
          {
            "source": "concept_edc34b62f787a59e5811",
            "target": "concept_6d90d60a61a016ac2adb",
            "sourceLabel": "Hyporeflexia",
            "targetLabel": "Pronator drift",
            "sourceType": "physical_exam",
            "targetType": "physical_exam",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.333,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_67d5879d638b892e|daq_9fa5b60ede33a175"
          },
          {
            "source": "concept_e758c250e179355575b9",
            "target": "concept_3c121d0048f996a2bdd6",
            "sourceLabel": "Orthostatic hypotension",
            "targetLabel": "Hallucinations",
            "sourceType": "physical_exam",
            "targetType": "physical_exam_symptom",
            "layer": "correct_vs_distractor_contrast",
            "weight": 2,
            "confidence": 0.5,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_3a1ec28aae204073|daq_a3035544da91867a"
          },
          {
            "source": "concept_99e1504de59caa549b78",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Peptic ulcer disease (other than Helicobacter pylori)",
            "targetLabel": "Folate deficiency",
            "sourceType": "disease_condition_syndrome",
            "targetType": "laboratory_test_selection",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "confidence": 0.444,
            "lift": 186.1,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_96f63ebd579dbee9e7f9",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Seizures",
            "targetLabel": "Phenytoin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "confidence": 0.118,
            "lift": 98.5,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_1a22e60389c28bb0|daq_710c59970e124f74|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_bd0d701b60920b936a55",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Anemia",
            "targetLabel": "Folate deficiency",
            "sourceType": "lab_result",
            "targetType": "laboratory_test_selection",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "confidence": 0.174,
            "lift": 72.8,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_60481edbc2f417ea2167",
            "target": "target_f7218728b64a2ef72fee",
            "sourceLabel": "Immunization",
            "targetLabel": "Subglottic larynx",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "confidence": 0.074,
            "lift": 62.0,
            "stability": 1.0,
            "questions": "daq_14acfe1e84329e46|daq_154f4a08fc090614|daq_ca8742eb3ff4e52f|daq_dd7251bd7f80c635"
          },
          {
            "source": "concept_b086dd488eac3e121552",
            "target": "target_e373b2b12643da8672cc",
            "sourceLabel": "Congenital malformations of aortic and mitral valves",
            "targetLabel": "Streptococcus sanguinis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "confidence": 0.8,
            "lift": 669.8,
            "stability": 0.9,
            "questions": "daq_0ff1e469d79c1929|daq_56c9dc9bef577c95|daq_77900c9608d77370|daq_be6877d714d0a2b3"
          },
          {
            "source": "concept_30bdc8df7c42e153e626",
            "target": "target_9b1f7812c0fd22e36137",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "Metoprolol",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "confidence": 0.017,
            "lift": 11.2,
            "stability": 1.0,
            "questions": "daq_03dd004a8d1bc1ae|daq_0d144fce4fe83f7a|daq_e97a5db223ed130e"
          },
          {
            "source": "concept_5564fcbd85fc4e7af164",
            "target": "target_0697e3b47efa1c9afd27",
            "sourceLabel": "Antiphospholipid antibody syndrome",
            "targetLabel": "Dilation of the coronary sinus",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_50d985c0ad01b61d|daq_8c203180119c46f4"
          },
          {
            "source": "concept_10efe8bd2c30e64690f8",
            "target": "target_ae55753dc75d8fe624a6",
            "sourceLabel": "Generalized anxiety disorder",
            "targetLabel": "Type I hypersensitivity reaction",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_705c04c872eb9229|daq_f63cf2ca35cef8a3"
          },
          {
            "source": "concept_ca680497995687d4faaf",
            "target": "target_a3405ae0b10480fae9ca",
            "sourceLabel": "Nephrolithiasis",
            "targetLabel": "Monosodium urate",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 1.0,
            "lift": 1674.5,
            "stability": 1.0,
            "questions": "daq_10f110bce47d343a|daq_25eda06665e504b4"
          },
          {
            "source": "concept_d785ae353aa3fa2c74d7",
            "target": "target_cb850750f226808ae27e",
            "sourceLabel": "Hemoglobinopathies",
            "targetLabel": "Positive direct Coombs test",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.667,
            "lift": 1116.3,
            "stability": 1.0,
            "questions": "daq_35eb96c3093f0035|daq_88cc54c794cd5c1e"
          },
          {
            "source": "concept_e8743f5279a3e0b4915f",
            "target": "target_8d9c25807e9c525269b9",
            "sourceLabel": "Bladder carcinoma",
            "targetLabel": "Amifostine",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.5,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_a338142e4008c446|daq_e9ece719853ffc8f"
          },
          {
            "source": "concept_3bf7a32ed8a44f94db39",
            "target": "target_2249bf058a8d1beef978",
            "sourceLabel": "Protozoan and helminthic diseases (including malaria)",
            "targetLabel": "60",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.5,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_8cbe2c655b18e7fd|daq_e9384a976967cad5"
          },
          {
            "source": "concept_d0a649fb0bca7686c36b",
            "target": "target_c00228de53ceae516118",
            "sourceLabel": "Subarachnoid hemorrhage",
            "targetLabel": "Activation of antithrombin III",
            "sourceType": "diagnostic_result",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 1.0,
            "lift": 837.2,
            "stability": 1.0,
            "questions": "daq_fcd1b5c243d12990|daq_ffc23e51c39172ee"
          },
          {
            "source": "concept_6b3f98411923467e69a5",
            "target": "target_489e22cbc9f78a18eaab",
            "sourceLabel": "Iatrogenic and postoperative CNS infections",
            "targetLabel": "Spastic paralysis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.333,
            "lift": 558.2,
            "stability": 1.0,
            "questions": "daq_133d8b40371b8c90|daq_7ece061f3c083c2f"
          },
          {
            "source": "concept_5803e31cb702fe903f6f",
            "target": "target_8497664398a3b9e13bc1",
            "sourceLabel": "(including kidney failure)",
            "targetLabel": "Cerebral saccular aneurysm",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_091229de3638c087|daq_16916ca800f37838"
          },
          {
            "source": "concept_375e7a57737896998110",
            "target": "target_2fa5504de19b1e72f5fe",
            "sourceLabel": "Celiac disease",
            "targetLabel": "Presensitized T cells",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.25,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_30d0f507979173f2|daq_3a12ee4beef725f8"
          },
          {
            "source": "concept_c8ff3d9c77f62d7c6765",
            "target": "target_94fa3ef1335a34eaac57",
            "sourceLabel": "Cystic kidney disease (polycystic, medullary sponge, medullary cystic)",
            "targetLabel": "Serum transaminase levels and platelet count",
            "sourceType": "disease_condition_syndrome",
            "targetType": "laboratory_test_selection",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.25,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_08d66220ec21886f|daq_ed9ba59434dc7201"
          },
          {
            "source": "concept_f20fb406ce6d17802fe7",
            "target": "target_22103c5ceba570be2bf2",
            "sourceLabel": "Iron deficiency anemia",
            "targetLabel": "Maternal phenytoin therapy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_aef966e25b92cb75|daq_f7c2f781c4ef8eee"
          },
          {
            "source": "concept_7b2ec86331b9e72f03d8",
            "target": "target_ad5c27cad2cb69f810ae",
            "sourceLabel": "Malignant cells present on cytology",
            "targetLabel": "Para-aortic",
            "sourceType": "diagnostic_result",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_263b71f2c39c111a|daq_ba86d070f1b259fc"
          },
          {
            "source": "concept_b2719f67e28449dbf762",
            "target": "target_d825469d41c259a915dd",
            "sourceLabel": "Thrombocytopenia",
            "targetLabel": "Neoplastic lymphocytes that stain positive for tartrate-resistant acid phosphatase",
            "sourceType": "lab_result",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.5,
            "lift": 418.6,
            "stability": 1.0,
            "questions": "daq_033ab360c0999827|daq_48ce4e6557543b4e"
          },
          {
            "source": "concept_09ddbc085374fad4d3cc",
            "target": "target_e38c20331d129f4eaf12",
            "sourceLabel": "Crohn disease including Crohn colitis",
            "targetLabel": "Night blindness",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.2,
            "lift": 334.9,
            "stability": 1.0,
            "questions": "daq_46bbd6d009932d36|daq_6cb2d8ab7e14337f"
          },
          {
            "source": "concept_2ecee0a3bd38b64d6cda",
            "target": "target_22103c5ceba570be2bf2",
            "sourceLabel": "Hemorrhoids and fissures",
            "targetLabel": "Maternal phenytoin therapy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.4,
            "lift": 334.9,
            "stability": 1.0,
            "questions": "daq_aef966e25b92cb75|daq_f7c2f781c4ef8eee"
          },
          {
            "source": "concept_7d67edc1a5e468283294",
            "target": "target_869a0f544f8d77c8164a",
            "sourceLabel": "Ventricular tachycardia",
            "targetLabel": "Prolonged QT interval",
            "sourceType": "diagnostic_result",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.4,
            "lift": 334.9,
            "stability": 1.0,
            "questions": "daq_7a1f73dfbea5a041|daq_f17242be7f1c0290"
          },
          {
            "source": "concept_dda0afdca5640a9c6713",
            "target": "target_754f258fb85793612a19",
            "sourceLabel": "Bipolar disorder",
            "targetLabel": "Lamotrigine",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.182,
            "lift": 304.5,
            "stability": 1.0,
            "questions": "daq_875ddcc8a0d33a32|daq_9c2399c33995b87c"
          },
          {
            "source": "concept_02c52030efcc53466af9",
            "target": "target_6c7b2b51b9a9a1a971a9",
            "sourceLabel": "Multiple sclerosis and other demyelinating diseases",
            "targetLabel": "Femoral nerve",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.182,
            "lift": 304.5,
            "stability": 1.0,
            "questions": "daq_016749db6a6debac|daq_71e2cd231275a26c"
          },
          {
            "source": "concept_69b774b40e4f354ca4db",
            "target": "target_50bda7d7751dead830b7",
            "sourceLabel": "Parkinson disease and parkinsonism",
            "targetLabel": "Amantadine",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.167,
            "lift": 279.1,
            "stability": 1.0,
            "questions": "daq_7e27ff5bd12211ff|daq_991121843cb6a730"
          },
          {
            "source": "concept_01811926f084da12166f",
            "target": "target_63e1699ffabcda4dafa3",
            "sourceLabel": "Hormonal therapy (contraception, postmenopausal replacement therapy, abnormal uterine ble...",
            "targetLabel": "Phthirus pubis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.154,
            "lift": 257.6,
            "stability": 1.0,
            "questions": "daq_b9e59abeb3e8294f|daq_cfc879600ec24a36"
          },
          {
            "source": "concept_c117076357e138d0474d",
            "target": "target_8497664398a3b9e13bc1",
            "sourceLabel": "Kidney transplantation",
            "targetLabel": "Cerebral saccular aneurysm",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.286,
            "lift": 239.2,
            "stability": 1.0,
            "questions": "daq_091229de3638c087|daq_16916ca800f37838"
          },
          {
            "source": "concept_20e0cd22d968f122b6b0",
            "target": "target_5853553d1b322c5ee583",
            "sourceLabel": "Adenocarcinoma",
            "targetLabel": "MLH1",
            "sourceType": "diagnostic_result",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.25,
            "lift": 209.3,
            "stability": 1.0,
            "questions": "daq_aebd8093314bc22e|daq_fe26ed1328dc59fc"
          },
          {
            "source": "concept_f57487d7dfcae6500f00",
            "target": "target_e151b830408b1576e660",
            "sourceLabel": "Necrosis",
            "targetLabel": "Splenic artery",
            "sourceType": "diagnostic_result",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.125,
            "lift": 209.3,
            "stability": 1.0,
            "questions": "daq_78d7b5bae79ac98b|daq_ccfd035db42ac156"
          },
          {
            "source": "concept_84c0fd6a9a7736ffa4b2",
            "target": "target_8ad53973b5565e21770c",
            "sourceLabel": "Proteinuria",
            "targetLabel": "Diabetes mellitus",
            "sourceType": "lab_result",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.125,
            "lift": 209.3,
            "stability": 1.0,
            "questions": "daq_1f734b71c20bb3bf|daq_7ab4194ae2b1165e"
          },
          {
            "source": "concept_84c0fd6a9a7736ffa4b2",
            "target": "target_19ba37d7a45326993c44",
            "sourceLabel": "Proteinuria",
            "targetLabel": "Elevated c-ANCA titers",
            "sourceType": "lab_result",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.125,
            "lift": 209.3,
            "stability": 1.0,
            "questions": "daq_4cd2770231f548e5|daq_9e93e17b85478f52"
          },
          {
            "source": "concept_f8c34e416834e17609c6",
            "target": "target_46e1b4e700e8c14d09a1",
            "sourceLabel": "Breast carcinoma or DCIS",
            "targetLabel": "Angiosarcoma",
            "sourceType": "diagnostic_result",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.118,
            "lift": 197.0,
            "stability": 1.0,
            "questions": "daq_0debc7f389935f5a|daq_bf01a7c672b5fddd"
          },
          {
            "source": "concept_7d67edc1a5e468283294",
            "target": "target_6fc2a259604afdd4eeb1",
            "sourceLabel": "Ventricular tachycardia",
            "targetLabel": "Hyperthyroidism",
            "sourceType": "diagnostic_result",
            "targetType": "diagnosis_identification",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.4,
            "lift": 167.4,
            "stability": 1.0,
            "questions": "daq_cd285b441867d5c9|daq_d723681211f5b003"
          },
          {
            "source": "concept_5f7bb3bc73ad0145e88c",
            "target": "target_3c3ce37668c0d606973f",
            "sourceLabel": "Chronic bronchitis and emphysema",
            "targetLabel": "Albuterol",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.087,
            "lift": 145.6,
            "stability": 1.0,
            "questions": "daq_29877509974dee13|daq_58cee4ab0518b42f"
          },
          {
            "source": "concept_5f7bb3bc73ad0145e88c",
            "target": "target_6d8ba75a0c5d6864d899",
            "sourceLabel": "Chronic bronchitis and emphysema",
            "targetLabel": "Charcoal yeast extract agar",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.087,
            "lift": 145.6,
            "stability": 1.0,
            "questions": "daq_3c8d726396de13d7|daq_d22b366efe036618"
          },
          {
            "source": "concept_69b774b40e4f354ca4db",
            "target": "target_071462e25080d91efe72",
            "sourceLabel": "Parkinson disease and parkinsonism",
            "targetLabel": "Adverse effect of medication",
            "sourceType": "disease_condition_syndrome",
            "targetType": "contraindication_or_adverse_effect",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.167,
            "lift": 139.5,
            "stability": 1.0,
            "questions": "daq_44d84ca184311051|daq_cd6673d891d75154"
          },
          {
            "source": "concept_5088946db4d78d9a44c3",
            "target": "target_852f108fb1c49ca5506a",
            "sourceLabel": "Neoplasms",
            "targetLabel": "Capsular invasion",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.074,
            "lift": 124.0,
            "stability": 1.0,
            "questions": "daq_0c67b61a1559a127|daq_455ae3129df72100"
          },
          {
            "source": "concept_b8ff492eb864d2a4f59e",
            "target": "target_cc75e067116f12c74d30",
            "sourceLabel": "Breast cancer",
            "targetLabel": "Diethylstilbestrol exposure in utero",
            "sourceType": "disease_condition_syndrome",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.065,
            "lift": 108.0,
            "stability": 1.0,
            "questions": "daq_cea0eb0d64624619|daq_e0aa8d94cdba9896"
          },
          {
            "source": "concept_b8ff492eb864d2a4f59e",
            "target": "target_61aa6f4e69d7863767ca",
            "sourceLabel": "Breast cancer",
            "targetLabel": "Long thoracic nerve",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.065,
            "lift": 108.0,
            "stability": 1.0,
            "questions": "daq_2a2ff163f125545e|daq_6a84e415474fd1ab"
          },
          {
            "source": "concept_c744dc4c470e1cf37387",
            "target": "target_dd25d0940606a314a31e",
            "sourceLabel": "Depression and suicide",
            "targetLabel": "2.5",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.111,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_ee106ce103b97747|daq_f8e519f8d8e52477"
          },
          {
            "source": "concept_9f5b4656b37cdfa37e69",
            "target": "target_2dd2096d06ad45709be7",
            "sourceLabel": "Hypercholesterolemia",
            "targetLabel": "Abdominal ultrasonography",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.056,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_105e2a9e0bc23d9a|daq_9195cbc9184ab51f"
          },
          {
            "source": "concept_9f5b4656b37cdfa37e69",
            "target": "target_57139b8fb57192d8a66b",
            "sourceLabel": "Hypercholesterolemia",
            "targetLabel": "Accumulation of fluid in the pericardial space",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.056,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_004432ff233bf38a|daq_583500ab98bce04d"
          },
          {
            "source": "concept_9f5b4656b37cdfa37e69",
            "target": "target_9c69e30ad695f1cbce74",
            "sourceLabel": "Hypercholesterolemia",
            "targetLabel": "Occlusion of the posterior cerebral artery",
            "sourceType": "disease_condition_syndrome",
            "targetType": "risk_factor_or_etiology_reasoning",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.056,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_8b13efd6582ea287|daq_8d576f1cd1f9a3e7"
          },
          {
            "source": "concept_14e2d8453a94c9be2505",
            "target": "target_626d9476b10648266999",
            "sourceLabel": "Hypothyroidism",
            "targetLabel": "Gastric adenocarcinoma",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.056,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_bc7fb0bc35d14073|daq_e9b2288b650ae7ff"
          },
          {
            "source": "concept_c458c725e1e6452bb48d",
            "target": "target_76fc6345221a16a2c1ed",
            "sourceLabel": "Type 1 diabetes mellitus",
            "targetLabel": "Amniocentesis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.056,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_8bd9560eaab59772|daq_f70acfe651363fc8"
          },
          {
            "source": "concept_c458c725e1e6452bb48d",
            "target": "target_f3abb5ecf2ee1627b920",
            "sourceLabel": "Type 1 diabetes mellitus",
            "targetLabel": "Rhizopus microsporus",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.056,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_8840080359ff89ff|daq_fd710623bbc007a1"
          },
          {
            "source": "concept_500df01fe351d533e6fb",
            "target": "target_6fc2a259604afdd4eeb1",
            "sourceLabel": "Normal sinus rhythm",
            "targetLabel": "Hyperthyroidism",
            "sourceType": "diagnostic_result",
            "targetType": "diagnosis_identification",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.182,
            "lift": 76.1,
            "stability": 1.0,
            "questions": "daq_cd285b441867d5c9|daq_d723681211f5b003"
          },
          {
            "source": "concept_bd0d701b60920b936a55",
            "target": "target_d825469d41c259a915dd",
            "sourceLabel": "Anemia",
            "targetLabel": "Neoplastic lymphocytes that stain positive for tartrate-resistant acid phosphatase",
            "sourceType": "lab_result",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.087,
            "lift": 72.8,
            "stability": 1.0,
            "questions": "daq_033ab360c0999827|daq_48ce4e6557543b4e"
          },
          {
            "source": "concept_5f7bb3bc73ad0145e88c",
            "target": "target_51f3b72da0c2909d56db",
            "sourceLabel": "Chronic bronchitis and emphysema",
            "targetLabel": "Laser photocoagulation",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.087,
            "lift": 72.8,
            "stability": 1.0,
            "questions": "daq_148f29a7f232c759|daq_7536075bc6031b03"
          },
          {
            "source": "concept_60481edbc2f417ea2167",
            "target": "target_d82aa2abf3ccf805f672",
            "sourceLabel": "Immunization",
            "targetLabel": "Retinol",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.037,
            "lift": 62.0,
            "stability": 1.0,
            "questions": "daq_37f8b5a4a3fb946d|daq_c9688b2ec4887fca"
          },
          {
            "source": "concept_5088946db4d78d9a44c3",
            "target": "target_5853553d1b322c5ee583",
            "sourceLabel": "Neoplasms",
            "targetLabel": "MLH1",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.074,
            "lift": 62.0,
            "stability": 1.0,
            "questions": "daq_aebd8093314bc22e|daq_fe26ed1328dc59fc"
          },
          {
            "source": "concept_5088946db4d78d9a44c3",
            "target": "target_ad5c27cad2cb69f810ae",
            "sourceLabel": "Neoplasms",
            "targetLabel": "Para-aortic",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.074,
            "lift": 62.0,
            "stability": 1.0,
            "questions": "daq_263b71f2c39c111a|daq_ba86d070f1b259fc"
          },
          {
            "source": "concept_6de2cf669fe38eeb2cbf",
            "target": "target_43aa74b4fd52307aaf5a",
            "sourceLabel": "Coronary atherosclerosis",
            "targetLabel": "Hyperplasia of juxtaglomerular cells",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.036,
            "lift": 60.9,
            "stability": 1.0,
            "questions": "daq_34d2abe55cb6f578|daq_965d26e2f014a4da"
          },
          {
            "source": "concept_6de2cf669fe38eeb2cbf",
            "target": "target_0f2cb2adc85908024b89",
            "sourceLabel": "Coronary atherosclerosis",
            "targetLabel": "Normal perfusion with bilateral ventilation defects",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "confidence": 0.036,
            "lift": 60.9,
            "stability": 1.0,
            "questions": "daq_c5055a821c95873c|daq_e10a6427318d5f80"
          },
          {
            "source": "concept_485d86a7d6ed645e3f80",
            "target": "target_3109635d747f7a7931f2",
            "sourceLabel": "General clinical presentation",
            "targetLabel": "[object Object]",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 3,
            "confidence": 0.086,
            "lift": 3.6,
            "stability": 1.0,
            "questions": "daq_0ce6e3e68ce2b63b|daq_1b584ab2e8c8cc2b|daq_2529897a3c93c817"
          },
          {
            "source": "concept_e68c5a3024174cd279b5",
            "target": "target_e62a0108b8e0782c1df7",
            "sourceLabel": "spironolactone",
            "targetLabel": "Spironolactone",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 3,
            "confidence": 0.25,
            "lift": 25.4,
            "stability": 0.9,
            "questions": "daq_025786128f7eacfc|daq_23d02577fe54f379|daq_e717c0107a631373"
          },
          {
            "source": "concept_76102cf2d6b7bde1748b",
            "target": "target_3109635d747f7a7931f2",
            "sourceLabel": "Immunosuppression",
            "targetLabel": "[object Object]",
            "sourceType": "etiology_factor",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 3,
            "confidence": 0.042,
            "lift": 1.8,
            "stability": 0.9,
            "questions": "daq_0ce6e3e68ce2b63b|daq_1b584ab2e8c8cc2b|daq_805434dbe7faabe7"
          },
          {
            "source": "concept_0e3999e4bf255a754258",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Megaloblastic anemia",
            "targetLabel": "Folate deficiency",
            "sourceType": "disease_condition_syndrome",
            "targetType": "laboratory_test_selection",
            "layer": "explanation_teaching_network",
            "weight": 3,
            "confidence": 0.25,
            "lift": 29.9,
            "stability": 0.8,
            "questions": "daq_60a7c5a443219f07|daq_75689c69e674dec4|daq_9e5a0df9a66b2d16"
          },
          {
            "source": "concept_e1236377aa4557dd761c",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Folate, serum",
            "targetLabel": "Folate deficiency",
            "sourceType": "lab_test",
            "targetType": "laboratory_test_selection",
            "layer": "explanation_teaching_network",
            "weight": 3,
            "confidence": 0.231,
            "lift": 27.6,
            "stability": 0.8,
            "questions": "daq_60a7c5a443219f07|daq_75689c69e674dec4|daq_9e5a0df9a66b2d16"
          },
          {
            "source": "concept_8d151d70755df715dfa8",
            "target": "target_619a8b16b529524d948f",
            "sourceLabel": "Anhedonia",
            "targetLabel": "Major depressive disorder",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 279.1,
            "stability": 1.0,
            "questions": "daq_5952b673a45b9273|daq_9a16390c1d80ad61"
          },
          {
            "source": "concept_61e8c82954049684c4c9",
            "target": "target_38747590adfd0269c262",
            "sourceLabel": "Erythema multiforme",
            "targetLabel": "Erythema multiforme",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.667,
            "lift": 171.7,
            "stability": 1.0,
            "questions": "daq_97b65827ff27e864|daq_dd2b3cca3de27f73"
          },
          {
            "source": "concept_61785a12df8a2e4b78ac",
            "target": "target_619a8b16b529524d948f",
            "sourceLabel": "Depressed mood",
            "targetLabel": "Major depressive disorder",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 139.5,
            "stability": 1.0,
            "questions": "daq_5952b673a45b9273|daq_9a16390c1d80ad61"
          },
          {
            "source": "concept_d96939068864aafd45da",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Gingival hyperplasia",
            "targetLabel": "Phenytoin",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 139.5,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_421d3df870c5d3f1a771",
            "target": "target_91413d7f15136598b9e6",
            "sourceLabel": "amlodipine",
            "targetLabel": "Amlodipine",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 119.6,
            "stability": 1.0,
            "questions": "daq_04e9484064ddeb73|daq_17149cfcc80b056e"
          },
          {
            "source": "concept_2be202762b553115ea00",
            "target": "target_17a46625f0969bb38e1b",
            "sourceLabel": "celecoxib",
            "targetLabel": "Celecoxib",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 98.5,
            "stability": 1.0,
            "questions": "daq_02865f101eed228a|daq_3c1ebd9eb4cf7125"
          },
          {
            "source": "concept_10794a453109750eed79",
            "target": "target_a4a279fb0b879fd9df86",
            "sourceLabel": "rifampin",
            "targetLabel": "Rifampin",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.222,
            "lift": 93.0,
            "stability": 1.0,
            "questions": "daq_6b96fd6d97120087|daq_f036e74c40d0ae72"
          },
          {
            "source": "concept_814f35355b0ddf3fb5d1",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Hirsutism",
            "targetLabel": "Phenytoin",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 79.7,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_e9790d73ccc4e41d8539",
            "target": "target_b30a89d93ed36d8564e1",
            "sourceLabel": "Hypertrophic cardiomyopathies",
            "targetLabel": "Hypertrophic cardiomyopathy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.4,
            "lift": 70.5,
            "stability": 1.0,
            "questions": "daq_a04a38b501fd6947|daq_fa2f75962b80e682"
          },
          {
            "source": "concept_c744dc4c470e1cf37387",
            "target": "target_619a8b16b529524d948f",
            "sourceLabel": "Depression and suicide",
            "targetLabel": "Major depressive disorder",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 69.8,
            "stability": 1.0,
            "questions": "daq_5952b673a45b9273|daq_9a16390c1d80ad61"
          },
          {
            "source": "concept_fbeea51e1147ba199067",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Nystagmus",
            "targetLabel": "Phenytoin",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.2,
            "lift": 55.8,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_0e3999e4bf255a754258",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Megaloblastic anemia",
            "targetLabel": "Phenytoin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 46.5,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_456cad8ce4d3794748ec",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "phenytoin",
            "targetLabel": "Phenytoin",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 46.5,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_90ea86fa44e34af66da2",
            "target": "target_b30a89d93ed36d8564e1",
            "sourceLabel": "Dyspnea on exertion",
            "targetLabel": "Hypertrophic cardiomyopathy",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.2,
            "lift": 35.3,
            "stability": 1.0,
            "questions": "daq_a04a38b501fd6947|daq_fa2f75962b80e682"
          },
          {
            "source": "concept_08150b5ba2797832ce98",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "fresh frozen plasma",
            "targetLabel": "No additional treatment",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.333,
            "lift": 27.2,
            "stability": 1.0,
            "questions": "daq_075a62c04badbba0|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_88f3f99a2d179aee05f4",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "Autoimmune hemolytic anemia",
            "targetLabel": "No additional treatment",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 20.4,
            "stability": 1.0,
            "questions": "daq_07ea19396fe67c43|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_65fd0b8f8863b1d6153d",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "Fibrinogen, plasma",
            "targetLabel": "No additional treatment",
            "sourceType": "lab_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.182,
            "lift": 14.9,
            "stability": 1.0,
            "questions": "daq_075a62c04badbba0|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_96f63ebd579dbee9e7f9",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Seizures",
            "targetLabel": "Phenytoin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.053,
            "lift": 14.7,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_e71bf66308d78ccfdd16",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "Travel to malaria-endemic region",
            "targetLabel": "No additional treatment",
            "sourceType": "etiology_factor",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.1,
            "lift": 8.2,
            "stability": 1.0,
            "questions": "daq_07ea19396fe67c43|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_b2719f67e28449dbf762",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "Thrombocytopenia",
            "targetLabel": "No additional treatment",
            "sourceType": "lab_result",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.065,
            "lift": 5.3,
            "stability": 1.0,
            "questions": "daq_075a62c04badbba0|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_6b3f98411923467e69a5",
            "target": "target_3109635d747f7a7931f2",
            "sourceLabel": "Iatrogenic and postoperative CNS infections",
            "targetLabel": "[object Object]",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.091,
            "lift": 3.9,
            "stability": 1.0,
            "questions": "daq_031a80f41c90a734|daq_0646fe09e04b04c4"
          },
          {
            "source": "concept_0e0c5132273a5207415b",
            "target": "target_f7218728b64a2ef72fee",
            "sourceLabel": "Barking cough",
            "targetLabel": "Subglottic larynx",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 478.4,
            "stability": 0.9,
            "questions": "daq_ca8742eb3ff4e52f|daq_dd7251bd7f80c635"
          },
          {
            "source": "concept_3a04f9e9f70a40a31f54",
            "target": "target_f7218728b64a2ef72fee",
            "sourceLabel": "Stridor",
            "targetLabel": "Subglottic larynx",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.4,
            "lift": 191.4,
            "stability": 0.9,
            "questions": "daq_ca8742eb3ff4e52f|daq_dd7251bd7f80c635"
          },
          {
            "source": "concept_47c78bb78f65c727872d",
            "target": "target_2d0c26b0f9434af05bdc",
            "sourceLabel": "Floaters",
            "targetLabel": "Retinal detachment",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 186.1,
            "stability": 0.9,
            "questions": "daq_1faff6d0ad80ea1f|daq_b501b8293278b217"
          },
          {
            "source": "concept_f3086dfd177094c7f41d",
            "target": "target_2d0c26b0f9434af05bdc",
            "sourceLabel": "Photopsia",
            "targetLabel": "Retinal detachment",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 186.1,
            "stability": 0.9,
            "questions": "daq_1faff6d0ad80ea1f|daq_b501b8293278b217"
          },
          {
            "source": "concept_a3218e0fbe07eaa6ab54",
            "target": "target_bd9a9e9fd6a75ef745a1",
            "sourceLabel": "lacosamide",
            "targetLabel": "Valproate",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 1.0,
            "lift": 145.6,
            "stability": 0.9,
            "questions": "daq_0fdd1b7790ec348f|daq_3d5051154d115ac0"
          },
          {
            "source": "concept_b305d8366e266575048c",
            "target": "target_f7218728b64a2ef72fee",
            "sourceLabel": "Hoarseness",
            "targetLabel": "Subglottic larynx",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 136.7,
            "stability": 0.9,
            "questions": "daq_ca8742eb3ff4e52f|daq_dd7251bd7f80c635"
          },
          {
            "source": "concept_d66d0cd03c34428a4ecc",
            "target": "target_2d0c26b0f9434af05bdc",
            "sourceLabel": "Retinal detachment",
            "targetLabel": "Retinal detachment",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnosis_identification",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.667,
            "lift": 124.0,
            "stability": 0.9,
            "questions": "daq_1faff6d0ad80ea1f|daq_b501b8293278b217"
          },
          {
            "source": "concept_c1432dc92dcc1bebf3f1",
            "target": "target_2956a28883b16213aed6",
            "sourceLabel": "bupropion",
            "targetLabel": "Bupropion",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.333,
            "lift": 124.0,
            "stability": 0.9,
            "questions": "daq_03850803e72b425e|daq_0f449320f6b0b7b0"
          },
          {
            "source": "concept_5dfbcc7b6270e5e14dd0",
            "target": "target_1baccef10d45940a7bc0",
            "sourceLabel": "azithromycin",
            "targetLabel": "Oral azithromycin",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 111.6,
            "stability": 0.9,
            "questions": "daq_2b3e6376eb9ec827|daq_b009cc2e66e5a112"
          },
          {
            "source": "concept_f72f1b921858242383ac",
            "target": "target_4f982913b33058da3849",
            "sourceLabel": "Diagnostic cystoscopy",
            "targetLabel": "Cystoscopy",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_test_selection",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 104.7,
            "stability": 0.9,
            "questions": "daq_1b8c9bc7f9462652|daq_2391a08d5baa8a7a"
          },
          {
            "source": "concept_48a4592443431ce0a742",
            "target": "target_bd9a9e9fd6a75ef745a1",
            "sourceLabel": "levetiracetam",
            "targetLabel": "Valproate",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.667,
            "lift": 97.1,
            "stability": 0.9,
            "questions": "daq_0fdd1b7790ec348f|daq_3d5051154d115ac0"
          },
          {
            "source": "concept_47ad70daeb3d0b55f0a3",
            "target": "target_4f789ce1b970cfef920d",
            "sourceLabel": "Squamous cell carcinoma",
            "targetLabel": "Squamous cell lung carcinoma",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.2,
            "lift": 95.7,
            "stability": 0.9,
            "questions": "daq_062112b83ca48e8c|daq_ace5aa3f171e33f8"
          },
          {
            "source": "concept_cb5f1ba42ced2a93a9d2",
            "target": "target_fca50d1e6c3ac6ea7479",
            "sourceLabel": "chlorthalidone",
            "targetLabel": "Chlorthalidone",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 76.1,
            "stability": 0.9,
            "questions": "daq_247fc804357c8bc0|daq_5fa0b176f3a1544c"
          },
          {
            "source": "concept_a7f93e97ec6916519d39",
            "target": "target_bd9a9e9fd6a75ef745a1",
            "sourceLabel": "fosphenytoin",
            "targetLabel": "Valproate",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.5,
            "lift": 72.8,
            "stability": 0.9,
            "questions": "daq_0fdd1b7790ec348f|daq_3d5051154d115ac0"
          },
          {
            "source": "concept_65fd0b8f8863b1d6153d",
            "target": "target_db9fa0bc4970cd2baf6e",
            "sourceLabel": "Fibrinogen, plasma",
            "targetLabel": "Glanzmann thrombasthenia",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.182,
            "lift": 60.9,
            "stability": 0.9,
            "questions": "daq_44eafd5d0093884a|daq_7a86cb9dc2efba40"
          },
          {
            "source": "concept_1739ba9369248f90e602",
            "target": "target_97459f542bc1669fc392",
            "sourceLabel": "Magnesium, serum",
            "targetLabel": "Magnesium sulfate",
            "sourceType": "lab_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 59.8,
            "stability": 0.9,
            "questions": "daq_8ff8d0c9ecb515bb|daq_a148d1faaeff72cd"
          },
          {
            "source": "concept_a5339d00efbde9a399b2",
            "target": "target_57e9ef0b0589df9fce85",
            "sourceLabel": "ibuprofen",
            "targetLabel": "Ibuprofen therapy",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.182,
            "lift": 55.4,
            "stability": 0.9,
            "questions": "daq_834ec936dc046758|daq_fbb2d5b02d0c5ce7"
          },
          {
            "source": "concept_b1971d0ef38476b3ddb6",
            "target": "target_320c54b1e29be08aaad1",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "Transthoracic echocardiography",
            "sourceType": "imaging_test",
            "targetType": "imaging_selection",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 53.2,
            "stability": 0.9,
            "questions": "daq_151a4838d48545aa|daq_bfbb9b5efa805dec"
          },
          {
            "source": "concept_3446d2a398d5d328e438",
            "target": "target_2d0c913ccdf3006f758d",
            "sourceLabel": "cryoprecipitate",
            "targetLabel": "Cryoprecipitate",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.333,
            "lift": 53.2,
            "stability": 0.9,
            "questions": "daq_001da5dd10ed6aad|daq_05590a1535c89568"
          },
          {
            "source": "concept_bf64749a390fc244ad7e",
            "target": "target_f6640b665282615df32f",
            "sourceLabel": "Diagnostic EGD / upper endoscopy",
            "targetLabel": "Upper endoscopy",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_test_selection",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 52.3,
            "stability": 0.9,
            "questions": "daq_0b8c46f8c4cc1ce8|daq_0c6847b80b55f561"
          },
          {
            "source": "concept_0c51d72f21cdcc4ce15c",
            "target": "target_57e9ef0b0589df9fce85",
            "sourceLabel": "acetaminophen",
            "targetLabel": "Ibuprofen therapy",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 50.7,
            "stability": 0.9,
            "questions": "daq_834ec936dc046758|daq_fbb2d5b02d0c5ce7"
          },
          {
            "source": "concept_e4fee753b2cd009550e7",
            "target": "target_9b1f7812c0fd22e36137",
            "sourceLabel": "metoprolol",
            "targetLabel": "Metoprolol",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 50.7,
            "stability": 0.9,
            "questions": "daq_03dd004a8d1bc1ae|daq_0d144fce4fe83f7a"
          },
          {
            "source": "concept_92439e0139371d47ba96",
            "target": "target_4f789ce1b970cfef920d",
            "sourceLabel": "Parathyroid hormone (PTH), serum",
            "targetLabel": "Squamous cell lung carcinoma",
            "sourceType": "lab_test",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.105,
            "lift": 50.4,
            "stability": 0.9,
            "questions": "daq_062112b83ca48e8c|daq_ace5aa3f171e33f8"
          },
          {
            "source": "concept_daf4e9a21808f9b31cf5",
            "target": "target_bd9a9e9fd6a75ef745a1",
            "sourceLabel": "lorazepam",
            "targetLabel": "Valproate",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.25,
            "lift": 36.4,
            "stability": 0.9,
            "questions": "daq_0fdd1b7790ec348f|daq_3d5051154d115ac0"
          },
          {
            "source": "concept_0086a2b5bdee34e1b257",
            "target": "target_9d2596fdb1181920f65f",
            "sourceLabel": "methotrexate",
            "targetLabel": "Methotrexate",
            "sourceType": "medication",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.167,
            "lift": 32.8,
            "stability": 0.9,
            "questions": "daq_2f4f129ab650f7cf|daq_714362a51ed0bfac"
          },
          {
            "source": "concept_83b638779e2673b7ac8c",
            "target": "target_db9fa0bc4970cd2baf6e",
            "sourceLabel": "Platelet count",
            "targetLabel": "Glanzmann thrombasthenia",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.087,
            "lift": 29.1,
            "stability": 0.9,
            "questions": "daq_44eafd5d0093884a|daq_7a86cb9dc2efba40"
          },
          {
            "source": "concept_65fd0b8f8863b1d6153d",
            "target": "target_2d0c913ccdf3006f758d",
            "sourceLabel": "Fibrinogen, plasma",
            "targetLabel": "Cryoprecipitate",
            "sourceType": "lab_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.182,
            "lift": 29.0,
            "stability": 0.9,
            "questions": "daq_001da5dd10ed6aad|daq_05590a1535c89568"
          },
          {
            "source": "concept_814f35355b0ddf3fb5d1",
            "target": "target_e62a0108b8e0782c1df7",
            "sourceLabel": "Hirsutism",
            "targetLabel": "Spironolactone",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.286,
            "lift": 29.0,
            "stability": 0.9,
            "questions": "daq_025786128f7eacfc|daq_23d02577fe54f379"
          },
          {
            "source": "concept_3c445d5a408d8de48920",
            "target": "target_320c54b1e29be08aaad1",
            "sourceLabel": "Transthoracic echocardiogram",
            "targetLabel": "Transthoracic echocardiography",
            "sourceType": "imaging_test",
            "targetType": "imaging_selection",
            "layer": "explanation_teaching_network",
            "weight": 2,
            "confidence": 0.154,
            "lift": 28.6,
            "stability": 0.9,
            "questions": "daq_151a4838d48545aa|daq_bfbb9b5efa805dec"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Female sex",
            "targetLabel": "Folate deficiency",
            "sourceType": "etiology_factor",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 5,
            "confidence": 0.004,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_75689c69e674dec4|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_cd16c425739b3043353f",
            "target": "target_da6af5e3f18c00be7bb3",
            "sourceLabel": "Diagnostic colonoscopy",
            "targetLabel": "Pancreatic carcinoma",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.211,
            "lift": 70.5,
            "stability": 1.0,
            "questions": "daq_07ae3e90bd0868e3|daq_88b63106bf6a9f41|daq_d054b69c50f50900|daq_e0cba82d2fd5e4ac"
          },
          {
            "source": "concept_96f63ebd579dbee9e7f9",
            "target": "target_ae3e4191b7a5e0607946",
            "sourceLabel": "Seizures",
            "targetLabel": "Phenytoin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.118,
            "lift": 65.7,
            "stability": 1.0,
            "questions": "daq_19944cc7f2d2b91a|daq_1a22e60389c28bb0|daq_710c59970e124f74|daq_f34da857718ea3e2"
          },
          {
            "source": "concept_99e1504de59caa549b78",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Peptic ulcer disease (other than Helicobacter pylori)",
            "targetLabel": "Folate deficiency",
            "sourceType": "disease_condition_syndrome",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.444,
            "lift": 43.8,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_2ed41eb7c84ed31b6090",
            "target": "target_f7218728b64a2ef72fee",
            "sourceLabel": "Rhinorrhea",
            "targetLabel": "Subglottic larynx",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.121,
            "lift": 40.6,
            "stability": 1.0,
            "questions": "daq_14acfe1e84329e46|daq_154f4a08fc090614|daq_ca8742eb3ff4e52f|daq_dd7251bd7f80c635"
          },
          {
            "source": "concept_fbeea51e1147ba199067",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Nystagmus",
            "targetLabel": "Folate deficiency",
            "sourceType": "physical_exam",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.308,
            "lift": 30.3,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_60481edbc2f417ea2167",
            "target": "target_f7218728b64a2ef72fee",
            "sourceLabel": "Immunization",
            "targetLabel": "Subglottic larynx",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.074,
            "lift": 24.8,
            "stability": 1.0,
            "questions": "daq_14acfe1e84329e46|daq_154f4a08fc090614|daq_ca8742eb3ff4e52f|daq_dd7251bd7f80c635"
          },
          {
            "source": "concept_cb072af91c32f40e04cd",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "omeprazole",
            "targetLabel": "Folate deficiency",
            "sourceType": "medication",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.222,
            "lift": 21.9,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_bd0d701b60920b936a55",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Anemia",
            "targetLabel": "Folate deficiency",
            "sourceType": "lab_result",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.174,
            "lift": 17.1,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_67959b5c74bb8ac11d9b",
            "target": "target_c8dfa228c042c18704d9",
            "sourceLabel": "Weight gain",
            "targetLabel": "Loss of antithrombin III",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.118,
            "lift": 10.9,
            "stability": 1.0,
            "questions": "daq_73e1490cd7bb7f57|daq_91464f4bf4a9436e|daq_afe33a6076ac9f79|daq_db5b9492c66e0978"
          },
          {
            "source": "concept_a27333cec40f73a1f595",
            "target": "target_6c74e7967a2328d86de2",
            "sourceLabel": "Palpitations",
            "targetLabel": "Phenoxybenzamine",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.041,
            "lift": 9.8,
            "stability": 1.0,
            "questions": "daq_03860fa1c09e3c91|daq_1d7970f1bfadecda|daq_3ed645fb307b9b6f|daq_a5d5b6a7978aadba"
          },
          {
            "source": "concept_3f75d1628bb1e4b6ca40",
            "target": "target_4fd0df83341957be37dc",
            "sourceLabel": "Pregnancy",
            "targetLabel": "Jejunal atresia",
            "sourceType": "etiology_factor",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.03,
            "lift": 8.5,
            "stability": 1.0,
            "questions": "daq_27bffd757ee8a6ba|daq_69a19b18e295d7b1|daq_8919970eca611b73|daq_a3e31c96148d0113"
          },
          {
            "source": "concept_1a8622a7010d3e8fcd61",
            "target": "target_c8dfa228c042c18704d9",
            "sourceLabel": "Flank pain",
            "targetLabel": "Loss of antithrombin III",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.085,
            "lift": 7.9,
            "stability": 1.0,
            "questions": "daq_73e1490cd7bb7f57|daq_91464f4bf4a9436e|daq_afe33a6076ac9f79|daq_db5b9492c66e0978"
          },
          {
            "source": "concept_ec4f60ef1c1e2f287929",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Confusion",
            "targetLabel": "Folate deficiency",
            "sourceType": "physical_exam_symptom",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.062,
            "lift": 6.1,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_16e291331f587c9423e8",
            "target": "target_44756420df306eceb51a",
            "sourceLabel": "Crackles",
            "targetLabel": "Amiodarone",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.034,
            "lift": 5.2,
            "stability": 1.0,
            "questions": "daq_027a49ce86c9800b|daq_0552541931b12050|daq_14cb8b0903c4a17b|daq_9e7e8289947d0f0c"
          },
          {
            "source": "concept_b42de94db09c0c61834f",
            "target": "target_619a8b16b529524d948f",
            "sourceLabel": "Fatigue",
            "targetLabel": "Major depressive disorder",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.014,
            "lift": 3.9,
            "stability": 1.0,
            "questions": "daq_05aaeeb36648aaf7|daq_5952b673a45b9273|daq_911ef49fefae5041|daq_9a16390c1d80ad61"
          },
          {
            "source": "concept_540b414a6527789a3334",
            "target": "target_c8dfa228c042c18704d9",
            "sourceLabel": "Urinalysis",
            "targetLabel": "Loss of antithrombin III",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.037,
            "lift": 3.4,
            "stability": 1.0,
            "questions": "daq_73e1490cd7bb7f57|daq_91464f4bf4a9436e|daq_afe33a6076ac9f79|daq_db5b9492c66e0978"
          },
          {
            "source": "concept_eb41bbac4bf66948f32a",
            "target": "target_c8dfa228c042c18704d9",
            "sourceLabel": "Protein, total, serum",
            "targetLabel": "Loss of antithrombin III",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.035,
            "lift": 3.3,
            "stability": 1.0,
            "questions": "daq_73e1490cd7bb7f57|daq_91464f4bf4a9436e|daq_afe33a6076ac9f79|daq_db5b9492c66e0978"
          },
          {
            "source": "concept_47821c8eebcb97b9c37c",
            "target": "target_1c739e6229d6e7361acf",
            "sourceLabel": "Hemoglobin, blood",
            "targetLabel": "Folate deficiency",
            "sourceType": "lab_test",
            "targetType": "laboratory_test_selection",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.028,
            "lift": 2.7,
            "stability": 1.0,
            "questions": "daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "target_bc18e3f52ddb15850d44",
            "sourceLabel": "Female sex",
            "targetLabel": "Atrioventricular septal defect",
            "sourceType": "etiology_factor",
            "targetType": "diagnosis_identification",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.003,
            "lift": 2.6,
            "stability": 1.0,
            "questions": "daq_57acbc00d2243e63|daq_99574d593b7e41a5|daq_ace2775355423d89|daq_d50b619423cae41e"
          },
          {
            "source": "concept_6f62cb7366f2a8e5aec5",
            "target": "target_c8dfa228c042c18704d9",
            "sourceLabel": "Glucose, plasma, fasting",
            "targetLabel": "Loss of antithrombin III",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.027,
            "lift": 2.5,
            "stability": 1.0,
            "questions": "daq_73e1490cd7bb7f57|daq_91464f4bf4a9436e|daq_afe33a6076ac9f79|daq_db5b9492c66e0978"
          },
          {
            "source": "concept_b42de94db09c0c61834f",
            "target": "target_dca5708a54e683362a48",
            "sourceLabel": "Fatigue",
            "targetLabel": "Mycoplasma pneumoniae",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.014,
            "lift": 2.5,
            "stability": 1.0,
            "questions": "daq_037559b265c648ed|daq_5d99fb4194e1ec6e|daq_a71fa3b151d00eee|daq_b6b970ece683e10d"
          },
          {
            "source": "concept_269a4223c2ec5debf594",
            "target": "target_c8dfa228c042c18704d9",
            "sourceLabel": "Swelling",
            "targetLabel": "Loss of antithrombin III",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.019,
            "lift": 1.7,
            "stability": 1.0,
            "questions": "daq_73e1490cd7bb7f57|daq_91464f4bf4a9436e|daq_afe33a6076ac9f79|daq_db5b9492c66e0978"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "target_4fd0df83341957be37dc",
            "sourceLabel": "Female sex",
            "targetLabel": "Jejunal atresia",
            "sourceType": "etiology_factor",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.003,
            "lift": 0.9,
            "stability": 1.0,
            "questions": "daq_27bffd757ee8a6ba|daq_69a19b18e295d7b1|daq_8919970eca611b73|daq_a3e31c96148d0113"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "target_071462e25080d91efe72",
            "sourceLabel": "Female sex",
            "targetLabel": "Adverse effect of medication",
            "sourceType": "etiology_factor",
            "targetType": "contraindication_or_adverse_effect",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.003,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_41da460b3d1c901f|daq_44d84ca184311051|daq_7917c304bbb38a6a|daq_cd6673d891d75154"
          },
          {
            "source": "concept_b086dd488eac3e121552",
            "target": "target_e373b2b12643da8672cc",
            "sourceLabel": "Congenital malformations of aortic and mitral valves",
            "targetLabel": "Streptococcus sanguinis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.8,
            "lift": 148.8,
            "stability": 0.9,
            "questions": "daq_0ff1e469d79c1929|daq_56c9dc9bef577c95|daq_77900c9608d77370|daq_be6877d714d0a2b3"
          },
          {
            "source": "concept_b42de94db09c0c61834f",
            "target": "target_e373b2b12643da8672cc",
            "sourceLabel": "Fatigue",
            "targetLabel": "Streptococcus sanguinis",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.014,
            "lift": 2.6,
            "stability": 0.9,
            "questions": "daq_0ff1e469d79c1929|daq_56c9dc9bef577c95|daq_77900c9608d77370|daq_be6877d714d0a2b3"
          },
          {
            "source": "concept_f5d3350d2ec23df4435a",
            "target": "target_3109635d747f7a7931f2",
            "sourceLabel": "Leukocyte count (WBC)",
            "targetLabel": "[object Object]",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.029,
            "lift": 2.2,
            "stability": 0.9,
            "questions": "daq_031a80f41c90a734|daq_0e83c74fe6996c33|daq_1b584ab2e8c8cc2b|daq_2529897a3c93c817"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "target_215569a07c73a063cd18",
            "sourceLabel": "Female sex",
            "targetLabel": "Borderline personality disorder",
            "sourceType": "etiology_factor",
            "targetType": "diagnosis_identification",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 4,
            "confidence": 0.003,
            "lift": 1.0,
            "stability": 0.9,
            "questions": "daq_24b5db217d3868d8|daq_733a9f7234e83f78|daq_bfc80a7c7dbd7b01|daq_cd8e078b79921b91"
          },
          {
            "source": "concept_fdbf3e48e004d142841c",
            "target": "target_2e4b5676ea2cdacfe095",
            "sourceLabel": "meloxicam",
            "targetLabel": "Staphylococcus epidermidis",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 1.0,
            "lift": 257.6,
            "stability": 1.0,
            "questions": "daq_0485a7511a975351|daq_123aa653ac62eeae|daq_7807855e552039b4"
          },
          {
            "source": "concept_1b2636c1f20ab3bd7fb8",
            "target": "target_6c74e7967a2328d86de2",
            "sourceLabel": "Metanephrines, fractionated, plasma/urine",
            "targetLabel": "Phenoxybenzamine",
            "sourceType": "lab_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.75,
            "lift": 179.4,
            "stability": 1.0,
            "questions": "daq_03860fa1c09e3c91|daq_1d7970f1bfadecda|daq_a5d5b6a7978aadba"
          },
          {
            "source": "concept_3a5d14b8faa674579ab9",
            "target": "target_2956a28883b16213aed6",
            "sourceLabel": "Psychomotor retardation",
            "targetLabel": "Bupropion",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.75,
            "lift": 132.2,
            "stability": 1.0,
            "questions": "daq_03850803e72b425e|daq_0f449320f6b0b7b0|daq_b8b96d8fa4375acc"
          },
          {
            "source": "concept_a91bd5a85738bc1aff6f",
            "target": "target_1c12e06d342abaa033e2",
            "sourceLabel": "Conjunctival injection",
            "targetLabel": "Impaired reaction time",
            "sourceType": "physical_exam",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.3,
            "lift": 100.5,
            "stability": 1.0,
            "questions": "daq_0018e88673d48720|daq_0d01733815486ae7|daq_9b7c3d5a1d072124"
          },
          {
            "source": "concept_26826c01cf1c2054173f",
            "target": "target_2e4b5676ea2cdacfe095",
            "sourceLabel": "Arthrocentesis / synovial fluid analysis",
            "targetLabel": "Staphylococcus epidermidis",
            "sourceType": "diagnostic_test",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.231,
            "lift": 59.4,
            "stability": 1.0,
            "questions": "daq_0485a7511a975351|daq_123aa653ac62eeae|daq_7807855e552039b4"
          },
          {
            "source": "concept_ab14c46ff47dc69a074f",
            "target": "target_98d38e19550bdc9e6984",
            "sourceLabel": "Macule",
            "targetLabel": "Parvovirus arthritis",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.375,
            "lift": 57.1,
            "stability": 1.0,
            "questions": "daq_08e7b926a8866bcd|daq_5ca14651b4ace29f|daq_5fa82a0152a4ac3f"
          },
          {
            "source": "concept_1ce52d3e0743ba3a4a96",
            "target": "target_3a263f9a7bc58fc974bf",
            "sourceLabel": "Lethargy",
            "targetLabel": "Complex partial seizure",
            "sourceType": "physical_exam",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.038,
            "lift": 42.9,
            "stability": 1.0,
            "questions": "daq_0ab15ca3246a3f5f|daq_50c1f46cc336f610|daq_f0c92e6caf6dfde0"
          },
          {
            "source": "concept_6e42e1b75d7e68f22390",
            "target": "target_4f789ce1b970cfef920d",
            "sourceLabel": "Calcium, serum, total",
            "targetLabel": "Squamous cell lung carcinoma",
            "sourceType": "lab_test",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.15,
            "lift": 41.9,
            "stability": 1.0,
            "questions": "daq_062112b83ca48e8c|daq_ace5aa3f171e33f8|daq_d8a7d257bc06151c"
          },
          {
            "source": "concept_3eab946400982c5fdaf5",
            "target": "target_2956a28883b16213aed6",
            "sourceLabel": "Poor concentration",
            "targetLabel": "Bupropion",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.214,
            "lift": 37.8,
            "stability": 1.0,
            "questions": "daq_03850803e72b425e|daq_0f449320f6b0b7b0|daq_b8b96d8fa4375acc"
          },
          {
            "source": "concept_cfa0f70ca35eb761462e",
            "target": "target_98d38e19550bdc9e6984",
            "sourceLabel": "Beryllium exposure",
            "targetLabel": "Parvovirus arthritis",
            "sourceType": "etiology_factor",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.231,
            "lift": 35.1,
            "stability": 1.0,
            "questions": "daq_08e7b926a8866bcd|daq_5ca14651b4ace29f|daq_5fa82a0152a4ac3f"
          },
          {
            "source": "concept_85c1ea2de4b8eb5bb3cd",
            "target": "target_4f789ce1b970cfef920d",
            "sourceLabel": "Ionizing radiation exposure",
            "targetLabel": "Squamous cell lung carcinoma",
            "sourceType": "etiology_factor",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.115,
            "lift": 32.2,
            "stability": 1.0,
            "questions": "daq_062112b83ca48e8c|daq_ace5aa3f171e33f8|daq_d8a7d257bc06151c"
          },
          {
            "source": "concept_0ccff62217d700744565",
            "target": "target_2956a28883b16213aed6",
            "sourceLabel": "Flat affect",
            "targetLabel": "Bupropion",
            "sourceType": "physical_exam",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.176,
            "lift": 31.1,
            "stability": 1.0,
            "questions": "daq_03850803e72b425e|daq_0f449320f6b0b7b0|daq_b8b96d8fa4375acc"
          },
          {
            "source": "concept_e318518c8fd1e6ae52b2",
            "target": "target_1c12e06d342abaa033e2",
            "sourceLabel": "Dry mucous membranes",
            "targetLabel": "Impaired reaction time",
            "sourceType": "physical_exam",
            "targetType": "diagnostic_or_result_interpretation",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.083,
            "lift": 27.9,
            "stability": 1.0,
            "questions": "daq_0018e88673d48720|daq_0d01733815486ae7|daq_9b7c3d5a1d072124"
          },
          {
            "source": "concept_882f7ac8484d8b7b1f84",
            "target": "target_bd9a9e9fd6a75ef745a1",
            "sourceLabel": "Seizure",
            "targetLabel": "Valproate",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.115,
            "lift": 19.3,
            "stability": 1.0,
            "questions": "daq_0fb0e74001ddc341|daq_0fdd1b7790ec348f|daq_ea5596a2d6c03002"
          },
          {
            "source": "concept_67959b5c74bb8ac11d9b",
            "target": "target_5051429094348ad14836",
            "sourceLabel": "Weight gain",
            "targetLabel": "Hypothyroidism",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnosis_identification",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.088,
            "lift": 17.4,
            "stability": 1.0,
            "questions": "daq_388367138ad397e0|daq_8147e882204acabf|daq_e6e5b4a930fbbda5"
          },
          {
            "source": "concept_27cf44a149ef4e4a8a77",
            "target": "target_bd9a9e9fd6a75ef745a1",
            "sourceLabel": "Tremor",
            "targetLabel": "Valproate",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.103,
            "lift": 17.3,
            "stability": 1.0,
            "questions": "daq_0fb0e74001ddc341|daq_0fdd1b7790ec348f|daq_ea5596a2d6c03002"
          },
          {
            "source": "concept_2ed41eb7c84ed31b6090",
            "target": "target_98d38e19550bdc9e6984",
            "sourceLabel": "Rhinorrhea",
            "targetLabel": "Parvovirus arthritis",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.091,
            "lift": 13.8,
            "stability": 1.0,
            "questions": "daq_08e7b926a8866bcd|daq_5ca14651b4ace29f|daq_5fa82a0152a4ac3f"
          },
          {
            "source": "concept_421d3df870c5d3f1a771",
            "target": "target_2e4b5676ea2cdacfe095",
            "sourceLabel": "amlodipine",
            "targetLabel": "Staphylococcus epidermidis",
            "sourceType": "medication",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.049,
            "lift": 12.7,
            "stability": 1.0,
            "questions": "daq_0485a7511a975351|daq_123aa653ac62eeae|daq_7807855e552039b4"
          },
          {
            "source": "concept_eb41bbac4bf66948f32a",
            "target": "target_fd7bfc6d80a0e366f356",
            "sourceLabel": "Protein, total, serum",
            "targetLabel": "Coxsackievirus",
            "sourceType": "lab_test",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.026,
            "lift": 8.8,
            "stability": 1.0,
            "questions": "daq_00dfc56ec48bcb2c|daq_06650dd0dc732fc6|daq_f429b8e7d4fb5b18"
          },
          {
            "source": "concept_c67e0a1c2d31eb0756b1",
            "target": "target_94c1524ddbbaabed7315",
            "sourceLabel": "Tenderness",
            "targetLabel": "Naproxen",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.014,
            "lift": 5.8,
            "stability": 1.0,
            "questions": "daq_7648428b43fc2ef9|daq_98de8b823f032cfd|daq_d49af2da4afa4a49"
          },
          {
            "source": "concept_437e199ec345d14ba0ce",
            "target": "target_2c5ed7f125f2bdef04d6",
            "sourceLabel": "CT scan",
            "targetLabel": "Alteplase",
            "sourceType": "imaging_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.024,
            "lift": 5.3,
            "stability": 1.0,
            "questions": "daq_0b59a7b02b8c9a6e|daq_1bc4410d07504797|daq_74babf08eb766b82"
          },
          {
            "source": "concept_83b638779e2673b7ac8c",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "Platelet count",
            "targetLabel": "No additional treatment",
            "sourceType": "lab_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.029,
            "lift": 2.8,
            "stability": 1.0,
            "questions": "daq_075a62c04badbba0|daq_07ea19396fe67c43|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_30bdc8df7c42e153e626",
            "target": "target_9b1f7812c0fd22e36137",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "Metoprolol",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.017,
            "lift": 2.4,
            "stability": 1.0,
            "questions": "daq_03dd004a8d1bc1ae|daq_0d144fce4fe83f7a|daq_e97a5db223ed130e"
          },
          {
            "source": "concept_269a4223c2ec5debf594",
            "target": "target_98d38e19550bdc9e6984",
            "sourceLabel": "Swelling",
            "targetLabel": "Parvovirus arthritis",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.014,
            "lift": 2.1,
            "stability": 1.0,
            "questions": "daq_08e7b926a8866bcd|daq_5ca14651b4ace29f|daq_5fa82a0152a4ac3f"
          },
          {
            "source": "concept_c67e0a1c2d31eb0756b1",
            "target": "target_98d38e19550bdc9e6984",
            "sourceLabel": "Tenderness",
            "targetLabel": "Parvovirus arthritis",
            "sourceType": "physical_exam_symptom",
            "targetType": "other_review_required",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.014,
            "lift": 2.1,
            "stability": 1.0,
            "questions": "daq_08e7b926a8866bcd|daq_5ca14651b4ace29f|daq_5fa82a0152a4ac3f"
          },
          {
            "source": "concept_f5d3350d2ec23df4435a",
            "target": "target_98c9d7a8cdf981399ffa",
            "sourceLabel": "Leukocyte count (WBC)",
            "targetLabel": "No additional treatment",
            "sourceType": "lab_test",
            "targetType": "medication_or_pharmacologic_management",
            "layer": "stem_clue_to_correct_answer_target",
            "weight": 3,
            "confidence": 0.022,
            "lift": 2.1,
            "stability": 1.0,
            "questions": "daq_075a62c04badbba0|daq_07ea19396fe67c43|daq_1f556ffbbdbc8dd9"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_d1347ea0f17e958c31db",
            "sourceLabel": "Female sex",
            "targetLabel": "aspirin",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 21,
            "confidence": 0.014,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_00d1177a1dd98e10|daq_025107da0eed9395|daq_0470c638eecd48c0|daq_050d885973e15e10|daq_06d47d33d93954d0|daq_06f81197ea8b485c|daq_07d6a8bfc..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_eb41bbac4bf66948f32a",
            "sourceLabel": "Female sex",
            "targetLabel": "Protein, total, serum",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 19,
            "confidence": 0.013,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_0156c15cf47c7086|daq_09aa18edebcb3b83|daq_1a32ce3d461a9049|daq_1c29c1093f0138ee|daq_2c52d47dd9ab6495|daq_3680768b3528cd20|daq_60edc3cf3..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_596421b721a1e14fbf14",
            "sourceLabel": "Female sex",
            "targetLabel": "Alcohol use disorder or heavy alcohol use",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "stem_clue_to_distractor_target",
            "weight": 16,
            "confidence": 0.011,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_02c3c3f68dc3ac02|daq_05f1ddebe261ba41|daq_084e43cf1a46c2ce|daq_0d84066956b04bcc|daq_1af84324248a2692|daq_2b77a112ceb101aa|daq_44d84ca18..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_3e13bc38c5190475717d",
            "sourceLabel": "Female sex",
            "targetLabel": "Carcinoma / malignant epithelial neoplasm",
            "sourceType": "etiology_factor",
            "targetType": "diagnostic_result",
            "layer": "stem_clue_to_distractor_target",
            "weight": 15,
            "confidence": 0.01,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_10f0549c63551b64|daq_11b926beb219a36f|daq_19bea9a78f9e43fc|daq_3a0e8f286f01027b|daq_4360ad530a3c954b|daq_47d30e3b38e2db65|daq_551c6a2a3..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_cfc4c1e5941f849383cc",
            "sourceLabel": "Female sex",
            "targetLabel": "Personality disorders",
            "sourceType": "etiology_factor",
            "targetType": "disease_condition_syndrome",
            "layer": "stem_clue_to_distractor_target",
            "weight": 14,
            "confidence": 0.009,
            "lift": 1.0,
            "stability": 1.0,
            "questions": "daq_037dcc6c55e6b0ed|daq_0c972e2b3d53c9be|daq_177d3dc483e3b584|daq_1b6bb8ce7ddf39c7|daq_1d05465d7792916b|daq_24b5db217d3868d8|daq_2dd562370..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_5088946db4d78d9a44c3",
            "sourceLabel": "Female sex",
            "targetLabel": "Neoplasms",
            "sourceType": "etiology_factor",
            "targetType": "disease_condition_syndrome",
            "layer": "stem_clue_to_distractor_target",
            "weight": 14,
            "confidence": 0.009,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_0915961f16211a57|daq_18d5173a2a5bbe9b|daq_1cd86b6d1642c529|daq_1fc66b391cc102b2|daq_4360ad530a3c954b|daq_68353e3b07ae006f|daq_7f1b97c6e..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_6f62cb7366f2a8e5aec5",
            "sourceLabel": "Female sex",
            "targetLabel": "Glucose, plasma, fasting",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 12,
            "confidence": 0.008,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_04af3fdfe5cad444|daq_087f2a8ca62f79b0|daq_122d66fd9acad22c|daq_1ee1df498a5d1a49|daq_3753b5bdb31e21ac|daq_3a22c3eca6320092|daq_66a07fee2..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_4e1e688b6937f083ad15",
            "sourceLabel": "Female sex",
            "targetLabel": "Globulins, total",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 11,
            "confidence": 0.007,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_177ab2affe50c25a|daq_186deda73911e7b2|daq_378634ae52ae5e2c|daq_399ae4e3d513958c|daq_48e31d9908757a34|daq_61dd0ce6c730c3d9|daq_7fd5a9655..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_437e199ec345d14ba0ce",
            "sourceLabel": "Female sex",
            "targetLabel": "CT scan",
            "sourceType": "etiology_factor",
            "targetType": "imaging_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 11,
            "confidence": 0.007,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_04a601c1dc5ca88c|daq_05a4c592971ddba4|daq_0919a77df452eb24|daq_0c22fb5a410cecee|daq_0c7298d31694b965|daq_2eaa611b67989854|daq_5557063cd..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_f57487d7dfcae6500f00",
            "sourceLabel": "Female sex",
            "targetLabel": "Necrosis",
            "sourceType": "etiology_factor",
            "targetType": "diagnostic_result",
            "layer": "stem_clue_to_distractor_target",
            "weight": 11,
            "confidence": 0.007,
            "lift": 0.1,
            "stability": 1.0,
            "questions": "daq_06b9c18ed9383831|daq_077f7f741a3a1a3a|daq_18d5173a2a5bbe9b|daq_19302bf3c4b56523|daq_1fc66b391cc102b2|daq_47977848c6aa0c43|daq_57641d2c2..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_3f75d1628bb1e4b6ca40",
            "sourceLabel": "Female sex",
            "targetLabel": "Pregnancy",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "stem_clue_to_distractor_target",
            "weight": 10,
            "confidence": 0.007,
            "lift": 0.8,
            "stability": 1.0,
            "questions": "daq_02c3c3f68dc3ac02|daq_18d5173a2a5bbe9b|daq_1fc66b391cc102b2|daq_301edb4ccc5ed59e|daq_3449f75c6c792eb1|daq_394797c9024be4eb|daq_399ae4e3d..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_b0f86d3ecc5fb4482363",
            "sourceLabel": "Female sex",
            "targetLabel": "warfarin",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 10,
            "confidence": 0.007,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_025107da0eed9395|daq_050d885973e15e10|daq_117ca1e95171d8ef|daq_14cb8b0903c4a17b|daq_1a34269a993b0d6e|daq_2dcaa049be239a5b|daq_3dd25f112..."
          },
          {
            "source": "concept_a1e2af2a59645aadc6ce",
            "target": "concept_0e3ec5cd173ebde4497e",
            "sourceLabel": "Shortness of breath",
            "targetLabel": "albuterol",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 9,
            "confidence": 0.028,
            "lift": 2.3,
            "stability": 1.0,
            "questions": "daq_02add236a44b73b7|daq_02c924bf75940d12|daq_18b33b611dc254e3|daq_293f01ac91f065f2|daq_4cd530f9fa957bfd|daq_64250332177cfc97|daq_7e3d025d4..."
          },
          {
            "source": "concept_d37d5a5e8be9a6be7f6b",
            "target": "concept_eb41bbac4bf66948f32a",
            "sourceLabel": "Chest pain",
            "targetLabel": "Protein, total, serum",
            "sourceType": "physical_exam_symptom",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 9,
            "confidence": 0.041,
            "lift": 0.8,
            "stability": 1.0,
            "questions": "daq_0993d34126bf2e67|daq_2fec11b53ddf1cbd|daq_3a7a6b7698c8b5ee|daq_43f839aeb6e3ec34|daq_4f930acf405da072|daq_7a86cb9dc2efba40|daq_aefbe5edd..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_5af2b51ab304684b017b",
            "sourceLabel": "Female sex",
            "targetLabel": "Adenomatous polyp / tubular adenoma",
            "sourceType": "etiology_factor",
            "targetType": "diagnostic_result",
            "layer": "stem_clue_to_distractor_target",
            "weight": 9,
            "confidence": 0.006,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_0ca702cd8d516e84|daq_10f0549c63551b64|daq_388367138ad397e0|daq_72451f1b8f3bdf27|daq_95e840722bf00ae2|daq_c0c731452af9a324|daq_de6be0269..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_a72d7b76b0b3f82dc3c5",
            "sourceLabel": "Female sex",
            "targetLabel": "doxycycline",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 9,
            "confidence": 0.006,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_01bb25a25f1163c5|daq_08541ce847d4bca3|daq_0ae0771d0eee1c76|daq_33ee0f57e29e721d|daq_3d6e943b3909d221|daq_5201831610cd082f|daq_6718a7555..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_768b713e2820130aae69",
            "sourceLabel": "Female sex",
            "targetLabel": "Sodium, serum",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 9,
            "confidence": 0.006,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_04818f7b5940ba02|daq_122d66fd9acad22c|daq_1ee1df498a5d1a49|daq_2c489e2a81197445|daq_3e340c286658e5df|daq_560be49f2f947c69|daq_689dd35cf..."
          },
          {
            "source": "concept_add7ea5fb2761e849357",
            "target": "concept_f6bb4ab154c48817c2e3",
            "sourceLabel": "Hemoglobin A1c, blood",
            "targetLabel": "metformin",
            "sourceType": "lab_test",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.133,
            "lift": 4.9,
            "stability": 1.0,
            "questions": "daq_013293c7e6f909f6|daq_025786128f7eacfc|daq_096cdcd9d0b96fbc|daq_09db2f69fc1a24e1|daq_0d770c7db4461c17|daq_15a1011944ef9269|daq_1d702a426..."
          },
          {
            "source": "concept_47821c8eebcb97b9c37c",
            "target": "concept_e24f104eda9ad8c802d7",
            "sourceLabel": "Hemoglobin, blood",
            "targetLabel": "Vitamin B12, serum",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.039,
            "lift": 1.7,
            "stability": 1.0,
            "questions": "daq_0005d334a5065c49|daq_06184582af6d37fb|daq_0825ec8bff0f7922|daq_094ac328b06f65e0|daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a..."
          },
          {
            "source": "concept_30bdc8df7c42e153e626",
            "target": "concept_f6bb4ab154c48817c2e3",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "metformin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.029,
            "lift": 1.1,
            "stability": 1.0,
            "questions": "daq_00b746f6be2e2d68|daq_013293c7e6f909f6|daq_09db2f69fc1a24e1|daq_0c02a7d778f6e59c|daq_0d770c7db4461c17|daq_15a1011944ef9269|daq_1d702a426..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_7f62169d64be2eaacb23",
            "sourceLabel": "Female sex",
            "targetLabel": "Testosterone, total, serum",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.005,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_0891440de58f3ea1|daq_0963d9c716e7241e|daq_3d9ad087b8a732cd|daq_669ce12b0437fa92|daq_7e77473db2666f12|daq_cc797dcddd20e43b|daq_f79b0d854..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_5b4d8272c4bfe7856275",
            "sourceLabel": "Female sex",
            "targetLabel": "clopidogrel",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.005,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_07d6a8bfc0073e2e|daq_141811705d391663|daq_2dcaa049be239a5b|daq_3dd25f1129c79936|daq_7d93271ed7e2f658|daq_a78afaeafcce8835|daq_b5a898f26..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_b6134eb131e2ebc40ae1",
            "sourceLabel": "Female sex",
            "targetLabel": "acetazolamide",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.005,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_0b4f2f6b66d23933|daq_2d24fc58d3707ca1|daq_44e279135638b80c|daq_5f5209e4f26991b9|daq_5fa0b176f3a1544c|daq_7536075bc6031b03|daq_9760b4826..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_e68c5a3024174cd279b5",
            "sourceLabel": "Female sex",
            "targetLabel": "spironolactone",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.005,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_0b4f2f6b66d23933|daq_247fc804357c8bc0|daq_486c84c46538d471|daq_5fa0b176f3a1544c|daq_68448c2892073d10|daq_6bec58d1568ada7c|daq_83b3b205d..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_cfa0f70ca35eb761462e",
            "sourceLabel": "Female sex",
            "targetLabel": "Beryllium exposure",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "stem_clue_to_distractor_target",
            "weight": 8,
            "confidence": 0.005,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_0470c638eecd48c0|daq_0486a3a8e0101253|daq_050e79c1d7177a24|daq_0f62dce12b0af714|daq_3f2a42a9e4349ac4|daq_4a204ebde0120837|daq_57763fb62..."
          },
          {
            "source": "concept_1a8622a7010d3e8fcd61",
            "target": "concept_da3210fc8ff2ba18fa06",
            "sourceLabel": "Flank pain",
            "targetLabel": "Phosphorus, serum",
            "sourceType": "physical_exam_symptom",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.159,
            "lift": 5.5,
            "stability": 1.0,
            "questions": "daq_10f110bce47d343a|daq_25eda06665e504b4|daq_512b471895a03350|daq_a139537a9f547c09|daq_bf72c1e337ada69d|daq_d3de645a42e904ff|daq_f9ed5a88d..."
          },
          {
            "source": "concept_a27333cec40f73a1f595",
            "target": "concept_877ac5604f4b1b29cde5",
            "sourceLabel": "Palpitations",
            "targetLabel": "propranolol",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.041,
            "lift": 2.1,
            "stability": 1.0,
            "questions": "daq_03860fa1c09e3c91|daq_0455cb9ce1005869|daq_1d7970f1bfadecda|daq_2e2ef11baeead067|daq_6b11f61787c9c91a|daq_a5d5b6a7978aadba|daq_c604ead58..."
          },
          {
            "source": "concept_b4e92c9330c68c62ab1a",
            "target": "concept_3b79b2b8d20e1ac804b2",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "losartan",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.048,
            "lift": 1.7,
            "stability": 1.0,
            "questions": "daq_04a83dfc2cee5a96|daq_0bee9bbc9fe428a4|daq_163b6f5077afc137|daq_247fc804357c8bc0|daq_2d2e7ca8ae9f84a9|daq_581b3831f149315d|daq_e089205b0..."
          },
          {
            "source": "concept_6f62cb7366f2a8e5aec5",
            "target": "concept_f6bb4ab154c48817c2e3",
            "sourceLabel": "Glucose, plasma, fasting",
            "targetLabel": "metformin",
            "sourceType": "lab_test",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.033,
            "lift": 1.2,
            "stability": 1.0,
            "questions": "daq_025786128f7eacfc|daq_09db2f69fc1a24e1|daq_0c02a7d778f6e59c|daq_1d702a42693d0344|daq_2152771caadc5199|daq_87a95ccd743cb70a|daq_b29320b13..."
          },
          {
            "source": "concept_c67e0a1c2d31eb0756b1",
            "target": "concept_f57487d7dfcae6500f00",
            "sourceLabel": "Tenderness",
            "targetLabel": "Necrosis",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnostic_result",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.032,
            "lift": 0.6,
            "stability": 1.0,
            "questions": "daq_2198f0d38865149e|daq_4d27e2a031d513b8|daq_7b91ced9e9411d13|daq_88c1ec8a9c55deaf|daq_a60160ae06bc2ef1|daq_a6b97879b0bbfcc8|daq_d3109e2a2..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_6ca4be11e412e322e3c5",
            "sourceLabel": "Female sex",
            "targetLabel": "Human papillomavirus",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.005,
            "lift": 0.6,
            "stability": 1.0,
            "questions": "daq_159c2c90abe27db7|daq_3f3fcb6ab780a771|daq_558f65dd86317378|daq_670928adffb214e2|daq_84174348e68e7865|daq_a6f128390a0cdd22|daq_e0aa8d94c..."
          },
          {
            "source": "concept_b42de94db09c0c61834f",
            "target": "concept_eb41bbac4bf66948f32a",
            "sourceLabel": "Fatigue",
            "targetLabel": "Protein, total, serum",
            "sourceType": "physical_exam_symptom",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.022,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_09aa18edebcb3b83|daq_27f3973b87cd39eb|daq_31bbe387af1d703b|daq_657058b2a8b805f6|daq_6822ab2c13699c96|daq_9d378b78ab2191f3|daq_ff6fbc4a6..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_0086a2b5bdee34e1b257",
            "sourceLabel": "Female sex",
            "targetLabel": "methotrexate",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.005,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_03323dfc2221672d|daq_076d991d25ec242c|daq_08541ce847d4bca3|daq_0950286e7f07ae30|daq_2e6fbba627280316|daq_2f9a814941759dcb|daq_d5a5e521f..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_877ac5604f4b1b29cde5",
            "sourceLabel": "Female sex",
            "targetLabel": "propranolol",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.005,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_00d1177a1dd98e10|daq_03860fa1c09e3c91|daq_2e2ef11baeead067|daq_6b11f61787c9c91a|daq_7d93271ed7e2f658|daq_a78afaeafcce8835|daq_c604ead58..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_d7b4b77b19f43c7ac21e",
            "sourceLabel": "Female sex",
            "targetLabel": "Purpura",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.005,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_043d3fb31dc91b36|daq_1e21394f3002ed53|daq_6ab58839d3f58d05|daq_8d7d900a8d35ec5f|daq_97c21c16128eb2c6|daq_e39d7ebd27ba02bd|daq_e575e5426..."
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_9adb0b2aa38fc77d221e",
            "sourceLabel": "Female sex",
            "targetLabel": "Echocardiography",
            "sourceType": "etiology_factor",
            "targetType": "imaging_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 7,
            "confidence": 0.005,
            "lift": 0.2,
            "stability": 1.0,
            "questions": "daq_02cbe72f281718b4|daq_0986ef3ba2e8e219|daq_12929f3298d13ffd|daq_1a34269a993b0d6e|daq_3e340c286658e5df|daq_a0ead18b78e0d4ef|daq_c208b2bc3..."
          },
          {
            "source": "concept_fbeea51e1147ba199067",
            "target": "concept_e24f104eda9ad8c802d7",
            "sourceLabel": "Nystagmus",
            "targetLabel": "Vitamin B12, serum",
            "sourceType": "physical_exam",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.667,
            "lift": 29.0,
            "stability": 1.0,
            "questions": "daq_43016afa608ea6b5|daq_60a7c5a443219f07|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_bca021b16805956c|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_895348e9ae847ec64342",
            "target": "concept_3b79b2b8d20e1ac804b2",
            "sourceLabel": "Albumin-creatinine ratio, urine",
            "targetLabel": "losartan",
            "sourceType": "lab_test",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.316,
            "lift": 11.5,
            "stability": 1.0,
            "questions": "daq_06f81197ea8b485c|daq_247fc804357c8bc0|daq_2d2e7ca8ae9f84a9|daq_581b3831f149315d|daq_aef17ec774806745|daq_e089205b00db52ab"
          },
          {
            "source": "concept_ddff67b5c34505183193",
            "target": "concept_772202d6e97ee1174412",
            "sourceLabel": "Headache",
            "targetLabel": "sumatriptan",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.032,
            "lift": 3.1,
            "stability": 1.0,
            "questions": "daq_0c374a3ecf06582f|daq_117ca1e95171d8ef|daq_309b4dbfd6a5c8a2|daq_81e2ae4055ea5e4f|daq_8902e578a26f28fb|daq_ec53a6de86352b35"
          },
          {
            "source": "concept_ec4f60ef1c1e2f287929",
            "target": "concept_e24f104eda9ad8c802d7",
            "sourceLabel": "Confusion",
            "targetLabel": "Vitamin B12, serum",
            "sourceType": "physical_exam_symptom",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.067,
            "lift": 2.9,
            "stability": 1.0,
            "questions": "daq_3f5e89e69bdfd136|daq_60a7c5a443219f07|daq_61809419e11576c5|daq_87f40d743b1c7a5d|daq_9e5a0df9a66b2d16|daq_d0d2c42a1cce2383"
          },
          {
            "source": "concept_6c2c41b224e0bd83fef3",
            "target": "concept_eb41bbac4bf66948f32a",
            "sourceLabel": "Malaise",
            "targetLabel": "Protein, total, serum",
            "sourceType": "physical_exam_symptom",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.105,
            "lift": 2.1,
            "stability": 1.0,
            "questions": "daq_18ddffb9073ce85c|daq_2fec11b53ddf1cbd|daq_4f930acf405da072|daq_c1e64fe1a737c4d4|daq_cdbdd21deb5c3be2|daq_eda1d43b69ce6ea6"
          },
          {
            "source": "concept_6c2c41b224e0bd83fef3",
            "target": "concept_f57487d7dfcae6500f00",
            "sourceLabel": "Malaise",
            "targetLabel": "Necrosis",
            "sourceType": "physical_exam_symptom",
            "targetType": "diagnostic_result",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.105,
            "lift": 2.1,
            "stability": 1.0,
            "questions": "daq_03e778d8d68cb085|daq_2fec11b53ddf1cbd|daq_4f930acf405da072|daq_7b91ced9e9411d13|daq_88c1ec8a9c55deaf|daq_bc971fd4d52e1349"
          },
          {
            "source": "concept_b4e92c9330c68c62ab1a",
            "target": "concept_0d065f95fc2f3af87dc0",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "atorvastatin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.041,
            "lift": 1.8,
            "stability": 1.0,
            "questions": "daq_053e03cf7eb14f45|daq_0bee9bbc9fe428a4|daq_2d2e7ca8ae9f84a9|daq_3c1ebd9eb4cf7125|daq_67d165617fb56326|daq_91f61fbcdec988c9"
          },
          {
            "source": "concept_30bdc8df7c42e153e626",
            "target": "concept_6f62cb7366f2a8e5aec5",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "Glucose, plasma, fasting",
            "sourceType": "disease_condition_syndrome",
            "targetType": "lab_test",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.022,
            "lift": 1.2,
            "stability": 1.0,
            "questions": "daq_04af3fdfe5cad444|daq_3753b5bdb31e21ac|daq_4e087af4138dd433|daq_8328d1b2603e14d0|daq_a1276b9e1a1a4d9c|daq_fbd52e495ee07d5c"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_152f519e7722b04cb99f",
            "sourceLabel": "Female sex",
            "targetLabel": "oxytocin",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.004,
            "lift": 1.1,
            "stability": 1.0,
            "questions": "daq_7b69cde38859f6b4|daq_ba3f685034caad2d|daq_bd222dc556b0b8ad|daq_e157a89460a87386|daq_f86da3f913b89d4e|daq_ff28867bbaf5c1dc"
          },
          {
            "source": "concept_a1e2af2a59645aadc6ce",
            "target": "concept_cc5d3a9f14a1bf68251b",
            "sourceLabel": "Shortness of breath",
            "targetLabel": "epinephrine",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.019,
            "lift": 1.0,
            "stability": 1.0,
            "questions": "daq_18b33b611dc254e3|daq_265749abd7bf13fc|daq_7a58aa31998016a0|daq_7e3d025d4ab27496|daq_b58c0ec3463fc940|daq_bf2b437ac1c39db4"
          },
          {
            "source": "concept_014659a6a5d4c0876ce6",
            "target": "concept_596421b721a1e14fbf14",
            "sourceLabel": "Healthcare exposure",
            "targetLabel": "Alcohol use disorder or heavy alcohol use",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.03,
            "lift": 0.8,
            "stability": 1.0,
            "questions": "daq_05f1ddebe261ba41|daq_1176917508808c99|daq_aef966e25b92cb75|daq_bd3cdc9866a1b875|daq_d49d9c45fd2d5a9a|daq_f7c2f781c4ef8eee"
          },
          {
            "source": "concept_0d065f95fc2f3af87dc0",
            "target": "concept_d1347ea0f17e958c31db",
            "sourceLabel": "atorvastatin",
            "targetLabel": "aspirin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.038,
            "lift": 0.6,
            "stability": 1.0,
            "questions": "daq_025107da0eed9395|daq_07d6a8bfc0073e2e|daq_07f3993951786115|daq_07f79465a108c3fe|daq_0ac46ebcc37719aa|daq_3dd25f1129c79936"
          },
          {
            "source": "concept_359a6f5ef7804b1e7a3a",
            "target": "concept_b897d675badbfe965fa8",
            "sourceLabel": "Arterial PO2 / oxygen saturation",
            "targetLabel": "vancomycin",
            "sourceType": "lab_test",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.027,
            "lift": 0.6,
            "stability": 1.0,
            "questions": "daq_0225803f42736654|daq_08410eab31d4f9f7|daq_1dc7ea14514c07ce|daq_73b79cf65ce0f065|daq_bf42cdb0ab1f9d70|daq_db255d18ecadbd98"
          },
          {
            "source": "concept_ddff67b5c34505183193",
            "target": "concept_d1347ea0f17e958c31db",
            "sourceLabel": "Headache",
            "targetLabel": "aspirin",
            "sourceType": "physical_exam_symptom",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.032,
            "lift": 0.5,
            "stability": 1.0,
            "questions": "daq_00d1177a1dd98e10|daq_111cdb66f89cb593|daq_2deb4131eccba107|daq_7d93271ed7e2f658|daq_9737d03885d02987|daq_a148d1faaeff72cd"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_80ef96be4d3927b90247",
            "sourceLabel": "Female sex",
            "targetLabel": "Bradycardia",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.004,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_49e8c87aefec9041|daq_6fd71a829f97b7c0|daq_93a4116c21f6f93c|daq_dbc78c3b97beafcb|daq_e7b7652717385f5d|daq_f885b2475d94f26d"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_456cad8ce4d3794748ec",
            "sourceLabel": "Female sex",
            "targetLabel": "phenytoin",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.004,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_0d84066956b04bcc|daq_111cdb66f89cb593|daq_868b533973f6096e|daq_a148d1faaeff72cd|daq_c00440a06ebbc5d5|daq_d066e1452dcac389"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_772202d6e97ee1174412",
            "sourceLabel": "Female sex",
            "targetLabel": "sumatriptan",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.004,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_117ca1e95171d8ef|daq_309b4dbfd6a5c8a2|daq_81e2ae4055ea5e4f|daq_8902e578a26f28fb|daq_930d56426274d882|daq_ec53a6de86352b35"
          },
          {
            "source": "concept_30bdc8df7c42e153e626",
            "target": "concept_d1347ea0f17e958c31db",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "aspirin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.022,
            "lift": 0.4,
            "stability": 1.0,
            "questions": "daq_025107da0eed9395|daq_03dd004a8d1bc1ae|daq_06f81197ea8b485c|daq_07d6a8bfc0073e2e|daq_08410eab31d4f9f7|daq_0ac46ebcc37719aa"
          },
          {
            "source": "concept_bca2cdda9fa07b7919e8",
            "target": "concept_fd2f3a6afa9995dfb357",
            "sourceLabel": "Female sex",
            "targetLabel": "adenosine",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "stem_clue_to_distractor_target",
            "weight": 6,
            "confidence": 0.004,
            "lift": 0.3,
            "stability": 1.0,
            "questions": "daq_0a6b779775c0aa9c|daq_14ace366e830216d|daq_4d9d5473d52a90d8|daq_efe3e14080eac833|daq_fcd1b5c243d12990|daq_ffc23e51c39172ee"
          }
        ],
        "layers": [
          "absent_or_negated_clue_network",
          "answer_choice_cooccurrence",
          "answer_target_archetype_network",
          "correct_vs_distractor_contrast",
          "disease_or_result_to_correct_answer",
          "explanation_teaching_network",
          "stem_clue_to_correct_answer_target",
          "stem_clue_to_distractor_target"
        ]
      },
      "topNodes": [
        {
          "label": "Female sex",
          "type": "etiology factor",
          "weight": 2913,
          "layers": 4
        },
        {
          "label": "Type 2 diabetes mellitus",
          "type": "disease condition syndrome",
          "weight": 673,
          "layers": 7
        },
        {
          "label": "Fatigue",
          "type": "physical exam symptom",
          "weight": 657,
          "layers": 4
        },
        {
          "label": "Protein, total, serum",
          "type": "lab test",
          "weight": 630,
          "layers": 7
        },
        {
          "label": "aspirin",
          "type": "medication",
          "weight": 600,
          "layers": 7
        },
        {
          "label": "CT scan",
          "type": "imaging test",
          "weight": 593,
          "layers": 7
        },
        {
          "label": "Shortness of breath",
          "type": "physical exam symptom",
          "weight": 593,
          "layers": 7
        },
        {
          "label": "Glucose, plasma, fasting",
          "type": "lab test",
          "weight": 566,
          "layers": 7
        },
        {
          "label": "Healthcare exposure",
          "type": "etiology factor",
          "weight": 565,
          "layers": 7
        },
        {
          "label": "Tenderness",
          "type": "physical exam symptom",
          "weight": 541,
          "layers": 7
        },
        {
          "label": "metformin",
          "type": "medication",
          "weight": 517,
          "layers": 7
        },
        {
          "label": "Hemoglobin, blood",
          "type": "lab test",
          "weight": 508,
          "layers": 7
        },
        {
          "label": "Sodium, serum",
          "type": "lab test",
          "weight": 503,
          "layers": 7
        },
        {
          "label": "Swelling",
          "type": "physical exam symptom",
          "weight": 503,
          "layers": 7
        },
        {
          "label": "lisinopril",
          "type": "medication",
          "weight": 490,
          "layers": 7
        },
        {
          "label": "Abdominal pain",
          "type": "physical exam symptom",
          "weight": 445,
          "layers": 4
        }
      ],
      "communities": [
        {
          "id": "community_f4a451adfe59d8c9d0b5",
          "layer": "stem_clue_to_distractor_target",
          "label": "medication",
          "support": 7930
        },
        {
          "id": "community_ba40573f5b71a7b2f536",
          "layer": "stem_clue_to_correct_answer_target",
          "label": "other review required",
          "support": 6559
        },
        {
          "id": "community_8d112c8863899764c9f6",
          "layer": "explanation_teaching_network",
          "label": "other review required",
          "support": 3078
        },
        {
          "id": "community_2f20245a179cf41d9b24",
          "layer": "answer_choice_cooccurrence",
          "label": "medication",
          "support": 2816
        },
        {
          "id": "community_b9b80ec5f3cdf3eb15a9",
          "layer": "stem_clue_to_distractor_target",
          "label": "disease condition syndrome",
          "support": 2575
        },
        {
          "id": "community_ec406ef3e3cab0956408",
          "layer": "stem_clue_to_correct_answer_target",
          "label": "medication or pharmacologic management",
          "support": 2149
        },
        {
          "id": "community_4c5fcfd3512871feac77",
          "layer": "explanation_teaching_network",
          "label": "medication or pharmacologic management",
          "support": 1856
        },
        {
          "id": "community_1d4e8b4f149f1a2659db",
          "layer": "stem_clue_to_distractor_target",
          "label": "lab test",
          "support": 1803
        },
        {
          "id": "community_c9b1ab0a9d01e0ddfad0",
          "layer": "correct_vs_distractor_contrast",
          "label": "medication",
          "support": 1167
        },
        {
          "id": "community_13f57984737bf85a0504",
          "layer": "stem_clue_to_distractor_target",
          "label": "etiology factor",
          "support": 1051
        },
        {
          "id": "community_59544f330f8dea7a8f87",
          "layer": "stem_clue_to_correct_answer_target",
          "label": "diagnosis identification",
          "support": 1033
        },
        {
          "id": "community_cbf2a52a0d4cb065ba82",
          "layer": "explanation_teaching_network",
          "label": "diagnosis identification",
          "support": 929
        },
        {
          "id": "community_86cc44f2ffde2717718d",
          "layer": "stem_clue_to_distractor_target",
          "label": "imaging test",
          "support": 809
        },
        {
          "id": "community_470a18deffda45ad42ea",
          "layer": "stem_clue_to_correct_answer_target",
          "label": "diagnostic or result interpretation",
          "support": 804
        },
        {
          "id": "community_550f47d08737a63a6214",
          "layer": "stem_clue_to_distractor_target",
          "label": "diagnostic test",
          "support": 742
        },
        {
          "id": "community_1f48e31da7ea250b83f8",
          "layer": "stem_clue_to_distractor_target",
          "label": "diagnostic result",
          "support": 726
        },
        {
          "id": "community_71f6e6f16470b6ca76a3",
          "layer": "disease_or_result_to_correct_answer",
          "label": "other review required",
          "support": 707
        },
        {
          "id": "community_e0fec1d60a6475492d44",
          "layer": "stem_clue_to_correct_answer_target",
          "label": "laboratory test selection",
          "support": 664
        },
        {
          "id": "community_a989e5b1f8c146ae8be1",
          "layer": "absent_or_negated_clue_network",
          "label": "other review required",
          "support": 588
        },
        {
          "id": "community_2e39aa7275231a2e5445",
          "layer": "explanation_teaching_network",
          "label": "laboratory test selection",
          "support": 561
        },
        {
          "id": "community_a9736946ad6318f367af",
          "layer": "answer_choice_cooccurrence",
          "label": "disease condition syndrome",
          "support": 542
        },
        {
          "id": "community_373cd12b071668c21a38",
          "layer": "stem_clue_to_correct_answer_target",
          "label": "risk factor or etiology reasoning",
          "support": 540
        }
      ],
      "coverage": [
        {
          "source": "IM boards | fc | analysis_questions_v1",
          "valid": 130,
          "high": 57,
          "low": 23,
          "candidate": 50,
          "neither": 56,
          "rate": 56.9
        },
        {
          "source": "Cards boards | unknown | analysis_questions_v1",
          "valid": 1004,
          "high": 332,
          "low": 156,
          "candidate": 516,
          "neither": 402,
          "rate": 60.0
        },
        {
          "source": "IM boards | rm | analysis_questions_v1",
          "valid": 130,
          "high": 42,
          "low": 15,
          "candidate": 73,
          "neither": 45,
          "rate": 65.4
        },
        {
          "source": "Medical School boards | unknown | analysis_questions_v1",
          "valid": 18899,
          "high": 8132,
          "low": 3286,
          "candidate": 7481,
          "neither": 6522,
          "rate": 65.5
        },
        {
          "source": "IM boards | in | analysis_questions_v1",
          "valid": 99,
          "high": 37,
          "low": 14,
          "candidate": 48,
          "neither": 34,
          "rate": 65.7
        },
        {
          "source": "IM boards | cs | analysis_questions_v1",
          "valid": 97,
          "high": 49,
          "low": 12,
          "candidate": 36,
          "neither": 28,
          "rate": 71.1
        },
        {
          "source": "IM boards | nr | analysis_questions_v1",
          "valid": 128,
          "high": 52,
          "low": 29,
          "candidate": 47,
          "neither": 36,
          "rate": 71.9
        },
        {
          "source": "IM boards | dm | analysis_questions_v1",
          "valid": 84,
          "high": 38,
          "low": 15,
          "candidate": 31,
          "neither": 22,
          "rate": 73.8
        },
        {
          "source": "IM boards | hm | analysis_questions_v1",
          "valid": 131,
          "high": 66,
          "low": 16,
          "candidate": 49,
          "neither": 30,
          "rate": 77.1
        },
        {
          "source": "IM boards | pm | analysis_questions_v1",
          "valid": 108,
          "high": 44,
          "low": 10,
          "candidate": 54,
          "neither": 24,
          "rate": 77.8
        },
        {
          "source": "IM boards | np | analysis_questions_v1",
          "valid": 171,
          "high": 66,
          "low": 26,
          "candidate": 79,
          "neither": 37,
          "rate": 78.4
        },
        {
          "source": "IM boards | gi | analysis_questions_v1",
          "valid": 114,
          "high": 58,
          "low": 14,
          "candidate": 42,
          "neither": 24,
          "rate": 78.9
        },
        {
          "source": "IM boards | en | analysis_questions_v1",
          "valid": 144,
          "high": 53,
          "low": 15,
          "candidate": 76,
          "neither": 28,
          "rate": 80.6
        },
        {
          "source": "IM boards | cv | analysis_questions_v1",
          "valid": 238,
          "high": 114,
          "low": 37,
          "candidate": 87,
          "neither": 45,
          "rate": 81.1
        },
        {
          "source": "IM boards | hp | analysis_questions_v1",
          "valid": 48,
          "high": 22,
          "low": 6,
          "candidate": 20,
          "neither": 9,
          "rate": 81.2
        },
        {
          "source": "IM boards | id | analysis_questions_v1",
          "valid": 154,
          "high": 65,
          "low": 37,
          "candidate": 52,
          "neither": 27,
          "rate": 82.5
        },
        {
          "source": "IM boards | cc | analysis_questions_v1",
          "valid": 50,
          "high": 29,
          "low": 4,
          "candidate": 17,
          "neither": 8,
          "rate": 84.0
        },
        {
          "source": "IM boards | on | analysis_questions_v1",
          "valid": 112,
          "high": 60,
          "low": 15,
          "candidate": 37,
          "neither": 13,
          "rate": 88.4
        }
      ],
      "status": [
        {
          "label": "Accepted high precision",
          "key": "accepted_high_precision",
          "count": 9316
        },
        {
          "label": "Accepted low precision",
          "key": "accepted_low_precision",
          "count": 3730
        },
        {
          "label": "Candidate review required",
          "key": "candidate_review_required",
          "count": 8752
        },
        {
          "label": "Demoted false positive",
          "key": "demoted_false_positive",
          "count": 43
        },
        {
          "label": "Source malformed quarantine",
          "key": "quarantined_source_malformed",
          "count": 291
        }
      ],
      "precision": [
        {
          "label": "diagnosis or syndrome",
          "reviewed": 49,
          "correct": 49,
          "precision": 100.0
        },
        {
          "label": "procedure or intervention",
          "reviewed": 36,
          "correct": 36,
          "precision": 100.0
        },
        {
          "label": "medication or pharmacologic",
          "reviewed": 30,
          "correct": 30,
          "precision": 100.0
        },
        {
          "label": "numeric or threshold",
          "reviewed": 29,
          "correct": 29,
          "precision": 100.0
        },
        {
          "label": "lab or diagnostic result",
          "reviewed": 24,
          "correct": 24,
          "precision": 100.0
        },
        {
          "label": "gene marker or molecular",
          "reviewed": 18,
          "correct": 18,
          "precision": 100.0
        },
        {
          "label": "mechanism or pathophysiology",
          "reviewed": 17,
          "correct": 17,
          "precision": 100.0
        },
        {
          "label": "anatomy or structure",
          "reviewed": 7,
          "correct": 7,
          "precision": 100.0
        },
        {
          "label": "physiology or biochemistry",
          "reviewed": 7,
          "correct": 7,
          "precision": 100.0
        },
        {
          "label": "health systems policy or ethics",
          "reviewed": 6,
          "correct": 6,
          "precision": 100.0
        }
      ],
      "targetCounts": [
        {
          "label": "diagnosis or syndrome",
          "count": 6583
        },
        {
          "label": "review required unclassified",
          "count": 3393
        },
        {
          "label": "medication or pharmacologic",
          "count": 3015
        },
        {
          "label": "procedure or intervention",
          "count": 2367
        },
        {
          "label": "lab or diagnostic result",
          "count": 1924
        },
        {
          "label": "numeric or threshold",
          "count": 875
        },
        {
          "label": "mechanism or pathophysiology",
          "count": 639
        },
        {
          "label": "diagnostic test",
          "count": 536
        },
        {
          "label": "anatomy or structure",
          "count": 534
        },
        {
          "label": "physiology or biochemistry",
          "count": 512
        },
        {
          "label": "gene marker or molecular",
          "count": 415
        },
        {
          "label": "imaging test",
          "count": 413
        },
        {
          "label": "malformed correct answer quarantined",
          "count": 291
        },
        {
          "label": "health systems policy or ethics",
          "count": 227
        }
      ],
      "rootCauses": [
        {
          "label": "source family low coverage",
          "count": 2510
        },
        {
          "label": "answer resolution or source integrity",
          "count": 2233
        },
        {
          "label": "mechanism demoted needs specific rule",
          "count": 1434
        },
        {
          "label": "ambiguous exact match demoted",
          "count": 1159
        },
        {
          "label": "gene marker missing",
          "count": 50
        },
        {
          "label": "anatomy or structure missing",
          "count": 2
        },
        {
          "label": "health systems policy or ethics missing",
          "count": 1
        },
        {
          "label": "procedure or intervention missing",
          "count": 1
        }
      ]
    },
    "good_v3": {
      "id": "good_v3",
      "title": "GOOD Prior Network Analysis",
      "shortTitle": "GOOD v3 network",
      "badge": "Reference example",
      "thesis": "The model example: separate clues from explanations, then turn answer co-occurrence into study modules.",
      "metrics": [
        {
          "label": "Network nodes",
          "value": 328,
          "format": "integer"
        },
        {
          "label": "Network edges",
          "value": 25610,
          "format": "integer"
        },
        {
          "label": "Crosswalked nodes",
          "value": 328,
          "format": "integer"
        },
        {
          "label": "Layer weight",
          "value": 32491,
          "format": "integer"
        },
        {
          "label": "Study modules",
          "value": 25,
          "format": "integer"
        },
        {
          "label": "Canonical seed concepts",
          "value": 4216,
          "format": "integer"
        }
      ],
      "pipeline": [
        "Entity extraction",
        "Question-section split",
        "Clue-to-decision edges",
        "Community detection",
        "Study modules"
      ],
      "graph": {
        "nodes": [
          {
            "id": "medication|ceftriaxone",
            "label": "ceftriaxone",
            "type": "medication",
            "weight": 182.0,
            "degree": 32,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|fever",
            "label": "Fever",
            "type": "physical_exam_symptom",
            "weight": 48.0,
            "degree": 9,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|staphylococcus aureus",
            "label": "Staphylococcus aureus",
            "type": "etiology_factor",
            "weight": 51.0,
            "degree": 10,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "medication|vancomycin",
            "label": "vancomycin",
            "type": "medication",
            "weight": 99.0,
            "degree": 17,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "lab_test|leukocyte count (wbc)",
            "label": "Leukocyte count (WBC)",
            "type": "lab_test",
            "weight": 52.0,
            "degree": 13,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|transthoracic echocardiography",
            "label": "Transthoracic echocardiography",
            "type": "imaging_test",
            "weight": 44.0,
            "degree": 9,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|shortness of breath",
            "label": "Shortness of breath",
            "type": "physical_exam_symptom",
            "weight": 38.0,
            "degree": 9,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|azithromycin",
            "label": "azithromycin",
            "type": "medication",
            "weight": 97.0,
            "degree": 19,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "lab_test|arterial po2 / oxygen saturation",
            "label": "Arterial PO2 / oxygen saturation",
            "type": "lab_test",
            "weight": 55.0,
            "degree": 13,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|echocardiography",
            "label": "Echocardiography",
            "type": "imaging_test",
            "weight": 30.0,
            "degree": 8,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|12-lead electrocardiogram",
            "label": "12-lead electrocardiogram",
            "type": "diagnostic_test",
            "weight": 95.0,
            "degree": 25,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|lisinopril",
            "label": "lisinopril",
            "type": "medication",
            "weight": 45.0,
            "degree": 12,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|hypertension",
            "label": "Hypertension",
            "type": "etiology_factor",
            "weight": 117.0,
            "degree": 29,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|aspirin",
            "label": "aspirin",
            "type": "medication",
            "weight": 115.0,
            "degree": 23,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|hypertension",
            "label": "Hypertension",
            "type": "physical_exam_symptom",
            "weight": 116.0,
            "degree": 29,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|ultrasound",
            "label": "Ultrasound",
            "type": "imaging_test",
            "weight": 78.0,
            "degree": 17,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|glucocorticoid exposure",
            "label": "Glucocorticoid exposure",
            "type": "etiology_factor",
            "weight": 148.0,
            "degree": 17,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|blood culture",
            "label": "Blood culture",
            "type": "diagnostic_test",
            "weight": 19.0,
            "degree": 5,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|thiazide or loop diuretic exposure",
            "label": "Thiazide or loop diuretic exposure",
            "type": "etiology_factor",
            "weight": 140.0,
            "degree": 22,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "lab_test|creatinine, serum",
            "label": "Creatinine, serum",
            "type": "lab_test",
            "weight": 63.0,
            "degree": 18,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|spirometry with bronchodilator response",
            "label": "Spirometry with bronchodilator response",
            "type": "diagnostic_test",
            "weight": 31.0,
            "degree": 7,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|chest radiograph",
            "label": "Chest radiograph",
            "type": "imaging_test",
            "weight": 52.0,
            "degree": 13,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|mycobacterium tuberculosis complex",
            "label": "Mycobacterium tuberculosis complex",
            "type": "etiology_factor",
            "weight": 27.0,
            "degree": 7,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|tobacco smoking",
            "label": "Tobacco smoking",
            "type": "etiology_factor",
            "weight": 62.0,
            "degree": 16,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|cough",
            "label": "Cough",
            "type": "physical_exam_symptom",
            "weight": 33.0,
            "degree": 8,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "intervention|diagnostic coronary angiography",
            "label": "Diagnostic coronary angiography",
            "type": "intervention",
            "weight": 33.0,
            "degree": 7,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|unfractionated heparin",
            "label": "unfractionated heparin",
            "type": "medication",
            "weight": 52.0,
            "degree": 11,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|immunosuppression",
            "label": "Immunosuppression",
            "type": "etiology_factor",
            "weight": 86.0,
            "degree": 14,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "medication|prednisone",
            "label": "prednisone",
            "type": "medication",
            "weight": 263.0,
            "degree": 25,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "medication|furosemide",
            "label": "furosemide",
            "type": "medication",
            "weight": 89.0,
            "degree": 13,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "medication|amlodipine",
            "label": "amlodipine",
            "type": "medication",
            "weight": 31.0,
            "degree": 9,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|lung mass",
            "label": "Lung mass",
            "type": "diagnostic_result",
            "weight": 5.0,
            "degree": 1,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "medication|clopidogrel",
            "label": "clopidogrel",
            "type": "medication",
            "weight": 60.0,
            "degree": 13,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|ct scan",
            "label": "CT scan",
            "type": "imaging_test",
            "weight": 13.0,
            "degree": 3,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "medication|levothyroxine",
            "label": "levothyroxine",
            "type": "medication",
            "weight": 21.0,
            "degree": 5,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "lab_test|thyroid-stimulating hormone (tsh)",
            "label": "Thyroid-stimulating hormone (TSH)",
            "type": "lab_test",
            "weight": 34.0,
            "degree": 10,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "medication|atorvastatin",
            "label": "atorvastatin",
            "type": "medication",
            "weight": 40.0,
            "degree": 12,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|ct chest",
            "label": "CT chest",
            "type": "imaging_test",
            "weight": 27.0,
            "degree": 7,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|diagnostic egd / upper endoscopy",
            "label": "Diagnostic EGD / upper endoscopy",
            "type": "diagnostic_test",
            "weight": 56.0,
            "degree": 12,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "lab_test|hemoglobin, blood",
            "label": "Hemoglobin, blood",
            "type": "lab_test",
            "weight": 18.0,
            "degree": 5,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "medication|cefepime",
            "label": "cefepime",
            "type": "medication",
            "weight": 34.0,
            "degree": 6,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|biopsy",
            "label": "Biopsy",
            "type": "diagnostic_test",
            "weight": 30.0,
            "degree": 8,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|healthcare exposure",
            "label": "Healthcare exposure",
            "type": "etiology_factor",
            "weight": 76.0,
            "degree": 20,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|lupus nephritis and glomerulonephritis",
            "label": "Lupus nephritis and glomerulonephritis",
            "type": "disease_condition_syndrome",
            "weight": 22.0,
            "degree": 5,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "lab_test|urinalysis",
            "label": "Urinalysis",
            "type": "lab_test",
            "weight": 27.0,
            "degree": 7,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|stress echocardiography",
            "label": "Stress echocardiography",
            "type": "imaging_test",
            "weight": 20.0,
            "degree": 6,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|diagnostic colonoscopy",
            "label": "Diagnostic colonoscopy",
            "type": "diagnostic_test",
            "weight": 61.0,
            "degree": 17,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|colorectal cancer",
            "label": "Colorectal cancer",
            "type": "disease_condition_syndrome",
            "weight": 5.0,
            "degree": 1,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "medication|omeprazole",
            "label": "omeprazole",
            "type": "medication",
            "weight": 32.0,
            "degree": 6,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|type 2 diabetes mellitus",
            "label": "Type 2 diabetes mellitus",
            "type": "disease_condition_syndrome",
            "weight": 13.0,
            "degree": 3,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|colorectal carcinoma / malignant colorectal mass",
            "label": "Colorectal carcinoma / malignant colorectal mass",
            "type": "diagnostic_result",
            "weight": 5.0,
            "degree": 1,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "medication|hydrocortisone",
            "label": "hydrocortisone",
            "type": "medication",
            "weight": 108.0,
            "degree": 10,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "lab_test|thyroxine (t4), free",
            "label": "Thyroxine (T4), free",
            "type": "lab_test",
            "weight": 16.0,
            "degree": 4,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "medication|apixaban",
            "label": "apixaban",
            "type": "medication",
            "weight": 80.0,
            "degree": 18,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|mri",
            "label": "MRI",
            "type": "imaging_test",
            "weight": 88.0,
            "degree": 17,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "medication|empagliflozin",
            "label": "empagliflozin",
            "type": "medication",
            "weight": 29.0,
            "degree": 9,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|low-dose ct chest for lung cancer screening",
            "label": "Low-dose CT chest for lung cancer screening",
            "type": "imaging_test",
            "weight": 20.0,
            "degree": 6,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "lab_test|thyroxine (t4), total",
            "label": "Thyroxine (T4), total",
            "type": "lab_test",
            "weight": 16.0,
            "degree": 4,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|fatigue",
            "label": "Fatigue",
            "type": "physical_exam_symptom",
            "weight": 8.0,
            "degree": 2,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|sputum purulence",
            "label": "Sputum purulence",
            "type": "physical_exam_symptom",
            "weight": 4.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|peripheral edema",
            "label": "Peripheral edema",
            "type": "physical_exam_symptom",
            "weight": 11.0,
            "degree": 3,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|transthoracic echocardiogram",
            "label": "Transthoracic echocardiogram",
            "type": "imaging_test",
            "weight": 16.0,
            "degree": 5,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "intervention|surgery",
            "label": "surgery",
            "type": "intervention",
            "weight": 21.0,
            "degree": 6,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "lab_test|left ventricular ejection fraction (lvef)",
            "label": "Left ventricular ejection fraction (LVEF)",
            "type": "lab_test",
            "weight": 8.0,
            "degree": 2,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "medication|valsartan",
            "label": "valsartan",
            "type": "medication",
            "weight": 14.0,
            "degree": 4,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|atrial fibrillation or atrial flutter",
            "label": "Atrial fibrillation or atrial flutter",
            "type": "diagnostic_result",
            "weight": 37.0,
            "degree": 7,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|atrial fibrillation",
            "label": "Atrial fibrillation",
            "type": "disease_condition_syndrome",
            "weight": 24.0,
            "degree": 4,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "lab_test|sodium, serum",
            "label": "Sodium, serum",
            "type": "lab_test",
            "weight": 7.0,
            "degree": 2,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|no acute abnormality / normal study",
            "label": "No acute abnormality / normal study",
            "type": "diagnostic_result",
            "weight": 42.0,
            "degree": 13,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|crackles",
            "label": "Crackles",
            "type": "physical_exam_symptom",
            "weight": 11.0,
            "degree": 3,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|normal / no diagnostic abnormality identified",
            "label": "Normal / no diagnostic abnormality identified",
            "type": "diagnostic_result",
            "weight": 38.0,
            "degree": 12,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|isoniazid",
            "label": "isoniazid",
            "type": "medication",
            "weight": 4.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "medication|metformin",
            "label": "metformin",
            "type": "medication",
            "weight": 10.0,
            "degree": 3,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|hypothyroidism",
            "label": "Hypothyroidism",
            "type": "disease_condition_syndrome",
            "weight": 4.0,
            "degree": 1,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|pregnancy",
            "label": "Pregnancy",
            "type": "etiology_factor",
            "weight": 17.0,
            "degree": 5,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|esophagitis (candida, herpes simplex virus, cytomegalovirus)",
            "label": "Esophagitis (Candida, herpes simplex virus, cytomegalovirus)",
            "type": "disease_condition_syndrome",
            "weight": 39.0,
            "degree": 3,
            "community": "12",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|infectious esophagitis (candida, herpes simplex virus, cytomegalovirus)",
            "label": "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus)",
            "type": "disease_condition_syndrome",
            "weight": 39.0,
            "degree": 3,
            "community": "12",
            "project": "good_v3"
          },
          {
            "id": "medication|methylprednisolone",
            "label": "methylprednisolone",
            "type": "medication",
            "weight": 99.0,
            "degree": 8,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "medication|mifepristone",
            "label": "mifepristone",
            "type": "medication",
            "weight": 84.0,
            "degree": 4,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "medication|dexamethasone",
            "label": "dexamethasone",
            "type": "medication",
            "weight": 112.0,
            "degree": 11,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|ionizing radiation exposure",
            "label": "Ionizing radiation exposure",
            "type": "etiology_factor",
            "weight": 23.0,
            "degree": 2,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|liver biopsy",
            "label": "Liver biopsy",
            "type": "diagnostic_test",
            "weight": 17.0,
            "degree": 1,
            "community": "29",
            "project": "good_v3"
          },
          {
            "id": "intervention|percutaneous liver biopsy",
            "label": "Percutaneous liver biopsy",
            "type": "intervention",
            "weight": 17.0,
            "degree": 1,
            "community": "29",
            "project": "good_v3"
          },
          {
            "id": "medication|hydrochlorothiazide",
            "label": "hydrochlorothiazide",
            "type": "medication",
            "weight": 16.0,
            "degree": 1,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|lumbar puncture / csf analysis",
            "label": "Lumbar puncture / CSF analysis",
            "type": "diagnostic_test",
            "weight": 36.0,
            "degree": 6,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "intervention|lumbar puncture",
            "label": "Lumbar puncture",
            "type": "intervention",
            "weight": 35.0,
            "degree": 6,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|renal biopsy",
            "label": "Renal biopsy",
            "type": "diagnostic_test",
            "weight": 24.0,
            "degree": 3,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "intervention|kidney biopsy",
            "label": "Kidney biopsy",
            "type": "intervention",
            "weight": 24.0,
            "degree": 3,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|degenerative osteoarthritis changes",
            "label": "Degenerative osteoarthritis changes",
            "type": "diagnostic_result",
            "weight": 18.0,
            "degree": 2,
            "community": "28",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|osteoarthritis",
            "label": "Osteoarthritis",
            "type": "disease_condition_syndrome",
            "weight": 18.0,
            "degree": 2,
            "community": "28",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|pneumonia reported in imaging impression",
            "label": "Pneumonia reported in imaging impression",
            "type": "diagnostic_result",
            "weight": 26.0,
            "degree": 2,
            "community": "19",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|coccidioides species",
            "label": "Coccidioides species",
            "type": "etiology_factor",
            "weight": 26.0,
            "degree": 2,
            "community": "19",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|pneumonia",
            "label": "Pneumonia",
            "type": "disease_condition_syndrome",
            "weight": 29.0,
            "degree": 3,
            "community": "19",
            "project": "good_v3"
          },
          {
            "id": "medication|doxycycline",
            "label": "doxycycline",
            "type": "medication",
            "weight": 27.0,
            "degree": 5,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|pulmonary embolism / pulmonary arterial filling defect",
            "label": "Pulmonary embolism / pulmonary arterial filling defect",
            "type": "diagnostic_result",
            "weight": 13.0,
            "degree": 1,
            "community": "30",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|pulmonary embolism",
            "label": "Pulmonary embolism",
            "type": "disease_condition_syndrome",
            "weight": 13.0,
            "degree": 1,
            "community": "30",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|aspiration on swallow study",
            "label": "Aspiration on swallow study",
            "type": "diagnostic_result",
            "weight": 12.0,
            "degree": 1,
            "community": "31",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|aspiration pattern / dependent opacities",
            "label": "Aspiration pattern / dependent opacities",
            "type": "diagnostic_result",
            "weight": 12.0,
            "degree": 1,
            "community": "31",
            "project": "good_v3"
          },
          {
            "id": "medication|methotrexate",
            "label": "methotrexate",
            "type": "medication",
            "weight": 27.0,
            "degree": 4,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "medication|ciprofloxacin",
            "label": "ciprofloxacin",
            "type": "medication",
            "weight": 50.0,
            "degree": 10,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|cytomegalovirus",
            "label": "Cytomegalovirus",
            "type": "etiology_factor",
            "weight": 18.0,
            "degree": 2,
            "community": "12",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|human immunodeficiency virus",
            "label": "Human immunodeficiency virus",
            "type": "etiology_factor",
            "weight": 27.0,
            "degree": 3,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|high-risk sexual exposure",
            "label": "High-risk sexual exposure",
            "type": "etiology_factor",
            "weight": 27.0,
            "degree": 3,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|cellular immunodeficiency other than human immunodeficiency virus (hiv) infection",
            "label": "Cellular immunodeficiency other than human immunodeficiency virus (HIV) infecti...",
            "type": "disease_condition_syndrome",
            "weight": 27.0,
            "degree": 3,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|antibiotic exposure",
            "label": "Antibiotic exposure",
            "type": "etiology_factor",
            "weight": 14.0,
            "degree": 2,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "medication|clindamycin",
            "label": "clindamycin",
            "type": "medication",
            "weight": 14.0,
            "degree": 2,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "intervention|ablation",
            "label": "ablation",
            "type": "intervention",
            "weight": 24.0,
            "degree": 6,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|warfarin",
            "label": "warfarin",
            "type": "medication",
            "weight": 22.0,
            "degree": 3,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|dementia",
            "label": "Dementia",
            "type": "disease_condition_syndrome",
            "weight": 9.0,
            "degree": 1,
            "community": "32",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|dementia in the elderly",
            "label": "Dementia in the elderly",
            "type": "disease_condition_syndrome",
            "weight": 9.0,
            "degree": 1,
            "community": "32",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|gout urate deposition / erosions",
            "label": "Gout urate deposition / erosions",
            "type": "diagnostic_result",
            "weight": 14.0,
            "degree": 2,
            "community": "20",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|high-purine diet",
            "label": "High-purine diet",
            "type": "etiology_factor",
            "weight": 14.0,
            "degree": 2,
            "community": "20",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|acute interstitial nephritis",
            "label": "Acute interstitial nephritis",
            "type": "diagnostic_result",
            "weight": 38.0,
            "degree": 8,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|acute tubular injury / acute tubular necrosis",
            "label": "Acute tubular injury / acute tubular necrosis",
            "type": "diagnostic_result",
            "weight": 24.0,
            "degree": 4,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|diagnostic bronchoscopy",
            "label": "Diagnostic bronchoscopy",
            "type": "diagnostic_test",
            "weight": 16.0,
            "degree": 2,
            "community": "21",
            "project": "good_v3"
          },
          {
            "id": "intervention|therapeutic bronchoscopy",
            "label": "Therapeutic bronchoscopy",
            "type": "intervention",
            "weight": 16.0,
            "degree": 2,
            "community": "21",
            "project": "good_v3"
          },
          {
            "id": "intervention|diagnostic bronchoscopy",
            "label": "Diagnostic bronchoscopy",
            "type": "intervention",
            "weight": 16.0,
            "degree": 2,
            "community": "21",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|aortic dissection / intramural hematoma",
            "label": "Aortic dissection / intramural hematoma",
            "type": "diagnostic_result",
            "weight": 8.0,
            "degree": 1,
            "community": "33",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|aortic aneurysm and dissection",
            "label": "Aortic aneurysm and dissection",
            "type": "disease_condition_syndrome",
            "weight": 8.0,
            "degree": 1,
            "community": "33",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|allergic interstitial nephritis",
            "label": "Allergic interstitial nephritis",
            "type": "disease_condition_syndrome",
            "weight": 15.0,
            "degree": 2,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|ct angiography",
            "label": "CT angiography",
            "type": "imaging_test",
            "weight": 28.0,
            "degree": 7,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|radiography",
            "label": "Radiography",
            "type": "imaging_test",
            "weight": 8.0,
            "degree": 1,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|bundle branch block",
            "label": "Bundle branch block",
            "type": "diagnostic_result",
            "weight": 13.0,
            "degree": 2,
            "community": "22",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|right bundle branch block",
            "label": "Right bundle branch block",
            "type": "disease_condition_syndrome",
            "weight": 8.0,
            "degree": 1,
            "community": "22",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|age-related macular degeneration",
            "label": "Age-related macular degeneration",
            "type": "disease_condition_syndrome",
            "weight": 8.0,
            "degree": 1,
            "community": "34",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|macular degeneration",
            "label": "Macular degeneration",
            "type": "disease_condition_syndrome",
            "weight": 8.0,
            "degree": 1,
            "community": "34",
            "project": "good_v3"
          },
          {
            "id": "medication|naproxen",
            "label": "naproxen",
            "type": "medication",
            "weight": 19.0,
            "degree": 3,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|pneumothorax",
            "label": "Pneumothorax",
            "type": "diagnostic_result",
            "weight": 7.0,
            "degree": 1,
            "community": "35",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|pneumothorax",
            "label": "Pneumothorax",
            "type": "disease_condition_syndrome",
            "weight": 7.0,
            "degree": 1,
            "community": "35",
            "project": "good_v3"
          },
          {
            "id": "medication|trimethoprim/sulfamethoxazole",
            "label": "trimethoprim/sulfamethoxazole",
            "type": "medication",
            "weight": 16.0,
            "degree": 3,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|lymphoma on tissue or marrow pathology",
            "label": "Lymphoma on tissue or marrow pathology",
            "type": "diagnostic_result",
            "weight": 7.0,
            "degree": 1,
            "community": "36",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|lymphoma staging / fdg-avid nodal disease",
            "label": "Lymphoma staging / FDG-avid nodal disease",
            "type": "diagnostic_result",
            "weight": 7.0,
            "degree": 1,
            "community": "36",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|asbestos exposure",
            "label": "Asbestos exposure",
            "type": "etiology_factor",
            "weight": 17.0,
            "degree": 3,
            "community": "23",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|radon exposure",
            "label": "Radon exposure",
            "type": "etiology_factor",
            "weight": 14.0,
            "degree": 2,
            "community": "23",
            "project": "good_v3"
          },
          {
            "id": "medication|metronidazole",
            "label": "metronidazole",
            "type": "medication",
            "weight": 26.0,
            "degree": 5,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|seborrheic keratosis",
            "label": "Seborrheic keratosis",
            "type": "disease_condition_syndrome",
            "weight": 7.0,
            "degree": 1,
            "community": "37",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|seborrheic keratosis",
            "label": "Seborrheic keratosis",
            "type": "physical_exam_symptom",
            "weight": 7.0,
            "degree": 1,
            "community": "37",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|undifferentiated lung cancer",
            "label": "Undifferentiated lung cancer",
            "type": "disease_condition_syndrome",
            "weight": 14.0,
            "degree": 2,
            "community": "23",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|pericardiocentesis / pericardial fluid analysis",
            "label": "Pericardiocentesis / pericardial fluid analysis",
            "type": "diagnostic_test",
            "weight": 7.0,
            "degree": 1,
            "community": "38",
            "project": "good_v3"
          },
          {
            "id": "intervention|pericardiocentesis",
            "label": "Pericardiocentesis",
            "type": "intervention",
            "weight": 7.0,
            "degree": 1,
            "community": "38",
            "project": "good_v3"
          },
          {
            "id": "lab_test|aldosterone, plasma",
            "label": "Aldosterone, plasma",
            "type": "lab_test",
            "weight": 13.0,
            "degree": 3,
            "community": "10",
            "project": "good_v3"
          },
          {
            "id": "lab_test|metanephrines, fractionated, plasma/urine",
            "label": "Metanephrines, fractionated, plasma/urine",
            "type": "lab_test",
            "weight": 7.0,
            "degree": 1,
            "community": "10",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|pleural effusion",
            "label": "Pleural effusion",
            "type": "diagnostic_result",
            "weight": 9.0,
            "degree": 2,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|noninfectious pleural effusion",
            "label": "Noninfectious pleural effusion",
            "type": "disease_condition_syndrome",
            "weight": 6.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|plain radiography",
            "label": "Plain radiography",
            "type": "imaging_test",
            "weight": 6.0,
            "degree": 1,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|plasma cell neoplasm / multiple myeloma marrow involvement",
            "label": "Plasma cell neoplasm / multiple myeloma marrow involvement",
            "type": "diagnostic_result",
            "weight": 6.0,
            "degree": 1,
            "community": "39",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|plasma cell disorder",
            "label": "Plasma cell disorder",
            "type": "disease_condition_syndrome",
            "weight": 6.0,
            "degree": 1,
            "community": "39",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|valvular regurgitation",
            "label": "Valvular regurgitation",
            "type": "diagnostic_result",
            "weight": 9.0,
            "degree": 2,
            "community": "14",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|valvular stenosis",
            "label": "Valvular stenosis",
            "type": "diagnostic_result",
            "weight": 11.0,
            "degree": 2,
            "community": "14",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|pancreatitis / necrosis / peripancreatic collection",
            "label": "Pancreatitis / necrosis / peripancreatic collection",
            "type": "diagnostic_result",
            "weight": 9.0,
            "degree": 2,
            "community": "13",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|acute pancreatitis",
            "label": "Acute pancreatitis",
            "type": "disease_condition_syndrome",
            "weight": 9.0,
            "degree": 2,
            "community": "13",
            "project": "good_v3"
          },
          {
            "id": "medication|nitrofurantoin",
            "label": "nitrofurantoin",
            "type": "medication",
            "weight": 6.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "medication|rivaroxaban",
            "label": "rivaroxaban",
            "type": "medication",
            "weight": 16.0,
            "degree": 3,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|liothyronine",
            "label": "liothyronine",
            "type": "medication",
            "weight": 6.0,
            "degree": 1,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "medication|roflumilast",
            "label": "roflumilast",
            "type": "medication",
            "weight": 12.0,
            "degree": 2,
            "community": "7",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|giant cell arteritis on temporal artery biopsy",
            "label": "Giant cell arteritis on temporal artery biopsy",
            "type": "diagnostic_result",
            "weight": 12.0,
            "degree": 2,
            "community": "24",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|large-vessel vasculitis",
            "label": "Large-vessel vasculitis",
            "type": "disease_condition_syndrome",
            "weight": 12.0,
            "degree": 2,
            "community": "24",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|temporal arteritis",
            "label": "Temporal arteritis",
            "type": "disease_condition_syndrome",
            "weight": 12.0,
            "degree": 2,
            "community": "24",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|neoplasms",
            "label": "Neoplasms",
            "type": "disease_condition_syndrome",
            "weight": 20.0,
            "degree": 5,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "medication|levofloxacin",
            "label": "levofloxacin",
            "type": "medication",
            "weight": 6.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|crohn disease including crohn colitis",
            "label": "Crohn disease including Crohn colitis",
            "type": "disease_condition_syndrome",
            "weight": 6.0,
            "degree": 1,
            "community": "40",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|ulcerative colitis",
            "label": "Ulcerative colitis",
            "type": "disease_condition_syndrome",
            "weight": 6.0,
            "degree": 1,
            "community": "40",
            "project": "good_v3"
          },
          {
            "id": "medication|ibuprofen",
            "label": "ibuprofen",
            "type": "medication",
            "weight": 14.0,
            "degree": 3,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|nuclear medicine bone scan",
            "label": "Nuclear medicine bone scan",
            "type": "imaging_test",
            "weight": 6.0,
            "degree": 1,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "medication|enoxaparin",
            "label": "enoxaparin",
            "type": "medication",
            "weight": 5.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|kcnq1",
            "label": "KCNQ1",
            "type": "etiology_factor",
            "weight": 13.0,
            "degree": 3,
            "community": "15",
            "project": "good_v3"
          },
          {
            "id": "physical_exam_symptom|syncope",
            "label": "Syncope",
            "type": "physical_exam_symptom",
            "weight": 13.0,
            "degree": 3,
            "community": "15",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|kcnh2",
            "label": "KCNH2",
            "type": "etiology_factor",
            "weight": 13.0,
            "degree": 3,
            "community": "15",
            "project": "good_v3"
          },
          {
            "id": "medication|cefazolin",
            "label": "cefazolin",
            "type": "medication",
            "weight": 5.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|atrial flutter",
            "label": "Atrial flutter",
            "type": "disease_condition_syndrome",
            "weight": 5.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|dyslipidemias",
            "label": "Dyslipidemias",
            "type": "disease_condition_syndrome",
            "weight": 23.0,
            "degree": 7,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|type 1 diabetes mellitus",
            "label": "Type 1 diabetes mellitus",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "18",
            "project": "good_v3"
          },
          {
            "id": "lab_test|immunoglobulin a (iga)",
            "label": "Immunoglobulin A (IgA)",
            "type": "lab_test",
            "weight": 6.0,
            "degree": 2,
            "community": "18",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|smoking cessation",
            "label": "Smoking cessation",
            "type": "disease_condition_syndrome",
            "weight": 6.0,
            "degree": 2,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|lobar / air-space consolidation",
            "label": "Lobar / air-space consolidation",
            "type": "diagnostic_result",
            "weight": 6.0,
            "degree": 2,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|obesity",
            "label": "Obesity",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "etiology_factor|alcohol use disorder or heavy alcohol use",
            "label": "Alcohol use disorder or heavy alcohol use",
            "type": "etiology_factor",
            "weight": 15.0,
            "degree": 5,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|undifferentiated chronic kidney disease",
            "label": "Undifferentiated chronic kidney disease",
            "type": "disease_condition_syndrome",
            "weight": 12.0,
            "degree": 4,
            "community": "16",
            "project": "good_v3"
          },
          {
            "id": "medication|allopurinol",
            "label": "allopurinol",
            "type": "medication",
            "weight": 23.0,
            "degree": 7,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|anca-associated vasculitis",
            "label": "ANCA-associated vasculitis",
            "type": "disease_condition_syndrome",
            "weight": 31.0,
            "degree": 9,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|pericardial effusion",
            "label": "Pericardial effusion",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|colchicine",
            "label": "colchicine",
            "type": "medication",
            "weight": 36.0,
            "degree": 10,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|fibrosis / cirrhosis on liver biopsy",
            "label": "Fibrosis / cirrhosis on liver biopsy",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "9",
            "project": "good_v3"
          },
          {
            "id": "imaging_test|liver elastography ultrasound",
            "label": "Liver elastography ultrasound",
            "type": "imaging_test",
            "weight": 12.0,
            "degree": 4,
            "community": "9",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|colitis endoscopic pattern",
            "label": "Colitis endoscopic pattern",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|other acute kidney injury",
            "label": "Other acute kidney injury",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|essential (primary) hypertension",
            "label": "Essential (primary) hypertension",
            "type": "disease_condition_syndrome",
            "weight": 11.0,
            "degree": 3,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|coronary atherosclerosis",
            "label": "Coronary atherosclerosis",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|helicobacter pylori organisms identified",
            "label": "Helicobacter pylori organisms identified",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|helicobacter pylori infection",
            "label": "Helicobacter pylori infection",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|limited / nondiagnostic / motion-degraded exam",
            "label": "Limited / nondiagnostic / motion-degraded exam",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|back pain",
            "label": "Back pain",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "8",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|normal sinus rhythm",
            "label": "Normal sinus rhythm",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|other upper respiratory tract infections (pertussis)",
            "label": "Other upper respiratory tract infections (pertussis)",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "25",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|viral hepatitis",
            "label": "Viral hepatitis",
            "type": "disease_condition_syndrome",
            "weight": 11.0,
            "degree": 3,
            "community": "25",
            "project": "good_v3"
          },
          {
            "id": "medication|hydromorphone",
            "label": "hydromorphone",
            "type": "medication",
            "weight": 12.0,
            "degree": 4,
            "community": "16",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|gastroesophageal reflux",
            "label": "Gastroesophageal reflux",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "3",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_test|skin biopsy",
            "label": "Skin biopsy",
            "type": "diagnostic_test",
            "weight": 6.0,
            "degree": 2,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|bowel stricture",
            "label": "Bowel stricture",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|stricture / stenosis",
            "label": "Stricture / stenosis",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|cholelithiasis",
            "label": "Cholelithiasis",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "intervention|cholecystectomy",
            "label": "cholecystectomy",
            "type": "intervention",
            "weight": 16.0,
            "degree": 5,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "medication|tiotropium",
            "label": "tiotropium",
            "type": "medication",
            "weight": 18.0,
            "degree": 6,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|stroke",
            "label": "Stroke",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|chronic bronchitis and emphysema",
            "label": "Chronic bronchitis and emphysema",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "2",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|adenocarcinoma",
            "label": "Adenocarcinoma",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|immunohistochemistry or receptor marker result",
            "label": "Immunohistochemistry or receptor marker result",
            "type": "diagnostic_result",
            "weight": 18.0,
            "degree": 6,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|pericardial effusion",
            "label": "Pericardial effusion",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "medication|sertraline",
            "label": "sertraline",
            "type": "medication",
            "weight": 6.0,
            "degree": 2,
            "community": "1",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|hemoptysis",
            "label": "Hemoptysis",
            "type": "disease_condition_syndrome",
            "weight": 3.0,
            "degree": 1,
            "community": "4",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|cholelithiasis / gallstones",
            "label": "Cholelithiasis / gallstones",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "5",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|squamous cell carcinoma",
            "label": "Squamous cell carcinoma",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "diagnostic_result|carcinoma / malignant epithelial neoplasm",
            "label": "Carcinoma / malignant epithelial neoplasm",
            "type": "diagnostic_result",
            "weight": 3.0,
            "degree": 1,
            "community": "6",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|hepatorenal syndrome",
            "label": "Hepatorenal syndrome",
            "type": "disease_condition_syndrome",
            "weight": 2,
            "degree": 1,
            "community": "",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|basal cell carcinoma of the skin",
            "label": "Basal cell carcinoma of the skin",
            "type": "disease_condition_syndrome",
            "weight": 5.0,
            "degree": 1,
            "community": "44",
            "project": "good_v3"
          },
          {
            "id": "medication|diphenhydramine",
            "label": "diphenhydramine",
            "type": "medication",
            "weight": 2,
            "degree": 1,
            "community": "",
            "project": "good_v3"
          },
          {
            "id": "disease_condition_syndrome|hyperthyroidism",
            "label": "Hyperthyroidism",
            "type": "disease_condition_syndrome",
            "weight": 2,
            "degree": 1,
            "community": "",
            "project": "good_v3"
          },
          {
            "id": "medication|propylthiouracil",
            "label": "propylthiouracil",
            "type": "medication",
            "weight": 2,
            "degree": 1,
            "community": "",
            "project": "good_v3"
          }
        ],
        "edges": [
          {
            "source": "medication|ceftriaxone",
            "target": "physical_exam_symptom|fever",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Fever",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 11,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_45a0c1123750da92; daq_4870718405bab9b1; daq_4f522fdfaa9a6ffe; daq_6eca94ecb3f7d736; daq_7fa..."
          },
          {
            "source": "medication|ceftriaxone",
            "target": "etiology_factor|staphylococcus aureus",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Staphylococcus aureus",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 11,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_45a0c1123750da92; daq_4870718405bab9b1; daq_4f522fdfaa9a6ffe; daq_6eca94ecb3f7d736; daq_7fa..."
          },
          {
            "source": "medication|vancomycin",
            "target": "etiology_factor|staphylococcus aureus",
            "sourceLabel": "vancomycin",
            "targetLabel": "Staphylococcus aureus",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 8,
            "questions": "daq_137d4e9269f8a100; daq_2618a15df218bf63; daq_40320130777150d2; daq_6eca94ecb3f7d736; daq_9dbdd61ba42b05f4; daq_ab8e6856e335de9b; daq_e56..."
          },
          {
            "source": "medication|vancomycin",
            "target": "lab_test|leukocyte count (wbc)",
            "sourceLabel": "vancomycin",
            "targetLabel": "Leukocyte count (WBC)",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 8,
            "questions": "daq_137d4e9269f8a100; daq_2618a15df218bf63; daq_40320130777150d2; daq_690ea186e63518ff; daq_6eca94ecb3f7d736; daq_9de5b4d49a3a6dba; daq_ab8..."
          },
          {
            "source": "medication|ceftriaxone",
            "target": "lab_test|leukocyte count (wbc)",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Leukocyte count (WBC)",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 8,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_4f522fdfaa9a6ffe; daq_6eca94ecb3f7d736; daq_7fa7619374046675; daq_93db5fd2de6033c2; daq_9bc..."
          },
          {
            "source": "medication|vancomycin",
            "target": "physical_exam_symptom|fever",
            "sourceLabel": "vancomycin",
            "targetLabel": "Fever",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 8,
            "questions": "daq_137d4e9269f8a100; daq_2618a15df218bf63; daq_40320130777150d2; daq_6eca94ecb3f7d736; daq_9dbdd61ba42b05f4; daq_ab8e6856e335de9b; daq_e56..."
          },
          {
            "source": "imaging_test|transthoracic echocardiography",
            "target": "physical_exam_symptom|shortness of breath",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "Shortness of breath",
            "sourceType": "imaging_test",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_151a4838d48545aa; daq_1fbb18d59b917b6c; daq_6a5921406e28f038; daq_91bfb4f211ccb4ba; daq_c18f95e4a5af4ed8; daq_c6653ca6aa3cf440; daq_da1..."
          },
          {
            "source": "medication|azithromycin",
            "target": "lab_test|arterial po2 / oxygen saturation",
            "sourceLabel": "azithromycin",
            "targetLabel": "Arterial PO2 / oxygen saturation",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_01c28c2be16e8b98; daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_884a8018f917a1df; daq_8f1f698a8e25c8a2; daq_db2..."
          },
          {
            "source": "imaging_test|echocardiography",
            "target": "diagnostic_test|12-lead electrocardiogram",
            "sourceLabel": "Echocardiography",
            "targetLabel": "12-lead electrocardiogram",
            "sourceType": "imaging_test",
            "targetType": "diagnostic_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_01f081c7a4031f2c; daq_0c7298d31694b965; daq_32d1549186449288; daq_4d04b5a6a74e7518; daq_544625d5fbb2d5d1; daq_def6be6469e998a5; daq_e7e..."
          },
          {
            "source": "medication|lisinopril",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "lisinopril",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_18d8ca9f1ff7b3a3; daq_3b85ef41d4c687f7; daq_6323437efc9580a8; daq_7b3e01bb80cce134; daq_851041c95c329ba6; daq_a88dd4390eda21ed; daq_df9..."
          },
          {
            "source": "medication|aspirin",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "aspirin",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_3a7f0dbddb630a03; daq_74cfdbe6a9322073; daq_84f9a5f91c96aaf5; daq_b71c9aa2eabb95ef; daq_ba8e979311a806db; daq_c1f0a8a4e5aee54e; daq_f9f..."
          },
          {
            "source": "medication|aspirin",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "aspirin",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_3a7f0dbddb630a03; daq_74cfdbe6a9322073; daq_84f9a5f91c96aaf5; daq_b71c9aa2eabb95ef; daq_ba8e979311a806db; daq_c1f0a8a4e5aee54e; daq_f9f..."
          },
          {
            "source": "imaging_test|transthoracic echocardiography",
            "target": "diagnostic_test|12-lead electrocardiogram",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "12-lead electrocardiogram",
            "sourceType": "imaging_test",
            "targetType": "diagnostic_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_1fbb18d59b917b6c; daq_6a5921406e28f038; daq_7a279959b743fd60; daq_8897a7d7c5b2857a; daq_c18f95e4a5af4ed8; daq_c322d4e872a9190f; daq_e1c..."
          },
          {
            "source": "medication|lisinopril",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "lisinopril",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 7,
            "questions": "daq_18d8ca9f1ff7b3a3; daq_3b85ef41d4c687f7; daq_6323437efc9580a8; daq_7b3e01bb80cce134; daq_851041c95c329ba6; daq_a88dd4390eda21ed; daq_df9..."
          },
          {
            "source": "imaging_test|ultrasound",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "Ultrasound",
            "targetLabel": "Hypertension",
            "sourceType": "imaging_test",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_1e041e5c988b9a4b; daq_1e798f5a448bb3e2; daq_a1dfbea6a10108e5; daq_ba681b681db4b9fb; daq_e8768b0b31daf22f; daq_fafbbb4eaebfa463"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "lab_test|arterial po2 / oxygen saturation",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "Arterial PO2 / oxygen saturation",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_032789239ff6329f; daq_5177197976340cd1; daq_741655b7ae125734; daq_884a8018f917a1df; daq_b8d6757b4ad7db96; daq_e5d35ad5c28116e8"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "diagnostic_test|blood culture",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Blood culture",
            "sourceType": "medication",
            "targetType": "diagnostic_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_45a0c1123750da92; daq_4be6010b06b4f342; daq_4f522fdfaa9a6ffe; daq_8f1f698a8e25c8a2; daq_93db5fd2de6033c2; daq_e56132b0af356dff"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Hypertension",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_d979469d673428e0; daq_e089205b00db52ab"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "lab_test|creatinine, serum",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Creatinine, serum",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_d979469d673428e0; daq_dbb167ff5cfc8533"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Hypertension",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_d979469d673428e0; daq_e089205b00db52ab"
          },
          {
            "source": "diagnostic_test|spirometry with bronchodilator response",
            "target": "imaging_test|chest radiograph",
            "sourceLabel": "Spirometry with bronchodilator response",
            "targetLabel": "Chest radiograph",
            "sourceType": "diagnostic_test",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_0a9c372d74a84e33; daq_1fc467a4e2522c0b; daq_6c4421784ef06192; daq_af4a804aa12c8e05; daq_d05b10ce96f5d58c; daq_d34a474daec7dff5"
          },
          {
            "source": "medication|azithromycin",
            "target": "physical_exam_symptom|fever",
            "sourceLabel": "azithromycin",
            "targetLabel": "Fever",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_757a00f975f7bb84; daq_7fa7619374046675; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "medication|azithromycin",
            "target": "etiology_factor|mycobacterium tuberculosis complex",
            "sourceLabel": "azithromycin",
            "targetLabel": "Mycobacterium tuberculosis complex",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_884a8018f917a1df; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "medication|azithromycin",
            "target": "etiology_factor|staphylococcus aureus",
            "sourceLabel": "azithromycin",
            "targetLabel": "Staphylococcus aureus",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_757a00f975f7bb84; daq_7fa7619374046675; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "medication|azithromycin",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "azithromycin",
            "targetLabel": "Tobacco smoking",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_884a8018f917a1df; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "medication|azithromycin",
            "target": "physical_exam_symptom|cough",
            "sourceLabel": "azithromycin",
            "targetLabel": "Cough",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_884a8018f917a1df; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "imaging_test|ultrasound",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "Ultrasound",
            "targetLabel": "Hypertension",
            "sourceType": "imaging_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_1e041e5c988b9a4b; daq_1e798f5a448bb3e2; daq_a1dfbea6a10108e5; daq_ba681b681db4b9fb; daq_e8768b0b31daf22f; daq_fafbbb4eaebfa463"
          },
          {
            "source": "medication|azithromycin",
            "target": "imaging_test|chest radiograph",
            "sourceLabel": "azithromycin",
            "targetLabel": "Chest radiograph",
            "sourceType": "medication",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_884a8018f917a1df; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "intervention|diagnostic coronary angiography",
            "target": "diagnostic_test|12-lead electrocardiogram",
            "sourceLabel": "Diagnostic coronary angiography",
            "targetLabel": "12-lead electrocardiogram",
            "sourceType": "intervention",
            "targetType": "diagnostic_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_102047a9515de2b3; daq_61768f970cd8ef0b; daq_8f03e02eb2620bf1; daq_cd97ff232d8363ef; daq_d7d3d3e1e6f6fdb0; daq_fbc744ffa1bbf884"
          },
          {
            "source": "medication|unfractionated heparin",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "unfractionated heparin",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_37df2a10e19565bb; daq_4cf20537e48f0495; daq_52c646350fb99ce3; daq_5558326e7d5642aa; daq_5e16bc79bc4a635c; daq_d593b92e81a9b5dd"
          },
          {
            "source": "etiology_factor|immunosuppression",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "Immunosuppression",
            "targetLabel": "Tobacco smoking",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_1048926e3f1e63bc; daq_3333decffee7d1a9; daq_52635b0957ea82e2; daq_af3f8b3fc8445868; daq_e9514c10c099aada; daq_fffdef5c20efd19e"
          },
          {
            "source": "medication|prednisone",
            "target": "lab_test|arterial po2 / oxygen saturation",
            "sourceLabel": "prednisone",
            "targetLabel": "Arterial PO2 / oxygen saturation",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_032789239ff6329f; daq_5177197976340cd1; daq_741655b7ae125734; daq_884a8018f917a1df; daq_b8d6757b4ad7db96; daq_e5d35ad5c28116e8"
          },
          {
            "source": "medication|aspirin",
            "target": "diagnostic_test|12-lead electrocardiogram",
            "sourceLabel": "aspirin",
            "targetLabel": "12-lead electrocardiogram",
            "sourceType": "medication",
            "targetType": "diagnostic_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_74cfdbe6a9322073; daq_84f9a5f91c96aaf5; daq_951a633adb3efaeb; daq_ba8e979311a806db; daq_d31890b9639c57e0; daq_f9fc480b74597183"
          },
          {
            "source": "medication|unfractionated heparin",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "unfractionated heparin",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 6,
            "questions": "daq_37df2a10e19565bb; daq_4cf20537e48f0495; daq_52c646350fb99ce3; daq_5558326e7d5642aa; daq_5e16bc79bc4a635c; daq_d593b92e81a9b5dd"
          },
          {
            "source": "medication|furosemide",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "furosemide",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_d979469d673428e0"
          },
          {
            "source": "medication|amlodipine",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "amlodipine",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_04e9484064ddeb73; daq_64bbc5940d42bce5; daq_6fe0522a6fd8a9d0; daq_df910fca5b93156f; daq_f20f6e7496b7ff2e"
          },
          {
            "source": "medication|amlodipine",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "amlodipine",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_04e9484064ddeb73; daq_64bbc5940d42bce5; daq_6fe0522a6fd8a9d0; daq_df910fca5b93156f; daq_f20f6e7496b7ff2e"
          },
          {
            "source": "etiology_factor|immunosuppression",
            "target": "diagnostic_result|lung mass",
            "sourceLabel": "Immunosuppression",
            "targetLabel": "Lung mass",
            "sourceType": "etiology_factor",
            "targetType": "diagnostic_result",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1048926e3f1e63bc; daq_3333decffee7d1a9; daq_52635b0957ea82e2; daq_760cf7030cad8404; daq_af3f8b3fc8445868"
          },
          {
            "source": "intervention|diagnostic coronary angiography",
            "target": "medication|clopidogrel",
            "sourceLabel": "Diagnostic coronary angiography",
            "targetLabel": "clopidogrel",
            "sourceType": "intervention",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_102047a9515de2b3; daq_61768f970cd8ef0b; daq_8f03e02eb2620bf1; daq_cd97ff232d8363ef; daq_d7d3d3e1e6f6fdb0"
          },
          {
            "source": "medication|furosemide",
            "target": "lab_test|creatinine, serum",
            "sourceLabel": "furosemide",
            "targetLabel": "Creatinine, serum",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_d979469d673428e0"
          },
          {
            "source": "etiology_factor|immunosuppression",
            "target": "imaging_test|ct scan",
            "sourceLabel": "Immunosuppression",
            "targetLabel": "CT scan",
            "sourceType": "etiology_factor",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1048926e3f1e63bc; daq_3333decffee7d1a9; daq_52635b0957ea82e2; daq_af3f8b3fc8445868; daq_fffdef5c20efd19e"
          },
          {
            "source": "medication|azithromycin",
            "target": "physical_exam_symptom|shortness of breath",
            "sourceLabel": "azithromycin",
            "targetLabel": "Shortness of breath",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_01c28c2be16e8b98; daq_7fa7619374046675; daq_884a8018f917a1df; daq_8f1f698a8e25c8a2; daq_db255d18ecadbd98"
          },
          {
            "source": "medication|levothyroxine",
            "target": "lab_test|thyroid-stimulating hormone (tsh)",
            "sourceLabel": "levothyroxine",
            "targetLabel": "Thyroid-stimulating hormone (TSH)",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_2b06ece0238f7909; daq_59d4369cb6c1cf2a; daq_7d4196d988edb5b0; daq_951ff7f593b88611; daq_f29791b52bf69d56"
          },
          {
            "source": "medication|aspirin",
            "target": "medication|atorvastatin",
            "sourceLabel": "aspirin",
            "targetLabel": "atorvastatin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_84f9a5f91c96aaf5; daq_951a633adb3efaeb; daq_ba8e979311a806db; daq_d31890b9639c57e0; daq_f9fc480b74597183"
          },
          {
            "source": "medication|furosemide",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "furosemide",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_d979469d673428e0"
          },
          {
            "source": "imaging_test|ct chest",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "CT chest",
            "targetLabel": "Tobacco smoking",
            "sourceType": "imaging_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_5ae7fc89aacce171; daq_87c8ce7f8ad391dd; daq_b2f40f824049ffae; daq_df1bd472f97ad3bb; daq_f6284aa81de2e664"
          },
          {
            "source": "intervention|diagnostic coronary angiography",
            "target": "medication|unfractionated heparin",
            "sourceLabel": "Diagnostic coronary angiography",
            "targetLabel": "unfractionated heparin",
            "sourceType": "intervention",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_102047a9515de2b3; daq_61768f970cd8ef0b; daq_8f03e02eb2620bf1; daq_cd97ff232d8363ef; daq_d7d3d3e1e6f6fdb0"
          },
          {
            "source": "imaging_test|ultrasound",
            "target": "lab_test|creatinine, serum",
            "sourceLabel": "Ultrasound",
            "targetLabel": "Creatinine, serum",
            "sourceType": "imaging_test",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1e041e5c988b9a4b; daq_1e798f5a448bb3e2; daq_609bc5acdc916a61; daq_a1dfbea6a10108e5; daq_fafbbb4eaebfa463"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "physical_exam_symptom|shortness of breath",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "Shortness of breath",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_032789239ff6329f; daq_741655b7ae125734; daq_884a8018f917a1df; daq_b8d6757b4ad7db96; daq_e5d35ad5c28116e8"
          },
          {
            "source": "medication|prednisone",
            "target": "physical_exam_symptom|shortness of breath",
            "sourceLabel": "prednisone",
            "targetLabel": "Shortness of breath",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_032789239ff6329f; daq_741655b7ae125734; daq_884a8018f917a1df; daq_b8d6757b4ad7db96; daq_e5d35ad5c28116e8"
          },
          {
            "source": "imaging_test|transthoracic echocardiography",
            "target": "imaging_test|chest radiograph",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "Chest radiograph",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_151a4838d48545aa; daq_6a5921406e28f038; daq_91bfb4f211ccb4ba; daq_da1947bde4eaf7e1; daq_e1cc5f0bba2f5b43"
          },
          {
            "source": "diagnostic_test|spirometry with bronchodilator response",
            "target": "physical_exam_symptom|cough",
            "sourceLabel": "Spirometry with bronchodilator response",
            "targetLabel": "Cough",
            "sourceType": "diagnostic_test",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1fc467a4e2522c0b; daq_6c4421784ef06192; daq_af4a804aa12c8e05; daq_d05b10ce96f5d58c; daq_d34a474daec7dff5"
          },
          {
            "source": "diagnostic_test|spirometry with bronchodilator response",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "Spirometry with bronchodilator response",
            "targetLabel": "Tobacco smoking",
            "sourceType": "diagnostic_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1fc467a4e2522c0b; daq_6c4421784ef06192; daq_af4a804aa12c8e05; daq_d05b10ce96f5d58c; daq_d34a474daec7dff5"
          },
          {
            "source": "diagnostic_test|spirometry with bronchodilator response",
            "target": "etiology_factor|mycobacterium tuberculosis complex",
            "sourceLabel": "Spirometry with bronchodilator response",
            "targetLabel": "Mycobacterium tuberculosis complex",
            "sourceType": "diagnostic_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1fc467a4e2522c0b; daq_6c4421784ef06192; daq_af4a804aa12c8e05; daq_d05b10ce96f5d58c; daq_d34a474daec7dff5"
          },
          {
            "source": "intervention|diagnostic coronary angiography",
            "target": "medication|aspirin",
            "sourceLabel": "Diagnostic coronary angiography",
            "targetLabel": "aspirin",
            "sourceType": "intervention",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_102047a9515de2b3; daq_61768f970cd8ef0b; daq_8f03e02eb2620bf1; daq_cd97ff232d8363ef; daq_d7d3d3e1e6f6fdb0"
          },
          {
            "source": "diagnostic_test|diagnostic egd / upper endoscopy",
            "target": "lab_test|hemoglobin, blood",
            "sourceLabel": "Diagnostic EGD / upper endoscopy",
            "targetLabel": "Hemoglobin, blood",
            "sourceType": "diagnostic_test",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_2c71d626b1eb5c75; daq_470414512e5710a4; daq_8ba4645d1df84a99; daq_b4ded18cb01d2353; daq_f63ea77d5fbc4463"
          },
          {
            "source": "medication|cefepime",
            "target": "etiology_factor|staphylococcus aureus",
            "sourceLabel": "cefepime",
            "targetLabel": "Staphylococcus aureus",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_2618a15df218bf63; daq_5c8e4e2075a448e9; daq_7e51d5e80dc88aba; daq_bb55c5b330f2209c; daq_db255d18ecadbd98"
          },
          {
            "source": "medication|prednisone",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "prednisone",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1ce5dd9eea4f53dc; daq_7506c4335c4cf2eb; daq_90380a733d3cdfbf; daq_a39be4e6b3804d14; daq_cdea1dcafc83978a"
          },
          {
            "source": "diagnostic_test|biopsy",
            "target": "imaging_test|ct scan",
            "sourceLabel": "Biopsy",
            "targetLabel": "CT scan",
            "sourceType": "diagnostic_test",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_028977e8b8c27b23; daq_473be194d9531f66; daq_668609de2286d444; daq_964485f229f11947; daq_d2bf595001fdabc3"
          },
          {
            "source": "medication|prednisone",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "prednisone",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_1ce5dd9eea4f53dc; daq_7506c4335c4cf2eb; daq_90380a733d3cdfbf; daq_a39be4e6b3804d14; daq_cdea1dcafc83978a"
          },
          {
            "source": "intervention|diagnostic coronary angiography",
            "target": "etiology_factor|healthcare exposure",
            "sourceLabel": "Diagnostic coronary angiography",
            "targetLabel": "Healthcare exposure",
            "sourceType": "intervention",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_102047a9515de2b3; daq_61768f970cd8ef0b; daq_8f03e02eb2620bf1; daq_d7d3d3e1e6f6fdb0; daq_fbc744ffa1bbf884"
          },
          {
            "source": "disease_condition_syndrome|lupus nephritis and glomerulonephritis",
            "target": "lab_test|urinalysis",
            "sourceLabel": "Lupus nephritis and glomerulonephritis",
            "targetLabel": "Urinalysis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_2c200a0580d92ebb; daq_a41f219a65130654; daq_b8df7220e6c27076; daq_ecb2faa0d6f38378; daq_fd67e81108cdd147"
          },
          {
            "source": "medication|cefepime",
            "target": "physical_exam_symptom|fever",
            "sourceLabel": "cefepime",
            "targetLabel": "Fever",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_2618a15df218bf63; daq_5c8e4e2075a448e9; daq_7e51d5e80dc88aba; daq_bb55c5b330f2209c; daq_db255d18ecadbd98"
          },
          {
            "source": "imaging_test|stress echocardiography",
            "target": "diagnostic_test|12-lead electrocardiogram",
            "sourceLabel": "Stress echocardiography",
            "targetLabel": "12-lead electrocardiogram",
            "sourceType": "imaging_test",
            "targetType": "diagnostic_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_8b5d57418a47530b; daq_9f0814b295d74006; daq_c417ffdb4615ba9d; daq_cbc02347b983dc96; daq_ce5c2f180b2105d3"
          },
          {
            "source": "diagnostic_test|diagnostic colonoscopy",
            "target": "disease_condition_syndrome|colorectal cancer",
            "sourceLabel": "Diagnostic colonoscopy",
            "targetLabel": "Colorectal cancer",
            "sourceType": "diagnostic_test",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_5f6b5ed51a210768; daq_a0eb214fd3bc2efb; daq_a270bec3af40c55d; daq_c98628843ef2b508; daq_e23625d7b6df0a61"
          },
          {
            "source": "medication|clopidogrel",
            "target": "medication|aspirin",
            "sourceLabel": "clopidogrel",
            "targetLabel": "aspirin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_4178a658653c7902; daq_4b30962757b4eb19; daq_c1f0a8a4e5aee54e; daq_ef4f9f03ec4cc9a7; daq_f9fc480b74597183"
          },
          {
            "source": "diagnostic_test|diagnostic egd / upper endoscopy",
            "target": "medication|omeprazole",
            "sourceLabel": "Diagnostic EGD / upper endoscopy",
            "targetLabel": "omeprazole",
            "sourceType": "diagnostic_test",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_0b8c46f8c4cc1ce8; daq_7250ce259f82634f; daq_8ba4645d1df84a99; daq_d0c883c6ea891cc5; daq_d104bc7506ec1f65"
          },
          {
            "source": "etiology_factor|healthcare exposure",
            "target": "lab_test|arterial po2 / oxygen saturation",
            "sourceLabel": "Healthcare exposure",
            "targetLabel": "Arterial PO2 / oxygen saturation",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_00a82acdf7ff8ea3; daq_4b6fcb72de01b7a9; daq_65c0081aa187d71e; daq_7a9e782d0d8aaead; daq_b128f5ca2240f8df"
          },
          {
            "source": "medication|clopidogrel",
            "target": "disease_condition_syndrome|type 2 diabetes mellitus",
            "sourceLabel": "clopidogrel",
            "targetLabel": "Type 2 diabetes mellitus",
            "sourceType": "medication",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_4178a658653c7902; daq_4b30962757b4eb19; daq_951a633adb3efaeb; daq_ef4f9f03ec4cc9a7; daq_f9fc480b74597183"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "lab_test|arterial po2 / oxygen saturation",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Arterial PO2 / oxygen saturation",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_8f1f698a8e25c8a2; daq_93db5fd2de6033c2"
          },
          {
            "source": "diagnostic_test|diagnostic colonoscopy",
            "target": "diagnostic_result|colorectal carcinoma / malignant colorectal mass",
            "sourceLabel": "Diagnostic colonoscopy",
            "targetLabel": "Colorectal carcinoma / malignant colorectal mass",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_result",
            "layer": "correct_answer_to_stem_clue",
            "weight": 5,
            "questions": "daq_5f6b5ed51a210768; daq_a0eb214fd3bc2efb; daq_a270bec3af40c55d; daq_c98628843ef2b508; daq_e23625d7b6df0a61"
          },
          {
            "source": "diagnostic_test|blood culture",
            "target": "lab_test|leukocyte count (wbc)",
            "sourceLabel": "Blood culture",
            "targetLabel": "Leukocyte count (WBC)",
            "sourceType": "diagnostic_test",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_022f87ab750f9151; daq_422331324882529d; daq_b387aa61a8dea03f; daq_b937082941e94e2f"
          },
          {
            "source": "medication|hydrocortisone",
            "target": "lab_test|thyroid-stimulating hormone (tsh)",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "Thyroid-stimulating hormone (TSH)",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_2b06ece0238f7909; daq_63be02ca9fcaedcd; daq_956a0be814b43a53; daq_d3ca5207df99e54b"
          },
          {
            "source": "imaging_test|transthoracic echocardiography",
            "target": "lab_test|arterial po2 / oxygen saturation",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "Arterial PO2 / oxygen saturation",
            "sourceType": "imaging_test",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_1fbb18d59b917b6c; daq_6a5921406e28f038; daq_c6653ca6aa3cf440; daq_e1cc5f0bba2f5b43"
          },
          {
            "source": "medication|hydrocortisone",
            "target": "lab_test|thyroxine (t4), free",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "Thyroxine (T4), free",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_2b06ece0238f7909; daq_63be02ca9fcaedcd; daq_956a0be814b43a53; daq_d3ca5207df99e54b"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "etiology_factor|mycobacterium tuberculosis complex",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Mycobacterium tuberculosis complex",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_8f1f698a8e25c8a2"
          },
          {
            "source": "medication|apixaban",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "apixaban",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_84f9a5f91c96aaf5; daq_db001403b02ba22e; daq_f9fc480b74597183"
          },
          {
            "source": "imaging_test|mri",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "MRI",
            "targetLabel": "Hypertension",
            "sourceType": "imaging_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_3ebc2f0d915e7937; daq_cba695b70313bd7c; daq_d5a56f0db754a6bc; daq_eb9d38dcd7a21db7"
          },
          {
            "source": "medication|empagliflozin",
            "target": "disease_condition_syndrome|type 2 diabetes mellitus",
            "sourceLabel": "empagliflozin",
            "targetLabel": "Type 2 diabetes mellitus",
            "sourceType": "medication",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0c02a7d778f6e59c; daq_2d2e7ca8ae9f84a9; daq_3b683abe1f9917f4; daq_90116d8e4a740aba"
          },
          {
            "source": "medication|apixaban",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "apixaban",
            "targetLabel": "Hypertension",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_84f9a5f91c96aaf5; daq_db001403b02ba22e; daq_f9fc480b74597183"
          },
          {
            "source": "imaging_test|low-dose ct chest for lung cancer screening",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "Low-dose CT chest for lung cancer screening",
            "targetLabel": "Hypertension",
            "sourceType": "imaging_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_00a16c14920f41b9; daq_c97ad2c5a56c0594; daq_ddbc088aad00f3da; daq_fddddd35a6acd46a"
          },
          {
            "source": "medication|hydrocortisone",
            "target": "lab_test|thyroxine (t4), total",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "Thyroxine (T4), total",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_2b06ece0238f7909; daq_63be02ca9fcaedcd; daq_956a0be814b43a53; daq_d3ca5207df99e54b"
          },
          {
            "source": "medication|hydrocortisone",
            "target": "physical_exam_symptom|fatigue",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "Fatigue",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_2b06ece0238f7909; daq_63be02ca9fcaedcd; daq_b303eabea2ca7237; daq_d3ca5207df99e54b"
          },
          {
            "source": "medication|apixaban",
            "target": "lab_test|creatinine, serum",
            "sourceLabel": "apixaban",
            "targetLabel": "Creatinine, serum",
            "sourceType": "medication",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_0ac46ebcc37719aa; daq_84f9a5f91c96aaf5; daq_db001403b02ba22e"
          },
          {
            "source": "medication|azithromycin",
            "target": "physical_exam_symptom|sputum purulence",
            "sourceLabel": "azithromycin",
            "targetLabel": "Sputum purulence",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_40320130777150d2; daq_7fa7619374046675; daq_884a8018f917a1df; daq_db255d18ecadbd98"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "lab_test|urinalysis",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Urinalysis",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_dbb167ff5cfc8533; daq_e089205b00db52ab"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "medication|atorvastatin",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "atorvastatin",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_e089205b00db52ab"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "physical_exam_symptom|peripheral edema",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Peripheral edema",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_d979469d673428e0; daq_f5a13b202b3327ad"
          },
          {
            "source": "imaging_test|echocardiography",
            "target": "imaging_test|transthoracic echocardiogram",
            "sourceLabel": "Echocardiography",
            "targetLabel": "Transthoracic echocardiogram",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_01f081c7a4031f2c; daq_1d20c0d9b1aed6fc; daq_d94874b4468a528a; daq_def6be6469e998a5"
          },
          {
            "source": "imaging_test|ct chest",
            "target": "imaging_test|chest radiograph",
            "sourceLabel": "CT chest",
            "targetLabel": "Chest radiograph",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_5ae7fc89aacce171; daq_87c8ce7f8ad391dd; daq_b2f40f824049ffae; daq_f6284aa81de2e664"
          },
          {
            "source": "lab_test|thyroid-stimulating hormone (tsh)",
            "target": "physical_exam_symptom|fatigue",
            "sourceLabel": "Thyroid-stimulating hormone (TSH)",
            "targetLabel": "Fatigue",
            "sourceType": "lab_test",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_7f5519fc2a2315e2; daq_82d660fc80cc9dac; daq_a64fb4fd8a0353cd; daq_ad53c9e86b75e433"
          },
          {
            "source": "intervention|surgery",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "surgery",
            "targetLabel": "Hypertension",
            "sourceType": "intervention",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_139a09c07ab88db0; daq_583bdfb4ee69d5a1; daq_b0538c557ffc3947"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "lab_test|left ventricular ejection fraction (lvef)",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Left ventricular ejection fraction (LVEF)",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_d979469d673428e0; daq_f5a13b202b3327ad"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "medication|valsartan",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "valsartan",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_580b970da47a48f1; daq_99211a28d1e8db7a; daq_d979469d673428e0; daq_f5a13b202b3327ad"
          },
          {
            "source": "intervention|surgery",
            "target": "medication|lisinopril",
            "sourceLabel": "surgery",
            "targetLabel": "lisinopril",
            "sourceType": "intervention",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_139a09c07ab88db0; daq_583bdfb4ee69d5a1; daq_b0538c557ffc3947"
          },
          {
            "source": "imaging_test|ct chest",
            "target": "physical_exam_symptom|cough",
            "sourceLabel": "CT chest",
            "targetLabel": "Cough",
            "sourceType": "imaging_test",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_5ae7fc89aacce171; daq_87c8ce7f8ad391dd; daq_b2f40f824049ffae; daq_f6284aa81de2e664"
          },
          {
            "source": "intervention|surgery",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "surgery",
            "targetLabel": "Hypertension",
            "sourceType": "intervention",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_139a09c07ab88db0; daq_583bdfb4ee69d5a1; daq_b0538c557ffc3947"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "medication|furosemide",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "furosemide",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_dbb167ff5cfc8533; daq_f5a13b202b3327ad"
          },
          {
            "source": "medication|apixaban",
            "target": "diagnostic_result|atrial fibrillation or atrial flutter",
            "sourceLabel": "apixaban",
            "targetLabel": "Atrial fibrillation or atrial flutter",
            "sourceType": "medication",
            "targetType": "diagnostic_result",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_50adb265ee7e4d89; daq_84f9a5f91c96aaf5; daq_f9fc480b74597183"
          },
          {
            "source": "medication|apixaban",
            "target": "disease_condition_syndrome|atrial fibrillation",
            "sourceLabel": "apixaban",
            "targetLabel": "Atrial fibrillation",
            "sourceType": "medication",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_50adb265ee7e4d89; daq_84f9a5f91c96aaf5; daq_f9fc480b74597183"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "lab_test|sodium, serum",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Sodium, serum",
            "sourceType": "etiology_factor",
            "targetType": "lab_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_9c39ba2a9f2c756e; daq_dbb167ff5cfc8533"
          },
          {
            "source": "diagnostic_test|biopsy",
            "target": "diagnostic_result|no acute abnormality / normal study",
            "sourceLabel": "Biopsy",
            "targetLabel": "No acute abnormality / normal study",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_result",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_028977e8b8c27b23; daq_1fa8a227b8d9ab90; daq_473be194d9531f66; daq_964485f229f11947"
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "physical_exam_symptom|crackles",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "Crackles",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_580b970da47a48f1; daq_746068ac57c9fe89; daq_d979469d673428e0; daq_f5a13b202b3327ad"
          },
          {
            "source": "etiology_factor|healthcare exposure",
            "target": "medication|apixaban",
            "sourceLabel": "Healthcare exposure",
            "targetLabel": "apixaban",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_7025354bfeae2dba; daq_b128f5ca2240f8df; daq_b489f3cf66a2301a; daq_f735488d4343f60a"
          },
          {
            "source": "medication|aspirin",
            "target": "diagnostic_result|normal / no diagnostic abnormality identified",
            "sourceLabel": "aspirin",
            "targetLabel": "Normal / no diagnostic abnormality identified",
            "sourceType": "medication",
            "targetType": "diagnostic_result",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_3a7f0dbddb630a03; daq_4c666c4f10bc98cf; daq_84f9a5f91c96aaf5; daq_ba8e979311a806db"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "Tobacco smoking",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_032789239ff6329f; daq_741655b7ae125734; daq_884a8018f917a1df; daq_b8d6757b4ad7db96"
          },
          {
            "source": "medication|isoniazid",
            "target": "imaging_test|chest radiograph",
            "sourceLabel": "isoniazid",
            "targetLabel": "Chest radiograph",
            "sourceType": "medication",
            "targetType": "imaging_test",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_6c1fc32e2860acb6; daq_6fac88ea291b1b2d; daq_8d425392ddbcc0b5; daq_dc999c4e5c775a65"
          },
          {
            "source": "medication|empagliflozin",
            "target": "medication|metformin",
            "sourceLabel": "empagliflozin",
            "targetLabel": "metformin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0c02a7d778f6e59c; daq_2d2e7ca8ae9f84a9; daq_3b683abe1f9917f4; daq_90116d8e4a740aba"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "physical_exam_symptom|cough",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "Cough",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_032789239ff6329f; daq_741655b7ae125734; daq_884a8018f917a1df; daq_e5d35ad5c28116e8"
          },
          {
            "source": "diagnostic_test|12-lead electrocardiogram",
            "target": "medication|atorvastatin",
            "sourceLabel": "12-lead electrocardiogram",
            "targetLabel": "atorvastatin",
            "sourceType": "diagnostic_test",
            "targetType": "medication",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0edaeef839a625d9; daq_2b6f05ede6eb9365; daq_58b59cf72f8361d7; daq_63da69dbf0b95bf0"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Tobacco smoking",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_8f1f698a8e25c8a2"
          },
          {
            "source": "diagnostic_test|12-lead electrocardiogram",
            "target": "etiology_factor|hypertension",
            "sourceLabel": "12-lead electrocardiogram",
            "targetLabel": "Hypertension",
            "sourceType": "diagnostic_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_0edaeef839a625d9; daq_2b6f05ede6eb9365; daq_58b59cf72f8361d7; daq_69c9129bd83ca38c"
          },
          {
            "source": "medication|levothyroxine",
            "target": "disease_condition_syndrome|hypothyroidism",
            "sourceLabel": "levothyroxine",
            "targetLabel": "Hypothyroidism",
            "sourceType": "medication",
            "targetType": "disease_condition_syndrome",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_59d4369cb6c1cf2a; daq_7d4196d988edb5b0; daq_951ff7f593b88611; daq_f29791b52bf69d56"
          },
          {
            "source": "imaging_test|transthoracic echocardiography",
            "target": "etiology_factor|pregnancy",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "Pregnancy",
            "sourceType": "imaging_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_151a4838d48545aa; daq_6a5921406e28f038; daq_91bfb4f211ccb4ba; daq_c6653ca6aa3cf440"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "physical_exam_symptom|cough",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "Cough",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_21cc6e4ead0529f6; daq_40320130777150d2; daq_7fa7619374046675; daq_8f1f698a8e25c8a2"
          },
          {
            "source": "medication|prednisone",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "prednisone",
            "targetLabel": "Tobacco smoking",
            "sourceType": "medication",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_032789239ff6329f; daq_741655b7ae125734; daq_884a8018f917a1df; daq_b8d6757b4ad7db96"
          },
          {
            "source": "imaging_test|mri",
            "target": "physical_exam_symptom|hypertension",
            "sourceLabel": "MRI",
            "targetLabel": "Hypertension",
            "sourceType": "imaging_test",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_3ebc2f0d915e7937; daq_cba695b70313bd7c; daq_d5a56f0db754a6bc; daq_eb9d38dcd7a21db7"
          },
          {
            "source": "medication|prednisone",
            "target": "physical_exam_symptom|cough",
            "sourceLabel": "prednisone",
            "targetLabel": "Cough",
            "sourceType": "medication",
            "targetType": "physical_exam_symptom",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_032789239ff6329f; daq_741655b7ae125734; daq_884a8018f917a1df; daq_e5d35ad5c28116e8"
          },
          {
            "source": "imaging_test|transthoracic echocardiography",
            "target": "etiology_factor|tobacco smoking",
            "sourceLabel": "Transthoracic echocardiography",
            "targetLabel": "Tobacco smoking",
            "sourceType": "imaging_test",
            "targetType": "etiology_factor",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_151a4838d48545aa; daq_6a5921406e28f038; daq_91bfb4f211ccb4ba; daq_c6653ca6aa3cf440"
          },
          {
            "source": "medication|aspirin",
            "target": "diagnostic_result|no acute abnormality / normal study",
            "sourceLabel": "aspirin",
            "targetLabel": "No acute abnormality / normal study",
            "sourceType": "medication",
            "targetType": "diagnostic_result",
            "layer": "correct_answer_to_stem_clue",
            "weight": 4,
            "questions": "daq_3a7f0dbddb630a03; daq_4c666c4f10bc98cf; daq_84f9a5f91c96aaf5; daq_ba8e979311a806db"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "medication|prednisone",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "prednisone",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 78,
            "questions": "daq_032789239ff6329f; daq_050112368d1c13f2; daq_07ea19396fe67c43; daq_0f19c6ed3d2cc21d; daq_158ecf4b30256056; daq_18cf1db22524f9ec; daq_1b4..."
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "medication|furosemide",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "furosemide",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 36,
            "questions": "daq_081072adaca9b19a; daq_0a5f88eed767642f; daq_1d4e78d1b5e7a2d7; daq_21cc6e4ead0529f6; daq_32d1549186449288; daq_462dee2b77b71ae7; daq_469..."
          },
          {
            "source": "disease_condition_syndrome|esophagitis (candida, herpes simplex virus, cytomegalovirus)",
            "target": "disease_condition_syndrome|infectious esophagitis (candida, herpes simplex virus, cytomegalovirus)",
            "sourceLabel": "Esophagitis (Candida, herpes simplex virus, cytomegalovirus)",
            "targetLabel": "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus)",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 25,
            "questions": "daq_031a80f41c90a734; daq_04af9c4984094b4a; daq_0ae19c12095b9f59; daq_159c2c90abe27db7; daq_181ffeec1daf2519; daq_258839d6b8bc08d0; daq_274..."
          },
          {
            "source": "medication|methylprednisolone",
            "target": "medication|prednisone",
            "sourceLabel": "methylprednisolone",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 22,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|hydrocortisone",
            "target": "medication|prednisone",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 22,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|hydrocortisone",
            "target": "medication|mifepristone",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "mifepristone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|dexamethasone",
            "target": "medication|methylprednisolone",
            "sourceLabel": "dexamethasone",
            "targetLabel": "methylprednisolone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|methylprednisolone",
            "target": "medication|mifepristone",
            "sourceLabel": "methylprednisolone",
            "targetLabel": "mifepristone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|dexamethasone",
            "target": "medication|hydrocortisone",
            "sourceLabel": "dexamethasone",
            "targetLabel": "hydrocortisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|dexamethasone",
            "target": "medication|prednisone",
            "sourceLabel": "dexamethasone",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|hydrocortisone",
            "target": "medication|methylprednisolone",
            "sourceLabel": "hydrocortisone",
            "targetLabel": "methylprednisolone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|mifepristone",
            "target": "medication|prednisone",
            "sourceLabel": "mifepristone",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "medication|dexamethasone",
            "target": "medication|mifepristone",
            "sourceLabel": "dexamethasone",
            "targetLabel": "mifepristone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 21,
            "questions": "daq_12c06857c2bb46c0; daq_18d8ca9f1ff7b3a3; daq_2534cf2441044fc0; daq_361737e13874c669; daq_6344af2e17fb53d0; daq_73ad330be1ac2bd9; daq_781..."
          },
          {
            "source": "etiology_factor|immunosuppression",
            "target": "etiology_factor|ionizing radiation exposure",
            "sourceLabel": "Immunosuppression",
            "targetLabel": "Ionizing radiation exposure",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 18,
            "questions": "daq_1048926e3f1e63bc; daq_1418e224f2be2238; daq_3333decffee7d1a9; daq_52635b0957ea82e2; daq_583bdfb4ee69d5a1; daq_5efeb54f89a61b27; daq_5f1..."
          },
          {
            "source": "diagnostic_test|liver biopsy",
            "target": "intervention|percutaneous liver biopsy",
            "sourceLabel": "Liver biopsy",
            "targetLabel": "Percutaneous liver biopsy",
            "sourceType": "diagnostic_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 17,
            "questions": "daq_21c0e3c0285adf71; daq_21f892f2aef94777; daq_3c310e5dfa0214cd; daq_4522adf541191f21; daq_486773b74c0b7b6c; daq_4fa2ad918e00b01e; daq_544..."
          },
          {
            "source": "etiology_factor|thiazide or loop diuretic exposure",
            "target": "medication|hydrochlorothiazide",
            "sourceLabel": "Thiazide or loop diuretic exposure",
            "targetLabel": "hydrochlorothiazide",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 16,
            "questions": "daq_0c319ff31eea070c; daq_271fbacc599ba54e; daq_3dd86ea220d6327e; daq_639a1f7e46cf3611; daq_64bbc5940d42bce5; daq_6bc2ee6ee0d81968; daq_6f3..."
          },
          {
            "source": "diagnostic_test|lumbar puncture / csf analysis",
            "target": "intervention|lumbar puncture",
            "sourceLabel": "Lumbar puncture / CSF analysis",
            "targetLabel": "Lumbar puncture",
            "sourceType": "diagnostic_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 15,
            "questions": "daq_0f55af63e9773de9; daq_0f672996613a8451; daq_113821cbc9e8b281; daq_1782fefd55702aa8; daq_2f9a985dbd3c2da4; daq_47d9671c8267ef4d; daq_53a..."
          },
          {
            "source": "diagnostic_test|renal biopsy",
            "target": "intervention|kidney biopsy",
            "sourceLabel": "Renal biopsy",
            "targetLabel": "Kidney biopsy",
            "sourceType": "diagnostic_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 15,
            "questions": "daq_0ed4eb70520c1207; daq_1e798f5a448bb3e2; daq_2391a08d5baa8a7a; daq_2d6c25bd15fe0e2e; daq_34287582f4a002d4; daq_3db2efc56d8f44bf; daq_4c9..."
          },
          {
            "source": "diagnostic_result|degenerative osteoarthritis changes",
            "target": "disease_condition_syndrome|osteoarthritis",
            "sourceLabel": "Degenerative osteoarthritis changes",
            "targetLabel": "Osteoarthritis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 15,
            "questions": "daq_5d53a2049ed82146; daq_5fe71eaffbd28177; daq_76fa2277fd5d34ad; daq_7ab8cf6ef9723f57; daq_b6501057c3db3b7d; daq_b656dda63d4ec91b; daq_b93..."
          },
          {
            "source": "medication|azithromycin",
            "target": "medication|ceftriaxone",
            "sourceLabel": "azithromycin",
            "targetLabel": "ceftriaxone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 15,
            "questions": "daq_1a4271f77c3dd94b; daq_1e37adb0578d3802; daq_21cc6e4ead0529f6; daq_285c75075e056b85; daq_394e36a3132dd9d0; daq_3c3041fb6753bd12; daq_403..."
          },
          {
            "source": "diagnostic_result|pneumonia reported in imaging impression",
            "target": "etiology_factor|coccidioides species",
            "sourceLabel": "Pneumonia reported in imaging impression",
            "targetLabel": "Coccidioides species",
            "sourceType": "diagnostic_result",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 13,
            "questions": "daq_0f437d7c69b09abc; daq_15b971866703bdb9; daq_23b6dbd65ba13908; daq_404f4e0531810db9; daq_7a2a54f8e78e2e24; daq_7e10d7c7354ef4bd; daq_893..."
          },
          {
            "source": "diagnostic_result|pneumonia reported in imaging impression",
            "target": "disease_condition_syndrome|pneumonia",
            "sourceLabel": "Pneumonia reported in imaging impression",
            "targetLabel": "Pneumonia",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 13,
            "questions": "daq_0f437d7c69b09abc; daq_15b971866703bdb9; daq_23b6dbd65ba13908; daq_404f4e0531810db9; daq_7a2a54f8e78e2e24; daq_7e10d7c7354ef4bd; daq_893..."
          },
          {
            "source": "disease_condition_syndrome|pneumonia",
            "target": "etiology_factor|coccidioides species",
            "sourceLabel": "Pneumonia",
            "targetLabel": "Coccidioides species",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 13,
            "questions": "daq_0f437d7c69b09abc; daq_15b971866703bdb9; daq_23b6dbd65ba13908; daq_404f4e0531810db9; daq_7a2a54f8e78e2e24; daq_7e10d7c7354ef4bd; daq_893..."
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|doxycycline",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "doxycycline",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 13,
            "questions": "daq_371760b1b3512cb6; daq_3c3041fb6753bd12; daq_45a0c1123750da92; daq_4e11a5034a4bb2c2; daq_6f38cad632b802e0; daq_757a00f975f7bb84; daq_93d..."
          },
          {
            "source": "diagnostic_result|pulmonary embolism / pulmonary arterial filling defect",
            "target": "disease_condition_syndrome|pulmonary embolism",
            "sourceLabel": "Pulmonary embolism / pulmonary arterial filling defect",
            "targetLabel": "Pulmonary embolism",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 13,
            "questions": "daq_04cdee0e966a0404; daq_080c3bfbcc6b44d0; daq_19d9b35beae0751e; daq_31567267c3c92953; daq_7824b00ee3202912; daq_928de32207f4764b; daq_a7c..."
          },
          {
            "source": "diagnostic_result|atrial fibrillation or atrial flutter",
            "target": "disease_condition_syndrome|atrial fibrillation",
            "sourceLabel": "Atrial fibrillation or atrial flutter",
            "targetLabel": "Atrial fibrillation",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 13,
            "questions": "daq_081072adaca9b19a; daq_2ad45d32a2ce9f4f; daq_34d6dd1763a28a0c; daq_4f934e9fb9e9a307; daq_a41ca4e6c5148ebf; daq_ba8e979311a806db; daq_bd7..."
          },
          {
            "source": "diagnostic_result|aspiration on swallow study",
            "target": "diagnostic_result|aspiration pattern / dependent opacities",
            "sourceLabel": "Aspiration on swallow study",
            "targetLabel": "Aspiration pattern / dependent opacities",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_result",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 12,
            "questions": "daq_0bc634ff067d096f; daq_1fa8a227b8d9ab90; daq_3295ac5e90b5384b; daq_3921db57709822b0; daq_395df1bcc8acb2ac; daq_4e207db3450266b1; daq_526..."
          },
          {
            "source": "medication|cefepime",
            "target": "medication|vancomycin",
            "sourceLabel": "cefepime",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 12,
            "questions": "daq_2618a15df218bf63; daq_285c75075e056b85; daq_40320130777150d2; daq_422331324882529d; daq_6eca94ecb3f7d736; daq_73b79cf65ce0f065; daq_7e5..."
          },
          {
            "source": "medication|methotrexate",
            "target": "medication|prednisone",
            "sourceLabel": "methotrexate",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 11,
            "questions": "daq_1b9fbef511131d47; daq_2e6fbba627280316; daq_714362a51ed0bfac; daq_74517c38b9492a91; daq_7506c4335c4cf2eb; daq_792b8020c99d869a; daq_8f0..."
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|vancomycin",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 11,
            "questions": "daq_2618a15df218bf63; daq_285c75075e056b85; daq_394e36a3132dd9d0; daq_40320130777150d2; daq_4be6010b06b4f342; daq_6eca94ecb3f7d736; daq_7fa..."
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|ciprofloxacin",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "ciprofloxacin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 11,
            "questions": "daq_036940afd0f41cbd; daq_1e37adb0578d3802; daq_37002f9722d4ae64; daq_45a0c1123750da92; daq_4870718405bab9b1; daq_4f522fdfaa9a6ffe; daq_730..."
          },
          {
            "source": "medication|aspirin",
            "target": "medication|clopidogrel",
            "sourceLabel": "aspirin",
            "targetLabel": "clopidogrel",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 10,
            "questions": "daq_078aa446a3fa82f9; daq_3dd25f1129c79936; daq_4b30962757b4eb19; daq_74cfdbe6a9322073; daq_84f9a5f91c96aaf5; daq_951a633adb3efaeb; daq_c1f..."
          },
          {
            "source": "medication|apixaban",
            "target": "medication|aspirin",
            "sourceLabel": "apixaban",
            "targetLabel": "aspirin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 10,
            "questions": "daq_050d885973e15e10; daq_0ac46ebcc37719aa; daq_3a54c74cac25cfbd; daq_50adb265ee7e4d89; daq_65a53e075473a432; daq_74cfdbe6a9322073; daq_84f..."
          },
          {
            "source": "disease_condition_syndrome|esophagitis (candida, herpes simplex virus, cytomegalovirus)",
            "target": "etiology_factor|cytomegalovirus",
            "sourceLabel": "Esophagitis (Candida, herpes simplex virus, cytomegalovirus)",
            "targetLabel": "Cytomegalovirus",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_181ffeec1daf2519; daq_4dfce7265d00c66e; daq_58a83a9d23dcd681; daq_77df468011c5026e; daq_a6d09b40a8b86448; daq_ac9e751e1aa38e21; daq_e2b..."
          },
          {
            "source": "disease_condition_syndrome|infectious esophagitis (candida, herpes simplex virus, cytomegalovirus)",
            "target": "etiology_factor|cytomegalovirus",
            "sourceLabel": "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus)",
            "targetLabel": "Cytomegalovirus",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_181ffeec1daf2519; daq_4dfce7265d00c66e; daq_58a83a9d23dcd681; daq_77df468011c5026e; daq_a6d09b40a8b86448; daq_ac9e751e1aa38e21; daq_e2b..."
          },
          {
            "source": "etiology_factor|human immunodeficiency virus",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "Human immunodeficiency virus",
            "targetLabel": "Immunosuppression",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_089e5afa4be4bbff; daq_0ae19c12095b9f59; daq_1ce351349bc990aa; daq_208dc81ff024a169; daq_258839d6b8bc08d0; daq_c064601a8a851e63; daq_ca0..."
          },
          {
            "source": "etiology_factor|high-risk sexual exposure",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "High-risk sexual exposure",
            "targetLabel": "Immunosuppression",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_089e5afa4be4bbff; daq_0ae19c12095b9f59; daq_1ce351349bc990aa; daq_208dc81ff024a169; daq_258839d6b8bc08d0; daq_c064601a8a851e63; daq_ca0..."
          },
          {
            "source": "etiology_factor|high-risk sexual exposure",
            "target": "etiology_factor|human immunodeficiency virus",
            "sourceLabel": "High-risk sexual exposure",
            "targetLabel": "Human immunodeficiency virus",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_089e5afa4be4bbff; daq_0ae19c12095b9f59; daq_1ce351349bc990aa; daq_208dc81ff024a169; daq_258839d6b8bc08d0; daq_c064601a8a851e63; daq_ca0..."
          },
          {
            "source": "disease_condition_syndrome|cellular immunodeficiency other than human immunodeficiency virus (hiv) infection",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "Cellular immunodeficiency other than human immunodeficiency virus (HIV) infection",
            "targetLabel": "Immunosuppression",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_089e5afa4be4bbff; daq_0ae19c12095b9f59; daq_1ce351349bc990aa; daq_208dc81ff024a169; daq_258839d6b8bc08d0; daq_c064601a8a851e63; daq_ca0..."
          },
          {
            "source": "disease_condition_syndrome|cellular immunodeficiency other than human immunodeficiency virus (hiv) infection",
            "target": "etiology_factor|human immunodeficiency virus",
            "sourceLabel": "Cellular immunodeficiency other than human immunodeficiency virus (HIV) infection",
            "targetLabel": "Human immunodeficiency virus",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_089e5afa4be4bbff; daq_0ae19c12095b9f59; daq_1ce351349bc990aa; daq_208dc81ff024a169; daq_258839d6b8bc08d0; daq_c064601a8a851e63; daq_ca0..."
          },
          {
            "source": "disease_condition_syndrome|cellular immunodeficiency other than human immunodeficiency virus (hiv) infection",
            "target": "etiology_factor|high-risk sexual exposure",
            "sourceLabel": "Cellular immunodeficiency other than human immunodeficiency virus (HIV) infection",
            "targetLabel": "High-risk sexual exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_089e5afa4be4bbff; daq_0ae19c12095b9f59; daq_1ce351349bc990aa; daq_208dc81ff024a169; daq_258839d6b8bc08d0; daq_c064601a8a851e63; daq_ca0..."
          },
          {
            "source": "etiology_factor|antibiotic exposure",
            "target": "medication|clindamycin",
            "sourceLabel": "Antibiotic exposure",
            "targetLabel": "clindamycin",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_394e36a3132dd9d0; daq_6bec58d1568ada7c; daq_6ed519aa7207f130; daq_748176a201b557c7; daq_8cd225d336a88563; daq_93db5fd2de6033c2; daq_dd4..."
          },
          {
            "source": "etiology_factor|healthcare exposure",
            "target": "intervention|ablation",
            "sourceLabel": "Healthcare exposure",
            "targetLabel": "ablation",
            "sourceType": "etiology_factor",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_081072adaca9b19a; daq_5177197976340cd1; daq_7025354bfeae2dba; daq_851041c95c329ba6; daq_b489f3cf66a2301a; daq_ba8e979311a806db; daq_bef..."
          },
          {
            "source": "medication|apixaban",
            "target": "medication|warfarin",
            "sourceLabel": "apixaban",
            "targetLabel": "warfarin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_050d885973e15e10; daq_3a54c74cac25cfbd; daq_4584e520367352a6; daq_9101246e5f081f47; daq_ae774774e45693eb; daq_d219f998b68ff774; daq_d64..."
          },
          {
            "source": "disease_condition_syndrome|dementia",
            "target": "disease_condition_syndrome|dementia in the elderly",
            "sourceLabel": "Dementia",
            "targetLabel": "Dementia in the elderly",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_0b05f13769490243; daq_16d63ace975a05f1; daq_185ad58f459ebf7f; daq_21fb794a2fcebe25; daq_31e1096bc34486be; daq_4908fcfacb6f5a8a; daq_5ce..."
          },
          {
            "source": "diagnostic_result|gout urate deposition / erosions",
            "target": "etiology_factor|high-purine diet",
            "sourceLabel": "Gout urate deposition / erosions",
            "targetLabel": "High-purine diet",
            "sourceType": "diagnostic_result",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_37bf6421f1b37828; daq_8033295b73e0ac96; daq_9a2f56fd133ab4e8; daq_a4e8227a8b76e8d6; daq_b656dda63d4ec91b; daq_c4310fe0329cd40b; daq_df6..."
          },
          {
            "source": "diagnostic_result|acute interstitial nephritis",
            "target": "diagnostic_result|acute tubular injury / acute tubular necrosis",
            "sourceLabel": "Acute interstitial nephritis",
            "targetLabel": "Acute tubular injury / acute tubular necrosis",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_result",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_5d62735d31366918; daq_95d837c165d04f3e; daq_ae86904aed7abe7f; daq_b8df7220e6c27076; daq_bfe614d364855ab0; daq_cd571d66e08de909; daq_e43..."
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "medication|methotrexate",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "methotrexate",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 9,
            "questions": "daq_1b9fbef511131d47; daq_2e6fbba627280316; daq_714362a51ed0bfac; daq_74517c38b9492a91; daq_7506c4335c4cf2eb; daq_792b8020c99d869a; daq_8f0..."
          },
          {
            "source": "diagnostic_test|diagnostic bronchoscopy",
            "target": "intervention|therapeutic bronchoscopy",
            "sourceLabel": "Diagnostic bronchoscopy",
            "targetLabel": "Therapeutic bronchoscopy",
            "sourceType": "diagnostic_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_1a4271f77c3dd94b; daq_473be194d9531f66; daq_87c8ce7f8ad391dd; daq_980f9c93c86e87fc; daq_9a69278da72baea4; daq_a09199e2787bbd51; daq_b38..."
          },
          {
            "source": "intervention|diagnostic bronchoscopy",
            "target": "intervention|therapeutic bronchoscopy",
            "sourceLabel": "Diagnostic bronchoscopy",
            "targetLabel": "Therapeutic bronchoscopy",
            "sourceType": "intervention",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_1a4271f77c3dd94b; daq_473be194d9531f66; daq_87c8ce7f8ad391dd; daq_980f9c93c86e87fc; daq_9a69278da72baea4; daq_a09199e2787bbd51; daq_b38..."
          },
          {
            "source": "diagnostic_result|aortic dissection / intramural hematoma",
            "target": "disease_condition_syndrome|aortic aneurysm and dissection",
            "sourceLabel": "Aortic dissection / intramural hematoma",
            "targetLabel": "Aortic aneurysm and dissection",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_30549cfd9ea34f40; daq_36982c5b7deb0f1c; daq_70762209094c9b1b; daq_7ab49ac3c827fffa; daq_9d2e158a328a682c; daq_a7c2d50cbd5fa1ec; daq_bbf..."
          },
          {
            "source": "diagnostic_result|acute interstitial nephritis",
            "target": "disease_condition_syndrome|allergic interstitial nephritis",
            "sourceLabel": "Acute interstitial nephritis",
            "targetLabel": "Allergic interstitial nephritis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_089e5afa4be4bbff; daq_5d62735d31366918; daq_95d837c165d04f3e; daq_ae86904aed7abe7f; daq_bfe614d364855ab0; daq_e4369c87e34a26f9; daq_fd6..."
          },
          {
            "source": "diagnostic_test|diagnostic bronchoscopy",
            "target": "intervention|diagnostic bronchoscopy",
            "sourceLabel": "Diagnostic bronchoscopy",
            "targetLabel": "Diagnostic bronchoscopy",
            "sourceType": "diagnostic_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_1a4271f77c3dd94b; daq_473be194d9531f66; daq_87c8ce7f8ad391dd; daq_980f9c93c86e87fc; daq_9a69278da72baea4; daq_a09199e2787bbd51; daq_b38..."
          },
          {
            "source": "imaging_test|ct angiography",
            "target": "imaging_test|ultrasound",
            "sourceLabel": "CT angiography",
            "targetLabel": "Ultrasound",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_1e041e5c988b9a4b; daq_327728660c4414db; daq_54bb988fb356c942; daq_757a72b8e27bb01d; daq_9101246e5f081f47; daq_c299cae0105268bc; daq_d3c..."
          },
          {
            "source": "imaging_test|mri",
            "target": "imaging_test|radiography",
            "sourceLabel": "MRI",
            "targetLabel": "Radiography",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_0face82a86694f50; daq_113821cbc9e8b281; daq_2385653286a44cec; daq_2f211d2644d38c4d; daq_3f71a08f5799e50a; daq_739ff0f33162214d; daq_8b3..."
          },
          {
            "source": "diagnostic_test|diagnostic colonoscopy",
            "target": "diagnostic_test|diagnostic egd / upper endoscopy",
            "sourceLabel": "Diagnostic colonoscopy",
            "targetLabel": "Diagnostic EGD / upper endoscopy",
            "sourceType": "diagnostic_test",
            "targetType": "diagnostic_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_0c6847b80b55f561; daq_470414512e5710a4; daq_5761ba2f9d9cd8a1; daq_5f6b5ed51a210768; daq_cbd85a3f9f603488; daq_e1ca137f74800875; daq_f63..."
          },
          {
            "source": "medication|apixaban",
            "target": "medication|unfractionated heparin",
            "sourceLabel": "apixaban",
            "targetLabel": "unfractionated heparin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_220a455d72802af8; daq_74cfdbe6a9322073; daq_7ac0bfc9d9d5e918; daq_d219f998b68ff774; daq_d593b92e81a9b5dd; daq_d64d1a2f90216da0; daq_db0..."
          },
          {
            "source": "diagnostic_test|diagnostic egd / upper endoscopy",
            "target": "medication|omeprazole",
            "sourceLabel": "Diagnostic EGD / upper endoscopy",
            "targetLabel": "omeprazole",
            "sourceType": "diagnostic_test",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_2c71d626b1eb5c75; daq_6d62d29789067054; daq_7250ce259f82634f; daq_8088fd626d72872c; daq_8bc97515dd10ed31; daq_b65573ff899321e8; daq_e38..."
          },
          {
            "source": "diagnostic_result|bundle branch block",
            "target": "disease_condition_syndrome|right bundle branch block",
            "sourceLabel": "Bundle branch block",
            "targetLabel": "Right bundle branch block",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_011e28fb60f18351; daq_3e818360ad8a97cb; daq_8bea455022343804; daq_bd710dcbe2fc8527; daq_d04295eb42fe62d0; daq_d3a6801ddddeca99; daq_d50..."
          },
          {
            "source": "medication|aspirin",
            "target": "medication|warfarin",
            "sourceLabel": "aspirin",
            "targetLabel": "warfarin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_050d885973e15e10; daq_335c263d8839bd0c; daq_3a54c74cac25cfbd; daq_3dd25f1129c79936; daq_5558326e7d5642aa; daq_a403e49e3b6eaa46; daq_ae7..."
          },
          {
            "source": "disease_condition_syndrome|age-related macular degeneration",
            "target": "disease_condition_syndrome|macular degeneration",
            "sourceLabel": "Age-related macular degeneration",
            "targetLabel": "Macular degeneration",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_3254a2352b85468e; daq_42779ce4391fb2fd; daq_58a83a9d23dcd681; daq_831cb154abd8d9ae; daq_91198ffee750008e; daq_b8a1ed0b4df39fbf; daq_e79..."
          },
          {
            "source": "medication|naproxen",
            "target": "medication|prednisone",
            "sourceLabel": "naproxen",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 8,
            "questions": "daq_1ce5dd9eea4f53dc; daq_2e6fbba627280316; daq_714362a51ed0bfac; daq_73ad330be1ac2bd9; daq_90380a733d3cdfbf; daq_b5bee9bb7956ab7b; daq_e75..."
          },
          {
            "source": "diagnostic_result|acute tubular injury / acute tubular necrosis",
            "target": "disease_condition_syndrome|allergic interstitial nephritis",
            "sourceLabel": "Acute tubular injury / acute tubular necrosis",
            "targetLabel": "Allergic interstitial nephritis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_5d62735d31366918; daq_95d837c165d04f3e; daq_ae86904aed7abe7f; daq_bfe614d364855ab0; daq_e4369c87e34a26f9; daq_fd67e81108cdd147; daq_ff0..."
          },
          {
            "source": "diagnostic_result|pneumothorax",
            "target": "disease_condition_syndrome|pneumothorax",
            "sourceLabel": "Pneumothorax",
            "targetLabel": "Pneumothorax",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_0aecc6b1e3b82591; daq_30549cfd9ea34f40; daq_31ca48b1b732322d; daq_790ed0e74788b0d7; daq_7a2a54f8e78e2e24; daq_d54d19c451017218; daq_ee9..."
          },
          {
            "source": "imaging_test|mri",
            "target": "medication|dexamethasone",
            "sourceLabel": "MRI",
            "targetLabel": "dexamethasone",
            "sourceType": "imaging_test",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_186deda73911e7b2; daq_2a4aa0c820cf8f0a; daq_67c46aece1b55c5c; daq_8d18f15af2aeac5b; daq_912385d5c66c247f; daq_97aca080481cae00; daq_cba..."
          },
          {
            "source": "medication|ciprofloxacin",
            "target": "medication|trimethoprim/sulfamethoxazole",
            "sourceLabel": "ciprofloxacin",
            "targetLabel": "trimethoprim/sulfamethoxazole",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_1c82442e143e4ca7; daq_37002f9722d4ae64; daq_3b61efec803be3be; daq_4870718405bab9b1; daq_8c5a13093a99cbbf; daq_df7aa6b9a31acd51; daq_ed7..."
          },
          {
            "source": "diagnostic_result|lymphoma on tissue or marrow pathology",
            "target": "diagnostic_result|lymphoma staging / fdg-avid nodal disease",
            "sourceLabel": "Lymphoma on tissue or marrow pathology",
            "targetLabel": "Lymphoma staging / FDG-avid nodal disease",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_result",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_0750a12bf729b63b; daq_1c321e4acb27c2e6; daq_21d95c8a379b4e36; daq_3af67b0389f553bf; daq_7dad5216511bf435; daq_bcb343947fcb7890; daq_fb9..."
          },
          {
            "source": "etiology_factor|asbestos exposure",
            "target": "etiology_factor|radon exposure",
            "sourceLabel": "Asbestos exposure",
            "targetLabel": "Radon exposure",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_58f6728cc36c8634; daq_716a73a703e3a746; daq_7a95c9e71221c5a2; daq_94ec5854555934ec; daq_d08d5f602d19d7a2; daq_f44280ef6067b74f; daq_fdd..."
          },
          {
            "source": "medication|metronidazole",
            "target": "medication|vancomycin",
            "sourceLabel": "metronidazole",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_137d4e9269f8a100; daq_394e36a3132dd9d0; daq_40320130777150d2; daq_4beaa6e48afafabd; daq_93db5fd2de6033c2; daq_ab8e6856e335de9b; daq_e3f..."
          },
          {
            "source": "disease_condition_syndrome|seborrheic keratosis",
            "target": "physical_exam_symptom|seborrheic keratosis",
            "sourceLabel": "Seborrheic keratosis",
            "targetLabel": "Seborrheic keratosis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "physical_exam_symptom",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_079cc131be23b4eb; daq_2fc77e607734b9ec; daq_308132e1fdf3ce70; daq_4fe75cc02a59864b; daq_aa06f6360b09b3e1; daq_d2ddb0f9ddbd3ae4; daq_e6f..."
          },
          {
            "source": "imaging_test|mri",
            "target": "medication|prednisone",
            "sourceLabel": "MRI",
            "targetLabel": "prednisone",
            "sourceType": "imaging_test",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_4af71e8543ced1bb; daq_5cb2ffaa050c858c; daq_8d18f15af2aeac5b; daq_912385d5c66c247f; daq_97aca080481cae00; daq_ba467ef5e9ccc710; daq_cba..."
          },
          {
            "source": "disease_condition_syndrome|undifferentiated lung cancer",
            "target": "etiology_factor|radon exposure",
            "sourceLabel": "Undifferentiated lung cancer",
            "targetLabel": "Radon exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_58f6728cc36c8634; daq_716a73a703e3a746; daq_7a95c9e71221c5a2; daq_94ec5854555934ec; daq_d08d5f602d19d7a2; daq_f44280ef6067b74f; daq_fdd..."
          },
          {
            "source": "disease_condition_syndrome|undifferentiated lung cancer",
            "target": "etiology_factor|asbestos exposure",
            "sourceLabel": "Undifferentiated lung cancer",
            "targetLabel": "Asbestos exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_58f6728cc36c8634; daq_716a73a703e3a746; daq_7a95c9e71221c5a2; daq_94ec5854555934ec; daq_d08d5f602d19d7a2; daq_f44280ef6067b74f; daq_fdd..."
          },
          {
            "source": "diagnostic_test|pericardiocentesis / pericardial fluid analysis",
            "target": "intervention|pericardiocentesis",
            "sourceLabel": "Pericardiocentesis / pericardial fluid analysis",
            "targetLabel": "Pericardiocentesis",
            "sourceType": "diagnostic_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_01f081c7a4031f2c; daq_2bf24fc397d0762f; daq_4d04b5a6a74e7518; daq_860c0915169c09db; daq_b6056b60e0fe0595; daq_d31890b9639c57e0; daq_f75..."
          },
          {
            "source": "diagnostic_test|lumbar puncture / csf analysis",
            "target": "imaging_test|mri",
            "sourceLabel": "Lumbar puncture / CSF analysis",
            "targetLabel": "MRI",
            "sourceType": "diagnostic_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_113821cbc9e8b281; daq_1782fefd55702aa8; daq_53ac35416738eb53; daq_90952fce0ad5883b; daq_d4017a60cb373218; daq_e46c5983c2f18d22; daq_eb9..."
          },
          {
            "source": "imaging_test|mri",
            "target": "imaging_test|ultrasound",
            "sourceLabel": "MRI",
            "targetLabel": "Ultrasound",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_03f4279d5881a7d4; daq_0face82a86694f50; daq_183e60c5d07208dd; daq_870334c586458e8b; daq_890a9fc60f33760a; daq_9872dbc800aead9f; daq_b84..."
          },
          {
            "source": "lab_test|aldosterone, plasma",
            "target": "lab_test|metanephrines, fractionated, plasma/urine",
            "sourceLabel": "Aldosterone, plasma",
            "targetLabel": "Metanephrines, fractionated, plasma/urine",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 7,
            "questions": "daq_00fd8b19e7e870f1; daq_26ec793100e0a3a9; daq_271fbacc599ba54e; daq_63a3c82dfe306d3d; daq_e4e75b662a805374; daq_f14de6f7449bf041; daq_ff7..."
          },
          {
            "source": "diagnostic_result|pleural effusion",
            "target": "disease_condition_syndrome|noninfectious pleural effusion",
            "sourceLabel": "Pleural effusion",
            "targetLabel": "Noninfectious pleural effusion",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_31ca48b1b732322d; daq_790ed0e74788b0d7; daq_7a2a54f8e78e2e24; daq_7c2e6545eba14f4e; daq_893b2212a954bef0; daq_e8f47ad219c3710f"
          },
          {
            "source": "imaging_test|mri",
            "target": "imaging_test|plain radiography",
            "sourceLabel": "MRI",
            "targetLabel": "Plain radiography",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_03f4279d5881a7d4; daq_29922119524d2185; daq_4e207db3450266b1; daq_9872dbc800aead9f; daq_d5a56f0db754a6bc; daq_ea948600f58fef7b"
          },
          {
            "source": "diagnostic_result|plasma cell neoplasm / multiple myeloma marrow involvement",
            "target": "disease_condition_syndrome|plasma cell disorder",
            "sourceLabel": "Plasma cell neoplasm / multiple myeloma marrow involvement",
            "targetLabel": "Plasma cell disorder",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_0f5bc2cf6be3f22c; daq_93310f37a8666be9; daq_bcb343947fcb7890; daq_bcdcf21ab92f4e06; daq_ec370a8cb5bdb2a7; daq_fdc61858ad71f2fb"
          },
          {
            "source": "diagnostic_result|valvular regurgitation",
            "target": "diagnostic_result|valvular stenosis",
            "sourceLabel": "Valvular regurgitation",
            "targetLabel": "Valvular stenosis",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_result",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_082bae9b8f326320; daq_6302262b8b23c0e2; daq_7d02ab95962507da; daq_89db90c010577fb0; daq_b34846d2a49f6c85; daq_c10dbb2fe9cddbf8"
          },
          {
            "source": "diagnostic_result|acute interstitial nephritis",
            "target": "disease_condition_syndrome|lupus nephritis and glomerulonephritis",
            "sourceLabel": "Acute interstitial nephritis",
            "targetLabel": "Lupus nephritis and glomerulonephritis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_ae86904aed7abe7f; daq_b8df7220e6c27076; daq_cd571d66e08de909; daq_ecb2faa0d6f38378; daq_fd67e81108cdd147; daq_ff0adaa514f9949e"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|metronidazole",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "metronidazole",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_37002f9722d4ae64; daq_394e36a3132dd9d0; daq_40320130777150d2; daq_93db5fd2de6033c2; daq_9bc5906d428eefb3; daq_a1d8fb444c9556e3"
          },
          {
            "source": "diagnostic_result|pancreatitis / necrosis / peripancreatic collection",
            "target": "disease_condition_syndrome|acute pancreatitis",
            "sourceLabel": "Pancreatitis / necrosis / peripancreatic collection",
            "targetLabel": "Acute pancreatitis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_27afac167fb51c13; daq_4995af4b384d96f8; daq_7e028947b23b7be4; daq_c3a335adc15d6508; daq_d6f3ae32b871315c; daq_f0bb85bba4f4b8f2"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|trimethoprim/sulfamethoxazole",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "trimethoprim/sulfamethoxazole",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_2618a15df218bf63; daq_37002f9722d4ae64; daq_4870718405bab9b1; daq_9dbdd61ba42b05f4; daq_ace69ab5074c3a2f; daq_df7aa6b9a31acd51"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "medication|naproxen",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "naproxen",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_1ce5dd9eea4f53dc; daq_2e6fbba627280316; daq_714362a51ed0bfac; daq_b5bee9bb7956ab7b; daq_e75eef6e65527a85; daq_f2a308658c3d7469"
          },
          {
            "source": "medication|ciprofloxacin",
            "target": "medication|nitrofurantoin",
            "sourceLabel": "ciprofloxacin",
            "targetLabel": "nitrofurantoin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_20fd06df8fda68bb; daq_4870718405bab9b1; daq_9aa4e30ca929cb2d; daq_df7aa6b9a31acd51; daq_ed7182d82c2cb968; daq_f3c94981e1697941"
          },
          {
            "source": "medication|rivaroxaban",
            "target": "medication|unfractionated heparin",
            "sourceLabel": "rivaroxaban",
            "targetLabel": "unfractionated heparin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_37df2a10e19565bb; daq_52c646350fb99ce3; daq_5e16bc79bc4a635c; daq_7ac0bfc9d9d5e918; daq_becd409a9272b0a8; daq_db001403b02ba22e"
          },
          {
            "source": "lab_test|thyroxine (t4), free",
            "target": "lab_test|thyroxine (t4), total",
            "sourceLabel": "Thyroxine (T4), free",
            "targetLabel": "Thyroxine (T4), total",
            "sourceType": "lab_test",
            "targetType": "lab_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_0666043d060514a4; daq_17262dd242eec2bf; daq_1f54bf4d791ed936; daq_5a6eb08f167b093f; daq_951ff7f593b88611; daq_d2c93bfb485c2d6a"
          },
          {
            "source": "medication|levothyroxine",
            "target": "medication|liothyronine",
            "sourceLabel": "levothyroxine",
            "targetLabel": "liothyronine",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_2b06ece0238f7909; daq_59d4369cb6c1cf2a; daq_951ff7f593b88611; daq_a39be4e6b3804d14; daq_ae866e0a5f9c75de; daq_f29791b52bf69d56"
          },
          {
            "source": "etiology_factor|glucocorticoid exposure",
            "target": "medication|roflumilast",
            "sourceLabel": "Glucocorticoid exposure",
            "targetLabel": "roflumilast",
            "sourceType": "etiology_factor",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_1bafd8a722daa8fa; daq_1fdfb6bbd64c1ac4; daq_29ff67292095cc9b; daq_640807086bfe909a; daq_884a8018f917a1df; daq_eed311ab2c26ad70"
          },
          {
            "source": "medication|prednisone",
            "target": "medication|roflumilast",
            "sourceLabel": "prednisone",
            "targetLabel": "roflumilast",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_1bafd8a722daa8fa; daq_1fdfb6bbd64c1ac4; daq_29ff67292095cc9b; daq_640807086bfe909a; daq_884a8018f917a1df; daq_eed311ab2c26ad70"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|dexamethasone",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "dexamethasone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_285c75075e056b85; daq_4be6010b06b4f342; daq_4f522fdfaa9a6ffe; daq_6eca94ecb3f7d736; daq_cbe297bb70293c3e; daq_e56132b0af356dff"
          },
          {
            "source": "diagnostic_result|giant cell arteritis on temporal artery biopsy",
            "target": "disease_condition_syndrome|large-vessel vasculitis",
            "sourceLabel": "Giant cell arteritis on temporal artery biopsy",
            "targetLabel": "Large-vessel vasculitis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_0e287b6788935dd9; daq_41de12d4018c6b57; daq_454d0ed03b305606; daq_70762209094c9b1b; daq_7ab49ac3c827fffa; daq_b501b8293278b217"
          },
          {
            "source": "diagnostic_result|giant cell arteritis on temporal artery biopsy",
            "target": "disease_condition_syndrome|temporal arteritis",
            "sourceLabel": "Giant cell arteritis on temporal artery biopsy",
            "targetLabel": "Temporal arteritis",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_0e287b6788935dd9; daq_41de12d4018c6b57; daq_454d0ed03b305606; daq_70762209094c9b1b; daq_7ab49ac3c827fffa; daq_b501b8293278b217"
          },
          {
            "source": "disease_condition_syndrome|neoplasms",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "Neoplasms",
            "targetLabel": "Immunosuppression",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_3333decffee7d1a9; daq_7d7f5a71e2ad4a73; daq_c575d3b0eda06f95; daq_ceb14e3d7960716a; daq_f16594ad184da719; daq_fffdef5c20efd19e"
          },
          {
            "source": "medication|ceftriaxone",
            "target": "medication|levofloxacin",
            "sourceLabel": "ceftriaxone",
            "targetLabel": "levofloxacin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_394e36a3132dd9d0; daq_3c3041fb6753bd12; daq_4e11a5034a4bb2c2; daq_6f38cad632b802e0; daq_7301ec3c21c587e2; daq_b4ec771d4febbf52"
          },
          {
            "source": "disease_condition_syndrome|crohn disease including crohn colitis",
            "target": "disease_condition_syndrome|ulcerative colitis",
            "sourceLabel": "Crohn disease including Crohn colitis",
            "targetLabel": "Ulcerative colitis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_13c193b90f86c700; daq_32a44b75bfe7d14f; daq_48a22f84c47eb148; daq_8aef5c2fd743bc98; daq_955fd79bd92c0d65; daq_dce12bc2a27282cc"
          },
          {
            "source": "medication|ibuprofen",
            "target": "medication|prednisone",
            "sourceLabel": "ibuprofen",
            "targetLabel": "prednisone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_1ce5dd9eea4f53dc; daq_2534cf2441044fc0; daq_73ad330be1ac2bd9; daq_7506c4335c4cf2eb; daq_860c0915169c09db; daq_d7632807fbb4219a"
          },
          {
            "source": "imaging_test|mri",
            "target": "intervention|lumbar puncture",
            "sourceLabel": "MRI",
            "targetLabel": "Lumbar puncture",
            "sourceType": "imaging_test",
            "targetType": "intervention",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_113821cbc9e8b281; daq_1782fefd55702aa8; daq_53ac35416738eb53; daq_90952fce0ad5883b; daq_d4017a60cb373218; daq_eb9d38dcd7a21db7"
          },
          {
            "source": "disease_condition_syndrome|large-vessel vasculitis",
            "target": "disease_condition_syndrome|temporal arteritis",
            "sourceLabel": "Large-vessel vasculitis",
            "targetLabel": "Temporal arteritis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_0e287b6788935dd9; daq_41de12d4018c6b57; daq_454d0ed03b305606; daq_70762209094c9b1b; daq_7ab49ac3c827fffa; daq_b501b8293278b217"
          },
          {
            "source": "medication|cefepime",
            "target": "medication|ceftriaxone",
            "sourceLabel": "cefepime",
            "targetLabel": "ceftriaxone",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_2618a15df218bf63; daq_285c75075e056b85; daq_40320130777150d2; daq_6eca94ecb3f7d736; daq_7fa7619374046675; daq_db255d18ecadbd98"
          },
          {
            "source": "imaging_test|mri",
            "target": "imaging_test|nuclear medicine bone scan",
            "sourceLabel": "MRI",
            "targetLabel": "Nuclear medicine bone scan",
            "sourceType": "imaging_test",
            "targetType": "imaging_test",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 6,
            "questions": "daq_183e60c5d07208dd; daq_3ebc2f0d915e7937; daq_4008aa865f9a317e; daq_9f4f806fbe1f0903; daq_bc98800455a5262f; daq_cd70a0a8b0d7181c"
          },
          {
            "source": "medication|apixaban",
            "target": "medication|enoxaparin",
            "sourceLabel": "apixaban",
            "targetLabel": "enoxaparin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_220a455d72802af8; daq_4065a73149c35439; daq_4584e520367352a6; daq_d593b92e81a9b5dd; daq_d64d1a2f90216da0"
          },
          {
            "source": "etiology_factor|kcnq1",
            "target": "physical_exam_symptom|syncope",
            "sourceLabel": "KCNQ1",
            "targetLabel": "Syncope",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_41274f0e733358d8; daq_9514dd8e5f0f76fb; daq_9534e8a298b49325; daq_b3bd15b27811ed6a; daq_c92e645fc474ed6b"
          },
          {
            "source": "etiology_factor|kcnh2",
            "target": "physical_exam_symptom|syncope",
            "sourceLabel": "KCNH2",
            "targetLabel": "Syncope",
            "sourceType": "etiology_factor",
            "targetType": "physical_exam_symptom",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_41274f0e733358d8; daq_9514dd8e5f0f76fb; daq_9534e8a298b49325; daq_b3bd15b27811ed6a; daq_c92e645fc474ed6b"
          },
          {
            "source": "etiology_factor|kcnh2",
            "target": "etiology_factor|kcnq1",
            "sourceLabel": "KCNH2",
            "targetLabel": "KCNQ1",
            "sourceType": "etiology_factor",
            "targetType": "etiology_factor",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_41274f0e733358d8; daq_9514dd8e5f0f76fb; daq_9534e8a298b49325; daq_b3bd15b27811ed6a; daq_c92e645fc474ed6b"
          },
          {
            "source": "medication|clopidogrel",
            "target": "medication|rivaroxaban",
            "sourceLabel": "clopidogrel",
            "targetLabel": "rivaroxaban",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_4b30962757b4eb19; daq_52c646350fb99ce3; daq_951a633adb3efaeb; daq_c835a99c7124c49b; daq_e060ebcea7308cf5"
          },
          {
            "source": "medication|cefazolin",
            "target": "medication|vancomycin",
            "sourceLabel": "cefazolin",
            "targetLabel": "vancomycin",
            "sourceType": "medication",
            "targetType": "medication",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_0f814eb7ed524750; daq_705901d7e863a9fe; daq_748176a201b557c7; daq_afe5e86f4e91f163; daq_e5c2b0ea5db868ea"
          },
          {
            "source": "diagnostic_result|atrial fibrillation or atrial flutter",
            "target": "disease_condition_syndrome|atrial flutter",
            "sourceLabel": "Atrial fibrillation or atrial flutter",
            "targetLabel": "Atrial flutter",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "answer_choice_entity_cooccurrence",
            "weight": 5,
            "questions": "daq_4f934e9fb9e9a307; daq_d04295eb42fe62d0; daq_dc2e89d10bed42d0; daq_e4f4e93c93e84b72; daq_f0f96d549f7578fe"
          },
          {
            "source": "diagnostic_result|colorectal carcinoma / malignant colorectal mass",
            "target": "diagnostic_test|diagnostic colonoscopy",
            "sourceLabel": "Colorectal carcinoma / malignant colorectal mass",
            "targetLabel": "Diagnostic colonoscopy",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 5,
            "questions": "daq_5f6b5ed51a210768; daq_a0eb214fd3bc2efb; daq_a270bec3af40c55d; daq_c98628843ef2b508; daq_e23625d7b6df0a61"
          },
          {
            "source": "diagnostic_result|lung mass",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "Lung mass",
            "targetLabel": "Immunosuppression",
            "sourceType": "diagnostic_result",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 5,
            "questions": "daq_1048926e3f1e63bc; daq_3333decffee7d1a9; daq_52635b0957ea82e2; daq_760cf7030cad8404; daq_af3f8b3fc8445868"
          },
          {
            "source": "disease_condition_syndrome|colorectal cancer",
            "target": "diagnostic_test|diagnostic colonoscopy",
            "sourceLabel": "Colorectal cancer",
            "targetLabel": "Diagnostic colonoscopy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 5,
            "questions": "daq_5f6b5ed51a210768; daq_a0eb214fd3bc2efb; daq_a270bec3af40c55d; daq_c98628843ef2b508; daq_e23625d7b6df0a61"
          },
          {
            "source": "disease_condition_syndrome|type 2 diabetes mellitus",
            "target": "medication|clopidogrel",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "clopidogrel",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 5,
            "questions": "daq_4178a658653c7902; daq_4b30962757b4eb19; daq_951a633adb3efaeb; daq_ef4f9f03ec4cc9a7; daq_f9fc480b74597183"
          },
          {
            "source": "diagnostic_result|atrial fibrillation or atrial flutter",
            "target": "medication|apixaban",
            "sourceLabel": "Atrial fibrillation or atrial flutter",
            "targetLabel": "apixaban",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_50adb265ee7e4d89; daq_84f9a5f91c96aaf5; daq_f9fc480b74597183"
          },
          {
            "source": "disease_condition_syndrome|type 2 diabetes mellitus",
            "target": "medication|empagliflozin",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "empagliflozin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_0c02a7d778f6e59c; daq_2d2e7ca8ae9f84a9; daq_3b683abe1f9917f4; daq_90116d8e4a740aba"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "diagnostic_test|biopsy",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "Biopsy",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_028977e8b8c27b23; daq_1fa8a227b8d9ab90; daq_473be194d9531f66; daq_964485f229f11947"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "imaging_test|mri",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "MRI",
            "sourceType": "diagnostic_result",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_03b4701f21882861; daq_113821cbc9e8b281; daq_912385d5c66c247f; daq_d4017a60cb373218"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "imaging_test|mri",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "MRI",
            "sourceType": "diagnostic_result",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_03b4701f21882861; daq_113821cbc9e8b281; daq_912385d5c66c247f; daq_d4017a60cb373218"
          },
          {
            "source": "disease_condition_syndrome|atrial fibrillation",
            "target": "medication|aspirin",
            "sourceLabel": "Atrial fibrillation",
            "targetLabel": "aspirin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_74cfdbe6a9322073; daq_84f9a5f91c96aaf5; daq_ba8e979311a806db; daq_f9fc480b74597183"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "medication|clopidogrel",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "clopidogrel",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_4b30962757b4eb19; daq_951a633adb3efaeb; daq_c1f0a8a4e5aee54e; daq_ef4f9f03ec4cc9a7"
          },
          {
            "source": "diagnostic_result|atrial fibrillation or atrial flutter",
            "target": "medication|aspirin",
            "sourceLabel": "Atrial fibrillation or atrial flutter",
            "targetLabel": "aspirin",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_74cfdbe6a9322073; daq_84f9a5f91c96aaf5; daq_ba8e979311a806db; daq_f9fc480b74597183"
          },
          {
            "source": "disease_condition_syndrome|atrial fibrillation",
            "target": "medication|apixaban",
            "sourceLabel": "Atrial fibrillation",
            "targetLabel": "apixaban",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_0219ff3e8dbad7f6; daq_50adb265ee7e4d89; daq_84f9a5f91c96aaf5; daq_f9fc480b74597183"
          },
          {
            "source": "disease_condition_syndrome|type 2 diabetes mellitus",
            "target": "medication|aspirin",
            "sourceLabel": "Type 2 diabetes mellitus",
            "targetLabel": "aspirin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_951a633adb3efaeb; daq_ba8e979311a806db; daq_d31890b9639c57e0; daq_f9fc480b74597183"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|aspirin",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "aspirin",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_3a7f0dbddb630a03; daq_4c666c4f10bc98cf; daq_84f9a5f91c96aaf5; daq_ba8e979311a806db"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|aspirin",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "aspirin",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_3a7f0dbddb630a03; daq_4c666c4f10bc98cf; daq_84f9a5f91c96aaf5; daq_ba8e979311a806db"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "medication|unfractionated heparin",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "unfractionated heparin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_37df2a10e19565bb; daq_52c646350fb99ce3; daq_5e16bc79bc4a635c; daq_d593b92e81a9b5dd"
          },
          {
            "source": "disease_condition_syndrome|hypothyroidism",
            "target": "medication|levothyroxine",
            "sourceLabel": "Hypothyroidism",
            "targetLabel": "levothyroxine",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_59d4369cb6c1cf2a; daq_7d4196d988edb5b0; daq_951ff7f593b88611; daq_f29791b52bf69d56"
          },
          {
            "source": "diagnostic_result|atrial fibrillation or atrial flutter",
            "target": "etiology_factor|healthcare exposure",
            "sourceLabel": "Atrial fibrillation or atrial flutter",
            "targetLabel": "Healthcare exposure",
            "sourceType": "diagnostic_result",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 4,
            "questions": "daq_7025354bfeae2dba; daq_b128f5ca2240f8df; daq_b489f3cf66a2301a; daq_f29b656bc5dbfe15"
          },
          {
            "source": "disease_condition_syndrome|type 1 diabetes mellitus",
            "target": "lab_test|immunoglobulin a (iga)",
            "sourceLabel": "Type 1 diabetes mellitus",
            "targetLabel": "Immunoglobulin A (IgA)",
            "sourceType": "disease_condition_syndrome",
            "targetType": "lab_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_98acc06c434e0883; daq_d7b728a109d9075f; daq_e8c2efb039299439"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|omeprazole",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "omeprazole",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_6d62d29789067054; daq_8bc97515dd10ed31; daq_e72ace789db100db"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|omeprazole",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "omeprazole",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_6d62d29789067054; daq_8bc97515dd10ed31; daq_e72ace789db100db"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|amlodipine",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "amlodipine",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_04e9484064ddeb73; daq_df910fca5b93156f; daq_f20f6e7496b7ff2e"
          },
          {
            "source": "disease_condition_syndrome|smoking cessation",
            "target": "imaging_test|low-dose ct chest for lung cancer screening",
            "sourceLabel": "Smoking cessation",
            "targetLabel": "Low-dose CT chest for lung cancer screening",
            "sourceType": "disease_condition_syndrome",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_c97ad2c5a56c0594; daq_ddbc088aad00f3da; daq_fddddd35a6acd46a"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "imaging_test|ct angiography",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "CT angiography",
            "sourceType": "diagnostic_result",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_327728660c4414db; daq_757a72b8e27bb01d; daq_fe2e111358635c76"
          },
          {
            "source": "diagnostic_result|lobar / air-space consolidation",
            "target": "medication|azithromycin",
            "sourceLabel": "Lobar / air-space consolidation",
            "targetLabel": "azithromycin",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_40320130777150d2; daq_7fa7619374046675; daq_8f1f698a8e25c8a2"
          },
          {
            "source": "diagnostic_result|lobar / air-space consolidation",
            "target": "medication|ceftriaxone",
            "sourceLabel": "Lobar / air-space consolidation",
            "targetLabel": "ceftriaxone",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_40320130777150d2; daq_7fa7619374046675; daq_8f1f698a8e25c8a2"
          },
          {
            "source": "diagnostic_result|pleural effusion",
            "target": "medication|ceftriaxone",
            "sourceLabel": "Pleural effusion",
            "targetLabel": "ceftriaxone",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_40320130777150d2; daq_7fa7619374046675; daq_cbe297bb70293c3e"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "imaging_test|ct angiography",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "CT angiography",
            "sourceType": "diagnostic_result",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_327728660c4414db; daq_757a72b8e27bb01d; daq_fe2e111358635c76"
          },
          {
            "source": "disease_condition_syndrome|obesity",
            "target": "etiology_factor|alcohol use disorder or heavy alcohol use",
            "sourceLabel": "Obesity",
            "targetLabel": "Alcohol use disorder or heavy alcohol use",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_2571bd94f1fe901e; daq_7814c876f84658e5; daq_7ab8cf6ef9723f57"
          },
          {
            "source": "disease_condition_syndrome|undifferentiated chronic kidney disease",
            "target": "medication|allopurinol",
            "sourceLabel": "Undifferentiated chronic kidney disease",
            "targetLabel": "allopurinol",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0f19c6ed3d2cc21d; daq_d025ee9d4ba46b61; daq_f26216ac231a1166"
          },
          {
            "source": "disease_condition_syndrome|lupus nephritis and glomerulonephritis",
            "target": "disease_condition_syndrome|anca-associated vasculitis",
            "sourceLabel": "Lupus nephritis and glomerulonephritis",
            "targetLabel": "ANCA-associated vasculitis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_2c200a0580d92ebb; daq_a2e2b4c740570a3a; daq_d3e8b2cfa677523b"
          },
          {
            "source": "diagnostic_result|pericardial effusion",
            "target": "medication|colchicine",
            "sourceLabel": "Pericardial effusion",
            "targetLabel": "colchicine",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_860c0915169c09db; daq_d31890b9639c57e0; daq_f75733c77d515511"
          },
          {
            "source": "diagnostic_result|fibrosis / cirrhosis on liver biopsy",
            "target": "imaging_test|liver elastography ultrasound",
            "sourceLabel": "Fibrosis / cirrhosis on liver biopsy",
            "targetLabel": "Liver elastography ultrasound",
            "sourceType": "diagnostic_result",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_32863a6281a185eb; daq_a2ebe97330256dd4; daq_e84ca2a00d87c65e"
          },
          {
            "source": "diagnostic_result|colitis endoscopic pattern",
            "target": "medication|doxycycline",
            "sourceLabel": "Colitis endoscopic pattern",
            "targetLabel": "doxycycline",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_9bc5906d428eefb3; daq_c9d5f88dd635c15e; daq_f62710193010d4d5"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|amlodipine",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "amlodipine",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_04e9484064ddeb73; daq_df910fca5b93156f; daq_f20f6e7496b7ff2e"
          },
          {
            "source": "disease_condition_syndrome|other acute kidney injury",
            "target": "diagnostic_result|acute tubular injury / acute tubular necrosis",
            "sourceLabel": "Other acute kidney injury",
            "targetLabel": "Acute tubular injury / acute tubular necrosis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_result",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_8c8408133bee64a2; daq_bfe614d364855ab0; daq_ff0adaa514f9949e"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|apixaban",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "apixaban",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0ac46ebcc37719aa; daq_7ac0bfc9d9d5e918; daq_84f9a5f91c96aaf5"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|apixaban",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "apixaban",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0ac46ebcc37719aa; daq_7ac0bfc9d9d5e918; daq_84f9a5f91c96aaf5"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "disease_condition_syndrome|essential (primary) hypertension",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "Essential (primary) hypertension",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0a4d8fde5e31fce6; daq_40a5bbab2a09609a; daq_f44117a326938b0b"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "disease_condition_syndrome|essential (primary) hypertension",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "Essential (primary) hypertension",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0a4d8fde5e31fce6; daq_40a5bbab2a09609a; daq_f44117a326938b0b"
          },
          {
            "source": "disease_condition_syndrome|coronary atherosclerosis",
            "target": "medication|aspirin",
            "sourceLabel": "Coronary atherosclerosis",
            "targetLabel": "aspirin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_84f9a5f91c96aaf5; daq_ba8e979311a806db; daq_d31890b9639c57e0"
          },
          {
            "source": "disease_condition_syndrome|atrial fibrillation",
            "target": "etiology_factor|healthcare exposure",
            "sourceLabel": "Atrial fibrillation",
            "targetLabel": "Healthcare exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_7025354bfeae2dba; daq_b128f5ca2240f8df; daq_f29b656bc5dbfe15"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|methylprednisolone",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "methylprednisolone",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_1a4271f77c3dd94b; daq_9f02d73ef43d5819; daq_a39be4e6b3804d14"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|methylprednisolone",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "methylprednisolone",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_1a4271f77c3dd94b; daq_9f02d73ef43d5819; daq_a39be4e6b3804d14"
          },
          {
            "source": "diagnostic_result|helicobacter pylori organisms identified",
            "target": "diagnostic_test|diagnostic egd / upper endoscopy",
            "sourceLabel": "Helicobacter pylori organisms identified",
            "targetLabel": "Diagnostic EGD / upper endoscopy",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0b8c46f8c4cc1ce8; daq_8ba4645d1df84a99; daq_a9174c1462e5fb00"
          },
          {
            "source": "disease_condition_syndrome|undifferentiated chronic kidney disease",
            "target": "etiology_factor|thiazide or loop diuretic exposure",
            "sourceLabel": "Undifferentiated chronic kidney disease",
            "targetLabel": "Thiazide or loop diuretic exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_99211a28d1e8db7a; daq_9c39ba2a9f2c756e; daq_e089205b00db52ab"
          },
          {
            "source": "disease_condition_syndrome|helicobacter pylori infection",
            "target": "diagnostic_test|diagnostic egd / upper endoscopy",
            "sourceLabel": "Helicobacter pylori infection",
            "targetLabel": "Diagnostic EGD / upper endoscopy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0b8c46f8c4cc1ce8; daq_8ba4645d1df84a99; daq_a9174c1462e5fb00"
          },
          {
            "source": "diagnostic_result|limited / nondiagnostic / motion-degraded exam",
            "target": "intervention|surgery",
            "sourceLabel": "Limited / nondiagnostic / motion-degraded exam",
            "targetLabel": "surgery",
            "sourceType": "diagnostic_result",
            "targetType": "intervention",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_b0538c557ffc3947; daq_bc87534ac1f5a6ae; daq_bef8f3a5d987b5f1"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "diagnostic_test|12-lead electrocardiogram",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "12-lead electrocardiogram",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_2b6f05ede6eb9365; daq_58b59cf72f8361d7; daq_63da69dbf0b95bf0"
          },
          {
            "source": "disease_condition_syndrome|back pain",
            "target": "imaging_test|mri",
            "sourceLabel": "Back pain",
            "targetLabel": "MRI",
            "sourceType": "disease_condition_syndrome",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_9f4f806fbe1f0903; daq_cba695b70313bd7c; daq_e46c5983c2f18d22"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "imaging_test|ultrasound",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "Ultrasound",
            "sourceType": "disease_condition_syndrome",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_1e041e5c988b9a4b; daq_a1dfbea6a10108e5; daq_e8768b0b31daf22f"
          },
          {
            "source": "diagnostic_result|normal sinus rhythm",
            "target": "imaging_test|echocardiography",
            "sourceLabel": "Normal sinus rhythm",
            "targetLabel": "Echocardiography",
            "sourceType": "diagnostic_result",
            "targetType": "imaging_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0c7298d31694b965; daq_544625d5fbb2d5d1; daq_e7ed618ed789daab"
          },
          {
            "source": "disease_condition_syndrome|other upper respiratory tract infections (pertussis)",
            "target": "disease_condition_syndrome|viral hepatitis",
            "sourceLabel": "Other upper respiratory tract infections (pertussis)",
            "targetLabel": "Viral hepatitis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0d96c2ec441153d1; daq_60a6a08d5e353f29; daq_73074e848fd87451"
          },
          {
            "source": "disease_condition_syndrome|undifferentiated chronic kidney disease",
            "target": "medication|hydromorphone",
            "sourceLabel": "Undifferentiated chronic kidney disease",
            "targetLabel": "hydromorphone",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_8276b9cba7117880; daq_83912642d6bc1fcd; daq_e1fc4f2b7a6e695d"
          },
          {
            "source": "disease_condition_syndrome|pneumonia",
            "target": "etiology_factor|healthcare exposure",
            "sourceLabel": "Pneumonia",
            "targetLabel": "Healthcare exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_4b6fcb72de01b7a9; daq_4ed39737dd438045; daq_7a9e782d0d8aaead"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|unfractionated heparin",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "unfractionated heparin",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_37df2a10e19565bb; daq_5e16bc79bc4a635c; daq_d593b92e81a9b5dd"
          },
          {
            "source": "disease_condition_syndrome|gastroesophageal reflux",
            "target": "diagnostic_test|diagnostic egd / upper endoscopy",
            "sourceLabel": "Gastroesophageal reflux",
            "targetLabel": "Diagnostic EGD / upper endoscopy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0b8c46f8c4cc1ce8; daq_0c6847b80b55f561; daq_d104bc7506ec1f65"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "etiology_factor|thiazide or loop diuretic exposure",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "Thiazide or loop diuretic exposure",
            "sourceType": "disease_condition_syndrome",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_746068ac57c9fe89; daq_99211a28d1e8db7a; daq_e089205b00db52ab"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "diagnostic_test|skin biopsy",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "Skin biopsy",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_3295ac5e90b5384b; daq_60f8f8cf3fdf63b1; daq_c6b89a4586208648"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "diagnostic_test|skin biopsy",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "Skin biopsy",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_3295ac5e90b5384b; daq_60f8f8cf3fdf63b1; daq_c6b89a4586208648"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "lab_test|thyroid-stimulating hormone (tsh)",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "Thyroid-stimulating hormone (TSH)",
            "sourceType": "diagnostic_result",
            "targetType": "lab_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_7f5519fc2a2315e2; daq_82d660fc80cc9dac; daq_9bdbcd6bc64384d8"
          },
          {
            "source": "diagnostic_result|bowel stricture",
            "target": "medication|clopidogrel",
            "sourceLabel": "Bowel stricture",
            "targetLabel": "clopidogrel",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_4178a658653c7902; daq_4b30962757b4eb19; daq_ef4f9f03ec4cc9a7"
          },
          {
            "source": "diagnostic_result|stricture / stenosis",
            "target": "medication|clopidogrel",
            "sourceLabel": "Stricture / stenosis",
            "targetLabel": "clopidogrel",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_4178a658653c7902; daq_4b30962757b4eb19; daq_ef4f9f03ec4cc9a7"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "medication|empagliflozin",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "empagliflozin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_2d2e7ca8ae9f84a9; daq_3b683abe1f9917f4; daq_90116d8e4a740aba"
          },
          {
            "source": "disease_condition_syndrome|osteoarthritis",
            "target": "intervention|surgery",
            "sourceLabel": "Osteoarthritis",
            "targetLabel": "surgery",
            "sourceType": "disease_condition_syndrome",
            "targetType": "intervention",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_139a09c07ab88db0; daq_bc87534ac1f5a6ae; daq_bef8f3a5d987b5f1"
          },
          {
            "source": "disease_condition_syndrome|cholelithiasis",
            "target": "intervention|cholecystectomy",
            "sourceLabel": "Cholelithiasis",
            "targetLabel": "cholecystectomy",
            "sourceType": "disease_condition_syndrome",
            "targetType": "intervention",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_00a82acdf7ff8ea3; daq_745153c70db49823; daq_ed09320731c41254"
          },
          {
            "source": "disease_condition_syndrome|smoking cessation",
            "target": "medication|tiotropium",
            "sourceLabel": "Smoking cessation",
            "targetLabel": "tiotropium",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_02add236a44b73b7; daq_a1e54670390aa52b; daq_fe5eb1944df99b51"
          },
          {
            "source": "disease_condition_syndrome|dyslipidemias",
            "target": "medication|aspirin",
            "sourceLabel": "Dyslipidemias",
            "targetLabel": "aspirin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_74cfdbe6a9322073; daq_951a633adb3efaeb; daq_c1f0a8a4e5aee54e"
          },
          {
            "source": "diagnostic_result|degenerative osteoarthritis changes",
            "target": "intervention|surgery",
            "sourceLabel": "Degenerative osteoarthritis changes",
            "targetLabel": "surgery",
            "sourceType": "diagnostic_result",
            "targetType": "intervention",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_139a09c07ab88db0; daq_bc87534ac1f5a6ae; daq_bef8f3a5d987b5f1"
          },
          {
            "source": "disease_condition_syndrome|stroke",
            "target": "medication|aspirin",
            "sourceLabel": "Stroke",
            "targetLabel": "aspirin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_74cfdbe6a9322073; daq_b71c9aa2eabb95ef; daq_ba8e979311a806db"
          },
          {
            "source": "disease_condition_syndrome|chronic bronchitis and emphysema",
            "target": "medication|azithromycin",
            "sourceLabel": "Chronic bronchitis and emphysema",
            "targetLabel": "azithromycin",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_01c28c2be16e8b98; daq_7fa7619374046675; daq_884a8018f917a1df"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "diagnostic_test|biopsy",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "Biopsy",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_1fa8a227b8d9ab90; daq_473be194d9531f66; daq_964485f229f11947"
          },
          {
            "source": "disease_condition_syndrome|undifferentiated chronic kidney disease",
            "target": "medication|prednisone",
            "sourceLabel": "Undifferentiated chronic kidney disease",
            "targetLabel": "prednisone",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_1ce5dd9eea4f53dc; daq_7506c4335c4cf2eb; daq_90380a733d3cdfbf"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "lab_test|thyroid-stimulating hormone (tsh)",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "Thyroid-stimulating hormone (TSH)",
            "sourceType": "diagnostic_result",
            "targetType": "lab_test",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_7f5519fc2a2315e2; daq_82d660fc80cc9dac; daq_9bdbcd6bc64384d8"
          },
          {
            "source": "diagnostic_result|adenocarcinoma",
            "target": "diagnostic_result|immunohistochemistry or receptor marker result",
            "sourceLabel": "Adenocarcinoma",
            "targetLabel": "Immunohistochemistry or receptor marker result",
            "sourceType": "diagnostic_result",
            "targetType": "diagnostic_result",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_21f892f2aef94777; daq_32daad0a304e2208; daq_ceb14e3d7960716a"
          },
          {
            "source": "disease_condition_syndrome|pericardial effusion",
            "target": "medication|colchicine",
            "sourceLabel": "Pericardial effusion",
            "targetLabel": "colchicine",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_860c0915169c09db; daq_d31890b9639c57e0; daq_f75733c77d515511"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "medication|sertraline",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "sertraline",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0f672996613a8451; daq_7e1fc0302bf7c7e6; daq_bd95c46fda3efe7b"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|sertraline",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "sertraline",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_0f672996613a8451; daq_7e1fc0302bf7c7e6; daq_bd95c46fda3efe7b"
          },
          {
            "source": "disease_condition_syndrome|hemoptysis",
            "target": "disease_condition_syndrome|anca-associated vasculitis",
            "sourceLabel": "Hemoptysis",
            "targetLabel": "ANCA-associated vasculitis",
            "sourceType": "disease_condition_syndrome",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_218d56cfd720ffa9; daq_454d0ed03b305606; daq_a2e2b4c740570a3a"
          },
          {
            "source": "diagnostic_result|cholelithiasis / gallstones",
            "target": "intervention|cholecystectomy",
            "sourceLabel": "Cholelithiasis / gallstones",
            "targetLabel": "cholecystectomy",
            "sourceType": "diagnostic_result",
            "targetType": "intervention",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_00a82acdf7ff8ea3; daq_745153c70db49823; daq_ed09320731c41254"
          },
          {
            "source": "diagnostic_result|squamous cell carcinoma",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "Squamous cell carcinoma",
            "targetLabel": "Immunosuppression",
            "sourceType": "diagnostic_result",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_52635b0957ea82e2; daq_f6be6548f08400eb; daq_fffdef5c20efd19e"
          },
          {
            "source": "diagnostic_result|carcinoma / malignant epithelial neoplasm",
            "target": "etiology_factor|immunosuppression",
            "sourceLabel": "Carcinoma / malignant epithelial neoplasm",
            "targetLabel": "Immunosuppression",
            "sourceType": "diagnostic_result",
            "targetType": "etiology_factor",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 3,
            "questions": "daq_760cf7030cad8404; daq_e9514c10c099aada; daq_f44280ef6067b74f"
          },
          {
            "source": "diagnostic_result|fibrosis / cirrhosis on liver biopsy",
            "target": "disease_condition_syndrome|hepatorenal syndrome",
            "sourceLabel": "Fibrosis / cirrhosis on liver biopsy",
            "targetLabel": "Hepatorenal syndrome",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_ae86904aed7abe7f; daq_e4369c87e34a26f9"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "disease_condition_syndrome|basal cell carcinoma of the skin",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "Basal cell carcinoma of the skin",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_308132e1fdf3ce70; daq_e044e976b62ef06a"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "disease_condition_syndrome|basal cell carcinoma of the skin",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "Basal cell carcinoma of the skin",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_308132e1fdf3ce70; daq_e044e976b62ef06a"
          },
          {
            "source": "diagnostic_result|pleural effusion",
            "target": "medication|cefepime",
            "sourceLabel": "Pleural effusion",
            "targetLabel": "cefepime",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_2618a15df218bf63; daq_7e51d5e80dc88aba"
          },
          {
            "source": "diagnostic_result|normal / no diagnostic abnormality identified",
            "target": "medication|diphenhydramine",
            "sourceLabel": "Normal / no diagnostic abnormality identified",
            "targetLabel": "diphenhydramine",
            "sourceType": "diagnostic_result",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_163b6f5077afc137; daq_1fd3dfbede116727"
          },
          {
            "source": "diagnostic_result|no acute abnormality / normal study",
            "target": "disease_condition_syndrome|dementia",
            "sourceLabel": "No acute abnormality / normal study",
            "targetLabel": "Dementia",
            "sourceType": "diagnostic_result",
            "targetType": "disease_condition_syndrome",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_185ad58f459ebf7f; daq_d5a530ce170d7f0d"
          },
          {
            "source": "disease_condition_syndrome|hyperthyroidism",
            "target": "medication|propylthiouracil",
            "sourceLabel": "Hyperthyroidism",
            "targetLabel": "propylthiouracil",
            "sourceType": "disease_condition_syndrome",
            "targetType": "medication",
            "layer": "disease_or_result_to_correct_answer",
            "weight": 2,
            "questions": "daq_956a0be814b43a53; daq_c593c0255f6d8558"
          }
        ],
        "layers": [
          "correct_answer_to_stem_clue",
          "answer_choice_entity_cooccurrence",
          "disease_or_result_to_correct_answer"
        ]
      },
      "topNodes": [
        {
          "label": "prednisone",
          "type": "medication",
          "weight": 263,
          "degree": 25
        },
        {
          "label": "ceftriaxone",
          "type": "medication",
          "weight": 182,
          "degree": 32
        },
        {
          "label": "Glucocorticoid exposure",
          "type": "etiology factor",
          "weight": 148,
          "degree": 17
        },
        {
          "label": "Thiazide or loop diuretic exposure",
          "type": "etiology factor",
          "weight": 140,
          "degree": 22
        },
        {
          "label": "Hypertension",
          "type": "etiology factor",
          "weight": 117,
          "degree": 29
        },
        {
          "label": "Hypertension",
          "type": "physical exam symptom",
          "weight": 116,
          "degree": 29
        },
        {
          "label": "aspirin",
          "type": "medication",
          "weight": 115,
          "degree": 23
        },
        {
          "label": "dexamethasone",
          "type": "medication",
          "weight": 112,
          "degree": 11
        },
        {
          "label": "hydrocortisone",
          "type": "medication",
          "weight": 108,
          "degree": 10
        },
        {
          "label": "methylprednisolone",
          "type": "medication",
          "weight": 99,
          "degree": 8
        },
        {
          "label": "vancomycin",
          "type": "medication",
          "weight": 99,
          "degree": 17
        },
        {
          "label": "azithromycin",
          "type": "medication",
          "weight": 97,
          "degree": 19
        },
        {
          "label": "12-lead electrocardiogram",
          "type": "diagnostic test",
          "weight": 95,
          "degree": 25
        },
        {
          "label": "furosemide",
          "type": "medication",
          "weight": 89,
          "degree": 13
        },
        {
          "label": "MRI",
          "type": "imaging test",
          "weight": 88,
          "degree": 17
        },
        {
          "label": "Immunosuppression",
          "type": "etiology factor",
          "weight": 86,
          "degree": 14
        }
      ],
      "communities": [
        {
          "id": "1",
          "nodeCount": 56,
          "weightedDegree": 1549,
          "mix": "medication:20; disease_condition_syndrome:10; diagnostic_result:9; imaging_test:4; physical_exam_symptom:4; etiology_fa...",
          "topNodes": [
            "Hypertension (etiology_factor, wdeg 117)",
            "Hypertension (physical_exam_symptom, wdeg 116)",
            "aspirin (medication, wdeg 115)"
          ]
        },
        {
          "id": "2",
          "nodeCount": 44,
          "weightedDegree": 1063,
          "mix": "medication:15; physical_exam_symptom:7; diagnostic_test:5; etiology_factor:5; lab_test:4; diagnostic_result:3; disease_...",
          "topNodes": [
            "ceftriaxone (medication, wdeg 182)",
            "vancomycin (medication, wdeg 99)",
            "azithromycin (medication, wdeg 97)"
          ]
        },
        {
          "id": "7",
          "nodeCount": 14,
          "weightedDegree": 950,
          "mix": "medication:8; physical_exam_symptom:3; lab_test:2; etiology_factor:1",
          "topNodes": [
            "prednisone (medication, wdeg 263)",
            "Glucocorticoid exposure (etiology_factor, wdeg 148)",
            "dexamethasone (medication, wdeg 112)"
          ]
        },
        {
          "id": "4",
          "nodeCount": 31,
          "weightedDegree": 754,
          "mix": "medication:6; lab_test:6; disease_condition_syndrome:5; physical_exam_symptom:4; diagnostic_test:3; imaging_test:3; dia...",
          "topNodes": [
            "Thiazide or loop diuretic exposure (etiology_factor, wdeg 140)",
            "furosemide (medication, wdeg 89)",
            "Ultrasound (imaging_test, wdeg 78)"
          ]
        },
        {
          "id": "6",
          "nodeCount": 18,
          "weightedDegree": 377,
          "mix": "etiology_factor:5; diagnostic_result:5; disease_condition_syndrome:3; diagnostic_test:1; medication:1; imaging_test:1;...",
          "topNodes": [
            "Immunosuppression (etiology_factor, wdeg 86)",
            "Tobacco smoking (etiology_factor, wdeg 62)",
            "Biopsy (diagnostic_test, wdeg 30)"
          ]
        },
        {
          "id": "3",
          "nodeCount": 33,
          "weightedDegree": 303,
          "mix": "etiology_factor:12; physical_exam_symptom:5; disease_condition_syndrome:4; medication:4; diagnostic_result:3; diagnosti...",
          "topNodes": [
            "Diagnostic colonoscopy (diagnostic_test, wdeg 61)",
            "Diagnostic EGD / upper endoscopy (diagnostic_test, wdeg 56)",
            "omeprazole (medication, wdeg 32)"
          ]
        },
        {
          "id": "5",
          "nodeCount": 21,
          "weightedDegree": 221,
          "mix": "disease_condition_syndrome:6; lab_test:4; etiology_factor:3; medication:3; physical_exam_symptom:3; intervention:1; dia...",
          "topNodes": [
            "Thyroid-stimulating hormone (TSH) (lab_test, wdeg 34)",
            "Obesity (etiology_factor, wdeg 32)",
            "levothyroxine (medication, wdeg 21)"
          ]
        },
        {
          "id": "8",
          "nodeCount": 11,
          "weightedDegree": 201,
          "mix": "imaging_test:4; physical_exam_symptom:3; diagnostic_test:1; intervention:1; medication:1; disease_condition_syndrome:1",
          "topNodes": [
            "MRI (imaging_test, wdeg 88)",
            "Lumbar puncture / CSF analysis (diagnostic_test, wdeg 36)",
            "Lumbar puncture (intervention, wdeg 35)"
          ]
        },
        {
          "id": "12",
          "nodeCount": 4,
          "weightedDegree": 106,
          "mix": "disease_condition_syndrome:3; etiology_factor:1",
          "topNodes": [
            "Esophagitis (Candida, herpes simplex virus, cytomegalovirus) (disease_condition_syndrome, wdeg 39)",
            "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus) (disease_condition_syndrome, wdeg 39)",
            "Cytomegalovirus (etiology_factor, wdeg 18)"
          ]
        },
        {
          "id": "19",
          "nodeCount": 3,
          "weightedDegree": 81,
          "mix": "disease_condition_syndrome:1; diagnostic_result:1; etiology_factor:1",
          "topNodes": [
            "Pneumonia (disease_condition_syndrome, wdeg 29)",
            "Pneumonia reported in imaging impression (diagnostic_result, wdeg 26)",
            "Coccidioides species (etiology_factor, wdeg 26)"
          ]
        },
        {
          "id": "21",
          "nodeCount": 3,
          "weightedDegree": 48,
          "mix": "intervention:2; diagnostic_test:1",
          "topNodes": [
            "Therapeutic bronchoscopy (intervention, wdeg 16)",
            "Diagnostic bronchoscopy (intervention, wdeg 16)",
            "Diagnostic bronchoscopy (diagnostic_test, wdeg 16)"
          ]
        },
        {
          "id": "23",
          "nodeCount": 3,
          "weightedDegree": 45,
          "mix": "etiology_factor:2; disease_condition_syndrome:1",
          "topNodes": [
            "Asbestos exposure (etiology_factor, wdeg 17)",
            "Radon exposure (etiology_factor, wdeg 14)",
            "Undifferentiated lung cancer (disease_condition_syndrome, wdeg 14)"
          ]
        },
        {
          "id": "15",
          "nodeCount": 3,
          "weightedDegree": 39,
          "mix": "etiology_factor:2; physical_exam_symptom:1",
          "topNodes": [
            "Syncope (physical_exam_symptom, wdeg 13)",
            "KCNQ1 (etiology_factor, wdeg 13)",
            "KCNH2 (etiology_factor, wdeg 13)"
          ]
        },
        {
          "id": "10",
          "nodeCount": 5,
          "weightedDegree": 38,
          "mix": "lab_test:4; medication:1",
          "topNodes": [
            "Aldosterone, plasma (lab_test, wdeg 13)",
            "Potassium, serum (lab_test, wdeg 9)",
            "Metanephrines, fractionated, plasma/urine (lab_test, wdeg 7)"
          ]
        },
        {
          "id": "20",
          "nodeCount": 3,
          "weightedDegree": 38,
          "mix": "etiology_factor:1; diagnostic_result:1; disease_condition_syndrome:1",
          "topNodes": [
            "High-purine diet (etiology_factor, wdeg 14)",
            "Gout urate deposition / erosions (diagnostic_result, wdeg 14)",
            "Gout (disease_condition_syndrome, wdeg 10)"
          ]
        },
        {
          "id": "24",
          "nodeCount": 3,
          "weightedDegree": 36,
          "mix": "disease_condition_syndrome:2; diagnostic_result:1",
          "topNodes": [
            "Giant cell arteritis on temporal artery biopsy (diagnostic_result, wdeg 12)",
            "Temporal arteritis (disease_condition_syndrome, wdeg 12)",
            "Large-vessel vasculitis (disease_condition_syndrome, wdeg 12)"
          ]
        }
      ],
      "studyModules": [
        {
          "id": "1",
          "theme": "Cardiovascular risk, acute coronary/antithrombotic reasoning, hypertension, ECG/echo decisions",
          "tactic": "Drill medication-vs-anticoagulation-vs-testing decisions: ECG/echo clues, ACS/AF/HF risk, hypertension comorbidity.",
          "nodeCount": 56,
          "answers": [
            "Healthcare exposure (15)",
            "Transthoracic echocardiography (11)",
            "aspirin (10)",
            "Echocardiography (9)"
          ],
          "clues": [
            "Hypertension (426)",
            "Hypertension (423)",
            "No acute abnormality / normal study (411)",
            "Normal / no diagnostic abnormality identified (391)"
          ],
          "nodes": [
            "Hypertension (etiology_factor, wdeg 117)",
            "Hypertension (physical_exam_symptom, wdeg 116)",
            "aspirin (medication, wdeg 115)",
            "12-lead electrocardiogram (diagnostic_test, wdeg 95)"
          ]
        },
        {
          "id": "2",
          "theme": "Infectious disease, pulmonary presentations, inpatient antibiotics, fever/leukocytosis/culture logic",
          "tactic": "Study presentation-to-empiric-antibiotic pathways: fever/WBC/culture clues, pneumonia/skin/soft tissue, MRSA/MSSA coverage.",
          "nodeCount": 44,
          "answers": [
            "ceftriaxone (18)",
            "vancomycin (11)",
            "doxycycline (11)",
            "ciprofloxacin (9)"
          ],
          "clues": [
            "Leukocyte count (WBC) (216)",
            "Chest radiograph (171)",
            "Fever (159)",
            "Staphylococcus aureus (158)"
          ],
          "nodes": [
            "ceftriaxone (medication, wdeg 182)",
            "vancomycin (medication, wdeg 99)",
            "azithromycin (medication, wdeg 97)",
            "Leukocyte count (WBC) (lab_test, wdeg 52)"
          ]
        },
        {
          "id": "7",
          "theme": "Steroid/adrenal/inflammatory therapy, glucocorticoid exposure, respiratory oxygenation clues",
          "tactic": "Contrast steroid choices, adrenal replacement, immunosuppression adverse effects, and oxygenation-based pulmonary decisions.",
          "nodeCount": 14,
          "answers": [
            "prednisone (16)",
            "Glucocorticoid exposure (15)",
            "hydrocortisone (12)",
            "dexamethasone (10)"
          ],
          "clues": [
            "Arterial PO2 / oxygen saturation (226)",
            "Swelling (74)",
            "prednisone (46)",
            "Glucocorticoid exposure (38)"
          ],
          "nodes": [
            "prednisone (medication, wdeg 263)",
            "Glucocorticoid exposure (etiology_factor, wdeg 148)",
            "dexamethasone (medication, wdeg 112)",
            "hydrocortisone (medication, wdeg 108)"
          ]
        },
        {
          "id": "4",
          "theme": "Nephrology/electrolytes/AKI/urinalysis/renal biopsy/vasculitis and renal medication effects",
          "tactic": "Build renal algorithms around creatinine/urinalysis/proteinuria/electrolytes and when biopsy, CTA, or diuretics are correct.",
          "nodeCount": 31,
          "answers": [
            "Ultrasound (15)",
            "Thiazide or loop diuretic exposure (8)",
            "furosemide (6)",
            "CT angiography (6)"
          ],
          "clues": [
            "Creatinine, serum (268)",
            "Urinalysis (141)",
            "Thiazide or loop diuretic exposure (119)",
            "Protein, total, serum (90)"
          ],
          "nodes": [
            "Thiazide or loop diuretic exposure (etiology_factor, wdeg 140)",
            "furosemide (medication, wdeg 89)",
            "Ultrasound (imaging_test, wdeg 78)",
            "Creatinine, serum (lab_test, wdeg 63)"
          ]
        },
        {
          "id": "6",
          "theme": "Oncology/immunosuppression/tobacco/HIV risk and biopsy/marker interpretation",
          "tactic": "Study malignancy and opportunistic-infection clues: tobacco/HIV/immunosuppression, CT/biopsy, receptor/marker results.",
          "nodeCount": 18,
          "answers": [
            "Immunosuppression (13)",
            "Biopsy (13)",
            "Human immunodeficiency virus (4)",
            "Ionizing radiation exposure (4)"
          ],
          "clues": [
            "Tobacco smoking (283)",
            "CT scan (121)",
            "Immunosuppression (86)",
            "Dyspnea on exertion (67)"
          ],
          "nodes": [
            "Immunosuppression (etiology_factor, wdeg 86)",
            "Tobacco smoking (etiology_factor, wdeg 62)",
            "Biopsy (diagnostic_test, wdeg 30)",
            "High-risk sexual exposure (etiology_factor, wdeg 27)"
          ]
        },
        {
          "id": "3",
          "theme": "Gastroenterology/endoscopy/bleeding/genetic risk and colonoscopy/EGD choices",
          "tactic": "Drill colonoscopy/EGD selection, GI bleeding/anemia clues, cancer screening/surveillance, and hereditary GI risk.",
          "nodeCount": 33,
          "answers": [
            "Diagnostic colonoscopy (14)",
            "Diagnostic EGD / upper endoscopy (13)",
            "omeprazole (5)",
            "Purpura (4)"
          ],
          "clues": [
            "Hemoglobin, blood (194)",
            "HFE (90)",
            "Unintentional weight loss (85)",
            "SERPINA1 (65)"
          ],
          "nodes": [
            "Diagnostic colonoscopy (diagnostic_test, wdeg 61)",
            "Diagnostic EGD / upper endoscopy (diagnostic_test, wdeg 56)",
            "omeprazole (medication, wdeg 32)",
            "Hemoglobin, blood (lab_test, wdeg 18)"
          ]
        },
        {
          "id": "5",
          "theme": "Endocrine/metabolic/thyroid/obesity/biliary intervention and endocrine lab logic",
          "tactic": "Make endocrine scripts: TSH/free T4 interpretation, obesity/diabetes/alcohol risk, statins, cholecystectomy timing.",
          "nodeCount": 21,
          "answers": [
            "Thyroid-stimulating hormone (TSH) (8)",
            "levothyroxine (5)",
            "cholecystectomy (5)",
            "Alcohol use disorder or heavy alcohol use (4)"
          ],
          "clues": [
            "Obesity (217)",
            "Fatigue (144)",
            "Thyroid-stimulating hormone (TSH) (102)",
            "Alcohol use disorder or heavy alcohol use (95)"
          ],
          "nodes": [
            "Thyroid-stimulating hormone (TSH) (lab_test, wdeg 34)",
            "Obesity (etiology_factor, wdeg 32)",
            "levothyroxine (medication, wdeg 21)",
            "cholecystectomy (intervention, wdeg 16)"
          ]
        },
        {
          "id": "8",
          "theme": "Neurology/MSK/spine/CSF/MRI/lumbar puncture imaging-procedure choices",
          "tactic": "Practice neuro/MSK test selection: when MRI vs LP vs radiograph, and how weakness/numbness/back pain changes the next step.",
          "nodeCount": 11,
          "answers": [
            "MRI (15)",
            "Lumbar puncture / CSF analysis (4)",
            "Lumbar puncture (4)",
            "Radiography (4)"
          ],
          "clues": [
            "Weakness (67)",
            "MRI (59)",
            "Back pain (43)",
            "Back pain (43)"
          ],
          "nodes": [
            "MRI (imaging_test, wdeg 88)",
            "Lumbar puncture / CSF analysis (diagnostic_test, wdeg 36)",
            "Lumbar puncture (intervention, wdeg 35)",
            "ampicillin (medication, wdeg 9)"
          ]
        },
        {
          "id": "12",
          "theme": "Esophagitis/opportunistic viral/fungal differential",
          "tactic": "Review top answer entities and top stem clues; convert the highest-weight edges into flashcard prompts.",
          "nodeCount": 4,
          "answers": [
            "Esophagitis (Candida, herpes simplex virus, cytomegalovirus) (6)",
            "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus) (4)",
            "Cytomegalovirus (2)",
            "Herpes zoster and varicella (2)"
          ],
          "clues": [
            "Herpes zoster and varicella (7)",
            "Esophagitis (Candida, herpes simplex virus, cytomegalovirus) (6)",
            "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus) (5)",
            "Cytomegalovirus (2)"
          ],
          "nodes": [
            "Esophagitis (Candida, herpes simplex virus, cytomegalovirus) (disease_condition_syndrome, wdeg 39)",
            "Infectious esophagitis (Candida, herpes simplex virus, cytomegalovirus) (disease_condition_syndrome, wdeg 39)",
            "Cytomegalovirus (etiology_factor, wdeg 18)",
            "Herpes zoster and varicella (disease_condition_syndrome, wdeg 10)"
          ]
        },
        {
          "id": "19",
          "theme": "Endemic pneumonia/coccidioidomycosis/radiographic pneumonia reasoning",
          "tactic": "Review top answer entities and top stem clues; convert the highest-weight edges into flashcard prompts.",
          "nodeCount": 3,
          "answers": [
            "Pneumonia (2)",
            "Pneumonia reported in imaging impression (2)",
            "Coccidioides species (2)"
          ],
          "clues": [
            "Pneumonia (33)",
            "Pneumonia reported in imaging impression (20)",
            "Coccidioides species (20)"
          ],
          "nodes": [
            "Pneumonia (disease_condition_syndrome, wdeg 29)",
            "Pneumonia reported in imaging impression (diagnostic_result, wdeg 26)",
            "Coccidioides species (etiology_factor, wdeg 26)"
          ]
        },
        {
          "id": "21",
          "theme": "Bronchoscopy as diagnostic vs therapeutic intervention",
          "tactic": "Review top answer entities and top stem clues; convert the highest-weight edges into flashcard prompts.",
          "nodeCount": 3,
          "answers": [],
          "clues": [
            "Therapeutic bronchoscopy (4)",
            "Diagnostic bronchoscopy (4)",
            "Diagnostic bronchoscopy (4)"
          ],
          "nodes": [
            "Therapeutic bronchoscopy (intervention, wdeg 16)",
            "Diagnostic bronchoscopy (intervention, wdeg 16)",
            "Diagnostic bronchoscopy (diagnostic_test, wdeg 16)"
          ]
        },
        {
          "id": "23",
          "theme": "Lung cancer risk exposure: asbestos/radon/smoking and screening",
          "tactic": "Review top answer entities and top stem clues; convert the highest-weight edges into flashcard prompts.",
          "nodeCount": 3,
          "answers": [
            "Asbestos exposure (5)",
            "Radon exposure (3)",
            "Undifferentiated lung cancer (3)"
          ],
          "clues": [
            "Asbestos exposure (18)",
            "Radon exposure (15)",
            "Undifferentiated lung cancer (15)"
          ],
          "nodes": [
            "Asbestos exposure (etiology_factor, wdeg 17)",
            "Radon exposure (etiology_factor, wdeg 14)",
            "Undifferentiated lung cancer (disease_condition_syndrome, wdeg 14)"
          ]
        },
        {
          "id": "15",
          "theme": "Mixed smaller cluster; review nodes and edges for local topic theme",
          "tactic": "Review top answer entities and top stem clues; convert the highest-weight edges into flashcard prompts.",
          "nodeCount": 3,
          "answers": [
            "Syncope (3)",
            "KCNQ1 (3)",
            "KCNH2 (3)"
          ],
          "clues": [
            "KCNQ1 (29)",
            "Syncope (21)",
            "KCNH2 (13)"
          ],
          "nodes": [
            "Syncope (physical_exam_symptom, wdeg 13)",
            "KCNQ1 (etiology_factor, wdeg 13)",
            "KCNH2 (etiology_factor, wdeg 13)"
          ]
        },
        {
          "id": "10",
          "theme": "Mixed smaller cluster; review nodes and edges for local topic theme",
          "tactic": "Review top answer entities and top stem clues; convert the highest-weight edges into flashcard prompts.",
          "nodeCount": 5,
          "answers": [
            "Aldosterone, plasma (4)",
            "sodium bicarbonate (3)",
            "Metanephrines, fractionated, plasma/urine (2)"
          ],
          "clues": [
            "Potassium, serum (83)",
            "Bicarbonate / CO2, serum (76)",
            "Aldosterone, plasma (5)",
            "sodium bicarbonate (3)"
          ],
          "nodes": [
            "Aldosterone, plasma (lab_test, wdeg 13)",
            "Potassium, serum (lab_test, wdeg 9)",
            "Metanephrines, fractionated, plasma/urine (lab_test, wdeg 7)",
            "sodium bicarbonate (medication, wdeg 6)"
          ]
        }
      ],
      "structure": [
        {
          "type": "diagnostic result",
          "stemPct": 56.2,
          "answerPct": 17.5,
          "explanationPct": 79.5
        },
        {
          "type": "diagnostic test",
          "stemPct": 28.0,
          "answerPct": 16.6,
          "explanationPct": 38.3
        },
        {
          "type": "disease condition syndrome",
          "stemPct": 67.7,
          "answerPct": 31.9,
          "explanationPct": 94.8
        },
        {
          "type": "etiology factor",
          "stemPct": 67.6,
          "answerPct": 21.2,
          "explanationPct": 76.4
        },
        {
          "type": "imaging test",
          "stemPct": 31.9,
          "answerPct": 18.5,
          "explanationPct": 33.1
        },
        {
          "type": "intervention",
          "stemPct": 10.9,
          "answerPct": 11.9,
          "explanationPct": 26.5
        },
        {
          "type": "lab test",
          "stemPct": 52.2,
          "answerPct": 11.0,
          "explanationPct": 39.6
        },
        {
          "type": "medication",
          "stemPct": 52.5,
          "answerPct": 43.5,
          "explanationPct": 56.4
        },
        {
          "type": "physical exam symptom",
          "stemPct": 83.0,
          "answerPct": 7.8,
          "explanationPct": 75.0
        }
      ],
      "layerCounts": [
        {
          "label": "answer choice entity cooccurrence",
          "edges": 7758,
          "weight": 11347
        },
        {
          "label": "correct answer to stem clue",
          "edges": 14372,
          "weight": 17144
        },
        {
          "label": "disease or result to correct answer",
          "edges": 3480,
          "weight": 4000
        }
      ]
    }
  },
  "portfolio": [
    {
      "id": "v43",
      "name": "v4.3 high-precision parser QA",
      "signal": "Validated acceptance gate before final network generation",
      "visual": "Acceptance bands, source-family coverage, target-type precision"
    },
    {
      "id": "good_v3",
      "name": "GOOD prior clue-to-decision network",
      "signal": "Clinical study modules from answer/stem co-occurrence",
      "visual": "Interactive network, communities, top clue-to-answer edges"
    },
    {
      "id": "future",
      "name": "Prior-project expansion slot",
      "signal": "Drop in another node/edge export using the same schema",
      "visual": "Network, matrix, Sankey, or timeline view"
    }
  ]
};
