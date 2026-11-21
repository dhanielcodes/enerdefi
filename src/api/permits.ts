import type { PaginatedResponse, Permit, PermitFilters, PermitStats } from '@/types'
import { delay } from './delay'
import { storage } from './storage'

export const PERMITS_PAGE_SIZE = 8

export async function fetchPermits(filters: PermitFilters): Promise<PaginatedResponse<Permit>> {
  await delay()

  const searchTerm = filters.search.trim().toLowerCase()

  const matches = storage.getPermits().filter((permit) => {
    const matchesStatus = !filters.status || permit.status === filters.status
    const matchesSearch =
      permit.id.toLowerCase().includes(searchTerm) ||
      permit.projectName.toLowerCase().includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  const totalPages = Math.max(1, Math.ceil(matches.length / PERMITS_PAGE_SIZE))
  const page = Math.min(filters.page, totalPages)
  const start = (page - 1) * PERMITS_PAGE_SIZE

  return {
    items: matches.slice(start, start + PERMITS_PAGE_SIZE),
    page,
    totalPages,
    totalItems: matches.length,
  }
}

export async function fetchPermitStats(): Promise<PermitStats> {
  await delay(300)

  const permits = storage.getPermits()
  const countByStatus = (status: Permit['status']) =>
    permits.filter((permit) => permit.status === status).length

  return {
    total: permits.length,
    pending: countByStatus('Pending'),
    issued: countByStatus('Issued'),
    expired: countByStatus('Expired'),
  }
}
