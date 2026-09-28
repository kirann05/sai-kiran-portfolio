# Cleanup status

Updated September 25, 2026.

## Implemented

- Name: Sai Kiran. Location: Seattle. Current title: Software Engineer - Gen AI.
- Removed the headline years-of-experience count while employment dates are reconciled.
- Renamed the repositories and archived the private legacy portfolio.
- Updated GitHub profile text, repository descriptions, and topics.
- Published NowServing with copyright retained, root-level CI, environment examples, API/security/testing/decision notes, and a public Code link.
- Added source-backed architecture visuals for all project entries, role-based filters, case-study context, and Additional Experiments.
- Corrected Deepfake's PyTorch ResNet-18 description and credited upstream research.
- Documented the difference between NoteAid's paper and its public annotation application.
- Added canonical metadata, sitemap, robots, structured data, CI, CodeQL, and dependency-update configuration.
- Updated the resume's Morgan Stanley title and removed its numeric experience claim.

## Evidence and limits

Portfolio automated tests cover rendering, filters, URL handling, assets, and the local career guide. Browser checks cover project images and responsive layout. These are not a full screen-reader certification.

NowServing's frontend build passes. Its dependency audit reports zero known advisories after compatible updates. Lint passes with seven warnings; these are not silently labelled warning-free. Gitleaks found no credentials in the reviewed history and working tree. That does not guarantee the absence of all sensitive data.

## Still needs evidence or account access

- Profile pin order requires a signed-in GitHub browser session.
- Confirm Hexaware's July 2020 start and conflicting work metrics before a complete resume rewrite. Existing resume-supported responsibilities were retained; no new employment metrics were invented.
- GPT-2 loader benchmarks, misinformation baseline comparisons, and load tests need actual datasets, hardware, and measured runs.
- NoteAid still needs dataset-rights review, generated-file cleanup, and annotation-server hardening before any public deployment. The documentation is not a security fix.
- Live-provider and physical-device checks remain FitLive/NowServing release gates.
- LinkedIn, Scholar, ORCID, and certification verification are not complete.

The original plan spans documentation, account settings, and new engineering/evaluation work. The unchecked items above are intentionally not represented as completed results.
