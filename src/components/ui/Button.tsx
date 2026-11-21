import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'dark' | 'muted'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm',
  secondary: 'border border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
  dark: 'bg-navy-900 text-white hover:bg-navy-800',
  muted: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function buttonClasses(variant: Variant = 'primary', className?: string) {
  return clsx(
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
    'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none',
    variantClasses[variant],
    className,
  )
}

export function Button({ variant, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />
}
