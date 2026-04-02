import { describe, it, expect } from 'vitest';

/**
 * Calculates the relative luminance of an sRGB color per WCAG 2.x spec.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const linearize = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Calculates the WCAG contrast ratio between two hex colors.
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('WCAG color contrast - Header btn-secondary', () => {
  const WHITE = '#ffffff';
  // Colors used by .btn-secondary in Header.svelte
  const BTN_SECONDARY_BG = '#2471a3';
  const BTN_SECONDARY_HOVER_BG = '#1a5c8a';

  it('btn-secondary background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_SECONDARY_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('btn-secondary hover background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_SECONDARY_HOVER_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('old btn-secondary color #3498db fails contrast (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#3498db', WHITE);
    expect(oldRatio).toBeLessThan(4.5);
  });
});

describe('WCAG color contrast - Summary btn-primary and btn-secondary', () => {
  const WHITE = '#ffffff';
  // Colors used by .btn-primary and .btn-secondary in Summary.svelte
  const BTN_PRIMARY_BG = '#2471a3';
  const BTN_PRIMARY_HOVER_BG = '#1a5c8a';
  const BTN_SECONDARY_BG = '#546475';
  const BTN_SECONDARY_HOVER_BG = '#435262';

  it('btn-primary background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_PRIMARY_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('btn-primary hover background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_PRIMARY_HOVER_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('btn-secondary background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_SECONDARY_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('btn-secondary hover background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_SECONDARY_HOVER_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('old btn-primary color #3498db fails contrast (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#3498db', WHITE);
    expect(oldRatio).toBeLessThan(4.5);
  });

  it('old btn-secondary color #95a5a6 fails contrast (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#95a5a6', WHITE);
    expect(oldRatio).toBeLessThan(4.5);
  });
});

describe('WCAG color contrast - SocialShare btn-primary', () => {
  const WHITE = '#ffffff';
  // Colors used by .btn-primary in SocialShare.svelte
  const BTN_PRIMARY_BG = '#2471a3';

  it('btn-primary background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_PRIMARY_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('old btn-primary color #3498db fails contrast (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#3498db', WHITE);
    expect(oldRatio).toBeLessThan(4.5);
  });
});
