# Accessibility conformance notes

This document records what has been checked, how, and what is still unverified. It is **not** a
conformance claim. The target is WCAG 2.2 Level AA against the static interface; formal
conformance would require a full evaluation, including testing with disabled users and assistive
technology, which this project has not carried out.

Last updated: 2026-11-08.

## Status summary

| Area | Status | How it was checked |
| --- | --- | --- |
| Colour contrast (text and UI) | Verified | Automated token tests (`src/test/colorContrast.test.ts`) for both themes |
| Structure, names, roles, labels | Verified | axe-core on the rendered overview and a dimension view (`src/test/accessibility.test.ts`) |
| Keyboard operation | Not run | Code reviewed; run cases A1–A9 in [MANUAL_TEST_SCRIPT.md](./MANUAL_TEST_SCRIPT.md) |
| Screen reader behaviour | Not run | Run cases B1–B7 with NVDA or VoiceOver |
| Zoom / reflow to 200% and 320px | Not run | Run cases C1–C3 |
| Windows High Contrast (forced colours) | Not run | Rules added; run cases D1–D2 |
| Reduced motion | Verified in CSS | `prefers-reduced-motion` disables transitions and animations |

## What is in place

### Perceivable

- Text meets 4.5:1 and large text meets 3:1 in both themes. The contrast test reads the tokens from
  `src/app.css` and fails the build if a pair drops below its threshold.
- Non-text UI (focus rings, progress fills, table header text) meets 3:1.
- Links are underlined, so they are distinguishable without relying on colour alone.
- Status is never conveyed by colour alone: progress bars are paired with percentages, maturity
  badges carry text labels, and proof-point states have both a written label and `aria-pressed`.
- The radar chart has `role="img"`, a `<title>` and a `<desc>` listing each dimension's level.
- Content reflows; there is no horizontal scrolling at 320 CSS pixels except the summary table,
  which is wrapped in a keyboard-reachable scroll region.
- Information supplied with CSS gradients is backed by solid token colours chosen so that the
  lightest point of each gradient still meets the text threshold.

### Operable

- A skip link precedes the header.
- All controls are native `<button>`, `<a>`, `<input>` and `<textarea>` elements.
- Focus is visible everywhere (3px outline, 2px offset). On dark surfaces the ring switches to
  white; inside the introduction it switches to white as well.
- The share panel moves focus to its first control when opened, closes on Escape, and returns focus
  to the Share button.
- The theme toggle is last in the DOM and last visually, so focus order matches reading order.
- Reduced-motion preferences are respected globally.

### Understandable

- One `<h1>` per view, with logical heading order beneath it. Headings contain their disclosure
  buttons rather than sitting inside them.
- Every form control has a programmatic label; the required field is marked with text, not just an
  asterisk.
- Errors and confirmations are announced in plain language through a status region. The reset action
  uses an inline confirmation with focus moved to the confirm button, not a browser dialog.
- The introduction states what the model and this tool are and are not, including that the AMM is a
  Group Note that is not endorsed by W3C.

### Robust

- Card badges are not live regions; only the values that change in response to user action are
  announced (`role="status"` on the completion percentage and the status messages).
- Proof points marked not applicable have their status controls removed and replaced with an
  explanation, rather than being left as disabled, unfocusable buttons.
- Corrupt or unreadable saved data no longer prevents the application from loading.

## Manual test record

The procedure is [MANUAL_TEST_SCRIPT.md](./MANUAL_TEST_SCRIPT.md). Record one block per run, keep the
most recent at the top, and link an issue for every failure.

### Run 1 — not yet run

| Field | Value |
| --- | --- |
| Date | — |
| Tester | — |
| Browser and version | — |
| Operating system | — |
| Assistive technology and version | — |
| Build tested | — |

| Case | Result | Notes / issue |
| --- | --- | --- |
| A1 Skip link | Not run | |
| A2 Tab order | Not run | |
| A3 Focus visible | Not run | |
| A4 No keyboard trap | Not run | |
| A5 Dimension cards | Not run | |
| A6 Share panel focus | Not run | |
| A7 Maturity radios | Not run | |
| A8 Status buttons | Not run | |
| A9 Table scroll region | Not run | |
| B1 Landmarks and headings | Not run | |
| B2 Introduction disclosure | Not run | |
| B3 Maturity badges | Not run | |
| B4 Progress updates | Not run | |
| B5 Radar chart | Not run | |
| B6 Share dialog | Not run | |
| B7 Import error | Not run | |
| C1 200% zoom | Not run | |
| C2 320px reflow | Not run | |
| C3 Text spacing | Not run | |
| D1 Forced colours: controls | Not run | |
| D2 Forced colours: charts | Not run | |
| E1 Contrast spot check | Not run | |
| E2 System preference | Not run | |
| E3 Theme choice persists | Not run | |
| F1 Required field | Not run | |
| F2 Team members | Not run | |
| F3 Reset confirmation | Not run | |
| G1 Optimize warning | Not run | |
| G2 Not applicable | Not run | |
| G3 Evidence field | Not run | |
| H1 Link text | Not run | |
| H2 Plain language | Not run | |
| H3 Honest framing | Not run | |
| I1 Print summary | Not run | |
| I2 Export and import | Not run | |

## Known gaps

These are known and deliberately left open, or require manual work:

1. **The manual test pass has not been run.** [MANUAL_TEST_SCRIPT.md](./MANUAL_TEST_SCRIPT.md) covers
   keyboard, screen reader, zoom, forced colours, themes, forms, dynamic content, content and print.
   Results belong in the manual test record above.
2. **No screen reader testing has been recorded.** NVDA with Firefox or Chrome, and VoiceOver with
   Safari, should cover cases B1–B7.
3. **Zoom to 200% and 320px reflow have not been checked** in a browser (cases C1–C3).
4. **Windows High Contrast mode has not been checked manually.** Rules exist under
   `@media (forced-colors: active)` but need visual confirmation (cases D1–D2).
5. **Dark theme contrast is verified by calculation**, not by inspection with a display.
6. **Per-dimension level outcome text is not shown.** The picker shows the model's general level
   descriptions, so evaluators must consult the Group Note for the dimension-specific outcomes.
7. **Custom extensions and scoping are not supported**, so the tool cannot record the adaptations the
   model asks organizations to document when sharing results with third parties.

## How to re-verify

```bash
npm ci
npm run check
npm test
npm run build
```

Then run [MANUAL_TEST_SCRIPT.md](./MANUAL_TEST_SCRIPT.md) and fill in the manual test record above
with what was actually tested, by whom, and with which browser and assistive technology.
