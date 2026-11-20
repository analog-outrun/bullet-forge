# Bullet Forge Code Map

This map documents the inherited upstream application as it exists on the fork baseline. It is intended to make later changes understandable and attributable.

## Repository shape

The inherited application is dominated by one self-contained `index.html` file.

Baseline characteristics observed on 20 Nov 2026:

- ~5.4 MB HTML file
- ~6,848 lines
- Client-side application
- No backend server
- No database
- Browser storage used for local state
- Optional Datamuse thesaurus network call
- Multiple modes share one file and one large JavaScript surface

## Major functional areas

### UI and layout
Approx. lines 1–650.

Includes:
- dark/light theme styling
- responsive/mobile layout
- action row and collapsible controls
- multi-mode panels
- data-foundation and KPI presentation
- focus layout

### Measurement and form-fit engine
Approx. lines 3,595–3,788.

Key functions:
- `kernW`
- `charW`
- `fitReport`
- `usableWidthPt`
- `textW`
- `wrap`

Purpose:
- line/character fit calculations
- spacing behavior
- form geometry
- rendering fit decisions

### Paste ingestion and statement splitting
Approx. lines 3,789–3,834.

Key functions:
- `isHeadingLine`
- `splitBullets`
- `ingestPaste`

Purpose:
- identify package headings/boilerplate
- split pasted content into individual statements

### State and browser persistence
Approx. lines 3,843 onward.

Key functions:
- `load`
- `save`
- `_snapshot`
- `noteUndo`
- `doUndo`
- `addBullet`
- `delBullet`

Purpose:
- local application state
- undo behavior
- browser persistence

### Linting, vocabulary, and statement analysis
Approx. lines 3,888–4,013.

Key functions:
- `verbTierOf`
- `openingVerb`
- `findWeak`
- `scopeReached`
- `hasRecognition`
- `lint`

Purpose:
- verb tier analysis
- weak-language detection
- scope/recognition checks
- statement linting

### Package detection and scoring configuration
Approx. lines 4,014–4,188.

Key functions:
- `pkgStruct`
- `detectPkgType`
- `pkgType`
- `scoringFor`
- `scoringTotal`

Purpose:
- infer package type
- apply package-specific structures and scoring rules

### Quality-control engine
Approx. lines 4,189–4,283.

Key functions:
- `lintHard`
- `pkgQC`
- `renderQC`
- `hardRulesHTML`

Purpose:
- package-level consistency checks
- repeated metrics/openings
- hard-rule warnings

### Preview and scoring
Approx. lines 4,284–4,563.

Key functions:
- `computeFreq`
- `renderPreviewHTML`
- `renderScore`
- `renderAll`
- `onEdit`

Purpose:
- live previews
- score rendering
- statement editing workflow

### Thesaurus integration
Approx. lines 4,562–4,643.

Key functions:
- `showThes`
- `thesClean`
- `paintThes`
- `applySyn`

Network behavior:
- optional Datamuse thesaurus request

### Recognition / statement-value engine
Approx. lines 4,644–4,701.

Key functions:
- `svScope`
- `svQuant`
- `svVerb`
- `svImpact`
- `recogClass`
- `stmtValue`

### Examples and vocabulary
Approx. lines 4,702–4,807.

Key functions:
- `initEx`
- `renderEx`
- `useExample`
- `renderVocab`
- `insertVerb`

### Settings, export/import, and utility workflow
Approx. lines 4,808–4,932.

Key functions:
- `persistSettings`
- `applySettings`
- `exportCSV`
- `exportMD`
- `importTxt`
- `exportJSON`
- `importJSON`

### 1206 grading and coaching
Approx. lines 4,933–5,355.

Key functions:
- `gradeBand`
- `grade1206`
- `pkgGrade`
- `reviewLens`
- `boardRead`
- `stmtArchetype`
- `coachAsk`

Purpose:
- package grading
- statement completeness
- reviewer lens
- coaching/refinement

### Mode routing
Approx. lines 5,356 onward.

Key function:
- `setMode`

Primary modes include:
- EPB/OPB
- Decorations
- Valuator
- Rules
- Reference

### EPB/OPB engine
Approx. lines 5,372–5,963.

Key functions:
- `narrativeLint`
- `epbStrength`
- `renderEPB`
- `epbFormatAll`
- `epbFitLines`
- `epbFitPreview`
- `ratingChainCard`
- `printEPBDraft`

### Decoration engine
Begins approx. line 5,964.

### Valuator engine
Begins approx. line 6,074.

### Rules / reference
Begins approx. line 6,120.

Includes:
- scoring rules
- leadership/read perspective
- value ladders
- record lens
- board evidence
- reference instruments

### Version / changelog logic
Begins approx. line 6,517.

## Initial engineering risks / opportunities

These are hypotheses for evaluation, not defects declared as fact.

1. **Monolithic architecture**
   - Most application logic, data, UI, and rules live in one very large HTML file.
   - This makes isolated testing, review, and change attribution harder.

2. **Limited automated test surface**
   - The codebase contains extensive deterministic rules, which may be suitable for unit tests.
   - Before refactoring, baseline behavior should be captured with repeatable cases.

3. **Data / logic separation**
   - Large reference/example libraries appear embedded in the application file.
   - Separating static data from behavior could improve maintainability.

4. **Scoring explainability**
   - Several scoring, recognition, grade, and reviewer-lens functions should be mapped to explicit rules and test cases before any AI-assisted change.

5. **AI integration should not be assumed**
   - The inherited application is primarily deterministic.
   - Any future LLM/agent feature should be justified against existing deterministic behavior and tested for added value, error rate, privacy, and review burden.

## Recommended first technical step

Do **not** refactor the application immediately.

First create a baseline regression set covering a small number of representative workflows:

- paste/split a 1206 package
- package-type detection
- QC warnings
- line-fit calculations
- scoring/grade behavior
- EPB narrative linting
- export/import
- offline behavior without thesaurus access

Once baseline outputs are captured, refactoring or AI-assisted enhancements can be compared against inherited behavior rather than judged by appearance alone.
