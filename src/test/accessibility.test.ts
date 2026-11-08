import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import App from '../App.svelte';
import { assessmentStore } from '../stores/assessmentStore';

/**
 * Automated ARIA / structure checks on the rendered application.
 *
 * jsdom has no layout engine, so colour-contrast is covered separately by
 * colorContrast.test.ts (which reads the real design tokens) and by manual
 * review. Everything axe can determine from the DOM is checked here.
 */
async function analyse(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false }
    }
  });
  return results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.map((node) => node.target.join(' '))
  }));
}

describe('rendered application accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
    assessmentStore.reset();
  });

  it('has no axe violations on the overview', async () => {
    const { container } = render(App);
    expect(await analyse(container)).toEqual([]);
  });

  it('has no axe violations on a dimension detail view', async () => {
    const { container, getByRole } = render(App);

    await getByRole('button', { name: /assess communications/i }).click();

    expect(await analyse(container)).toEqual([]);
  });

  it('skip link points at a focusable main region', () => {
    render(App);

    const skipLink = document.querySelector('a.skip-link');
    expect(skipLink).toHaveAttribute('href', '#main-content');

    const main = document.querySelector('#main-content');
    expect(main).not.toBeNull();
    expect(main).toHaveAttribute('tabindex', '-1');
  });

  it('keeps a single level-one heading as the user moves between views', async () => {
    const { getByRole } = render(App);

    expect(document.querySelectorAll('h1')).toHaveLength(1);

    await getByRole('button', { name: /assess communications/i }).click();

    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(document.querySelectorAll('h2').length).toBeGreaterThan(0);
  });
});
