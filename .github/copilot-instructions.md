# Copilot Instructions

## Start Here

Before making any changes, read the following files in the repository root:

- **[AGENTS.md](../AGENTS.md)** — Primary agent instructions. Covers project purpose, scope, UI contract, accessibility expectations, error handling, data handling, GitHub Pages constraints, and local preview requirements. **Read this first.**
- **[WCAG_COMPLIANCE.md](../WCAG_COMPLIANCE.md)** — WCAG 2.2 AA compliance status, implemented accessibility features by component, test suite details, and manual testing instructions.
- **[ACCESSIBILITY_FIXES.md](../ACCESSIBILITY_FIXES.md)** — Ongoing accessibility audit log: issues found, fixes applied, and items still pending.

## Project Summary

This is the **W3C Accessibility Maturity Model** — a static Svelte/TypeScript application (built with Vite) that helps organizations assess their accessibility maturity. It is deployed to GitHub Pages.

Key facts for efficient work:

- **Framework**: Svelte 5 + TypeScript, built with Vite, tested with Vitest + Testing Library
- **Deploy target**: GitHub Pages under a subpath (`https://<user>.github.io/<repo>/`) — always use relative URLs, never root-absolute paths like `/assets/...`
- **No server-side routing** — every navigable state must correspond to a real file
- **Accessibility is a hard requirement** — WCAG 2.2 AA is the target; do not regress keyboard navigation, focus management, ARIA, or color contrast
- **No data collection** — no analytics, no tracking, no personal data transmitted

## Tech Stack

| Tool | Purpose |
|------|---------|
| Svelte 5 | UI components |
| TypeScript | Type safety |
| Vite | Build & dev server |
| Vitest | Unit/component tests |
| @testing-library/svelte | Component testing |

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server (use this for local preview)
npm run dev
# OR: python3 -m http.server 8011 (for static files)

# Type-check
npm run check

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build for production
npm run build
```

## Repository Layout

```
/
├── AGENTS.md                  ← Primary agent/contributor instructions
├── WCAG_COMPLIANCE.md         ← WCAG 2.2 AA compliance summary
├── ACCESSIBILITY_FIXES.md     ← Ongoing accessibility audit log
├── src/                       ← Svelte components and app logic
├── public/                    ← Static assets served as-is
├── index.html                 ← Entry point
├── vite.config.ts             ← Vite configuration
├── vitest.config.ts           ← Test configuration
└── .github/
    ├── workflows/
    │   ├── deploy.yml         ← GitHub Pages deployment workflow
    │   └── a11y-scan.yml      ← Automated accessibility scan workflow
    └── ACCESSIBILITY_FIXES.md ← Supplements the root ACCESSIBILITY_FIXES.md
```

## Errors and Workarounds

_Document any errors encountered during development and their resolutions here._

<!-- Example format:
### Error: [short description]
**Symptom**: ...
**Cause**: ...
**Workaround/Fix**: ...
-->
