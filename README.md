# Accessibility Maturity Model — Assessment Tool

An independent, static web tool for exploring the [Accessibility Maturity Model (AMM)](https://www.w3.org/TR/maturity-model/)
and recording an organization's evidence against it.

The AMM is published by the W3C Accessible Platform Architectures (APA) Working Group as a
**W3C Group Note**. It is **not** a W3C Recommendation, and this tool is not a W3C product.

## What this tool is and is not

**It is** a structured way to discuss how an organization produces and sustains accessible digital
products and services, across the seven dimensions the model defines.

**It is not** a conformance test, audit, certification, or compliance determination. Maturity
assessment complements accessibility conformance testing; it does not replace it. Results are
informational and advisory, and final responsibility for interpretation and action rests with the
organization and its accessibility experts.

The model defines maturity **per dimension**. It does not define an overall organizational maturity
level, so this tool does not calculate one and does not present a combined score or grade.

## Model version

| Item | Value |
| --- | --- |
| Implements | Accessibility Maturity Model — W3C Group Note, 4 November 2025 |
| Also incorporates | Editor's draft changes through 30 September 2026 |
| Dimensions | 7 |
| Proof points | 105 |
| Maturity levels | 4 — Inactive, Launch, Integrate, Optimize |

The editor's-draft changes incorporated here are:

- "Oversight and Culture" is now **Governance and Oversight**, and is assessed second.
- The Governance and Oversight proof points are regrouped into Accountability, Financial
  Commitment, Policy, General Training, Dimension Goals and Metrics, and **Continuity**.
- New proof points cover continuity and resilience (single points of failure, backups, vacancy
  procedures, retention of accessibility decisions), decision authority in role descriptions,
  retention and attrition metrics, duplicated competencies, and procurement knowledge transfer.
- ICT Development Lifecycle gains a **User Experience** category; Knowledge and Skills gains
  **Dimension Integration**.

If the model changes again, update `src/data/dimensionsData.ts` and the tests in
`src/test/dimensionsData.test.ts`, which assert the dimension names, order, and proof-point
categories. See [Keeping the content in sync](#keeping-the-content-in-sync).

## Features

- All 7 dimensions, with the model's proof-point categories and a status for every proof point
  (not started, planned, in progress, completed, or not applicable)
- Per-dimension maturity-level selection, with a reminder that levels are cumulative and a warning
  when Optimize is claimed while applicable proof points are still open
- Evidence capture for completed proof points
- Progress and distribution views, plus a radar chart with a text alternative
- Summary report with a per-dimension table, printable from the browser
- Export and import of assessment data as JSON
- Light and dark themes, following the operating system preference by default
- Local-only storage: answers stay in the browser and are never transmitted

## Getting started

```bash
npm ci
npm run dev
```

Visit <http://localhost:5173>.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build static files into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check Svelte and TypeScript (`svelte-check` + `tsc`) |
| `npm test` | Run the test suite |
| `npm run test:ui` | Run tests in the Vitest UI |

## Testing

```bash
npm run check   # 0 errors
npm test        # unit, component, contrast and axe checks
npm run build
```

The suite covers:

- **Data contract** — dimension ids, names, order, proof-point categories and the continuity proof
  points the model requires (`src/test/dimensionsData.test.ts`)
- **Contrast** — reads the design tokens straight from `src/app.css` and asserts WCAG 2.2 AA ratios
  for both themes (`src/test/colorContrast.test.ts`)
- **ARIA and structure** — axe-core against the rendered overview and a dimension view
  (`src/test/accessibility.test.ts`)
- Component behaviour and store logic
- Manual procedure for what automation cannot cover: [MANUAL_TEST_SCRIPT.md](./MANUAL_TEST_SCRIPT.md)

Automated checks do not replace manual review. Before merging a UI change, run
[MANUAL_TEST_SCRIPT.md](./MANUAL_TEST_SCRIPT.md) and record the results in
[WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md#manual-test-record). The short version:

1. Navigate the primary controls with the keyboard only, including the skip link.
2. Confirm focus is always visible, and that focus returns to the Share button when the share panel
   closes.
3. Check light and dark themes, and Windows High Contrast mode.
4. Zoom to 200% and check that nothing is clipped.
5. Spot-check with at least one screen reader.

## Accessibility

This project targets WCAG 2.2 Level AA but does not claim formal conformance. Known gaps and
verification notes are recorded in [ACCESSIBILITY.md](./ACCESSIBILITY.md) and
[WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md).

Design tokens live in `src/app.css`. Component styles must use those tokens rather than hard-coded
colours, so that both themes stay accessible; the contrast tests enforce this.

## Data and privacy

- Answers are stored in the browser's `localStorage` under `a11y-assessment` (and the theme under
  `a11y-theme`).
- Nothing is sent to a server. There is no analytics and no tracking.
- **Export your data before clearing the browser**; "New Assessment" permanently clears stored
  answers.
- The organization name, team-member names, and evidence text you enter are stored locally. Do not
  enter personal or confidential information you would not want left on the device.

## Deployment

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

`vite.config.ts` sets the production base path to `/w3c-a11y-maturity-model/`; if the repository is
renamed, update `base` there and the absolute `og:image` URLs in `index.html`.

All links and assets use relative paths so the site works under the repository subpath. Everything
is static: there is no server-side routing and no build step at request time.

## Keeping the content in sync

1. Compare the [published Group Note](https://www.w3.org/TR/maturity-model/) and the
   [editor's draft](https://w3c.github.io/maturity-model/) with `src/data/dimensionsData.ts`.
2. Update dimension names, order, descriptions, categories and proof points.
3. Update `MODEL` in `src/lib/maturity.ts` (version, dates, URLs).
4. Run `npm run check && npm test` — the data-contract tests will point at anything missed.
5. Note the change here under [Model version](#model-version).

## Limitations

- The model's own experimental assessment spreadsheet is a prototype; this tool is an independent
  implementation of the same model, not an official one.
- Custom extensions to the model (adding dimensions or proof points, or renaming terminology) are
  not yet supported in the interface. The model permits them, provided the four levels and
  progression logic are preserved and adaptations are recorded.
- Scoping an assessment to a business unit or to selected dimensions is described by the model but
  is not yet offered by the UI.
- Per-dimension level outcome text from the model is not yet shown in the level picker; the picker
  shows the model's general level descriptions.
- External pages linked from this tool are outside this project's control.

## Contributing

- Keep changes focused and describe the content, conceptual, and accessibility impact in the pull
  request.
- Run `npm run check`, `npm test`, and `npm run build` before opening a pull request.
- Do not commit secrets, and prefer minimal, well-maintained dependencies.
- State any known trade-offs or limitations rather than hiding them.

## AI Disclosure

AI tools have been used during development. No AI runs at runtime — this is a static site with no
server-side or browser-based AI components.

### How AI has been used to build this project

| AI Tool | Used For |
| --- | --- |
| **GitHub Copilot** (powered by Claude) | Writing and reviewing code, fixing bugs, resolving dependency conflicts, setting up CI/CD workflows, improving accessibility, adding test coverage, and generating documentation across earlier pull requests. Also used to add the dark/light theme toggle, replace `ACCESSIBILITY_FIXES.md` with `ACCESSIBILITY.md`, draft `DEFINITION_OF_DONE.md`, and resolve WCAG color-contrast failures reported by Accessibility Insights. |
| **DeepSeek** (`deepseek-flash` via DeepSeek Harness) | Reviewing the repository and its open Dependabot pull requests; fixing WCAG 2.2 AA issues (contrast, heading and landmark structure, form labelling, dialog focus management, live regions, table caption, reduced motion, forced colours); rebuilding the design tokens and dark theme; syncing the dimension and proof-point content to the AMM Group Note and 2026 editor's draft; removing the unsanctioned overall maturity score; adding the data-contract, contrast and axe test suites; and updating this documentation. |

### Is AI used when running the program?

No. The application is a static Svelte/TypeScript site. No AI model is invoked at runtime, on the
server, or in the browser.

### Notes

- Each AI-assisted contribution is made via pull requests in the repository history.
- This disclosure will be updated as additional AI tools are introduced or their use changes.
