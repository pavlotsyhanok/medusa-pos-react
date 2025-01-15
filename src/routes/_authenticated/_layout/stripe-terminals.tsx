import { createFileRoute } from '@tanstack/react-router'
import StripeTerminalsLayout from '@/modules/terminals/StripeterminalsLayout';

export const Route = createFileRoute(
    '/_authenticated/_layout/stripe-terminals',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <StripeTerminalsLayout>
            {/* <StripeTerminals/> */}
        </StripeTerminalsLayout>
    );
}
