import type { ReactNode } from 'react'

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-4 sm:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  )
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <p className="mt-6 mb-3 text-xs tracking-wide text-gray-500 uppercase first:mt-0">{children}</p>
}
