import { useState } from "react"
// import Form from "../modules/checkout/components/Form"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const STRIPE_KEY = import.meta.env.VITE_PUBLIC_STRIPE_API_KEY;
const stripePromise = loadStripe(STRIPE_KEY);
// Function to fetch products using fetch

export default function TestProduct() {
    const [clientSecret, setClientSecret] = useState()

    return (
        <>
            <h1>Product Test</h1>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret,
                }}>
                    {/* <Form clientSecret={clientSecret} cartId={cartId} /> */}
                </Elements>
            )}

        </>
    );
}
