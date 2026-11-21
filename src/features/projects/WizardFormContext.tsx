import { createContext, useContext } from 'react'
import type { FieldName, ProjectDraft } from './fields'

interface WizardForm {
  draft: ProjectDraft
  invalidFields: FieldName[]
  setValue: (name: FieldName, value: string) => void
  openUpload: (name: FieldName, file?: File) => void
  removeDocument: (name: FieldName) => void
}

export const WizardFormContext = createContext<WizardForm | null>(null)

export function useWizardForm() {
  const form = useContext(WizardFormContext)
  if (!form) {
    throw new Error('useWizardForm must be used inside the project wizard')
  }
  return form
}
