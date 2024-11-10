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
    const { clientSecret, client, cardId } = props;
    console.log(client);
    // const isElementsLoaded = stripe && elements;

    // useEffect(() => {
    //     if (!isElementsLoaded) {
    //         setErrorMessage("Stripe elements not fully loaded.");
    //     }
    // }, [isElementsLoaded]);
    // console.log(elements);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe or elements not properly loaded.");
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setErrorMessage("Card information not provided.");
            setIsProcessing(false);
            return;
        }

        //     navigate("/success");
        return stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: client.cart.billing_address.first_name,
                    email: client.cart.email,
                    phone: client.cart.billing_address.phone,
                    address: {
                        city: client.cart.billing_address.city,
                        country: client.cart.billing_address.country_code,
                        line1: client.cart.billing_address.address_1,
                        line2: client.cart.billing_address.address_2,
                        postal_code: client.cart.billing_address.postal_code,
                    },

                }
            },
        }).then(({ error, paymentIntent }) => {
            // TODO handle errors
            console.log(paymentIntent);
            //HERE is An Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            setErrorMessage("Payment processing failed. Please try again. " + error);
            setIsProcessing(false);
            medusa.carts.complete(client.cart.id).then(
                (resp: any) => console.log(resp),
                // navigate("/success")
            )
        })
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

