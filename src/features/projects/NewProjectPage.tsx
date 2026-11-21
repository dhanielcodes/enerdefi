import { useSuspenseQuery } from '@tanstack/react-query'
import { draftQuery } from '@/api/queries'
import { ProjectWizard } from './ProjectWizard'

export function NewProjectPage() {
  const { data: draft } = useSuspenseQuery(draftQuery)
  return <ProjectWizard initialDraft={draft} />
}
