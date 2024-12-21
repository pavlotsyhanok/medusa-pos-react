import { createRouter, createRoute, redirect } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { AuthContextType } from './lib/hooks/AuthProvider'

const notFoundRoute = createRoute({
  getParentRoute: () => routeTree,
  path: '*',
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/store'
      })
    }
  }
})

export const router = createRouter({
  routeTree,
  context: {
    auth: {} as AuthContextType,
  },
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}