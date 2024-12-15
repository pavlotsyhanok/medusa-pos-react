import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@medusajs/ui'

export const Route = createFileRoute('/blog-post')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl">Hello "/blog-post"!</h2>
      <div className="flex gap-2">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="transparent">Transparent Button</Button>
      </div>
      <div className="flex gap-2">
        <Button size="base">Base Size</Button>
        <Button size="small">Small Size</Button>
        <Button size="large">Large Size</Button>
      </div>
    </div>
  )
}
