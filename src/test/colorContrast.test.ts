import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Contrast tests that read the real design tokens from src/app.css.
 *
 * The previous version of this suite asserted hard-coded hex pairs, so it kept
 * passing while the stylesheet drifted away from it. These tests fail when the
 * stylesheet stops meeting WCAG 2.2 AA.
 */

const css = readFileSync(resolve(process.cwd(), 'src/app.css'), 'utf8');

function themeTokens(anchor: string): Record<string, string> {
  const anchorIndex = css.indexOf(anchor);
  if (anchorIndex === -1) throw new Error(`Theme anchor not found: ${anchor}`);
  const open = css.indexOf('{', anchorIndex);
  const close = css.indexOf('}', open);
  const block = css.slice(open + 1, close);
  const map: Record<string, string> = {};
  for (const match of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    map[match[1]] = match[2].trim();
  }
  return map;
}

const light = themeTokens("[data-theme='light']");
const dark = themeTokens("[data-theme='dark']");

function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Resolve a token name to its hex value for the given theme. */
function token(theme: Record<string, string>, name: string): string {
  const value = theme[name];
  if (!value) throw new Error(`Missing token ${name}`);
  return value;
}

type Pair = [foreground: string, background: string, minimum: number, description: string];

const TEXT = 4.5;
const LARGE_OR_UI = 3;

const pairs: Pair[] = [
  ['--color-text', '--color-bg', TEXT, 'body text on page background'],
  ['--color-text', '--color-surface', TEXT, 'body text on cards'],
  ['--color-text-muted', '--color-surface', TEXT, 'muted text on cards'],
  ['--color-text-muted', '--color-surface-alt', TEXT, 'muted text on alt surfaces'],
  ['--color-heading', '--color-surface', TEXT, 'headings on cards'],
  ['--color-link', '--color-surface', TEXT, 'links on cards'],
  ['--color-link', '--color-bg', TEXT, 'links on page background'],
  ['--color-footer-text', '--color-footer-bg', TEXT, 'footer text'],
  ['--color-footer-link', '--color-footer-bg', TEXT, 'footer links'],
  ['--color-header-text', '--color-header-bg-start', TEXT, 'header text (gradient start)'],
  ['--color-header-text', '--color-header-bg-end', TEXT, 'header text (gradient end)'],
  ['#ffffff', '--color-intro-from', TEXT, 'introduction text (gradient start)'],
  ['#ffffff', '--color-intro-to', TEXT, 'introduction text (gradient end)'],
  ['--color-intro-link', '--color-intro-from', TEXT, 'introduction links (gradient start)'],
  ['--color-intro-link', '--color-intro-to', TEXT, 'introduction links (gradient end)'],
  ['--color-btn-secondary-bg', '#ffffff', TEXT, 'secondary button label'],
  ['--color-btn-secondary-hover', '#ffffff', TEXT, 'secondary button hover label'],
  ['--color-btn-danger-bg', '#ffffff', TEXT, 'danger button label'],
  ['--color-btn-danger-hover', '#ffffff', TEXT, 'danger button hover label'],
  ['--color-banner-from', '#ffffff', TEXT, 'completion banner label (gradient start)'],
  ['--color-banner-to', '#ffffff', TEXT, 'completion banner label (gradient end)'],
  ['--color-accent-green', '--color-surface', TEXT, 'green action label on cards'],
  ['--color-level-inactive', '#ffffff', TEXT, 'Inactive badge'],
  ['--color-level-launch', '#ffffff', TEXT, 'Launch badge'],
  ['--color-level-integrate', '#ffffff', TEXT, 'Integrate badge'],
  ['--color-level-optimize', '#ffffff', TEXT, 'Optimize badge'],
  ['--color-level-none', '#ffffff', TEXT, 'Not assessed badge'],
  ['--color-accent-blue', '--color-progress-track', LARGE_OR_UI, 'progress fill against track'],
  ['--color-accent-green', '--color-progress-track', LARGE_OR_UI, 'proof point fill against track'],
  ['--color-focus', '--color-surface', LARGE_OR_UI, 'focus ring on cards'],
  ['--color-focus', '--color-bg', LARGE_OR_UI, 'focus ring on page background'],
  ['--color-focus-on-dark', '--color-footer-bg', LARGE_OR_UI, 'focus ring on footer'],
  ['--color-table-head-text', '--color-table-head-bg', TEXT, 'table header text']
];

describe.each([
  ['light', light],
  ['dark', dark]
])('%s theme', (name, theme) => {
  it('defines every token used by the other theme', () => {
    const extra = Object.keys(theme).filter((key) => !(key in (name === 'light' ? dark : light)));
    expect(extra).toEqual([]);
  });

  it.each(pairs)(
    '%s on %s meets %s:1 (%s)',
    (foreground, background, minimum, _description) => {
      const fg = foreground.startsWith('#') ? foreground : token(theme, foreground);
      const bg = background.startsWith('#') ? background : token(theme, background);
      expect(contrast(fg, bg)).toBeGreaterThanOrEqual(minimum);
    }
  );
});

describe('token hygiene', () => {
  it('every token value is a hex colour', () => {
    for (const [key, value] of Object.entries({ ...light, ...dark })) {
      expect(value, `${key} should be a hex colour`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it('the footer link is not the light-theme body link colour', () => {
    // The regression behind the open accessibility issue: #0066cc on #2c3e50
    // is 1.97:1.
    expect(light['--color-footer-link']).not.toBe(light['--color-link']);
  });
});
