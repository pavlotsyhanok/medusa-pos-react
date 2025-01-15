
import NavigationRaw from "@/components/NavigationRaw";
import { Heading } from "@medusajs/ui";
import { useState, useEffect, useCallback } from "react";
import CheckoutForm from "./components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { DraftOrderClientState } from "@/components/types/ClientState";
import PaymentProvider from "@/lib/hooks/payment/PaymentProvider";
import getRegionsId from "@/lib/functions/getRegionsId";
import { getDraftOrder } from "@/lib/hooks/draft-order/DraftOrderProvider";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_API_KEY;
if (!STRIPE_KEY) {
    console.error("Stripe API Key is missing. Ensure it's set in the environment variables.");
}

const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

const PaymentLayout = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [client, setClient] = useState<DraftOrderClientState>({
        isClientSet: false,
        clientData: null,
        DraftData: null,
        paymentCollection: null,
        card_id: null
    });
    const { placePaymentCollection, initiatePaymentSession, createStoreCart } = PaymentProvider();

    const loadClientData = useCallback(() => {
        const storedClient = localStorage.getItem("client");
        const storedOrderId = localStorage.getItem("order_id");
        if (storedClient && storedOrderId) {
            setClient((prevV: any) => {
                return {
                    ...prevV,
                    isClientSet: true,
                    clientData: JSON.parse(storedClient),
                    DraftData: JSON.parse(storedOrderId),
                }
            });
        }
    }, []);

    useEffect(() => {
        loadClientData();
    }, [loadClientData]);

    useEffect(() => {
        const createPayment = async () => {
            if (!client.isClientSet || !client.DraftData?.draft_order) return;

            try {

                const regions = await getRegionsId();
                const region_id = regions[0].id;

                const setStoreCart = await createStoreCart(region_id);

                // const data = {
                //     order_id: client.DraftData.draft_order.id,
                //     amount: client.DraftData.draft_order.summary.current_order_total,
                // };
                const data = {
                    order_id: client.DraftData.draft_order.id,
                    amount: client.DraftData.draft_order.summary.current_order_total,
                };
                const paymentCollection = await placePaymentCollection(data);

                // const sessionResponse = await initiatePaymentSession({
                //     paymentCollectionId: paymentCollection.id,
                //     providerId: "pp_stripe_stripe",
                // });
                const sessionResponse = await initiatePaymentSession({
                    paymentCollectionId: paymentCollection.id,
                    providerId: "pp_stripe_stripe",
                });
                const secret = sessionResponse.payment_collection?.payment_sessions[0]?.data?.client_secret;

                setClient((prevV: any) => {
                    return {
                        ...prevV,
                        paymentCollection: paymentCollection,
                        card_id: setStoreCart,
                    }
                })
                if (secret) {
                    setClientSecret(secret);

                } else {
                    console.error("Failed to retrieve client_secret from sessionResponse.");
                }
            } catch (error) {
                console.error("Error during payment session creation:", error);
            }
        };

        if (client.isClientSet && client.DraftData?.draft_order) {
            createPayment();
            console.log(client);

        }
    }, [client.isClientSet, client.DraftData, placePaymentCollection, initiatePaymentSession, createStoreCart]);


    if (!STRIPE_KEY) {
        return <p>Stripe API key is not configured. Please contact support.</p>;
    }

    if (!clientSecret) {
        return <p>Loading payment details...</p>;
    }
    console.log(client);
    return (
        <>
            <NavigationRaw first={"Browse Catalog → "} second={"Checkout section → "} third={"Payment section → "} />
            <main className="flex flex-col justify-start items-center gap-10 my-25 w-800 h-500">
                <div className="mt-25">
                    <Heading level="h2" className="text-18 text-black">
                        Card Details:
                    </Heading>
                </div>
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                    <CheckoutForm
                        client={client}
                        clientSecret={clientSecret}
                        cartId={client.card_id.id}
                    />
                </Elements>
            </main>
        </>
    );
};

export default PaymentLayout;
