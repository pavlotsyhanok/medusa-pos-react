// src/routes/store/products.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/products')({
  component: ProductsComponent,
})

function ProductsComponent() {
  return <div>Products Page</div>
}