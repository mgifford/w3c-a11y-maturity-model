import type { Dimension } from '../types';

export const initialDimensions: Omit<Dimension, 'maturityLevel' | 'notes'>[] = [
  {
    id: 'communications',
    name: 'Communications',
    description: 'Information as it relates to an organization\'s accessibility, as well as accessibility of all internal/external communications.',
    proofPoints: [
      {
        id: 'comm-1',
        category: 'Foundation for Accessible Communication',
        description: 'Accessible corporate document templates',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-2',
        category: 'Foundation for Accessible Communication',
        description: 'Documented HTML or PDF conversion procedures to support accessibility features',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-3',
        category: 'Foundation for Accessible Communication',
        description: 'Processes, procedures, and requirements for creating accessible communications documented and available',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-4',
        category: 'Foundation for Accessible Communication',
        description: 'Accessible collaboration tools available (e-meeting, webinar, conferencing, chat)',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-5',
        category: 'Accessible Direct Communications',
        description: 'Accessible templates for marketing and sales materials',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-6',
        category: 'Accessible Direct Communications',
        description: 'Internal and external websites are accessible per regional requirements (WCAG)',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-7',
        category: 'Accessible Direct Communications',
        description: 'Website has accessibility statement',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-8',
        category: 'Accessible Direct Communications',
        description: 'Accessibility Conformance Reports (ACR) available and accessible',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-9',
        category: 'Accessible Direct Communications',
        description: 'Multimedia includes captions, transcripts, and described audio',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-10',
        category: 'Accessible Direct Communications',
        description: 'Feedback mechanism for handling accessibility questions and complaints',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-11',
        category: 'Accessible Communications Training',
        description: 'Training in place to build accessible communications skills',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-12',
        category: 'Dimension Goals and Metrics',
        description: 'Goals established, metrics defined, and progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  },
  {
    id: 'ict-lifecycle',
    name: 'ICT Development Lifecycle',
    description: 'Incorporation of web, software and hardware accessibility considerations in development processes.',
    proofPoints: [
      {
        id: 'ict-1',
        category: 'User Research',
        description: 'User research includes people with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-2',
        category: 'User Research',
        description: 'Research participants provided with accommodations (AT, time, virtual options)',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-3',
        category: 'User Research',
        description: 'Personas and journey maps include people with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-4',
        category: 'Planning and Design',
        description: 'Digital accessibility standards integrated into planning and design phases',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-5',
        category: 'Planning and Design',
        description: 'Designers have access to accessibility checklists and guidelines',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-6',
        category: 'Planning and Design',
        description: 'Accessibility reviews part of design process',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-7',
        category: 'Planning and Design',
        description: 'Design deliverables include accessibility annotations',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-8',
        category: 'Development',
        description: 'Accessible developer implementation resources available',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-9',
        category: 'Development',
        description: 'Developer accessibility checklists available',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-10',
        category: 'Development',
        description: 'Process to triage and prioritize fixing accessibility issues',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-11',
        category: 'Quality Review',
        description: 'Manual accessibility testing with assistive technology',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-12',
        category: 'Quality Review',
        description: 'Automated accessibility testing implemented',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-13',
        category: 'Quality Review',
        description: 'Accessibility identified as product release gate',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-14',
        category: 'Quality Review',
        description: 'ACRs created for COTS offerings',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-15',
        category: 'Training',
        description: 'ICT development and test training in place',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-16',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  },
  {
    id: 'knowledge-skills',
    name: 'Knowledge and Skills',
    description: 'Ongoing education and practices to fill gaps for accessibility operations.',
    proofPoints: [
      {
        id: 'ks-1',
        category: 'Assessing Skills',
        description: 'Organizational surveys identify current skill levels and gaps',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-2',
        category: 'Assessing Skills',
        description: 'Employee training for ICT accessibility skills tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-3',
        category: 'Assessing Skills',
        description: 'Certification or competency reviews and programs',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-4',
        category: 'Assessing Skills',
        description: 'Accessibility criteria in employee performance measurements',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-5',
        category: 'Building Capacity',
        description: 'Role-based training plans and curricula implemented',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-6',
        category: 'Building Capacity',
        description: 'External training resources procured as needed',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-7',
        category: 'Building Capacity',
        description: 'Accessibility training in organizational learning management systems',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-8',
        category: 'Building Capacity',
        description: 'Accessibility training when onboarding new employees',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-9',
        category: 'Building Capacity',
        description: 'Subject matter experts (SMEs) positioned to provide training',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-10',
        category: 'Building Capacity',
        description: 'Digital accessibility events organized or attended',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-11',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  },
  {
    id: 'oversight-culture',
    name: 'Oversight and Culture',
    description: 'Attitudes, sensitivity, and behaviors around accessibility, including perception and decision-making.',
    proofPoints: [
      {
        id: 'oc-1',
        category: 'Organizational Culture',
        description: 'Executive sponsor in place for digital accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-2',
        category: 'Organizational Culture',
        description: 'Executive-level digital accessibility program leadership',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-3',
        category: 'Organizational Culture',
        description: 'Executive statement of commitment to digital accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-4',
        category: 'Financial Commitment',
        description: 'Financial plan developed for activities to advance maturity',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-5',
        category: 'Financial Commitment',
        description: 'Funding committed for activities to advance maturity',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-6',
        category: 'ICT Accessibility Policy',
        description: 'Business strategy includes digital accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-7',
        category: 'ICT Accessibility Policy',
        description: 'Digital accessibility included in core values',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-8',
        category: 'ICT Accessibility Policy',
        description: 'Digital accessibility in code of conduct',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-9',
        category: 'ICT Accessibility Policy',
        description: 'ICT accessibility in employee performance objectives',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-10',
        category: 'ICT Accessibility Policy',
        description: 'Exception/risk acceptance process with executive approval',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-11',
        category: 'Training',
        description: 'Accessibility-related training in place',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-12',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  },
  {
    id: 'personnel',
    name: 'Personnel',
    description: 'Job descriptions, recruiting, and disability-related employee resource groups.',
    proofPoints: [
      {
        id: 'pers-1',
        category: 'Targeted Recruiting',
        description: 'Established goals for recruiting employees with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-2',
        category: 'Targeted Recruiting',
        description: 'Recruiting needs assessment/gap analysis completed',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-3',
        category: 'Targeted Recruiting',
        description: 'Initiatives to recruit employees with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-4',
        category: 'Accessible Job Application',
        description: 'Hiring tools and job boards meet accessibility standards',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-5',
        category: 'Accessible Job Application',
        description: 'Recruiting communications meet accessibility standards',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-6',
        category: 'Accessible Job Application',
        description: 'Accessibility audit of jobs website completed',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-7',
        category: 'Strategic Engagement',
        description: 'Employee resource group (ERG) for employees with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-8',
        category: 'Strategic Engagement',
        description: 'Product and project focus groups of employees with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-9',
        category: 'Strategic Engagement',
        description: 'Mentoring program for employees with disabilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-10',
        category: 'Strategic Engagement',
        description: 'Employee performance evaluated against accessibility responsibilities',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-11',
        category: 'Training',
        description: 'Accessibility training in place',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-12',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  },
  {
    id: 'procurement',
    name: 'Procurement',
    description: 'Strategic process for finding and acquiring accessible products and services.',
    proofPoints: [
      {
        id: 'proc-1',
        category: 'Policy Documentation',
        description: 'Published ICT Accessibility Procurement Policy',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-2',
        category: 'Policy Documentation',
        description: 'Accessibility requirements communicated to vendors',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-3',
        category: 'Procurement Language',
        description: 'Standardized solicitation language includes accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-4',
        category: 'Procurement Language',
        description: 'Standardized contract language includes accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-5',
        category: 'Evaluation Process',
        description: 'Accessibility evaluations performed on solicitation responses',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-6',
        category: 'Evaluation Process',
        description: 'Documented evaluation methodology',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-7',
        category: 'Contract Language',
        description: 'Vendor accessibility testing requirements',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-8',
        category: 'Contract Language',
        description: 'Warranties and remedies section includes accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-9',
        category: 'Contract Language',
        description: 'Vendor corrective actions and remediation plans',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-10',
        category: 'Program Management',
        description: 'Contract lifecycle management includes accessibility',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-11',
        category: 'Program Management',
        description: 'Process for addressing user accessibility complaints with vendors',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-12',
        category: 'Training',
        description: 'Procurement training in place',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-13',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Accessibility assistance provided to internal employees and external customers with disabilities.',
    proofPoints: [
      {
        id: 'supp-1',
        category: 'Employee Support',
        description: 'Written policy on requesting and providing employee accommodations',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-2',
        category: 'Employee Support',
        description: 'Disability-focused employee resource group (ERG) with executive sponsorship',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-3',
        category: 'Employee Support',
        description: 'Support for use of assistive technology',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-4',
        category: 'Organizational Support',
        description: 'Policies and procedures for providing accessible service',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-5',
        category: 'Organizational Support',
        description: 'Information presented in plain language',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-6',
        category: 'Organizational Support',
        description: 'Support mechanisms are accessible',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-7',
        category: 'Organizational Support',
        description: 'Accessibility knowledge base within internal resources',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-8',
        category: 'Organizational Support',
        description: 'Mechanism to capture accessibility feedback',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-9',
        category: 'External Support',
        description: 'Publicly available accessible digital accessibility statement',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-10',
        category: 'External Support',
        description: 'Written policy on customer accommodations',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-11',
        category: 'External Support',
        description: 'Accessibility documentation for external use',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-12',
        category: 'Training',
        description: 'Accessibility training in place',
        completed: false,
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-13',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        completed: false,
        evidence: '',
        notApplicable: false
      }
    ]
  }
];
