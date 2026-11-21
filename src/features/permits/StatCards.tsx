import { useQuery } from '@tanstack/react-query'
import { BarChart3 } from 'lucide-react'
import { permitStatsQuery } from '@/api/queries'

export function StatCards() {
  const { data: stats, isPending } = useQuery(permitStatsQuery)

  const cards = [
    { label: 'Total Filings', value: stats?.total },
    { label: 'Pending Filings', value: stats?.pending },
    { label: 'Issued Filings', value: stats?.issued },
    { label: 'Expired Filings', value: stats?.expired },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="flex items-start justify-between rounded-2xl bg-white p-4 sm:p-5">
          <div>
            <p className="text-sm text-gray-600">{card.label}</p>
            {isPending ? (
              <div className="mt-3 h-7 w-14 animate-pulse rounded bg-gray-200" />
            ) : (
              <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            )}
          </div>
          <span className="hidden size-10 items-center justify-center rounded-full bg-brand-50 sm:flex">
            <BarChart3 className="size-5 text-brand-500" />
          </span>
        </div>
      ))}
    </div>
  )
}
