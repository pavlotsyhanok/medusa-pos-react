import { createFileRoute } from '@tanstack/react-router'
import RegistrationLayout from '@/modules/new-cutomer/RegistrationLayout'
export const Route = createFileRoute('/_authenticated/_layout/new-customer')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RegistrationLayout>
    </RegistrationLayout>
  )
}
