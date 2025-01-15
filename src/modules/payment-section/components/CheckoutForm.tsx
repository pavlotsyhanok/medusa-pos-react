
import PaymentProvider from '@/lib/hooks/payment/PaymentProvider';
import { Button, Container } from '@medusajs/ui';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ client, clientSecret, cartId }: { client: any; clientSecret: string; cartId: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const STRIPE_KEY = import.meta.env.VITE_PUBLISHABLE_API_KEY;

    const { completeStorePayment } = PaymentProvider();

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
                    // Remove the return_url to prevent redirection
                },
                redirect: "if_required", // Prevent automatic redirect
            });

            if (result.error) {
                // Handle error during payment confirmation
                console.error("Payment failed:", result.error.message);
                alert(`Payment failed: ${result.error.message}`);
            } else {
                // Payment successful, manually complete the cart
                console.log("Payment succeeded, completing the cart...");

                // const complete = await completeStorePayment({ cartId });

                console.log("complete")
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
