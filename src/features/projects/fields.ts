import type { UploadedDocument } from '@/types'

export type StepId =
  | 'overview'
  | 'technical'
  | 'finance'
  | 'esg'
  | 'investment'
  | 'assessment'
  | 'documents'
  | 'legal'

export const steps: { id: StepId; label: string }[] = [
  { id: 'overview', label: 'Project Overview' },
  { id: 'technical', label: 'Technical & Financial' },
  { id: 'finance', label: 'Finance' },
  { id: 'esg', label: 'ESG' },
  { id: 'investment', label: 'Investment' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'documents', label: 'Document' },
  { id: 'legal', label: 'Legal & Compliance' },
]

type FieldKind =
  | 'text'
  | 'email'
  | 'number'
  | 'date'
  | 'url'
  | 'textarea'
  | 'select'
  | 'upload'
  | 'yesNo'
  | 'category'

type FormValues = Record<string, string | undefined>

interface FieldConfig {
  label: string
  step: StepId
  kind: FieldKind
  placeholder?: string
  options?: string[] | ((values: FormValues) => string[])
  dependsOn?: string
  required?: boolean
  recommended?: boolean
}

export const projectCategories = ['Renewable', 'Oil & Gas', 'Power']

const projectTypesByCategory: Record<string, string[]> = {
  Renewable: ['Solar PV', 'Wind', 'Hydro', 'Biomass', 'Mini-grid'],
  'Oil & Gas': ['Upstream', 'Midstream', 'Downstream', 'Gas Processing', 'LNG'],
  Power: ['Generation', 'Transmission', 'Distribution', 'Substation'],
}

const statesByCountry: Record<string, string[]> = {
  Nigeria: ['Lagos', 'Abuja (FCT)', 'Rivers', 'Kano', 'Ogun', 'Kaduna', 'Delta', 'Enugu'],
  Ghana: ['Greater Accra', 'Ashanti', 'Western', 'Northern'],
  Kenya: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
  'South Africa': ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'],
}

export const fields = {
  category: { label: 'Project Category', step: 'overview', kind: 'category', required: true },
  projectName: {
    label: 'Project Name/Title',
    step: 'overview',
    kind: 'text',
    placeholder: 'eg: ECG Solar Farms',
    required: true,
  },
  country: {
    label: 'Country/Region',
    step: 'overview',
    kind: 'select',
    options: Object.keys(statesByCountry),
    required: true,
  },
  projectType: {
    label: 'Project type',
    step: 'overview',
    kind: 'select',
    options: (values) => projectTypesByCategory[values.category ?? ''] ?? [],
    dependsOn: 'category',
    required: true,
  },
  state: {
    label: 'State/LGA',
    step: 'overview',
    kind: 'select',
    options: (values) => statesByCountry[values.country ?? ''] ?? [],
    dependsOn: 'country',
    required: true,
  },
  sector: {
    label: 'Sector',
    step: 'overview',
    kind: 'select',
    options: ['Utility-scale', 'Commercial & Industrial', 'Residential', 'Public Sector', 'Agriculture'],
    required: true,
  },
  siteAddress: {
    label: 'Site/Location/Address',
    step: 'overview',
    kind: 'text',
    placeholder: 'Enter address',
    required: true,
  },
  projectSummary: {
    label: 'Project Summary',
    step: 'overview',
    kind: 'textarea',
    placeholder: 'Enter a description...',
    recommended: true,
  },

  companyName: {
    label: 'Company Name',
    step: 'overview',
    kind: 'text',
    placeholder: 'Enter Company Name',
    required: true,
  },
  registrationNumber: {
    label: 'Company Registration No.',
    step: 'overview',
    kind: 'text',
    placeholder: 'Enter Registration Number',
    required: true,
  },
  entityType: {
    label: 'Corporate Entity Type',
    step: 'overview',
    kind: 'select',
    placeholder: 'Select Entity type',
    options: [
      'Private Limited Company',
      'Public Limited Company',
      'Partnership',
      'Joint Venture',
      'Government Agency',
    ],
    required: true,
  },
  registeredAddress: {
    label: 'Registered Address',
    step: 'overview',
    kind: 'text',
    placeholder: 'Enter address',
    required: true,
  },
  incorporationDate: {
    label: 'Date of Incorporation',
    step: 'overview',
    kind: 'date',
    recommended: true,
  },
  taxId: {
    label: 'Tax Identification Number (TIN/VAT)',
    step: 'overview',
    kind: 'text',
    placeholder: 'Enter TIN',
    required: true,
  },
  jurisdiction: {
    label: 'Jurisdiction of Incorporation',
    step: 'overview',
    kind: 'text',
    placeholder: 'Country/State/Province',
    recommended: true,
  },
  contactName: {
    label: 'Full Name',
    step: 'overview',
    kind: 'text',
    placeholder: 'Enter full legal name',
    required: true,
  },
  contactEmail: {
    label: 'Email Address',
    step: 'overview',
    kind: 'email',
    placeholder: 'Enter email address',
    required: true,
  },
  ownershipStructure: {
    label: 'Ownership structure',
    step: 'overview',
    kind: 'upload',
    required: true,
  },
  boardOfDirectors: {
    label: 'Board of Directors & Key Management',
    step: 'overview',
    kind: 'upload',
  },
  trackRecordDocuments: {
    label: 'Track Record (relevant project experience, references)',
    step: 'overview',
    kind: 'upload',
  },
  auditedFinancials: {
    label: 'Audited Financial Statements (last 2–3 years)',
    step: 'overview',
    kind: 'upload',
    recommended: true,
  },
  complianceDeclaration: {
    label: 'Compliance Declarations',
    step: 'overview',
    kind: 'yesNo',
    required: true,
  },
  litigationHistory: {
    label: 'Litigation history, ESG compliance history, Sanctions/PEP screening result',
    step: 'overview',
    kind: 'upload',
  },

  completedProjects: {
    label: 'No. of Completed Projects',
    step: 'overview',
    kind: 'number',
    placeholder: 'Eg: 5',
    recommended: true,
  },
  caseStudyUrl: {
    label: 'Case Study URL / Upload',
    step: 'overview',
    kind: 'url',
    placeholder: 'Paste Case study URL',
  },
  deployedCapacity: {
    label: 'Total Deployed Capacity (MW/MMBTU)',
    step: 'overview',
    kind: 'number',
    placeholder: 'Eg: 5',
    recommended: true,
  },
  caseStudyFile: {
    label: 'Or simply upload Case Study here',
    step: 'overview',
    kind: 'upload',
  },

  installedCapacity: {
    label: 'Installed Capacity (MW)',
    step: 'technical',
    kind: 'number',
    placeholder: 'Eg: 50',
    required: true,
  },
  technology: {
    label: 'Technology',
    step: 'technical',
    kind: 'select',
    options: ['Solar PV', 'Wind Turbines', 'Gas Turbine', 'Hydro Turbine', 'Battery Storage'],
    required: true,
  },
  gridConnection: {
    label: 'Grid Connection',
    step: 'technical',
    kind: 'select',
    options: ['On-grid', 'Off-grid', 'Hybrid'],
    required: true,
  },
  operationDate: {
    label: 'Expected Commercial Operation Date',
    step: 'technical',
    kind: 'date',
    recommended: true,
  },
  technicalDescription: {
    label: 'Technical Description',
    step: 'technical',
    kind: 'textarea',
    placeholder: 'Describe the equipment, layout and operating model...',
    recommended: true,
  },

  totalProjectCost: {
    label: 'Total Project Cost',
    step: 'finance',
    kind: 'number',
    placeholder: 'Eg: 2500000',
    required: true,
  },
  fundingCurrency: {
    label: 'Funding Currency',
    step: 'finance',
    kind: 'select',
    options: ['NGN', 'USD', 'EUR'],
    required: true,
  },
  fundingRequired: {
    label: 'Funding Required',
    step: 'finance',
    kind: 'number',
    placeholder: 'Eg: 1000000',
    required: true,
  },
  debtEquityRatio: {
    label: 'Debt to Equity Ratio',
    step: 'finance',
    kind: 'text',
    placeholder: 'Eg: 70:30',
    recommended: true,
  },
  financialModel: {
    label: 'Financial Model',
    step: 'finance',
    kind: 'upload',
    recommended: true,
  },

  environmentalImpact: {
    label: 'Environmental Impact Summary',
    step: 'esg',
    kind: 'textarea',
    placeholder: 'Summarise the expected environmental impact...',
    required: true,
  },
  communityEngagement: {
    label: 'Community Engagement Plan',
    step: 'esg',
    kind: 'textarea',
    placeholder: 'How will host communities be engaged?',
    recommended: true,
  },
  carbonReduction: {
    label: 'Estimated Carbon Reduction (tCO2e/year)',
    step: 'esg',
    kind: 'number',
    placeholder: 'Eg: 1200',
    recommended: true,
  },
  esgReport: {
    label: 'ESG Report',
    step: 'esg',
    kind: 'upload',
  },

  investmentType: {
    label: 'Investment Type',
    step: 'investment',
    kind: 'select',
    options: ['Debt', 'Equity', 'Grant', 'Blended Finance'],
    required: true,
  },
  expectedIrr: {
    label: 'Expected IRR (%)',
    step: 'investment',
    kind: 'number',
    placeholder: 'Eg: 14',
    required: true,
  },
  paybackPeriod: {
    label: 'Payback Period (years)',
    step: 'investment',
    kind: 'number',
    placeholder: 'Eg: 7',
    recommended: true,
  },
  minimumTicket: {
    label: 'Minimum Ticket Size',
    step: 'investment',
    kind: 'number',
    placeholder: 'Eg: 50000',
  },

  feasibilityStudy: {
    label: 'Feasibility Study',
    step: 'assessment',
    kind: 'upload',
    required: true,
  },
  riskSummary: {
    label: 'Key Risks',
    step: 'assessment',
    kind: 'textarea',
    placeholder: 'List the main technical, financial and political risks...',
    required: true,
  },
  mitigationPlan: {
    label: 'Mitigation Plan',
    step: 'assessment',
    kind: 'textarea',
    placeholder: 'How will these risks be managed?',
    recommended: true,
  },

  businessPlan: {
    label: 'Business Plan',
    step: 'documents',
    kind: 'upload',
    required: true,
  },
  siteLayout: {
    label: 'Site Layout / Drawings',
    step: 'documents',
    kind: 'upload',
  },
  landTitle: {
    label: 'Land Title / Lease Agreement',
    step: 'documents',
    kind: 'upload',
    recommended: true,
  },

  permitClass: {
    label: 'Permit Class',
    step: 'legal',
    kind: 'select',
    options: ['Production', 'Exploration', 'Generation', 'Distribution', 'Transmission'],
    required: true,
  },
  filingType: {
    label: 'Filing Type',
    step: 'legal',
    kind: 'select',
    options: ['ESG', 'Environmental', 'Operational', 'Safety'],
    required: true,
  },
  regulator: {
    label: 'Regulator',
    step: 'legal',
    kind: 'select',
    options: ['NUPRC', 'NMDPRA', 'NERC', 'NESREA'],
    required: true,
  },
  legalNotes: {
    label: 'Additional Notes',
    step: 'legal',
    kind: 'textarea',
    placeholder: 'Anything the regulator should know...',
    recommended: true,
  },
} satisfies Record<string, FieldConfig>

export type FieldName = keyof typeof fields

export interface ProjectDraft {
  values: Partial<Record<FieldName, string>>
  documents: Partial<Record<FieldName, UploadedDocument>>
  savedAt: string | null
}

export const fieldNames = Object.keys(fields) as FieldName[]

export function getField(name: FieldName): FieldConfig {
  return fields[name]
}

export function getStepFields(stepId: StepId) {
  return fieldNames.filter((name) => fields[name].step === stepId)
}

export function getFieldOptions(name: FieldName, values: FormValues) {
  const { options = [] } = getField(name)
  return typeof options === 'function' ? options(values) : options
}

export function createEmptyDraft(): ProjectDraft {
  return {
    values: { category: 'Oil & Gas', country: 'Nigeria', complianceDeclaration: 'Yes' },
    documents: {},
    savedAt: null,
  }
}
