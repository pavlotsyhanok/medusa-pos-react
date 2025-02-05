import PaymentProvider from '@/lib/hooks/payment/PaymentProvider';
import { Button, Container } from '@medusajs/ui';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from '@tanstack/react-router';

const CheckoutForm = ({ client, clientSecret, orderId }: { client: any; clientSecret: string; orderId: string }) => {

    const stripe = useStripe();
    const elements = useElements();
    const STRIPE_KEY = import.meta.env.VITE_PUBLISHABLE_API_KEY;
    const navigate = useNavigate();

    const { completeOrderPayment } = PaymentProvider();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate that Stripe and Elements are loaded
        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            alert("Stripe is not ready. Please try again later.");
            return;
        }

        try {
            // Confirm payment with Stripe (without redirection)
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                },
                redirect: "if_required",
            });

            if (result.error) {
                console.error("Payment failed:", result.error.message);
                alert(`Payment failed: ${result.error.message}`);
            } else {
                console.log("Payment succeeded, completing the cart...");

                const complete = await completeOrderPayment({ orderId });
                console.log("Order complete", complete)

                localStorage.clear();
                navigate({ to: "/store" })
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Container className="h-[300px] w-full flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <PaymentElement />
                <Button type="submit" disabled={!stripe}>
                    Submit Payment
                </Button>
            </form>
        </Container>
    );
};

export default CheckoutForm;
