import { describe, it, expect } from 'vitest';
import { initialDimensions } from '../data/dimensionsData';
import type { MaturityLevel } from '../types';
import { MATURITY_LEVELS } from '../types';

describe('dimensionsData - Data Structure Integrity', () => {
  it('exports exactly 7 dimensions', () => {
    expect(initialDimensions).toHaveLength(7);
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
        expect(typeof pp.completed).toBe('boolean');
        expect(typeof pp.evidence).toBe('string');
        expect(typeof pp.notApplicable).toBe('boolean');
      });
    });
  });

  it('all proof points start uncompleted and applicable', () => {
    initialDimensions.forEach(dim => {
      dim.proofPoints.forEach(pp => {
        expect(pp.completed).toBe(false);
        expect(pp.notApplicable).toBe(false);
        expect(pp.evidence).toBe('');
      });
    });
  });

  it('includes the expected dimension ids', () => {
    const ids = initialDimensions.map(d => d.id);
    expect(ids).toContain('communications');
    expect(ids).toContain('ict-lifecycle');
    expect(ids).toContain('knowledge-skills');
    expect(ids).toContain('oversight-culture');
    expect(ids).toContain('personnel');
    expect(ids).toContain('procurement');
    expect(ids).toContain('support');
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
