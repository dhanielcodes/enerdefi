import {
  fieldNames,
  getField,
  getStepFields,
  steps,
  type FieldName,
  type ProjectDraft,
  type StepId,
} from './fields'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isFieldFilled(draft: ProjectDraft, name: FieldName) {
  if (getField(name).kind === 'upload') {
    return Boolean(draft.documents[name])
  }
  return Boolean(draft.values[name]?.trim())
}

function isFieldValid(draft: ProjectDraft, name: FieldName) {
  if (!isFieldFilled(draft, name)) return false
  if (getField(name).kind === 'email') {
    return EMAIL_PATTERN.test(draft.values[name] ?? '')
  }
  return true
}

export function getMissingRequiredFields(draft: ProjectDraft, stepId: StepId) {
  return getStepFields(stepId).filter(
    (name) => getField(name).required && !isFieldValid(draft, name),
  )
}

export function getEmptyRecommendedFields(draft: ProjectDraft, stepId: StepId) {
  return getStepFields(stepId).filter(
    (name) => getField(name).recommended && !isFieldFilled(draft, name),
  )
}

export function findFirstIncompleteStep(draft: ProjectDraft, stepsToCheck = steps) {
  return stepsToCheck.find((step) => getMissingRequiredFields(draft, step.id).length > 0)
}

export function getCompletionPercent(draft: ProjectDraft) {
  const filledCount = fieldNames.filter((name) => isFieldFilled(draft, name)).length
  return Math.round((filledCount / fieldNames.length) * 100)
}

export function listFieldLabels(names: FieldName[]) {
  return names.map((name) => getField(name).label).join(', ')
}
