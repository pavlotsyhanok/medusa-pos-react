import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/store/orders/"!</div>
}
