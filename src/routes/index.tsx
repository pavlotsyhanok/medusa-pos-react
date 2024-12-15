import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '@medusajs/ui'
import { isAuthenticated } from '../lib/hooks/auth'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Check if authenticated from root route
    if (isAuthenticated) {
      throw redirect({
        to: '/store'
      })
    } else {
      throw redirect({
        to: '/login'
      })
    }
  },
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
