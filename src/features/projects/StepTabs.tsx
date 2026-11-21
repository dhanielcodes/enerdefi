import clsx from 'clsx'
import { steps, type StepId } from './fields'

interface StepTabsProps {
  currentStep: StepId
  completionPercent: number
  onSelect: (stepId: StepId) => void
}

export function StepTabs({ currentStep, completionPercent, onSelect }: StepTabsProps) {
  return (
    <div className="rounded-2xl bg-white p-4 sm:p-6">
      <div
        role="progressbar"
        aria-label="Form completion"
        aria-valuenow={completionPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative mx-4 h-1.5 rounded-full bg-gray-100"
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${completionPercent}%` }}
        />
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500 bg-white px-1.5 text-[10px] font-semibold"
          style={{ left: `${completionPercent}%` }}
        >
          {completionPercent}%
        </span>
      </div>

      <div role="tablist" className="mt-6 flex gap-1 overflow-x-auto">
        {steps.map((step) => (
          <button
            key={step.id}
            role="tab"
            aria-selected={step.id === currentStep}
            onClick={() => onSelect(step.id)}
            className={clsx(
              'shrink-0 rounded-lg px-3 py-2 text-sm whitespace-nowrap',
              step.id === currentStep
                ? 'bg-gray-100 font-semibold text-gray-900'
                : 'text-gray-600 hover:bg-gray-50',
            )}
          >
            {step.label}
          </button>
        ))}
      </div>
    </div>
  )
}
