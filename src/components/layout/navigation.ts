import {
  Bell,
  BriefcaseBusiness,
  LayoutGrid,
  LifeBuoy,
  MessageSquareText,
  Settings,
  Ticket,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  badge?: string
  hasSubmenu?: boolean
}

export const mainNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: LayoutGrid },
  { label: 'Projects', to: '/projects/new', icon: BriefcaseBusiness },
  { label: 'Bids & Service Requests', to: '/bids', icon: Ticket },
  { label: 'Messages', to: '/messages', icon: MessageSquareText },
  { label: 'Wallet', to: '/wallet', icon: Wallet },
  { label: 'Notifications', to: '/notifications', icon: Bell, badge: '9+' },
  { label: 'Settings', to: '/settings', icon: Settings, hasSubmenu: true },
]

export const supportNavItem: NavItem = { label: 'Support', to: '/support', icon: LifeBuoy }
