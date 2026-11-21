import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { draftQuery } from '@/api/queries'
import { AppLayout } from '@/components/layout/AppLayout'
import { PermitsPage } from '@/features/permits/PermitsPage'
import { steps, type StepId } from '@/features/projects/fields'
import { NewProjectPage } from '@/features/projects/NewProjectPage'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { queryClient } from '@/queryClient'
import { permitStatuses, type PermitStatus } from '@/types'

interface RouterContext {
  queryClient: QueryClient
}

interface PermitSearch {
  page?: number
  search?: string
  status?: PermitStatus
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: AppLayout,
  notFoundComponent: () => <ComingSoonPage title="Page not found" />,
})

const permitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>): PermitSearch => {
    const page = Number(search.page)
    const status = search.status as PermitStatus

    return {
      page: Number.isInteger(page) && page > 1 ? page : undefined,
      search: typeof search.search === 'string' && search.search ? search.search : undefined,
      status: permitStatuses.includes(status) ? status : undefined,
    }
  },
  component: PermitsPage,
})

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  beforeLoad: () => {
    throw redirect({ to: '/projects/new' })
  },
})

const newProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/new',
  validateSearch: (search: Record<string, unknown>): { step?: StepId } => {
    const isKnownStep = steps.some((step) => step.id === search.step)
    return { step: isKnownStep ? (search.step as StepId) : undefined }
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(draftQuery),
  component: NewProjectPage,
})

const comingSoonPages = [
  { path: '/bids', title: 'Bids & Service Requests' },
  { path: '/messages', title: 'Messages' },
  { path: '/wallet', title: 'Wallet' },
  { path: '/notifications', title: 'Notifications' },
  { path: '/settings', title: 'Settings' },
  { path: '/support', title: 'Support' },
]

const comingSoonRoutes = comingSoonPages.map(({ path, title }) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <ComingSoonPage title={title} />,
  }),
)

const routeTree = rootRoute.addChildren([
  permitsRoute,
  projectsRoute,
  newProjectRoute,
  ...comingSoonRoutes,
])

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultPendingComponent: () => (
    <div className="flex h-64 items-center justify-center">
      <span className="size-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
    </div>
  ),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
