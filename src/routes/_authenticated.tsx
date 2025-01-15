import { createFileRoute, redirect } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => {
    return <Outlet />
  },
})