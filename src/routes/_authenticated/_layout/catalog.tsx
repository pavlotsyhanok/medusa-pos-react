import { createFileRoute } from '@tanstack/react-router'
import CatalogLayout from '@/modules/catalog/CatalogLayout'

export const Route = createFileRoute('/_authenticated/_layout/catalog')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CatalogLayout>
    </CatalogLayout>
  )
}
