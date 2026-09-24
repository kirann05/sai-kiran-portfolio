# Redesign Checklist

## Sections

- [x] Fixed monogram navigation, scroll state, active section and mobile overlay.
- [x] Portrait-free hero, amber accent, Syne name, Instrument Serif role, introduction, three actions including Resume, and four stats.
- [x] Full-width ticker with a pause control and reduced-motion fallback.
- [x] About paragraphs and an information panel with Lucide icons.
- [x] Work timeline with dates, outcomes and technology pills.
- [x] GitHub projects with featured ordering, filters, stars, dates, source links and live links where known.
- [x] Project detail dialogs with notes, architecture where supplied, README excerpts, NowServing demo and bakery embed.
- [x] Recognition section using documented education, publication and teaching milestones.
- [x] Skills grouped into responsive columns, with project highlighting and click-to-filter.
- [x] Contact section with copy feedback, email composer, GitHub, LinkedIn and resume.
- [x] Footer, original favicon, title, description, Open Graph and Twitter text metadata.

## Intentional Content Adaptations

- Uses Sai Kiran and the existing verified portfolio history, not the template's Shiva/Goldman Sachs/AWS/TCS identity.
- Uses 4+ years of industry experience, not the template's unsupported 7+ years or 3+ years at AWS.
- No personal photo, phone number or location. Institution names are retained.
- No invented certifications, awards or subject-matter-expert title.
- Status says Open to opportunities, as requested.
- Experience has six evidence-based points per role, technology lists, and a publication block beneath the research assistantship.
- Teaching milestone uses approximately 150 course enrollments across C++, Data Communications, and Algorithms; it does not imply 150 unique students.
- The downloadable resume uses the corrected July 2025 start date for Morgan Stanley.
- Card radius is 8px; typography uses fixed responsive breakpoints and zero letter spacing for reliable rendering.
- Muted text is brighter than the sample token for legibility against dark surfaces.
- Repository-only projects show source descriptions and README excerpts rather than invented architecture.

## Validation

- [x] Reversible scroll-linked reveals use native scrolling, subtle scale/translation, and a static reduced-motion fallback. Reverse scrolling was verified in the browser.
- [x] Original pixel SK GIF assembles once, has no loop extension, and finishes on the same image as its reduced-motion PNG fallback.
- [x] Updated navigation and scroll effects fit the 390px viewport without horizontal overflow; no browser errors observed.
- [x] JavaScript syntax checks pass.
- [x] Focused logic checks pass for featured ordering, duplicate prevention, filters, fork exclusion, URL validation, HTML escaping, malformed cache data, local assets and PDF signature.
- [x] Browser: live GitHub results load; 13 eligible repositories, 12 displayed projects after exclusions and curated additions.
- [x] Browser: AWS filter narrows the grid; All restores the full grid.
- [x] Browser: FitLive dialog opens, fetches its README and closes with Escape; focus returns to its trigger.
- [x] Browser: mobile menu opens, navigates to Contact and closes.
- [x] Browser: copy-email control reports success.
- [x] Browser: 390, 768, 1024 and 1440px viewport checks show no page horizontal overflow. Project grid switches from one to two to three columns.
- [x] Browser: no initial console errors or warnings observed.
- [x] Browser: NowServing Demo opens an embedded player and autoplay was observed; Play walkthrough replaces the poster in place. Playback starts muted and retains an external YouTube fallback.
- [x] Browser: updated video dialog fits a 390px viewport (358px dialog, 316px player), without horizontal overflow or console errors.
- [ ] Lighthouse performance/accessibility/best-practices/SEO scores have not been measured. No 95+ claim is made.
- [ ] Full screen-reader, physical touch-device and cross-browser testing remain unperformed.
- [ ] Reduced-motion CSS and logic are implemented; OS-level media-preference emulation has not been exercised in the browser.
- GitHub Pages is the selected host for this release.

## Release

This release is published separately as Minimalistic-Portfolio. The original Portfolio repository is left intact.
