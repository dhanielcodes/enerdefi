import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { PermitFilters } from '@/types'
import { fetchPermitStats, fetchPermits } from './permits'
import { fetchDraft } from './projects'

export const queryKeys = {
  permits: ['permits'] as const,
  draft: ['project-draft'] as const,
}

export function permitListQuery(filters: PermitFilters) {
  return queryOptions({
    queryKey: [...queryKeys.permits, 'list', filters],
    queryFn: () => fetchPermits(filters),
    placeholderData: keepPreviousData,
  })
}

export const permitStatsQuery = queryOptions({
  queryKey: [...queryKeys.permits, 'stats'],
  queryFn: fetchPermitStats,
})

export const draftQuery = queryOptions({
  queryKey: queryKeys.draft,
  queryFn: fetchDraft,
  staleTime: Infinity,
})
