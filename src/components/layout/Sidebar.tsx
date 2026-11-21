import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { ChevronRight, ChevronsUpDown, LogOut, PanelLeft, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toast'
import { LogoMark } from './Logo'
import { mainNavItems, supportNavItem, type NavItem } from './navigation'

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const showToast = useToast()

  const visibleItems = mainNavItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  useEffect(() => {
    const focusSearchOnShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        if (isCollapsed) onToggleCollapse()
        searchInputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', focusSearchOnShortcut)
    return () => document.removeEventListener('keydown', focusSearchOnShortcut)
  }, [isCollapsed, onToggleCollapse])

  const hideWhenCollapsed = isCollapsed && 'lg:hidden'

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900/40 lg:hidden" onClick={onMobileClose} />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-900 text-gray-300 transition-transform',
          'lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed && 'lg:w-20',
        )}
      >
        <div className={clsx('flex items-center justify-between px-4 pt-6 pb-4', isCollapsed && 'lg:justify-center')}>
          <Link to="/" className="flex items-center gap-2" onClick={onMobileClose}>
            <LogoMark />
            <span className={clsx('text-lg font-bold text-white', hideWhenCollapsed)}>EnerDeFi</span>
          </Link>
          <button
            aria-label="Collapse sidebar"
            onClick={onToggleCollapse}
            className={clsx('hidden text-gray-400 hover:text-white lg:block', isCollapsed && 'lg:hidden')}
          >
            <PanelLeft className="size-5" />
          </button>
          <button aria-label="Close menu" onClick={onMobileClose} className="text-gray-400 lg:hidden">
            <X className="size-5" />
          </button>
        </div>

        <div className="px-3">
          {isCollapsed ? (
            <button
              aria-label="Expand sidebar and search"
              onClick={onToggleCollapse}
              className="mx-auto hidden size-10 items-center justify-center rounded-lg hover:bg-navy-800 lg:flex"
            >
              <Search className="size-5" />
            </button>
          ) : null}
          <label
            className={clsx(
              'flex items-center gap-2 rounded-lg border border-navy-700 px-3 py-2 text-sm',
              hideWhenCollapsed,
            )}
          >
            <Search className="size-4 shrink-0" />
            <input
              ref={searchInputRef}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
            <kbd className="rounded bg-navy-700 px-1.5 py-0.5 text-[10px] text-gray-300">⌘K</kbd>
          </label>
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
          {visibleItems.map((item) => (
            <SidebarLink key={item.to} item={item} isCollapsed={isCollapsed} onNavigate={onMobileClose} />
          ))}
          {visibleItems.length === 0 && (
            <p className="px-3 py-2 text-sm text-gray-500">No menu matches “{searchTerm}”</p>
          )}
        </nav>

        <div className="space-y-1 border-t border-navy-700 px-3 pt-4">
          <SidebarLink item={supportNavItem} isCollapsed={isCollapsed} onNavigate={onMobileClose} />
          <button
            title={isCollapsed ? 'Logout' : undefined}
            onClick={() =>
              showToast({
                variant: 'info',
                title: 'Logout unavailable',
                message: 'Authentication is not part of this demo.',
              })
            }
            className={clsx(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-navy-800 hover:text-white',
              isCollapsed && 'lg:justify-center',
            )}
          >
            <LogOut className="size-5 shrink-0" />
            <span className={clsx(hideWhenCollapsed)}>Logout</span>
          </button>
        </div>

        <div className="p-3">
          <div
            className={clsx(
              'flex items-center gap-3 rounded-xl bg-navy-800 p-3',
              isCollapsed && 'lg:justify-center lg:bg-transparent lg:p-0',
            )}
          >
            <Avatar name="George Brown" />
            <div className={clsx('min-w-0 flex-1', hideWhenCollapsed)}>
              <p className="truncate text-sm font-semibold text-white">George Brown</p>
              <p className="truncate text-xs text-gray-400">Energy Operator</p>
            </div>
            <ChevronsUpDown className={clsx('size-4 text-gray-400', hideWhenCollapsed)} />
          </div>
        </div>
      </aside>
    </>
  )
}

interface SidebarLinkProps {
  item: NavItem
  isCollapsed: boolean
  onNavigate: () => void
}

function SidebarLink({ item, isCollapsed, onNavigate }: SidebarLinkProps) {
  const Icon = item.icon
  const hideWhenCollapsed = isCollapsed && 'lg:hidden'

  return (
    <Link
      to={item.to}
      title={isCollapsed ? item.label : undefined}
      onClick={onNavigate}
      activeOptions={{ exact: item.to === '/', includeSearch: false }}
      className={clsx(
        'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-navy-800 hover:text-white',
        isCollapsed && 'lg:justify-center',
      )}
      activeProps={{ className: 'bg-navy-700 font-semibold text-white' }}
    >
      <Icon className="size-5 shrink-0" />
      <span className={clsx('flex-1 truncate', hideWhenCollapsed)}>{item.label}</span>
      {item.badge && (
        <span
          className={clsx(
            'rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white',
            isCollapsed && 'lg:absolute lg:top-1 lg:right-2',
          )}
        >
          {item.badge}
        </span>
      )}
      {item.hasSubmenu && <ChevronRight className={clsx('size-4', hideWhenCollapsed)} />}
    </Link>
  )
}
