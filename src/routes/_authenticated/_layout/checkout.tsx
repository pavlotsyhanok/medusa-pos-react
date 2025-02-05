import { createFileRoute } from '@tanstack/react-router'
import CheckoutLayout from '@/modules/checkout/CheckoutLayout';
export const Route = createFileRoute('/_authenticated/_layout/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CheckoutLayout>
    </CheckoutLayout>
  );
}
