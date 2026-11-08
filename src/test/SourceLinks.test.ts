import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import axe from 'axe-core';
import SourceLinks from '../components/SourceLinks.svelte';

describe('SourceLinks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows a Start with the source heading', () => {
    render(SourceLinks);

    expect(screen.getByRole('heading', { level: 2, name: /start with the source/i })).toBeInTheDocument();
  });

  it('links to the Group Note and the editor\u2019s draft', () => {
    render(SourceLinks);

    expect(screen.getByRole('link', { name: /w3c group note/i })).toHaveAttribute(
      'href',
      'https://www.w3.org/TR/maturity-model/'
    );
    expect(screen.getByRole('link', { name: /editor's draft/i })).toHaveAttribute(
      'href',
      'https://w3c.github.io/maturity-model/'
    );
  });

  it('links to the model on GitHub, its issue tracker, and the working group', () => {
    render(SourceLinks);

    expect(screen.getByRole('link', { name: /source repository/i })).toHaveAttribute(
      'href',
      'https://github.com/w3c/maturity-model'
    );
    expect(screen.getByRole('link', { name: /issues and comments/i })).toHaveAttribute(
      'href',
      'https://github.com/w3c/maturity-model/issues'
    );
    expect(screen.getByRole('link', { name: /apa working group/i })).toHaveAttribute(
      'href',
      'https://www.w3.org/groups/wg/apa/'
    );
  });

  it('links to the assessment spreadsheet', () => {
    render(SourceLinks);

    expect(screen.getByRole('link', { name: /assessment spreadsheet/i })).toHaveAttribute(
      'href',
      'https://w3c.github.io/maturity-model/AssessmentTool.xlsx'
    );
  });

  it('opens every source in a new tab and says so', () => {
    render(SourceLinks);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(6);
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.textContent).toMatch(/opens in a new tab/i);
    });
  });

  it('explains what each source is for', () => {
    render(SourceLinks);

    expect(screen.getByText(/authoritative description of the seven dimensions/i)).toBeInTheDocument();
    expect(screen.getByText(/changes in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/experimental prototype/i)).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(SourceLinks);
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
