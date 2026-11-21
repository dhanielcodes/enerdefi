import clsx from 'clsx'
import { getPageItems } from '@/lib/pagination'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pageButtonClass = 'rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 sm:gap-6">
      <button className={pageButtonClass} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>

      <ol className="hidden items-center gap-1 sm:flex">
        {getPageItems(page, totalPages).map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="px-2 text-sm text-gray-500">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
                className={clsx(
                  'size-9 rounded-lg text-sm',
                  item === page ? 'bg-brand-50 font-semibold text-brand-500' : 'text-gray-600 hover:bg-gray-100',
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ol>

      <span className="text-sm text-gray-600 sm:hidden">
        {page} / {totalPages}
      </span>

      <button
        className={pageButtonClass}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  )
}
