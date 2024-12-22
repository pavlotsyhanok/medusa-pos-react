import { createRouter, createRoute, redirect } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { LoginCredentials } from '@/lib/hooks/auth/types/Login'

interface LoginCallbacks {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

type AuthHookResult = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials, callbacks?: LoginCallbacks) => Promise<void>;
  logout: () => void;
}

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
    auth: {} as AuthHookResult,
  },
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
  interface RouterContext {
    auth: AuthHookResult
  }
}