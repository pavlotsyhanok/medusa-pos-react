import * as React from 'react'
import { Link, Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from '@medusajs/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Simple toggle for auth status
let isAuthenticated = false;

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: ({ location }) => {
    const isAuthRoute = location.pathname.startsWith('/_authed')
    const isLoginRoute = location.pathname === '/login'

    if (isAuthenticated) {
      // If authenticated and trying to access login, redirect to store
      if (isLoginRoute) {
        throw redirect({
          to: '/store'
        })
      }
    } else {
      // If not authenticated and trying to access auth routes, redirect to login
      if (isAuthRoute) {
        throw redirect({
          to: '/login'
        })
      }
    }
  }
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
