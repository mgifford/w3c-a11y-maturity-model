# Manual accessibility test script

Use this script for a manual pass over the assessment tool. It covers the checks that automation
cannot make: keyboard operation, screen reader output, zoom and reflow, forced colours, and whether
the content is understandable.

Record results in the **Manual test record** table in [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md).
That table is the source of truth; this file is only the procedure.

Allow about 45–60 minutes for one browser and one screen reader. A second pass with a different
browser or screen reader is more valuable than a longer single pass.

## Before you start

1. Run the automated checks so you are not chasing failures they would have caught:

   ```bash
   npm ci
   npm run check
   npm run test:run
   ```

2. Build and serve the site, so you are testing what ships:

   ```bash
   npm run build
   npm run preview
   ```

   The site has two pages: the About page at `http://localhost:4173/` and the assessment at
   `http://localhost:4173/tool.html`. Do not test from `file://`.

3. Have a second browser available for the cross-browser pass, and one screen reader:
   NVDA with Firefox or Chrome on Windows, or VoiceOver with Safari on macOS.
4. Decide whether you are testing against an empty assessment or a populated one. Several cases need
   a populated assessment; the steps below say when.
5. Record your environment before you begin:

   | Field | Example |
   | --- | --- |
   | Date | 2026-11-08 |
   | Tester | Name or initials |
   | Browser and version | Firefox 133 |
   | Operating system | Windows 11 23H2 |
   | Assistive technology and version | NVDA 2025.1 |
   | Build tested | Commit `847eece`, or the deployed Pages URL |

## How to fill in results

For each case record one of:

- **Pass** — behaves as the expected result describes.
- **Fail** — does not; raise an issue and link it in the notes.
- **N/A** — the case does not apply (say why).

Do not mark a case Pass if you had to work around it. If something is awkward but usable, record it
as Pass with a note, and raise a separate issue if it should change.

---

## A. Keyboard and focus

Perform every case with the mouse physically out of reach.

### A1 — Skip link

1. Load the assessment page (`tool.html`).
2. Press `Tab` once.

- **Expected:** "Skip to main content" appears at the top left with a visible focus ring.
- **Expected:** `Enter` moves focus to the main content region, and the next `Tab` lands on the first
  control inside it rather than returning to the header.
- **WCAG:** 2.4.1 Bypass Blocks, 2.4.7 Focus Visible.

### A2 — Tab order follows reading order

1. Tab through the whole assessment page without using `Shift+Tab`.

- **Expected:** order is skip link → Export → Import → (New Assessment, if there is data) → Share →
  About this tool → theme toggle → organization fields → dimension cards.
- **Expected:** the theme toggle is last in the header both visually and in the tab order.
- **Expected:** focus never jumps upwards or to a control you have already passed.
- **WCAG:** 2.4.3 Focus Order.

### A3 — Focus is always visible

1. Tab through every control on the About page, the assessment overview, a dimension view, and the
   summary.
2. Repeat with both themes.

- **Expected:** every focused control has a clearly visible ring; on the dark header and footer the
  ring is light, not dark-on-dark.
- **WCAG:** 2.4.7 Focus Visible, 1.4.11 Non-text Contrast.

### A4 — No keyboard trap

1. Open the share panel, then press `Tab` repeatedly.

- **Expected:** focus moves out of the panel and back into the page; it never becomes stuck.
- **WCAG:** 2.1.2 No Keyboard Trap.

### A5 — Dimension cards are operable

1. Tab to a dimension card title, press `Enter`, then repeat with `Space`.

- **Expected:** each opens the dimension view once, with no double activation.
- **Expected:** the card title has a visible focus indicator.
- **WCAG:** 2.1.1 Keyboard, 2.5.3 Label in Name.

### A6 — Share panel focus management

1. Focus the Share button and press `Enter`.
2. Press `Escape`.
3. Repeat, then press `Tab` to the Close button and activate it.

- **Expected:** opening moves focus into the panel (first control).
- **Expected:** `Escape` and Close both close the panel and return focus to the Share button.
- **Expected:** the panel is announced as a dialog named "Share this tool".
- **WCAG:** 2.4.3 Focus Order, 4.1.2 Name, Role, Value, 1.3.1 Info and Relationships.

### A7 — Maturity level radios

1. Open a dimension view and Tab into the maturity level group.
2. Use the arrow keys, `Space`, and `Home`/`End`.

- **Expected:** arrow keys move between the four levels and select them; the selected option is
  obvious visually and programmatically.
- **Expected:** no choice is preselected on a new assessment.
- **WCAG:** 2.1.1 Keyboard, 4.1.2 Name, Role, Value.

### A8 — Proof point status buttons

1. Tab to a proof point's status buttons and press `Enter` on "Completed".
2. Press it again.

- **Expected:** the pressed state is communicated, and pressing the active button again returns it to
  not started.
- **Expected:** the completion percentage on the dimension updates and is announced.
- **WCAG:** 4.1.2 Name, Role, Value, 4.1.3 Status Messages.

### A9 — Summary table scroll region

1. Complete all seven dimensions, open the summary, and Tab to the table.
2. Use the arrow keys, or `Shift` + mouse wheel.

- **Expected:** the table region can take focus and can be scrolled with the keyboard when it
  overflows.
- **WCAG:** 2.1.1 Keyboard.

---

## B. Screen reader

Cases B1, B2 and B7 cover both pages; the rest apply to the assessment page.

Say each expected announcement out loud (or note the actual output) as you go.

### B1 — Landmarks and headings

1. Load the assessment overview and use the screen reader's landmark and heading lists.
2. Repeat on the About page (`index.html`).

- **Expected:** banner, main, contentinfo and at least one labelled group are present.
- **Expected:** exactly one `h1` ("Accessibility Maturity Model"), then `h2` for About, Organization
  Information, Assessment Progress, Maturity Assessment Visualization and Assessment Dimensions,
  then `h3` for each card and for each visualization subsection. Nothing skips a level on the way
  down.
- **Expected:** no heading level is skipped going down.
- **WCAG:** 1.3.1 Info and Relationships, 2.4.6 Headings and Labels.

### B2 — About page content

1. Open the About page and read from the top.
2. Follow "Start the assessment", then return with "About this tool".

- **Expected:** the About page has an `h1`, then `h2` for the hero, "About the model" and "The seven
  dimensions", with `h3` for the facts list and each dimension; the disclosure is always visible,
  with no collapse control.
- **Expected:** both links move to the expected page, and each page has its own descriptive title.
- **Expected:** the assessment page does **not** repeat the About content.
- **WCAG:** 2.4.4 Link Purpose, 3.2.3 Consistent Navigation.

### B3 — Maturity badges

1. On the overview, move through the dimension cards.

- **Expected:** each card announces its maturity state as text (for example "Maturity level: Not
  Assessed"), not as a live-region announcement on page load.
- **Expected:** nothing is announced automatically when the page finishes loading.
- **WCAG:** 4.1.3 Status Messages (by not over-announcing).

### B4 — Progress updates

1. In a dimension view, mark a proof point Completed.

- **Expected:** a polite announcement of the new completion percentage, once, not twice.
- **WCAG:** 4.1.3.

### B5 — Radar chart

1. In the assessment overview, move to the maturity visualization.

- **Expected:** the chart is announced as an image named "Maturity level by dimension" with a
  description listing each dimension and its level.
- **Expected:** the raw axis labels and numbers are not read out individually.
- **WCAG:** 1.1.1 Non-text Content.

### B6 — Share dialog

1. Open the share panel.

- **Expected:** the dialog name is announced, along with the first control.
- **Expected:** the "Copy link" result ("Link copied to the clipboard") is announced.
- **WCAG:** 4.1.2, 4.1.3.

### B7 — Import error

1. Choose Import and select a file that is not assessment JSON (for example a text file).

- **Expected:** a plain-language error is announced ("That file could not be read as assessment
  data…"), not a silent failure or a browser alert.
- **WCAG:** 3.3.1 Error Identification, 4.1.3.

---

## C. Zoom and reflow

### C1 — 200% zoom

1. Set browser zoom to 200% at a 1280px wide window.
2. Visit the About page, the assessment overview, a dimension view, and the summary.

- **Expected:** no horizontal scrolling except the summary table; nothing is clipped or overlapping;
  text is not truncated.
- **WCAG:** 1.4.4 Resize Text, 1.4.10 Reflow.

### C2 — 320 CSS pixel width

1. Set the window to 320px wide (or 400% zoom at 1280px).

- **Expected:** content reflows into one column; the header buttons stack; the summary table is the
  only horizontally scrolling element.
- **WCAG:** 1.4.10.

### C3 — Text spacing

1. Apply the text-spacing bookmarklet (line height 1.5, paragraph spacing 2em, letter spacing
   0.12em, word spacing 0.16em).

- **Expected:** no content is cut off or overlapping.
- **WCAG:** 1.4.12 Text Spacing.

---

## D. Forced colours (Windows High Contrast)

### D1 — Controls remain visible

1. Enable a high-contrast theme in Windows and reload.

- **Expected:** buttons, cards, status pills, the table header and form fields keep visible
  boundaries; focus remains obvious.
- **Expected:** no text disappears against its background.
- **WCAG:** 1.4.11, 2.4.7.

### D2 — Charts and badges remain distinguishable

1. Look at the maturity badges, distribution bars and radar chart in forced colours.

- **Expected:** each still has a visible outline or a text label; nothing depends on the fill colour.
- **WCAG:** 1.4.1 Use of Color.

---

## E. Themes

### E1 — Contrast spot check

1. In both themes, inspect body text, muted text, links, footer links, badge text and button labels.

- **Expected:** nothing is washed out or invisible. Pay particular attention to the About page
  panel, the header and the footer, which historically failed.
- **WCAG:** 1.4.3, 1.4.11.

### E2 — System preference is honoured

1. Set the operating system to dark mode, clear site data, and reload.

- **Expected:** the dark theme is applied without a flash of the light theme.
- **WCAG:** 1.4.3 (supporting user preference); no specific SC requires this.

### E3 — The choice persists

1. Toggle the theme, reload, and reopen in a new tab.

- **Expected:** the chosen theme is kept; the toggle announces its state through `aria-pressed`.
- **WCAG:** 4.1.2.

---

## F. Forms and errors

### F1 — Required field is explained

1. Move to Organization Information.

- **Expected:** "Required field" is stated in text before the fields; the required input announces
  "required" and takes a programmatic label.
- **WCAG:** 3.3.2 Labels or Instructions.

### F2 — Add and remove team members

1. Type a name and press `Enter`; then add another and remove it with its button.

- **Expected:** `Enter` adds the name; the remove button is announced as "Remove <name>"; the list
  updates predictably.
- **WCAG:** 3.3.2, 4.1.2, 2.5.3.

### F3 — Reset confirmation

1. With data present, activate "New Assessment".

- **Expected:** an inline confirmation appears, focus moves to the confirm button, and `Cancel` returns
  focus without clearing anything.
- **Expected:** confirming clears the data and announces that it did.
- **WCAG:** 3.3.4 Error Prevention, 2.4.3.

---

## G. Dynamic content

### G1 — Optimize warning

1. In a dimension with open proof points, choose "Optimize".

- **Expected:** a visible message states that the model requires all applicable proof points to be
  complete at Optimize, and gives the count still open.
- **Expected:** the message disappears once the level changes or the points are completed.
- **WCAG:** 3.3.1, 4.1.3.

### G2 — Not applicable

1. Mark a proof point "Not applicable".

- **Expected:** its status buttons are replaced by "Marked not applicable…", not left as disabled
  controls; the completion denominator excludes it.
- **WCAG:** 1.3.1, 4.1.2.

### G3 — Evidence field

1. Mark a proof point Completed.

- **Expected:** an evidence field appears with a visible label and is reachable next in tab order.
- **WCAG:** 3.3.2, 1.3.1.

---

## H. Content

### H1 — Link text

1. Read each link out of context.

- **Expected:** every link makes sense alone; external links say they open in a new tab.
- **WCAG:** 2.4.4 Link Purpose, 2.4.6.

### H2 — Plain language

1. Read the About page and the "How to read this report" panel as if you were new to the model.

- **Expected:** no unexplained jargon; the difference between maturity and conformance is clear.
- **WCAG:** 3.1.5 Reading Level (AAA, advisory here), 3.3.2.

### H3 — Honest framing

1. Check the About page and the footer.

- **Expected:** the page states that this is an independent tool, that the AMM is a Group Note not
  endorsed by W3C, and that results are not a conformance claim or certification.
- **WCAG:** n/a (project requirement, see AGENTS.md).

---

## I. Print and export

### I1 — Print the summary

1. Complete all dimensions, open the summary, and print (or save as PDF).

- **Expected:** header actions, skip link and on-screen buttons are absent; link URLs are printed
  after their text; the table and headings remain legible in black on white.
- **WCAG:** n/a (project requirement).

### I2 — Export and re-import

1. Export the assessment JSON, reset, then import the file.

- **Expected:** organization details, statuses, evidence and levels are restored; the summary
  matches what you exported.
- **WCAG:** 3.3.4 (data integrity, not a WCAG requirement as such).

---

## After the pass

1. Fill in the **Manual test record** table in [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md).
2. Raise a GitHub issue for every Fail, link it in the table, and add the `accessibility` label.
3. Change the "Last accessibility review date" in [ACCESSIBILITY.md](./ACCESSIBILITY.md).
4. If a case is wrong, obsolete, or missing, update this script in the same pull request.
