export type PageItem = number | 'ellipsis'

export function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const isNearStart = currentPage <= 3
  const isNearEnd = currentPage >= totalPages - 2

  if (isNearStart || isNearEnd) {
    return [1, 2, 3, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages]
}
