import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/store')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/store"!</div>
}
