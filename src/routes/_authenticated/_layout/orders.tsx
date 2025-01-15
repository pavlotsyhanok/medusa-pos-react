import OrdersLayout from '@/modules/orders/OrdersLayout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_layout/orders')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <OrdersLayout>
        </OrdersLayout>
    );
}
