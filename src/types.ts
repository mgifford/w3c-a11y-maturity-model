export type MaturityLevel = 'inactive' | 'launch' | 'integrate' | 'optimize';

export interface ProofPoint {
  id: string;
  category: string;
  description: string;
  completed: boolean;
  evidence: string;
  notApplicable: boolean;
}

export interface Dimension {
  id: string;
  name: string;
  description: string;
  maturityLevel: MaturityLevel | null;
  proofPoints: ProofPoint[];
  notes: string;
}

export interface Assessment {
  id: string;
  organizationName: string;
  assessmentDate: string;
  assessors: string[];
  dimensions: Dimension[];
  overallNotes: string;
}

export const MATURITY_LEVELS: { level: MaturityLevel; label: string; description: string }[] = [
  {
    level: 'inactive',
    label: 'Inactive',
    description: 'Little to no awareness, activity, or recognition of need.'
  },
  {
    level: 'launch',
    label: 'Launch',
    description: 'Recognized need in the organization. Planning initiated, but activities not well organized.'
  },
  {
    level: 'integrate',
    label: 'Integrate',
    description: 'Roadmap in place, overall organizational approach defined and well organized.'
  },
  {
    level: 'optimize',
    label: 'Optimize',
    description: 'Incorporated into the whole organization, consistently evaluated, and actions taken on assessment outcomes.'
  }
];
