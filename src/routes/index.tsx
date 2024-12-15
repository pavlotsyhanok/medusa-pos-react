import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@medusajs/ui'
// import { Button } from '@medusajs/ui'
export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3 className="text-4xl font-bold">Welcome Home!</h3>
      <Button variant="primary">Click me</Button>
    </div>
  )
}
