// src/routes/store.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuth } from '../../lib/hooks/auth'

export const Route = createFileRoute('/store/store')({
  beforeLoad: async ({ location }) => {
    // Replace this with your actual auth check
    const isAuthenticated = false

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: StoreLayout,
})

function StoreLayout() {
  return (
    <div>
      {/* Add your store layout components here */}
      <Outlet />
    </div>
  )
}
