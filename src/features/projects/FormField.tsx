import clsx from 'clsx'
import { Dropzone } from '@/components/ui/Dropzone'
import { FileCard } from '@/components/ui/FileCard'
import { SelectInput } from '@/components/ui/SelectInput'
import { getField, getFieldOptions, type FieldName } from './fields'
import { useWizardForm } from './WizardFormContext'

interface FormFieldProps {
  name: FieldName
  hint?: string
  className?: string
}

export function FormField({ name, hint, className }: FormFieldProps) {
  const { draft, invalidFields } = useWizardForm()
  const field = getField(name)
  const isInvalid = invalidFields.includes(name)
  const hasValue = Boolean(draft.values[name])

  const errorMessage =
    field.kind === 'email' && hasValue ? 'Enter a valid email address' : 'This field is required'

  return (
    <div className={className}>
      <label htmlFor={`field-${name}`} className="mb-1.5 block text-xs font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>

      <FieldControl name={name} isInvalid={isInvalid} />

      {isInvalid ? (
        <p className="mt-1.5 text-xs text-red-600">{errorMessage}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  )
}

function FieldControl({ name, isInvalid }: { name: FieldName; isInvalid: boolean }) {
  const { draft, setValue, openUpload, removeDocument } = useWizardForm()
  const field = getField(name)
  const id = `field-${name}`
  const value = draft.values[name] ?? ''

  const inputClass = clsx(
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-gray-400',
    'focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
    isInvalid ? 'border-red-400' : 'border-gray-200',
  )

  switch (field.kind) {
    case 'textarea':
      return (
        <textarea
          id={id}
          rows={4}
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => setValue(name, event.target.value)}
          className={clsx(inputClass, 'resize-y')}
        />
      )

    case 'select':
      return (
        <SelectInput
          id={id}
          value={value}
          placeholder={field.placeholder ?? 'Select'}
          options={getFieldOptions(name, draft.values)}
          onChange={(event) => setValue(name, event.target.value)}
          className={clsx(inputClass, !value && 'text-gray-400')}
        />
      )

    case 'upload': {
      const document = draft.documents[name]
      if (document) {
        return (
          <FileCard
            title={document.name}
            fileName={document.fileName}
            size={document.size}
            onRemove={() => removeDocument(name)}
          />
        )
      }
      return (
        <Dropzone
          id={id}
          isInvalid={isInvalid}
          onClick={() => openUpload(name)}
          onFileSelect={(file) => openUpload(name, file)}
        />
      )
    }

    case 'yesNo':
      return (
        <div className="flex gap-5">
          {['Yes', 'No'].map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                id={option === 'Yes' ? id : undefined}
                type="radio"
                name={name}
                checked={value === option}
                onChange={() => setValue(name, option)}
                className="size-4 accent-brand-500"
              />
              {option}
            </label>
          ))}
        </div>
      )

    default:
      return (
        <input
          id={id}
          type={field.kind}
          min={field.kind === 'number' ? 0 : undefined}
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => setValue(name, event.target.value)}
          className={inputClass}
        />
      )
  }
}
