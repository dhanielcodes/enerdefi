import { createEmptyDraft, type ProjectDraft } from '@/features/projects/fields'
import type { Permit } from '@/types'
import { createSeedPermits } from './seed'

const PERMITS_KEY = 'enerdefi:permits'
const DRAFT_KEY = 'enerdefi:project-draft'

function load<T>(key: string, createDefault: () => T): T {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved) as T
  } catch {
    // Corrupted or blocked storage: fall back to fresh data below.
  }
  return createDefault()
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be full or disabled. The app still works for this session.
  }
}

export const storage = {
  getPermits: () => load(PERMITS_KEY, () => createSeedPermits()),
  setPermits: (permits: Permit[]) => save(PERMITS_KEY, permits),

  getDraft: () => load(DRAFT_KEY, createEmptyDraft),
  setDraft: (draft: ProjectDraft) => save(DRAFT_KEY, draft),
  clearDraft: () => localStorage.removeItem(DRAFT_KEY),
}
