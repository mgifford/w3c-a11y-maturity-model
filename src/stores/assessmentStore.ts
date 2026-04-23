import { writable, derived } from 'svelte/store';
import type { Assessment, Dimension, MaturityLevel, ProofPoint, ProofPointStatus } from '../types';
import { initialDimensions } from '../data/dimensionsData';

/** Migrate proof points saved before the multi-status feature was added. */
function migrateProofPoint(pp: any): ProofPoint {
  if (pp.status !== undefined) return pp as ProofPoint;
  return {
    id: pp.id,
    category: pp.category,
    description: pp.description,
    status: pp.completed ? 'completed' : 'not-started',
    evidence: pp.evidence ?? '',
    notApplicable: pp.notApplicable ?? false
  };
}

function migrateAssessment(data: any): Assessment {
  return {
    ...data,
    dimensions: (data.dimensions ?? []).map((d: any) => ({
      ...d,
      proofPoints: (d.proofPoints ?? []).map(migrateProofPoint)
    }))
  };
}

export function createAssessmentStore() {
  const storedData = localStorage.getItem('a11y-assessment');
  
  const initialAssessment: Assessment = storedData ? migrateAssessment(JSON.parse(storedData)) : {
    id: crypto.randomUUID(),
    organizationName: '',
    assessmentDate: new Date().toISOString().split('T')[0],
    assessors: [],
    dimensions: initialDimensions.map(d => ({
      ...d,
      maturityLevel: null,
      notes: ''
    })),
    overallNotes: ''
  };

  const { subscribe, set, update } = writable<Assessment>(initialAssessment);

  // Auto-save to localStorage
  subscribe(value => {
    localStorage.setItem('a11y-assessment', JSON.stringify(value));
  });

  return {
    subscribe,
    set,
    update,
    updateOrganizationInfo: (organizationName: string, assessors: string[]) => {
      update(a => ({ ...a, organizationName, assessors }));
    },
    updateDimension: (dimensionId: string, updates: Partial<Dimension>) => {
      update(a => ({
        ...a,
        dimensions: a.dimensions.map(d => 
          d.id === dimensionId ? { ...d, ...updates } : d
        )
      }));
    },
    toggleProofPoint: (dimensionId: string, proofPointId: string) => {
      update(a => ({
        ...a,
        dimensions: a.dimensions.map(d => 
          d.id === dimensionId ? {
            ...d,
            proofPoints: d.proofPoints.map(p =>
              p.id === proofPointId
                ? { ...p, status: p.status === 'completed' ? 'not-started' : 'completed' }
                : p
            )
          } : d
        )
      }));
    },
    setProofPointStatus: (dimensionId: string, proofPointId: string, status: ProofPointStatus) => {
      update(a => ({
        ...a,
        dimensions: a.dimensions.map(d =>
          d.id === dimensionId ? {
            ...d,
            proofPoints: d.proofPoints.map(p =>
              p.id === proofPointId ? { ...p, status } : p
            )
          } : d
        )
      }));
    },
    toggleNotApplicable: (dimensionId: string, proofPointId: string) => {
      update(a => ({
        ...a,
        dimensions: a.dimensions.map(d => 
          d.id === dimensionId ? {
            ...d,
            proofPoints: d.proofPoints.map(p =>
              p.id === proofPointId ? { 
                ...p, 
                notApplicable: !p.notApplicable,
                status: p.notApplicable ? p.status : 'not-started'
              } : p
            )
          } : d
        )
      }));
    },
    updateProofPointEvidence: (dimensionId: string, proofPointId: string, evidence: string) => {
      update(a => ({
        ...a,
        dimensions: a.dimensions.map(d => 
          d.id === dimensionId ? {
            ...d,
            proofPoints: d.proofPoints.map(p =>
              p.id === proofPointId ? { ...p, evidence } : p
            )
          } : d
        )
      }));
    },
    setMaturityLevel: (dimensionId: string, level: MaturityLevel) => {
      update(a => ({
        ...a,
        dimensions: a.dimensions.map(d => 
          d.id === dimensionId ? { ...d, maturityLevel: level } : d
        )
      }));
    },
    reset: () => {
      const newAssessment: Assessment = {
        id: crypto.randomUUID(),
        organizationName: '',
        assessmentDate: new Date().toISOString().split('T')[0],
        assessors: [],
        dimensions: initialDimensions.map(d => ({
          ...d,
          maturityLevel: null,
          notes: ''
        })),
        overallNotes: ''
      };
      set(newAssessment);
    },
    exportData: () => {
      let assessment: Assessment | null = null;
      const unsubscribe = subscribe(a => { assessment = a; });
      unsubscribe();
      return JSON.stringify(assessment, null, 2);
    },
    importData: (jsonData: string) => {
      try {
        const imported = JSON.parse(jsonData);
        set(migrateAssessment(imported));
        return true;
      } catch (e) {
        console.error('Failed to import data:', e);
        return false;
      }
    }
  };
}

export const assessmentStore = createAssessmentStore();

export const progress = derived(
  assessmentStore,
  $assessment => {
    const total = $assessment.dimensions.length;
    const completed = $assessment.dimensions.filter(d => d.maturityLevel !== null).length;
    return { completed, total, percentage: (completed / total) * 100 };
  }
);

export const hasContent = derived(
  assessmentStore,
  $a => {
    if ($a.organizationName.trim()) return true;
    if ($a.overallNotes.trim()) return true;
    if ($a.assessors.some(n => n && n.trim())) return true;
    for (const d of $a.dimensions) {
      if (d.maturityLevel !== null) return true;
      if (d.notes && d.notes.trim()) return true;
      if (d.proofPoints.some(p => p.status !== 'not-started' || p.notApplicable || (p.evidence && p.evidence.trim()))) return true;
    }
    return false;
  }
);
