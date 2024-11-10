import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js"

export default function Form({ clientSecret, cartId }) {
    const stripe = useStripe()
    const elements = useElements()

    async function handlePayment(e) {
        e.preventDefault()
        // TODO handle payment
    }

    return (
        <form>
            <CardElement />
            <button onClick={handlePayment}>Submit</button>
        </form>
    )
};