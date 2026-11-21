import type { ProjectDraft } from '@/features/projects/fields'
import { addYears } from '@/lib/format'
import type { Permit, UploadedDocument } from '@/types'
import { delay } from './delay'
import { storage } from './storage'

export async function fetchDraft(): Promise<ProjectDraft> {
  await delay(300)
  return storage.getDraft()
}

export async function saveDraft(draft: ProjectDraft): Promise<ProjectDraft> {
  await delay()
  const savedDraft = { ...draft, savedAt: new Date().toISOString() }
  storage.setDraft(savedDraft)
  return savedDraft
}

export async function uploadDocument(file: File, name: string): Promise<UploadedDocument> {
  await delay(800)
  return { name, fileName: file.name, size: file.size }
}

export async function submitProject(draft: ProjectDraft): Promise<Permit> {
  await delay(1000)

  const permits = storage.getPermits()
  const nextNumber = String(permits.length + 1).padStart(3, '0')
  const today = new Date()

  const permit: Permit = {
    id: `PRM-${today.getFullYear()}-${nextNumber}`,
    projectId: `PRJ-${nextNumber}`,
    projectName: draft.values.projectName ?? 'Untitled project',
    permitClass: draft.values.permitClass ?? 'Production',
    filingType: draft.values.filingType ?? 'ESG',
    reportingPeriod: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`,
    issueDate: today.toISOString(),
    expiryDate: addYears(today.toISOString(), 5),
    status: 'Pending',
  }

  storage.setPermits([permit, ...permits])
  storage.clearDraft()
  return permit
}
