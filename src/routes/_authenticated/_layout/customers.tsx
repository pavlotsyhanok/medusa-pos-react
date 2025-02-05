import { createFileRoute } from '@tanstack/react-router'
import CustomersLayout from '@/modules/customers/CustomersLayout';
export const Route = createFileRoute('/_authenticated/_layout/customers')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <CustomersLayout>
        </CustomersLayout>
    );
}
