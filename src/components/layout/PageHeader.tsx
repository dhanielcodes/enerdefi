import { Bell, ChevronDown, CircleHelp } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'

const currencies = [
  { code: 'NGN', flag: '🇳🇬' },
  { code: 'USD', flag: '🇺🇸' },
  { code: 'GHS', flag: '🇬🇭' },
]

export function PageHeader({ title }: { title: string }) {
  const [currency, setCurrency] = useState('NGN')

  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-4 sm:px-8">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">{title}</h1>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="relative hidden sm:block">
          <select
            aria-label="Currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="appearance-none bg-transparent py-1 pr-6 text-sm font-medium outline-none"
          >
            {currencies.map(({ code, flag }) => (
              <option key={code} value={code}>
                {flag} {code}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-gray-500" />
        </div>

        <button aria-label="Notifications" className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-2 size-2 rounded-full bg-red-500" />
        </button>

        <button aria-label="Help" className="rounded-full p-2 hover:bg-gray-100">
          <CircleHelp className="size-5" />
        </button>

        <div className="flex items-center gap-3">
          <Avatar name="Matthew Smith" />
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Matthew Smith</p>
            <p className="text-xs text-gray-500">Core Regulator</p>
          </div>
          <ChevronDown className="hidden size-4 text-gray-500 md:block" />
        </div>
      </div>
    </header>
  )
}
