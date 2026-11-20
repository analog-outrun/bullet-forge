# Analog Development Branch

This branch is the working development branch for experiments and improvements to the fork of **jall-beep/bullet-forge**.

## Provenance

- Upstream project: https://github.com/jall-beep/bullet-forge
- Fork: https://github.com/analog-outrun/bullet-forge
- Baseline branch: `main`
- Development branch: `analog-dev`
- Baseline commit at branch creation: `3f2c172135f9def181818faf0d7b0c2cf4ca0416`

The original application and its existing functionality were created by the upstream author. Changes made on this branch should be documented as derivative improvements, experiments, tests, refactors, or integrations rather than represented as original authorship of Bullet Forge.

## Working rules

1. Keep `main` unchanged as the reference baseline.
2. Make development changes on `analog-dev` or a branch created from it.
3. Before changing behavior, record the original behavior and the problem being addressed.
4. Add a test or repeatable comparison whenever practical.
5. Keep public/synthetic data separate from any nonpublic government information.
6. Do not add CUI, PII, PHI, nonpublic personnel data, or restricted government data.
7. Preserve upstream attribution and commit history.
8. Treat any future AI-assisted feature as an optional capability whose value must be tested against simpler deterministic approaches.

## Initial technical observations

The upstream project is a browser-based writing assistance tool for Air Force award statements, evaluations, decorations, and proofing. It is implemented primarily as one large self-contained `index.html`, runs client-side, and does not use a backend database. The current code makes an optional outbound request to Datamuse for thesaurus results.

These observations describe the inherited baseline and are not changes made on this branch.
