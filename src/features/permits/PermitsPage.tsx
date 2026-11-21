import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { permitListQuery } from '@/api/queries'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button, buttonClasses } from '@/components/ui/Button'
import { SelectInput } from '@/components/ui/SelectInput'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import { permitStatuses, type Permit, type PermitStatus } from '@/types'
import { Pagination } from './Pagination'
import { PermitReportModal } from './PermitReportModal'
import { PermitsTable } from './PermitsTable'
import { StatCards } from './StatCards'

export function PermitsPage() {
  const { page = 1, search = '', status } = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })

  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebouncedValue(searchInput)
  const [selectedPermit, setSelectedPermit] = useState<Permit | null>(null)

  const { data, isPending, isError, isPlaceholderData, refetch } = useQuery(
    permitListQuery({ page, search, status }),
  )

  useEffect(() => {
    if (debouncedSearch === search) return
    navigate({
      search: (previous) => ({ ...previous, search: debouncedSearch || undefined, page: undefined }),
      replace: true,
    })
  }, [debouncedSearch, search, navigate])

  function changeStatus(value: string) {
    navigate({
      search: (previous) => ({
        ...previous,
        status: (value || undefined) as PermitStatus | undefined,
        page: undefined,
      }),
    })
  }

  function changePage(nextPage: number) {
    navigate({ search: (previous) => ({ ...previous, page: nextPage }) })
  }

  return (
    <>
      <PageHeader title="Permits & Licenses" />

      <div className="space-y-5 p-4 sm:p-6 lg:p-8">
        <StatCards />

        <section className="space-y-5 rounded-2xl bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-brand-500">
              <Search className="size-5 text-gray-400" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search by permit ID or project"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </label>

            <div className="flex gap-3">
              <SelectInput
                aria-label="Filter by status"
                value={status ?? ''}
                onChange={(event) => changeStatus(event.target.value)}
                options={permitStatuses}
                placeholder="Status: All"
                className="border-transparent bg-gray-100 font-medium"
              />
              <Link to="/projects/new" className={buttonClasses('primary', 'shrink-0')}>
                Create Project
              </Link>
            </div>
          </div>

          {isError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm">
              <p className="text-red-700">We couldn’t load permits.</p>
              <Button variant="secondary" className="mt-3" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : (
            <div className={isPlaceholderData ? 'opacity-60 transition-opacity' : undefined}>
              <PermitsTable
                permits={data?.items ?? []}
                isLoading={isPending}
                onViewDetails={setSelectedPermit}
              />
            </div>
          )}

          {data && data.totalItems > 0 && (
            <Pagination page={data.page} totalPages={data.totalPages} onPageChange={changePage} />
          )}
        </section>
      </div>

      <PermitReportModal permit={selectedPermit} onClose={() => setSelectedPermit(null)} />
    </>
  )
}
