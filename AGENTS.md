# AGENTS.md

## Project Purpose
The W3C Accessibility Maturity Model project is a public-facing resource that helps organizations understand, assess, and discuss their level of accessibility maturity across people, process, and technology.

The goal is to support reflection, planning, and improvement. It is not an audit tool, certification scheme, or compliance determination mechanism.

Outputs produced by this project are informational and advisory. They must not be presented as formal accessibility conformance claims or as a substitute for expert review.

## Audience and Responsibility
This project is intended for:
- Accessibility practitioners
- Digital teams and leadership
- Policy and governance stakeholders

The material supports structured discussion and self-assessment. Final responsibility for interpretation, prioritization, and action rests with the organization and its accessibility experts.

The project must not present itself as an official W3C standard unless explicitly and formally designated as such.

## Scope
The project consists of:
- A conceptual accessibility maturity model
- Descriptive criteria and guidance
- A static HTML/CSS/JS interface for exploring the model
- Optional tools for visualization or self-assessment

No scoring or classification produced by the UI should be treated as authoritative or definitive.

## Conceptual Integrity
The maturity model must remain:
- Explanatory rather than prescriptive
- Comparative rather than judgmental
- Focused on progress over pass/fail outcomes

Language must avoid implying that higher maturity guarantees accessibility or legal compliance.

## UI Contract
The UI must:
- Clearly explain what the model is and is not
- Make assumptions explicit
- Allow users to explore dimensions without forcing conclusions
- Avoid presenting results as grades, certifications, or rankings

If self-assessment interactions exist:
- Users must be able to revise inputs
- Results must be contextualized with limitations
- No automatic persistence without user intent

## Accessibility Position
Accessibility is a core requirement for this project.

The project aims to follow WCAG 2.2 AA patterns where feasible, but does not claim formal conformance.

Accessibility work prioritizes:
- Clear structure and readable content
- Keyboard access to all interactive elements
- Understandable language and instructions
- Perceivable updates when content changes

Known accessibility gaps must be documented rather than hidden.

## Accessibility Expectations (Minimum Bar)

### Structure and Semantics
- Use semantic HTML and landmarks (`header`, `main`, `nav`, `footer`).
- One `<h1>` per page with logical heading hierarchy.
- Lists, tables, and definitions used appropriately for conceptual content.

### Keyboard and Focus
- All interactive controls must be keyboard operable.
- Focus order must follow logical reading order.
- Focus indicators must remain visible.

### Labels, Instructions, and Feedback
- All form elements have programmatic labels.
- Instructions and help text are associated with controls.
- Interactive feedback is provided in text, not color alone.

### Dynamic Content
- Changes triggered by interaction are perceivable.
- Use appropriate ARIA live regions where needed.
- Avoid unexpected context changes.

### Cognitive Accessibility
- Avoid unnecessary jargon.
- Prefer plain language explanations.
- Break complex ideas into manageable sections.

## Error Handling and Reliability
- The UI must not fail silently.
- Invalid or incomplete input must be clearly explained.
- Unexpected errors must be surfaced in plain language.

## Data Handling and Privacy
- Do not collect or transmit personal data unless explicitly documented.
- Any client-side storage must be optional and explained.
- No analytics or tracking by default.

## Dependencies
- Prefer minimal, stable dependencies.
- Avoid external scripts with unclear provenance.
- Document any third-party libraries or frameworks used.
- Do not commit secrets or API keys.

## Testing Expectations
Manual testing is required for meaningful changes:
- Keyboard navigation walkthrough
- Focus visibility verification
- Content readability review
- Zoom testing up to 200%
- Basic screen reader spot check for key flows

Automated testing is encouraged but does not replace manual review.

## Contribution Standards
Pull requests should include:
- A clear description of the change
- Notes on content or conceptual impact
- Notes on accessibility impact
- Documentation of known limitations or trade-offs

## Definition of Done
A change is complete only when:
- The conceptual intent of the model is preserved
- UI behavior is predictable and understandable
- Accessibility has not regressed
- Limitations and assumptions are explicit
- The project remains honest about what it does and does not provide

This project values clarity, accessibility, and integrity over simplification or false certainty.
