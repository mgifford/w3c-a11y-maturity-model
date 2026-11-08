import { describe, it, expect } from 'vitest';
import { initialDimensions } from '../data/dimensionsData';
import type { MaturityLevel } from '../types';
import { MATURITY_LEVELS } from '../types';

describe('dimensionsData - Data Structure Integrity', () => {
  it('exports exactly 7 dimensions', () => {
    expect(initialDimensions).toHaveLength(7);
    expect(initialDimensions.reduce((n, d) => n + d.proofPoints.length, 0)).toBe(105);
  });

  it('every dimension has a unique id', () => {
    const ids = initialDimensions.map(d => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(initialDimensions.length);
  });

  it('every dimension has a non-empty name', () => {
    initialDimensions.forEach(dim => {
      expect(dim.name).toBeTruthy();
      expect(typeof dim.name).toBe('string');
    });
  });

  it('every dimension has a non-empty description', () => {
    initialDimensions.forEach(dim => {
      expect(dim.description).toBeTruthy();
      expect(typeof dim.description).toBe('string');
    });
  });

  it('every dimension has at least one proof point', () => {
    initialDimensions.forEach(dim => {
      expect(dim.proofPoints.length).toBeGreaterThan(0);
    });
  });

  it('every proof point has a unique id within its dimension', () => {
    initialDimensions.forEach(dim => {
      const ids = dim.proofPoints.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(dim.proofPoints.length);
    });
  });

  it('every proof point id is unique across all dimensions', () => {
    const allIds = initialDimensions.flatMap(d => d.proofPoints.map(p => p.id));
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it('every proof point has required fields', () => {
    initialDimensions.forEach(dim => {
      dim.proofPoints.forEach(pp => {
        expect(pp.id).toBeTruthy();
        expect(pp.category).toBeTruthy();
        expect(pp.description).toBeTruthy();
        expect(typeof pp.status).toBe('string');
        expect(typeof pp.evidence).toBe('string');
        expect(typeof pp.notApplicable).toBe('boolean');
      });
    });
  });

  it('all proof points start with status not-started and applicable', () => {
    initialDimensions.forEach(dim => {
      dim.proofPoints.forEach(pp => {
        expect(pp.status).toBe('not-started');
        expect(pp.notApplicable).toBe(false);
        expect(pp.evidence).toBe('');
      });
    });
  });

  it('uses the model dimension ids and order', () => {
    expect(initialDimensions.map((d) => d.id)).toEqual([
      'communications',
      'governance-oversight',
      'ict-lifecycle',
      'knowledge-skills',
      'personnel',
      'procurement',
      'support'
    ]);
  });

  it('uses the model dimension names', () => {
    expect(initialDimensions.map((d) => d.name)).toEqual([
      'Communications',
      'Governance and Oversight',
      'ICT Development Lifecycle',
      'Knowledge and Skills',
      'Personnel',
      'Procurement',
      'Support'
    ]);
  });

  it('includes the proof point categories defined by the model', () => {
    const categoriesFor = (id: string) =>
      Array.from(new Set(
        initialDimensions.find((d) => d.id === id)!.proofPoints.map((p) => p.category)
      ));

    expect(categoriesFor('governance-oversight')).toEqual([
      'Accountability',
      'Financial Commitment',
      'Policy',
      'General Training',
      'Dimension Goals and Metrics',
      'Continuity'
    ]);
    expect(categoriesFor('ict-lifecycle')).toContain('User Experience');
    expect(categoriesFor('knowledge-skills')).toContain('Dimension Integration');
    expect(categoriesFor('support')).toContain('External Support');
  });

  it('includes the 2026 continuity proof points', () => {
    const governance = initialDimensions.find((d) => d.id === 'governance-oversight')!;
    const continuity = governance.proofPoints.filter((p) => p.category === 'Continuity');
    expect(continuity.length).toBeGreaterThanOrEqual(4);
    expect(continuity.some((p) => /single points of failure/i.test(p.description))).toBe(true);
    expect(continuity.some((p) => /records of accessibility decisions/i.test(p.description))).toBe(true);
  });

  it('every proof point category is non-empty', () => {
    initialDimensions.forEach(dim => {
      dim.proofPoints.forEach(pp => {
        expect(pp.category).toBeTruthy();
        expect(pp.category.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('MATURITY_LEVELS - Constants', () => {
  it('exports exactly 4 maturity levels', () => {
    expect(MATURITY_LEVELS).toHaveLength(4);
  });

  it('contains inactive, launch, integrate, optimize levels', () => {
    const levels = MATURITY_LEVELS.map(m => m.level);
    expect(levels).toContain('inactive');
    expect(levels).toContain('launch');
    expect(levels).toContain('integrate');
    expect(levels).toContain('optimize');
  });

  it('every maturity level has a label and description', () => {
    MATURITY_LEVELS.forEach(ml => {
      expect(ml.label).toBeTruthy();
      expect(ml.description).toBeTruthy();
    });
  });

  it('maturity level ids are in order: inactive, launch, integrate, optimize', () => {
    expect(MATURITY_LEVELS[0].level).toBe('inactive');
    expect(MATURITY_LEVELS[1].level).toBe('launch');
    expect(MATURITY_LEVELS[2].level).toBe('integrate');
    expect(MATURITY_LEVELS[3].level).toBe('optimize');
  });
});
