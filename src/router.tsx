import { createRouter, createRoute, redirect } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

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
    auth: undefined!,
  },
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}