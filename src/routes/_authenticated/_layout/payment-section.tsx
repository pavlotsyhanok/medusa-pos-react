import { createFileRoute } from '@tanstack/react-router'
import PaymentLayout from '@/modules/payment-section/PaymentLayout';

export const Route = createFileRoute('/_authenticated/_layout/payment-section')(
    {
        component: RouteComponent,
    },
)

function RouteComponent() {
    return (
        <PaymentLayout>
        </PaymentLayout>
    );
}
