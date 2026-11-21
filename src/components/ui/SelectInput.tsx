import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  placeholder?: string
}

export function SelectInput({ options, placeholder, className, ...props }: SelectInputProps) {
  return (
    <div className="relative">
      <select
        className={clsx(
          'w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-9 text-sm outline-none',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
          className,
        )}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500" />
    </div>
  )
}
