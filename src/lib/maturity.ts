import type { MaturityLevel } from '../types';
import { MATURITY_LEVELS } from '../types';

/**
 * The model this tool implements.
 *
 * Keep this in sync with the published W3C Group Note. See README.md for the
 * sync procedure and src/data/dimensionsData.ts for the proof points.
 */
export const MODEL = {
  name: 'Accessibility Maturity Model',
  acronym: 'AMM',
  version: 'W3C Group Note, 4 November 2025',
  publisher: 'W3C Accessible Platform Architectures (APA) Working Group',
  url: 'https://www.w3.org/TR/maturity-model/',
  editorDraftUrl: 'https://w3c.github.io/maturity-model/',
  syncedThrough: "editor's draft, 30 September 2026",
} as const;

/** Colour token for a maturity level, resolved through CSS custom properties. */
export function levelColor(level: MaturityLevel | null): string {
  switch (level) {
    case 'inactive':
      return 'var(--color-level-inactive)';
    case 'launch':
      return 'var(--color-level-launch)';
    case 'integrate':
      return 'var(--color-level-integrate)';
    case 'optimize':
      return 'var(--color-level-optimize)';
    default:
      return 'var(--color-level-none)';
  }
}

/** Human-readable label for a maturity level. */
export function levelLabel(level: MaturityLevel | null): string {
  if (!level) return 'Not Assessed';
  return MATURITY_LEVELS.find((m) => m.level === level)?.label ?? 'Not Assessed';
}
