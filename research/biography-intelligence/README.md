# Biography Intelligence Research

This directory is a scaffold for a separate public-source biography research and career-pattern analysis effort.

It is intentionally separate from the Bullet Forge application until the research pipeline, data quality, and a valid integration use case are demonstrated.

## Initial purpose

Build a structured, source-backed dataset of publicly available Department of the Air Force senior-leader biographies suitable for later career-pattern analysis.

## Separation from Bullet Forge

Bullet Forge is the inherited writing-assistance application.

The biography research pipeline should initially remain a separate system with its own:

- source collection
- schema
- verification
- entity resolution
- chronology checks
- deduplication
- evaluations
- data exports

Any future integration into Bullet Forge should be justified by a defined user need and tested rather than assumed.

## Data boundaries

Use only publicly releasable information.

Do not collect or store:

- CUI
- PII beyond what is already deliberately published in official biographies
- personal contact information
- family information
- home addresses
- authenticated government-system data
- nonpublic assignment information

## Planned first gate

Run a 25-record pilot before scaling. Validate:

1. identity resolution
2. source provenance
3. chronology
4. normalization
5. missing-data handling
6. duplicate detection
7. export to JSON and CSV

No causal career conclusions should be drawn until data quality is established.
