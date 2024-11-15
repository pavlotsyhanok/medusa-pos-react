import { Link, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { medusa } from "../lib/medusa-provider";
import "../styles/creditCard.css";
import CheckoutForm from "../components/CheckoutForm";

const STRIPE_KEY = import.meta.env.VITE_PUBLIC_STRIPE_API_KEY;
const stripePromise = loadStripe(STRIPE_KEY);

const CreditCard = ({ client, setClient }: { setClient: (client: any) => void, client: any }) => {
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        const setupCart = async () => {
            let existingCartId = localStorage.getItem("cart_id");

            if (!existingCartId) {
                // localStorage.setItem("cart_id", client.id);
                existingCartId = client.id;
            } else {
                try {
                    const { cart } = await medusa.carts.retrieve(existingCartId);
                    console.log("Retrieved existing cart:", cart);
                    setClient(cart);
                } catch (error) {
                    console.error("Error retrieving existing cart:", error);
                    return null;
                }
            }
            return existingCartId;
        };
        // Here is an ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! line 37,57
        const setupStripePayment = async (cartId: string) => {
            try {
                try {
                    await medusa.carts.createPaymentSessions(cartId)
                        .then(({ cart }) => {
                            // check if stripe is selected
                            const isStripeAvailable = cart.payment_sessions?.some(
                                (session) =>
                                    session.provider_id === "stripe"
                            );
                            if (!isStripeAvailable) {
                                console.warn("Stripe is not available for this cart");
                                return;
                            }
                        })
                } catch (error) {
                    console.error("Error creating payment sessions:", error);
                }

                // select stripe payment session
                const { cart: updatedCart } = await medusa.carts.setPaymentSession(cartId, {
                    provider_id: "stripe",
                });
                setClient(updatedCart);
                if (updatedCart.payment_session?.data?.client_secret) {
                    setClientSecret(updatedCart.payment_session.data.client_secret as string);
                } else {
                    console.error("Stripe client secret not found");
                }

            } catch (error) {
                console.error("Error setting up Stripe payment session:", error);
            }
        };

        setupCart().then((cartId) => {
            if (cartId) {
                setupStripePayment(cartId);
            }
        });
    }, []);

    return (
        <>
            <header>
                <h1 className="page-name">Checkout → Credit Card</h1>
            </header>
            <nav className="back-menu back-checkout">
                <Link to=".." onClick={() => navigate(-1)}>
                    ← Back to Checkout Options
                </Link>
                <p>Enter Credit Card Details</p>
            </nav>
            <main className="credit-checkout checkout-options">
                <p>Card Details</p>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                        <CheckoutForm client={client} clientSecret={clientSecret} cardId={client.id} />
                    </Elements>
                )}
            </main>
        </>
    );
};

export default CreditCard;