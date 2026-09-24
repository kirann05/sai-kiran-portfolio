# Ask Sai: Design and Behavior

## Decision

Use an original line-drawn coder above a functional amber laptop screen beside Sai Kiran's name. The initial ASCII face was replaced after review: vector paths make the headphones, hands, and coffee gestures more legible. This is a stylized character, not a portrait. The screen is a compact resume guide, not an impersonation of a live conversation with Sai.

The intended signal is practical judgment: make evidence easier to explore while respecting attention, accessibility, privacy, and the limits of the source material. This feature does not promise better ATS scores. The visible experience sections and downloadable resume remain the primary professional record.

## What Ships in This Preview

- A responsive character with hair, distinct headphones, facial details, hoodie, hands, and a steaming coffee cup.
- The default pose peeks over a desktop monitor with a resting hand. Hovering over the head, tapping it, or activating its keyboard-accessible button lifts the character for a single coffee break, then returns it behind the monitor. No wave or continuous coffee loop. Reduced motion keeps a static peeking pose.
- A monitor bezel and stand frame the chat. The physical keypad was removed after review; questions remain available through the screen input and suggestions.
- A readable screen with an introduction, suggested questions, a question field, and evidence links.
- Curated answers for the three roles, research, teaching, education, projects, technologies, contact, and resume.
- Topic-aware follow-ups such as "Which technologies?" and "Tell me more" after selecting a role or project.
- An explicit unknown-answer fallback instead of invented salary, availability dates, credentials, personal facts, or achievements.
- A pause control, reduced-motion static frame, and an animation loop that stops off-screen or when the browser tab is hidden.
- A stacked mobile layout. No floating dock, scroll hijacking, screen flicker, sound, or full-screen terminal.

## Content and Privacy

`hero-coder.js` reads the existing content in `data.js`. It uses deterministic intent matching and approved answers, not a language-model API. No questions are transmitted or stored. Only the current topic is retained in memory for follow-ups and is reset on reload.

This is intentionally not an unrestricted chatbot. Unrecognized questions receive a clear fallback; recognized questions retrieve a relevant summary rather than generate a tailored interview answer. External evidence links navigate only when the visitor selects them.

Future live AI would need an approved server-side service, protected credentials, rate limits, a source-grounded response policy, a privacy disclosure, and tests for unsupported claims. No API keys belong in this static site.

## Implementation

- `hero-coder.js`: approved answers, topic resolution, safe text rendering, original SVG character layers, pure gesture poses, and a single 12 fps animation scheduler.
- `hero-coder.css`: responsive hero grid, unintrusive laptop styling, fixed answer viewport, theme tokens.
- Questions and answers use real HTML text, labelled inputs, source links, and a polite screen-reader announcement. Decorative art is hidden from assistive technology.
- Answer length cannot resize the laptop: longer answers scroll in a keyboard-focusable region. Text is shown immediately, with only a brief fade/slide when motion is allowed.
- No additional runtime dependencies; the existing Lucide library provides controls.

## Validation

Run `node work/test_hero_coder.cjs` and `node work/test_redesign.cjs` from the workspace root.

Passed: topic matching, follow-ups, unknown-answer handling, bounded wave/sip poses, non-overlapping gestures, static-pose invariance, no question storage/network calls, and guide JavaScript below 10 KB compressed. Browser checks passed for research follow-ups, unknown questions, pause/resume state, and no horizontal overflow at 1440, 1024, 768, and 390px widths. The revised character's wave and cup-at-mouth poses were visually inspected in the browser.

Physical devices, full screen-reader navigation, OS-level reduced-motion switching, and Lighthouse scores have not been independently tested.
