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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-2',
        category: 'Foundation for Accessible Communication',
        description: 'Documented HTML or PDF conversion procedures to support accessibility features',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-3',
        category: 'Foundation for Accessible Communication',
        description: 'Processes, procedures, and requirements for creating accessible communications documented and available',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-4',
        category: 'Foundation for Accessible Communication',
        description: 'Accessible collaboration tools available (e-meeting, webinar, conferencing, chat)',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-5',
        category: 'Accessible Direct Communications',
        description: 'Accessible templates for marketing and sales materials',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-6',
        category: 'Accessible Direct Communications',
        description: 'Internal and external websites are accessible per regional requirements (WCAG)',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-7',
        category: 'Accessible Direct Communications',
        description: 'Website has accessibility statement',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-8',
        category: 'Accessible Direct Communications',
        description: 'Accessibility Conformance Reports (ACR) available and accessible',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-9',
        category: 'Accessible Direct Communications',
        description: 'Multimedia includes captions, transcripts, and described audio',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-10',
        category: 'Accessible Direct Communications',
        description: 'Feedback mechanism for handling accessibility questions and complaints',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-11',
        category: 'Accessible Communications Training',
        description: 'Training in place to build accessible communications skills',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'comm-12',
        category: 'Dimension Goals and Metrics',
        description: 'Goals established, metrics defined, and progress tracked',
        status: 'not-started',
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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-2',
        category: 'User Research',
        description: 'Research participants provided with accommodations (AT, time, virtual options)',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-3',
        category: 'User Research',
        description: 'Personas and journey maps include people with disabilities',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-4',
        category: 'Planning and Design',
        description: 'Digital accessibility standards integrated into planning and design phases',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-5',
        category: 'Planning and Design',
        description: 'Designers have access to accessibility checklists and guidelines',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-6',
        category: 'Planning and Design',
        description: 'Accessibility reviews part of design process',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-7',
        category: 'Planning and Design',
        description: 'Design deliverables include accessibility annotations',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-8',
        category: 'Development',
        description: 'Accessible developer implementation resources available',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-9',
        category: 'Development',
        description: 'Developer accessibility checklists available',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-10',
        category: 'Development',
        description: 'Process to triage and prioritize fixing accessibility issues',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-11',
        category: 'Quality Review',
        description: 'Manual accessibility testing with assistive technology',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-12',
        category: 'Quality Review',
        description: 'Automated accessibility testing implemented',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-13',
        category: 'Quality Review',
        description: 'Accessibility identified as product release gate',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-14',
        category: 'Quality Review',
        description: 'ACRs created for COTS offerings',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-15',
        category: 'Training',
        description: 'ICT development and test training in place',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ict-16',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        status: 'not-started',
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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-2',
        category: 'Assessing Skills',
        description: 'Employee training for ICT accessibility skills tracked',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-3',
        category: 'Assessing Skills',
        description: 'Certification or competency reviews and programs',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-4',
        category: 'Assessing Skills',
        description: 'Accessibility criteria in employee performance measurements',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-5',
        category: 'Building Capacity',
        description: 'Role-based training plans and curricula implemented',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-6',
        category: 'Building Capacity',
        description: 'External training resources procured as needed',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-7',
        category: 'Building Capacity',
        description: 'Accessibility training in organizational learning management systems',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-8',
        category: 'Building Capacity',
        description: 'Accessibility training when onboarding new employees',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-9',
        category: 'Building Capacity',
        description: 'Subject matter experts (SMEs) positioned to provide training',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-10',
        category: 'Building Capacity',
        description: 'Digital accessibility events organized or attended',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'ks-11',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        status: 'not-started',
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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-2',
        category: 'Organizational Culture',
        description: 'Executive-level digital accessibility program leadership',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-3',
        category: 'Organizational Culture',
        description: 'Executive statement of commitment to digital accessibility',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-4',
        category: 'Financial Commitment',
        description: 'Financial plan developed for activities to advance maturity',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-5',
        category: 'Financial Commitment',
        description: 'Funding committed for activities to advance maturity',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-6',
        category: 'ICT Accessibility Policy',
        description: 'Business strategy includes digital accessibility',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-7',
        category: 'ICT Accessibility Policy',
        description: 'Digital accessibility included in core values',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-8',
        category: 'ICT Accessibility Policy',
        description: 'Digital accessibility in code of conduct',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-9',
        category: 'ICT Accessibility Policy',
        description: 'ICT accessibility in employee performance objectives',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-10',
        category: 'ICT Accessibility Policy',
        description: 'Exception/risk acceptance process with executive approval',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-11',
        category: 'Training',
        description: 'Accessibility-related training in place',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'oc-12',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        status: 'not-started',
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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-2',
        category: 'Targeted Recruiting',
        description: 'Recruiting needs assessment/gap analysis completed',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-3',
        category: 'Targeted Recruiting',
        description: 'Initiatives to recruit employees with disabilities',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-4',
        category: 'Accessible Job Application',
        description: 'Hiring tools and job boards meet accessibility standards',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-5',
        category: 'Accessible Job Application',
        description: 'Recruiting communications meet accessibility standards',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-6',
        category: 'Accessible Job Application',
        description: 'Accessibility audit of jobs website completed',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-7',
        category: 'Strategic Engagement',
        description: 'Employee resource group (ERG) for employees with disabilities',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-8',
        category: 'Strategic Engagement',
        description: 'Product and project focus groups of employees with disabilities',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-9',
        category: 'Strategic Engagement',
        description: 'Mentoring program for employees with disabilities',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-10',
        category: 'Strategic Engagement',
        description: 'Employee performance evaluated against accessibility responsibilities',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-11',
        category: 'Training',
        description: 'Accessibility training in place',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'pers-12',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        status: 'not-started',
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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-2',
        category: 'Policy Documentation',
        description: 'Accessibility requirements communicated to vendors',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-3',
        category: 'Procurement Language',
        description: 'Standardized solicitation language includes accessibility',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-4',
        category: 'Procurement Language',
        description: 'Standardized contract language includes accessibility',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-5',
        category: 'Evaluation Process',
        description: 'Accessibility evaluations performed on solicitation responses',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-6',
        category: 'Evaluation Process',
        description: 'Documented evaluation methodology',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-7',
        category: 'Contract Language',
        description: 'Vendor accessibility testing requirements',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-8',
        category: 'Contract Language',
        description: 'Warranties and remedies section includes accessibility',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-9',
        category: 'Contract Language',
        description: 'Vendor corrective actions and remediation plans',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-10',
        category: 'Program Management',
        description: 'Contract lifecycle management includes accessibility',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-11',
        category: 'Program Management',
        description: 'Process for addressing user accessibility complaints with vendors',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-12',
        category: 'Training',
        description: 'Procurement training in place',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'proc-13',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        status: 'not-started',
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
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-2',
        category: 'Employee Support',
        description: 'Disability-focused employee resource group (ERG) with executive sponsorship',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-3',
        category: 'Employee Support',
        description: 'Support for use of assistive technology',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-4',
        category: 'Organizational Support',
        description: 'Policies and procedures for providing accessible service',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-5',
        category: 'Organizational Support',
        description: 'Information presented in plain language',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-6',
        category: 'Organizational Support',
        description: 'Support mechanisms are accessible',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-7',
        category: 'Organizational Support',
        description: 'Accessibility knowledge base within internal resources',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-8',
        category: 'Organizational Support',
        description: 'Mechanism to capture accessibility feedback',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-9',
        category: 'External Support',
        description: 'Publicly available accessible digital accessibility statement',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-10',
        category: 'External Support',
        description: 'Written policy on customer accommodations',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-11',
        category: 'External Support',
        description: 'Accessibility documentation for external use',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-12',
        category: 'Training',
        description: 'Accessibility training in place',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      },
      {
        id: 'supp-13',
        category: 'Goals and Metrics',
        description: 'Goals established, metrics defined, progress tracked',
        status: 'not-started',
        evidence: '',
        notApplicable: false
      }
    ]
  }
];
