import type { Permit, PermitStatus } from '@/types'

const projectNames = [
  'Solar Farm Alpha',
  'Sahara Solar Farm Phase 1',
  'Niger Delta Gas Hub',
  'Kano Wind Corridor',
  'Lagos Mini-Grid',
  'Ogun Biomass Plant',
  'Kaduna Hydro Station',
  'Rivers LNG Terminal',
  'Abuja Solar Rooftops',
  'Enugu Power Substation',
]

const permitClasses = ['Production', 'Exploration', 'Generation', 'Distribution', 'Transmission']
const filingTypes = ['ESG', 'Environmental', 'Operational', 'Safety']
const statusPattern: PermitStatus[] = ['Pending', 'Issued', 'Issued', 'Issued', 'Expired']

export function createSeedPermits(count = 76): Permit[] {
  return Array.from({ length: count }, (_, index) => {
    const number = String(count - index).padStart(3, '0')
    const status = statusPattern[index % statusPattern.length]

    const issueYear = 2022 + (index % 3)
    const issueMonth = index % 12
    const issueDate = new Date(issueYear, issueMonth, (index % 27) + 1)

    const validityInYears = status === 'Expired' ? 1 : 5
    const expiryDate = new Date(issueDate)
    expiryDate.setFullYear(issueYear + validityInYears)

    return {
      id: `PRM-${issueYear}-${number}`,
      projectId: `PRJ-${number}`,
      projectName: projectNames[(index * 3) % projectNames.length],
      permitClass: permitClasses[Math.floor(index / 2) % permitClasses.length],
      filingType: filingTypes[index % filingTypes.length],
      reportingPeriod: `${issueYear}-${String(issueMonth + 1).padStart(2, '0')}`,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status,
    }
  })
}
