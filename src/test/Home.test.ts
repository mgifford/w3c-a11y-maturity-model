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

  it('points at the W3C and GitHub sources', () => {
    render(Home);

    expect(screen.getByRole('heading', { level: 2, name: /start with the source/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /w3c group note/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /source repository/i })).toBeInTheDocument();
  });

  it('explains the tool and its limits', () => {
    render(Home);

    expect(screen.getByRole('heading', { level: 2, name: /about this tool/i })).toBeInTheDocument();
    expect(screen.getAllByText(/not a w3c product/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/initially developed against that group note/i).length).toBeGreaterThan(0);
  });

  it('lists every dimension as a short index', () => {
    render(Home);

    const names = Array.from(document.querySelectorAll('.dimension-names li')).map((item) =>
      item.textContent?.trim()
    );
    expect(names).toEqual(initialDimensions.map((dimension) => dimension.name));
  });

  it('names the four maturity levels', () => {
    render(Home);

    expect(screen.getByText(/inactive, launch, integrate and optimize/i)).toBeInTheDocument();
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
