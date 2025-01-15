import { createRouter, createRoute, redirect } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { LoginCredentials } from '@/lib/hooks/auth/types/Login'

interface LoginCallbacks {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

interface RouterAuthHookResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
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
    auth: {} as RouterAuthHookResult,
  },
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
  interface RouterContext {
    auth: RouterAuthHookResult
  }
}