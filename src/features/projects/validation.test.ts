import { describe, expect, it } from 'vitest'
import { createEmptyDraft } from './fields'
import { getMissingRequiredFields, isFieldFilled } from './validation'

describe('project validation', () => {
  it('reports required fields that are still empty', () => {
    const missing = getMissingRequiredFields(createEmptyDraft(), 'legal')
    expect(missing).toEqual(['permitClass', 'filingType', 'regulator'])
  })

  it('treats an invalid email as missing', () => {
    const draft = createEmptyDraft()
    draft.values.contactEmail = 'not-an-email'
    expect(getMissingRequiredFields(draft, 'overview')).toContain('contactEmail')
  })

  it('checks uploads against the documents list', () => {
    const draft = createEmptyDraft()
    expect(isFieldFilled(draft, 'businessPlan')).toBe(false)

    draft.documents.businessPlan = { name: 'Plan', fileName: 'plan.pdf', size: 1000 }
    expect(isFieldFilled(draft, 'businessPlan')).toBe(true)
  })
})
