import clsx from 'clsx'
import type { PermitStatus } from '@/types'

const statusClasses: Record<PermitStatus, string> = {
  Pending: 'bg-amber-50 text-amber-600',
  Issued: 'bg-sky-50 text-sky-600',
  Expired: 'bg-red-50 text-red-600',
}

export function StatusBadge({ status }: { status: PermitStatus }) {
  return (
    <span className={clsx('rounded-md px-2.5 py-1 text-xs font-medium', statusClasses[status])}>
      {status}
    </span>
  )
}
