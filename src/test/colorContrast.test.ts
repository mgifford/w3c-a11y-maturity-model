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

describe('WCAG color contrast - OrganizationInfo btn-add', () => {
  const WHITE = '#ffffff';
  // Colors used by .btn-add in OrganizationInfo.svelte
  const BTN_ADD_BG = '#1a7a40';
  const BTN_ADD_HOVER_BG = '#155d30';

  it('btn-add background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_ADD_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('btn-add hover background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    const ratio = contrastRatio(BTN_ADD_HOVER_BG, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('old btn-add color #27ae60 fails contrast (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#27ae60', WHITE);
    expect(oldRatio).toBeLessThan(4.5);
  });

  it('old btn-add hover color #229954 fails contrast (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#229954', WHITE);
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

describe('WCAG color contrast - muted text color (#595959)', () => {
  const WHITE = '#ffffff';
  const LIGHT_BG = '#f5f7fa';
  // New accessible muted text color used in help-text, subtitle, stat-label, etc.
  const MUTED_TEXT = '#595959';

  it('muted text color meets WCAG 2.1 AA normal text contrast on white (4.5:1)', () => {
    const ratio = contrastRatio(MUTED_TEXT, WHITE);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('muted text color meets WCAG 2.1 AA normal text contrast on light background (4.5:1)', () => {
    const ratio = contrastRatio(MUTED_TEXT, LIGHT_BG);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('old muted text color #7f8c8d fails WCAG 2.1 AA contrast on white (documents the regression it prevents)', () => {
    const oldRatio = contrastRatio('#7f8c8d', WHITE);
    expect(oldRatio).toBeLessThan(4.5);
  });
});

describe('WCAG color contrast - maturity level badge/text colors', () => {
  const WHITE = '#ffffff';
  // Light background used in dimension bar items in MaturityVisualization
  const LIGHT_CARD_BG = '#f8f9fa';

  // Accessible maturity level colors used in MaturityVisualization, DimensionList, Summary
  const INACTIVE_COLOR = '#c62828';
  const LAUNCH_COLOR = '#b45309';
  const INTEGRATE_COLOR = '#1565c0';
  const OPTIMIZE_COLOR = '#2e7d32';
  const NOT_ASSESSED_COLOR = '#455a64';

  it('inactive color meets WCAG 2.1 AA contrast with white text (4.5:1)', () => {
    expect(contrastRatio(INACTIVE_COLOR, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('launch color meets WCAG 2.1 AA contrast with white text (4.5:1)', () => {
    expect(contrastRatio(LAUNCH_COLOR, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('integrate color meets WCAG 2.1 AA contrast with white text (4.5:1)', () => {
    expect(contrastRatio(INTEGRATE_COLOR, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('optimize color meets WCAG 2.1 AA contrast with white text (4.5:1)', () => {
    expect(contrastRatio(OPTIMIZE_COLOR, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('not-assessed color meets WCAG 2.1 AA contrast with white text (4.5:1)', () => {
    expect(contrastRatio(NOT_ASSESSED_COLOR, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('inactive color meets WCAG 2.1 AA contrast on light card background (4.5:1)', () => {
    expect(contrastRatio(INACTIVE_COLOR, LIGHT_CARD_BG)).toBeGreaterThanOrEqual(4.5);
  });

  it('launch color meets WCAG 2.1 AA contrast on light card background (4.5:1)', () => {
    expect(contrastRatio(LAUNCH_COLOR, LIGHT_CARD_BG)).toBeGreaterThanOrEqual(4.5);
  });

  it('integrate color meets WCAG 2.1 AA contrast on light card background (4.5:1)', () => {
    expect(contrastRatio(INTEGRATE_COLOR, LIGHT_CARD_BG)).toBeGreaterThanOrEqual(4.5);
  });

  it('optimize color meets WCAG 2.1 AA contrast on light card background (4.5:1)', () => {
    expect(contrastRatio(OPTIMIZE_COLOR, LIGHT_CARD_BG)).toBeGreaterThanOrEqual(4.5);
  });

  it('not-assessed color meets WCAG 2.1 AA contrast on light card background (4.5:1)', () => {
    expect(contrastRatio(NOT_ASSESSED_COLOR, LIGHT_CARD_BG)).toBeGreaterThanOrEqual(4.5);
  });

  // Document that old colors failed
  it('old not-assessed color #95a5a6 fails WCAG 2.1 AA contrast with white text', () => {
    expect(contrastRatio('#95a5a6', WHITE)).toBeLessThan(4.5);
  });

  it('old not-assessed color #e0e0e0 fails WCAG 2.1 AA contrast with white text', () => {
    expect(contrastRatio('#e0e0e0', WHITE)).toBeLessThan(4.5);
  });

  it('old inactive color #e74c3c fails WCAG 2.1 AA contrast with white text', () => {
    expect(contrastRatio('#e74c3c', WHITE)).toBeLessThan(4.5);
  });

  it('old launch color #f39c12 fails WCAG 2.1 AA contrast with white text', () => {
    expect(contrastRatio('#f39c12', WHITE)).toBeLessThan(4.5);
  });

  it('old integrate color #3498db fails WCAG 2.1 AA contrast with white text', () => {
    expect(contrastRatio('#3498db', WHITE)).toBeLessThan(4.5);
  });

  it('old optimize color #27ae60 fails WCAG 2.1 AA contrast with white text', () => {
    expect(contrastRatio('#27ae60', WHITE)).toBeLessThan(4.5);
  });
});

describe('WCAG color contrast - DimensionList btn-assess', () => {
  const WHITE = '#ffffff';
  const BTN_ASSESS_BG = '#1565c0';
  const BTN_ASSESS_HOVER_BG = '#0d47a1';

  it('btn-assess background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    expect(contrastRatio(BTN_ASSESS_BG, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('btn-assess hover background meets WCAG 2.1 AA normal text contrast (4.5:1)', () => {
    expect(contrastRatio(BTN_ASSESS_HOVER_BG, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it('old btn-assess color #3498db fails WCAG 2.1 AA contrast', () => {
    expect(contrastRatio('#3498db', WHITE)).toBeLessThan(4.5);
  });
});
