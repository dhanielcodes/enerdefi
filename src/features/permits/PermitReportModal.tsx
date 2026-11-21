import { Eye, FileText } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDate, yearsBetween } from '@/lib/format'
import type { Permit } from '@/types'
import { downloadReport, previewReport } from './report'

interface PermitReportModalProps {
  permit: Permit | null
  onClose: () => void
}

export function PermitReportModal({ permit, onClose }: PermitReportModalProps) {
  return (
    <Modal isOpen={permit !== null} onClose={onClose} title="Permit & License Details">
      {permit && (
        <>
          <div className="-mt-4 mb-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">{permit.id}</p>
            <StatusBadge status={permit.status} />
          </div>

          <section className="rounded-xl bg-gray-50 p-4">
            <h3 className="mb-3 text-sm font-semibold">Project Information</h3>
            <dl className="grid grid-cols-2 gap-4">
              <Detail label="Project ID:">{permit.projectId}</Detail>
              <Detail label="Project Name:">{permit.projectName}</Detail>
              <Detail label="Reporting Period:">{permit.reportingPeriod}</Detail>
              <Detail label="Filing Type:">{permit.filingType}</Detail>
            </dl>
          </section>

          <section className="mt-3 rounded-xl bg-gray-50 p-4 text-sm">
            <h3 className="mb-3 font-semibold">Validity Period</h3>
            <dl className="space-y-2">
              <Row label="Issue Date:" value={formatDate(permit.issueDate)} />
              <Row label="Expiry Date:" value={formatDate(permit.expiryDate)} />
              <Row label="Validity:" value={`${yearsBetween(permit.issueDate, permit.expiryDate)} years`} />
            </dl>
          </section>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-50">
                <FileText className="size-4 text-brand-500" />
              </span>
              License.pdf
            </div>
            <button
              aria-label="Preview license"
              onClick={() => previewReport(permit)}
              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
            >
              <Eye className="size-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => downloadReport(permit)}>Download Report</Button>
          </div>
        </>
      )}
    </Modal>
  )
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="text-xs">
      <dt className="text-gray-500">{label}</dt>
      <dd className="mt-1 font-medium text-gray-900">{children}</dd>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900">{value}</dd>
    </div>
  )
}
