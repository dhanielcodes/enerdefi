import { Outlet } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { LogoMark } from './Logo'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((collapsed) => !collapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between bg-navy-900 px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <LogoMark className="size-6" />
            <span className="font-bold text-white">EnerDeFi</span>
          </div>
          <button aria-label="Open menu" onClick={() => setIsMobileOpen(true)} className="text-white">
            <Menu className="size-6" />
          </button>
        </div>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
