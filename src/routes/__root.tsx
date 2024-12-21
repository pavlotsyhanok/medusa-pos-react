import * as React from 'react'
import { Link, Outlet, createRootRouteWithContext, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from '@medusajs/ui'

interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: ({ context, location }) => {
    const isLoginRoute = location.pathname === '/login'

    if (context.auth.isAuthenticated) {
      // If authenticated and trying to access login, redirect to store
      if (isLoginRoute) {
        throw redirect({
          to: '/store'
        })
      }
    } else {
      // If not authenticated, redirect to login unless already on login page
      if (!isLoginRoute) {
        throw redirect({
          to: '/login'
        })
      }
    }
  }
})

function RootComponent() {
  return (
    <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
    </>
  )
}
