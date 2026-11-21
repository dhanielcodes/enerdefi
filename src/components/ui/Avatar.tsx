import clsx from 'clsx'

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <span
      aria-hidden
      className={clsx(
        'flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-600',
        className,
      )}
    >
      {initials}
    </span>
  )
}
