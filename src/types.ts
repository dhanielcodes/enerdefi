export type PermitStatus = 'Pending' | 'Issued' | 'Expired'

export const permitStatuses: PermitStatus[] = ['Pending', 'Issued', 'Expired']

export interface Permit {
  id: string
  projectId: string
  projectName: string
  permitClass: string
  filingType: string
  reportingPeriod: string
  issueDate: string
  expiryDate: string
  status: PermitStatus
}

export interface PermitStats {
  total: number
  pending: number
  issued: number
  expired: number
}

export interface PermitFilters {
  page: number
  search: string
  status?: PermitStatus
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  totalPages: number
  totalItems: number
}

export interface UploadedDocument {
  name: string
  fileName: string
  size: number
}
