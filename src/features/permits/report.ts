import { formatDate, yearsBetween } from '@/lib/format'
import type { Permit } from '@/types'

function buildReportText(permit: Permit) {
  return [
    'EnerDeFi — Permit & License Details',
    '',
    `Permit ID:        ${permit.id}`,
    `Status:           ${permit.status}`,
    '',
    'Project Information',
    `Project ID:       ${permit.projectId}`,
    `Project Name:     ${permit.projectName}`,
    `Permit Class:     ${permit.permitClass}`,
    `Reporting Period: ${permit.reportingPeriod}`,
    `Filing Type:      ${permit.filingType}`,
    '',
    'Validity Period',
    `Issue Date:       ${formatDate(permit.issueDate)}`,
    `Expiry Date:      ${formatDate(permit.expiryDate)}`,
    `Validity:         ${yearsBetween(permit.issueDate, permit.expiryDate)} years`,
  ].join('\n')
}

function createReportUrl(permit: Permit) {
  const blob = new Blob([buildReportText(permit)], { type: 'text/plain' })
  return URL.createObjectURL(blob)
}

export function downloadReport(permit: Permit) {
  const url = createReportUrl(permit)
  const link = document.createElement('a')
  link.href = url
  link.download = `${permit.id}-report.txt`
  link.click()
  URL.revokeObjectURL(url)
}

export function previewReport(permit: Permit) {
  window.open(createReportUrl(permit), '_blank', 'noopener')
}
