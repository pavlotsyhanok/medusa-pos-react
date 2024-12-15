import { createFileRoute, redirect } from "@tanstack/react-router"
import { isAuthenticated } from "../lib/hooks/auth"

import { Outlet } from "@tanstack/react-router"

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
    beforeLoad: () => {
      if (!isAuthenticated) {
        throw redirect({
          to: '/login'
        })
      }
    },
    component: () => {
      return <Outlet />
    },
  })