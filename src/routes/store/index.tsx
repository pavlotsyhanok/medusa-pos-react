// src/routes/store/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/')({
  component: StoreComponent,
})

function StoreComponent() {
  return <div>Hello "/store/"!</div>
}