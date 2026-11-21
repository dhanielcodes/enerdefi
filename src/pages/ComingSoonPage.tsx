import { Link } from '@tanstack/react-router'
import { Construction } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { buttonClasses } from '@/components/ui/Button'

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="p-4 sm:p-8">
        <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-brand-50">
            <Construction className="size-6 text-brand-500" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">{title} is coming soon</h2>
          <p className="mt-1 max-w-sm text-sm text-gray-600">
            This section isn’t part of the current release. Head back to the dashboard to manage permits.
          </p>
          <Link to="/" className={buttonClasses('primary', 'mt-6')}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </>
  )
}
