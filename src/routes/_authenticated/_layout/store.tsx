import { createFileRoute } from '@tanstack/react-router'
import StoreLayout from '@/modules/main-menu/StoreLayout'
import StoreDataArea from '@/modules/main-menu/StoreDataArea'

export const Route = createFileRoute('/_authenticated/_layout/store')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <StoreLayout>
      <StoreDataArea />
    </StoreLayout>
  )
}
