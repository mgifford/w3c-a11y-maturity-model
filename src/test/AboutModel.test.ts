import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AboutModel from '../components/AboutModel.svelte';

describe('AboutModel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders an About the model heading', () => {
    render(AboutModel);

    expect(screen.getByRole('heading', { level: 2, name: /about the model/i })).toBeInTheDocument();
  });

  it('describes the model in one short paragraph', () => {
    render(AboutModel);

    expect(screen.getByText(/seven dimensions, each assessed against four maturity levels/i)).toBeInTheDocument();
  });

  it('states the Group Note version and publisher', () => {
    render(AboutModel);

    expect(screen.getByText(/4 November 2025/)).toBeInTheDocument();
    expect(screen.getByText(/accessible platform architectures/i)).toBeInTheDocument();
  });

  it('says it was initially developed against the Group Note', () => {
    render(AboutModel);

    expect(screen.getByText(/initially developed against that group note/i)).toBeInTheDocument();
    expect(screen.getByText(/30 September 2026/)).toBeInTheDocument();
  });

  it('names where it follows the editor\u2019s draft', () => {
    render(AboutModel);

    expect(screen.getByText(/governance and oversight/i)).toBeInTheDocument();
    expect(screen.getByText(/continuity additions/i)).toBeInTheDocument();
  });

  it('states that it is not a W3C product or endorsed by W3C', () => {
    render(AboutModel);

    expect(screen.getByText(/not a w3c product/i)).toBeInTheDocument();
    expect(screen.getByText(/not endorsed by w3c or its members/i)).toBeInTheDocument();
    expect(screen.getByText(/not a recommendation or a standard/i)).toBeInTheDocument();
  });

  it('states that it is not a conformance test or certification', () => {
    render(AboutModel);

    expect(screen.getByText(/not a conformance test, audit, certification/i)).toBeInTheDocument();
    expect(screen.getByText(/complements accessibility conformance testing/i)).toBeInTheDocument();
  });

  it('links to the Group Note and the editor\u2019s draft, warning about new tabs', () => {
    render(AboutModel);

    const note = screen.getByRole('link', { name: /the group note/i });
    expect(note).toHaveAttribute('href', 'https://www.w3.org/TR/maturity-model/');
    expect(note.textContent).toMatch(/opens in a new tab/i);

    const draft = screen.getByRole('link', { name: /the current editor's draft/i });
    expect(draft).toHaveAttribute('href', 'https://w3c.github.io/maturity-model/');
    expect(draft.textContent).toMatch(/opens in a new tab/i);
  });

  it('has no collapse control, so the limits are always visible', () => {
    render(AboutModel);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('uses a flat list rather than nested sections', () => {
    render(AboutModel);

    expect(screen.getAllByRole('heading')).toHaveLength(2);
    expect(document.querySelectorAll('ul.facts li')).toHaveLength(4);
  });
});
