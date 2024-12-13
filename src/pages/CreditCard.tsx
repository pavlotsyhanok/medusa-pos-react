import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { medusa } from "../lib/medusa-provider";
import CheckoutForm from "../components/CheckoutForm";
import { ArrowDownLeftMini } from "@medusajs/icons";
const STRIPE_KEY = import.meta.env.VITE_PUBLIC_STRIPE_API_KEY;
const stripePromise = loadStripe(STRIPE_KEY);

const CreditCard = ({ client, setClient }: { setClient: (client: any) => void, client: any }) => {
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
        <div className="flex flex-col flex-nowrap justify-center items-center">
            <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
                <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={"/shopping-panel"}>
                    <ArrowDownLeftMini className="mr-[5px]" /> Back to Shopping Panel
                </Link>
            </nav>
            <header className="p-[15px] self-start border-b w-full">
                <p className="text-[15px] text-gray-400">Checkout → Credit Card</p>
            </header>
            <main className="flex flex-col flex-nowrap justify-start items-center gap-[10px] my-[25px] w-[800px] h-[500px]">
                <div className="mt-[25px]">
                    <p className="text-[15px] text-black">Card Details:</p>
                </div>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                        <CheckoutForm client={client} clientSecret={clientSecret} cardId={client.id} />
                    </Elements>
                )}
            </main>
        </div>
    );
};

export default CreditCard;