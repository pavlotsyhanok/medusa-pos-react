import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { medusa } from "../lib/medusa-provider";
const CheckoutForm = (props: any) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { clientSecret, client } = props;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe or elements not properly loaded.");
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement);
        if (!cardElement) {
            setErrorMessage("Card information not provided.");
            setIsProcessing(false);
            return;
        }
        return (stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: client.billing_address.first_name,
                    email: client.email,
                    phone: client.shipping_address.phone,
                    address: {
                        city: client.billing_address.city,
                        country: client.billing_address.country_code,
                        line1: client.billing_address.address_1,
                        line2: client.billing_address.address_2,
                        postal_code: client.billing_address.postal_code,
                    },

                }
            },
        }).then(({ error }) => {
            if (error) {
                setErrorMessage("Payment processing failed. Please try again. " + error.message);
            } else {
                medusa.carts.complete(client.id)
                    .then(() => {
                        console.log(client.id)
                        localStorage.removeItem("cart_id");
                        navigate("/success");
                    })
                    .catch(completeError => {
                        setErrorMessage("Error completing order: " + completeError.message);
                    });
            }
            setIsProcessing(false);
        }))
    }
    return (
        <form onSubmit={handleSubmit} className="form-element">
            <p>Enter payment details below:</p>
            <div className="payment">
                <CardElement />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
                disabled={!stripe || isProcessing}
                className="btn-option"
                id="continue"
            >
                {isProcessing ? "Processing..." : "Submit"}
            </button>
        </form>
    );
};

export default CheckoutForm;

