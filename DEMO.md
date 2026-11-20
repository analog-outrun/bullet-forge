# Bullet Forge working group demonstration

Use a fresh Chromium profile and only the synthetic text below. Start the app from the repository root with `python3 -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/`. The app is a static, client-side drafting tool. It stores sessions in browser storage and can export JSON backups. The optional thesaurus makes an external dictionary lookup.

## Five-minute walkthrough

1. In **1206**, add a statement and enter “Helped with work. The team plans to improve it.” Open its feedback and discuss how the personal action and completed outcome are unclear. Replace it with “Led 12 volunteers through 3 workshops and earned an award.” Show the line-fit and evidence tiles. Ask what source would substantiate the counts and what award was actually earned in a real submission.
2. Replace the line with “Helped with PACAF, PACAF, and Pacific Air Forces.” Compare it with “Helped with Pacific Air Forces and Defense Health Agency.” The first contains one recognized institutional reference and the second contains two. Repetition cannot add placement credit, and neither statement establishes an outcome.
3. In **EPB / OPB**, enter “Ranked #2 of 12. Helped with planning (draft).” in the executing-mission section and open **Proof**. The rank and denominator produce one numeric cue. Ask who assigned the ranking and which group was compared.
4. In **Decoration**, enter “During this period, the member organized a practice workshop and created sample checklists.” Show the opening, closing, and estimated line layout. Repeat the text until the preview exceeds its signature marker.
5. Close by asking which prompts help the writer supply missing evidence, which cues mislead, and what a human reviewer must still confirm.

## What changed

- Award grades and per-statement evidence use the same list of recognized institutional references. Common aliases are counted once. The list is intentionally limited and can miss valid local organizations and programs.
- Award and evaluation numeric cues share one counter. Explicit rankings with denominators count once, and common numeric date formats and embedded alphanumeric numbers are excluded. The counter recognizes digits and does not establish that a number is material or true.
- The app identifies scores and format checks as advisory. Evaluation punctuation prompts offer editing suggestions, and the decoration layout describes what exceeds its estimate.

The 1206 writing grade combines weighted phrase and pattern matches for impact, institutional placement, recognition, ranking, quantification, innovation, and scope, with penalties for some draft patterns. Board read is a separate heuristic. Evaluation adds section-level writing hints and a separate proficiency coaching read. Decoration drafting uses citation scaffolds and a line estimate. No score establishes official compliance or predicts a board outcome.

## Verification and follow-up

Run `node tests/chromium-smoke.mjs` while the local server is running. The smoke test uses Chromium and Node 22 or later with the built-in WebSocket client. It exercises numeric and placement cases, weak and blank award statements, line fit, reload persistence, evaluation proofing, and decoration overflow. The older upload bundle under `_DEPLOY_github_pages` is a separate archived copy. Use the root app for the demonstration.

Future work for the working group includes testing false positives for negated or merely proposed recognition, checking layouts against current forms through an authorized review, and evaluating scores on a held-out set of synthetic examples across specialties. Existing score bands and historical board-calibration claims need fresh validation after changing cue detection. The optional thesaurus, official-system rendering, and print fidelity are outside this smoke test.
