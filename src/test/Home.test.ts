import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import axe from 'axe-core';
import Home from '../components/Home.svelte';
import { initialDimensions } from '../data/dimensionsData';

async function analyse(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } }
  });
  return results.violations.map((violation) => ({
    id: violation.id,
    nodes: violation.nodes.map((node) => node.target.join(' '))
  }));
}

describe('Home (About) page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has a single level-one heading with the model name', () => {
    render(Home);

    expect(screen.getByRole('heading', { level: 1, name: /accessibility maturity model/i })).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
  });

  it('links to the assessment tool from the hero and the closing section', () => {
    render(Home);

    const links = screen.getAllByRole('link', { name: /start the assessment/i });
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute('href', './tool.html'));
  });

  it('does not mount the assessment itself', () => {
    render(Home);

    expect(screen.queryByRole('group', { name: /assessment actions/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /export/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /import/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('offers the theme toggle', () => {
    render(Home);

    expect(screen.getByRole('button', { name: /dark mode/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('explains the tool and its limits without a disclosure toggle', () => {
    render(Home);

    expect(screen.getByText(/what this tool is, and is not/i)).toBeInTheDocument();
    expect(screen.getAllByText(/not endorsed by w3c or its members/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/initially developed against that Group Note/i).length).toBeGreaterThan(0);
  });

  it('lists every dimension', () => {
    render(Home);

    initialDimensions.forEach((dimension) => {
      expect(screen.getByRole('heading', { level: 3, name: dimension.name })).toBeInTheDocument();
    });
  });

  it('has a skip link pointing at a focusable main region', () => {
    render(Home);

    expect(document.querySelector('a.skip-link')).toHaveAttribute('href', '#main-content');
    expect(document.querySelector('#main-content')).toHaveAttribute('tabindex', '-1');
  });

  it('has no axe violations', async () => {
    const { container } = render(Home);

    expect(await analyse(container)).toEqual([]);
  });
});
