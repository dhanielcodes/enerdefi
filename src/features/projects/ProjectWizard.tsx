import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useBlocker, useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Save } from 'lucide-react'
import { useState } from 'react'
import { saveDraft, submitProject } from '@/api/projects'
import { queryKeys } from '@/api/queries'
import { Button, buttonClasses } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { PermitReportModal } from '@/features/permits/PermitReportModal'
import type { Permit, UploadedDocument } from '@/types'
import {
  createEmptyDraft,
  fieldNames,
  getField,
  steps,
  type FieldName,
  type ProjectDraft,
  type StepId,
} from './fields'
import { GenericStep } from './GenericStep'
import { OverviewStep } from './OverviewStep'
import { StepTabs } from './StepTabs'
import { SubmittedModal } from './SubmittedModal'
import { UploadDocumentModal } from './UploadDocumentModal'
import {
  findFirstIncompleteStep,
  getCompletionPercent,
  getEmptyRecommendedFields,
  getMissingRequiredFields,
  listFieldLabels,
} from './validation'
import { WizardFormContext } from './WizardFormContext'

interface PendingUpload {
  fieldName: FieldName
  file?: File
}

export function ProjectWizard({ initialDraft }: { initialDraft: ProjectDraft }) {
  const { step: currentStep = 'overview' } = useSearch({ from: '/projects/new' })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const showToast = useToast()

  const [draft, setDraft] = useState(initialDraft)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [invalidFields, setInvalidFields] = useState<FieldName[]>([])
  const [pendingUpload, setPendingUpload] = useState<PendingUpload | null>(null)
  const [submittedPermit, setSubmittedPermit] = useState<Permit | null>(null)
  const [isReportOpen, setIsReportOpen] = useState(false)

  const stepIndex = steps.findIndex((step) => step.id === currentStep)
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === steps.length - 1

  useBlocker({
    shouldBlockFn: ({ current, next }) => {
      const isLeavingWizard = current.pathname !== next.pathname
      if (!hasUnsavedChanges || !isLeavingWizard) return false
      return !window.confirm('You have unsaved changes. Leave without saving?')
    },
    enableBeforeUnload: hasUnsavedChanges,
  })

  const saveMutation = useMutation({
    mutationFn: saveDraft,
    onSuccess: (savedDraft) => {
      queryClient.setQueryData(queryKeys.draft, savedDraft)
      setDraft((current) => ({ ...current, savedAt: savedDraft.savedAt }))
      setHasUnsavedChanges(false)
      showToast({
        variant: 'success',
        title: 'Changes Saved Successfully',
        message: 'Your changes have been saved and updated. You can close the wizard if you want to continue later.',
      })
    },
    onError: () => {
      showToast({ variant: 'error', title: 'Save failed', message: 'Please try again.' })
    },
  })

  const submitMutation = useMutation({
    mutationFn: submitProject,
    onSuccess: (permit) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.permits })
      queryClient.setQueryData(queryKeys.draft, createEmptyDraft())
      setHasUnsavedChanges(false)
      setSubmittedPermit(permit)
    },
    onError: () => {
      showToast({ variant: 'error', title: 'Submission failed', message: 'Please try again.' })
    },
  })

  function markFieldChanged(name: FieldName) {
    setHasUnsavedChanges(true)
    setInvalidFields((fields) => fields.filter((field) => field !== name))
  }

  function setValue(name: FieldName, value: string) {
    setDraft((current) => {
      if (current.values[name] === value) return current

      const values = { ...current.values, [name]: value }
      for (const fieldName of fieldNames) {
        if (getField(fieldName).dependsOn === name) values[fieldName] = ''
      }
      return { ...current, values }
    })
    markFieldChanged(name)
  }

  function attachDocument(name: FieldName, document: UploadedDocument) {
    setDraft((current) => ({ ...current, documents: { ...current.documents, [name]: document } }))
    markFieldChanged(name)
  }

  function removeDocument(name: FieldName) {
    setDraft((current) => {
      const documents = { ...current.documents }
      delete documents[name]
      return { ...current, documents }
    })
    markFieldChanged(name)
  }

  function goToStep(stepId: StepId) {
    navigate({ to: '/projects/new', search: { step: stepId } })
    window.scrollTo({ top: 0 })
  }

  function handleNext() {
    const missingFields = getMissingRequiredFields(draft, currentStep)
    if (missingFields.length > 0) {
      setInvalidFields(missingFields)
      showToast({
        variant: 'error',
        title: 'Critical Fields Required',
        message: (
          <>
            These fields are required to proceed to the next stage:{' '}
            <strong>{listFieldLabels(missingFields)}</strong>
          </>
        ),
      })
      return
    }

    const emptyRecommendedFields = getEmptyRecommendedFields(draft, currentStep)
    if (emptyRecommendedFields.length > 0) {
      showToast({
        variant: 'warning',
        title: 'Recommended Fields',
        message: (
          <>
            Consider filling these optional fields to improve your project profile:{' '}
            <strong>{listFieldLabels(emptyRecommendedFields)}</strong>
          </>
        ),
      })
    }

    setInvalidFields([])
    goToStep(steps[stepIndex + 1].id)
  }

  function handleTabSelect(stepId: StepId) {
    const targetIndex = steps.findIndex((step) => step.id === stepId)
    if (targetIndex <= stepIndex) {
      goToStep(stepId)
      return
    }

    const blockingStep = findFirstIncompleteStep(draft, steps.slice(0, targetIndex))
    if (blockingStep) {
      const missingFields = getMissingRequiredFields(draft, blockingStep.id)
      showToast({
        variant: 'info',
        title: 'Critical Fields Required',
        message: (
          <>
            Complete <strong>{blockingStep.label}</strong> first. These fields are required to proceed
            to the next stage: <strong>{listFieldLabels(missingFields)}</strong>
          </>
        ),
      })
      return
    }

    goToStep(stepId)
  }

  function handleSubmit() {
    const incompleteStep = findFirstIncompleteStep(draft)
    if (incompleteStep) {
      const missingFields = getMissingRequiredFields(draft, incompleteStep.id)
      setInvalidFields(missingFields)
      goToStep(incompleteStep.id)
      showToast({
        variant: 'error',
        title: 'Critical Fields Required',
        message: (
          <>
            {incompleteStep.label} still needs: <strong>{listFieldLabels(missingFields)}</strong>
          </>
        ),
      })
      return
    }

    submitMutation.mutate(draft)
  }

  const saveButtonLabel = saveMutation.isPending
    ? 'Saving…'
    : !hasUnsavedChanges && draft.savedAt
      ? 'Updated'
      : 'Save changes'

  const form = {
    draft,
    invalidFields,
    setValue,
    removeDocument,
    openUpload: (fieldName: FieldName, file?: File) => setPendingUpload({ fieldName, file }),
  }

  return (
    <WizardFormContext.Provider value={form}>
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-gray-100/95 px-4 py-4 backdrop-blur sm:px-8">
        <div className="flex gap-3">
          <Link to="/" className={buttonClasses('secondary')}>
            <ArrowLeft className="size-4" /> Projects
          </Link>
          <Button
            variant="dark"
            onClick={() => saveMutation.mutate(draft)}
            disabled={!hasUnsavedChanges || saveMutation.isPending}
          >
            <Save className="size-4" /> {saveButtonLabel}
          </Button>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => goToStep(steps[stepIndex - 1].id)} disabled={isFirstStep}>
            <ArrowLeft className="size-4" /> Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-5 px-4 pb-10 sm:px-8">
        <StepTabs
          currentStep={currentStep}
          completionPercent={getCompletionPercent(draft)}
          onSelect={handleTabSelect}
        />

        <h2 className="text-2xl font-semibold">
          {stepIndex + 1}. {steps[stepIndex].label}
        </h2>

        {currentStep === 'overview' ? <OverviewStep /> : <GenericStep stepId={currentStep} />}

        <div className="flex justify-end">
          <Button variant="dark" onClick={handleSubmit} disabled={submitMutation.isPending}>
            {submitMutation.isPending ? 'Submitting…' : 'Submit'} <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {pendingUpload && (
        <UploadDocumentModal
          initialFile={pendingUpload.file}
          onClose={() => setPendingUpload(null)}
          onUploaded={(document) => {
            attachDocument(pendingUpload.fieldName, document)
            setPendingUpload(null)
          }}
        />
      )}

      <SubmittedModal
        isOpen={submittedPermit !== null && !isReportOpen}
        onViewReport={() => setIsReportOpen(true)}
        onViewDashboard={() => navigate({ to: '/' })}
      />
      <PermitReportModal
        permit={isReportOpen ? submittedPermit : null}
        onClose={() => navigate({ to: '/' })}
      />
    </WizardFormContext.Provider>
  )
}
