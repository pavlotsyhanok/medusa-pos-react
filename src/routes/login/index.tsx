import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '../../lib/hooks/auth'

export const Route = createFileRoute('/login/')({
  beforeLoad: () => {
    if (isAuthenticated) {
      throw redirect({
        to: '/store'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login/"!</div>
}
