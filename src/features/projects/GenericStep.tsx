import { getField, getStepFields, steps, type StepId } from './fields'
import { FormField } from './FormField'
import { FormSection } from './FormSection'

export function GenericStep({ stepId }: { stepId: StepId }) {
  const step = steps.find((item) => item.id === stepId)

  return (
    <FormSection title={`${step?.label} Details`}>
      <div className="grid gap-5 md:grid-cols-2">
        {getStepFields(stepId).map((name) => (
          <FormField
            key={name}
            name={name}
            className={getField(name).kind === 'textarea' ? 'md:col-span-2' : undefined}
          />
        ))}
      </div>
    </FormSection>
  )
}
