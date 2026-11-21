import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/format'
import type { Permit } from '@/types'

const columns = ['Issue Date', 'Permit ID', 'Project', 'Class', 'Expiry Date', 'Status', '']

interface PermitsTableProps {
  permits: Permit[]
  isLoading: boolean
  onViewDetails: (permit: Permit) => void
}

export function PermitsTable({ permits, isLoading, onViewDetails }: PermitsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[760px] text-left text-sm whitespace-nowrap">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {isLoading &&
            Array.from({ length: 8 }, (_, index) => (
              <tr key={index}>
                <td colSpan={columns.length} className="px-4 py-3">
                  <div className="h-8 animate-pulse rounded bg-gray-100" />
                </td>
              </tr>
            ))}

          {!isLoading && permits.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                No permits match your filters.
              </td>
            </tr>
          )}

          {!isLoading &&
            permits.map((permit) => (
              <tr key={permit.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600 italic">{formatDate(permit.issueDate)}</td>
                <td className="px-4 py-3">{permit.id}</td>
                <td className="px-4 py-3">{permit.projectName}</td>
                <td className="px-4 py-3">{permit.permitClass}</td>
                <td className="px-4 py-3 text-gray-600 italic">{formatDate(permit.expiryDate)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={permit.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="secondary" className="px-3 py-1.5" onClick={() => onViewDetails(permit)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
