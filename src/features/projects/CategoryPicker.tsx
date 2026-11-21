import clsx from 'clsx'
import { Flame, Sun, Zap } from 'lucide-react'
import { projectCategories } from './fields'
import { useWizardForm } from './WizardFormContext'

const categoryIcons = {
  Renewable: Sun,
  'Oil & Gas': Flame,
  Power: Zap,
}

export function CategoryPicker() {
  const { draft, setValue } = useWizardForm()

  return (
    <div role="radiogroup" aria-label="Project Category" className="grid grid-cols-3 gap-2">
      {projectCategories.map((category) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons]
        const isSelected = draft.values.category === category

        return (
          <button
            key={category}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setValue('category', category)}
            className={clsx(
              'flex items-center justify-center gap-2 rounded-lg border px-2 py-2.5 text-sm whitespace-nowrap transition-colors sm:px-5',
              isSelected
                ? 'border-brand-500 bg-brand-50/40 text-gray-900'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50',
            )}
          >
            <Icon className={clsx('size-4', isSelected && 'text-brand-500')} />
            {category}
          </button>
        )
      })}
    </div>
  )
}
