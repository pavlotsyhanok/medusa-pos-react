import { CardElement, useElements, useStripe, } from "@stripe/react-stripe-js"

export default function Form({ clientSecret, cartId }: { clientSecret: string, cartId: string }) {
    const stripe = useStripe()
    const elements = useElements()

    async function handlePayment(e: any) {
        e.preventDefault()
        console.log(clientSecret, cartId)
    }

    return (
        <form>
            <CardElement />
            <button onClick={handlePayment}>Submit</button>
        </form>
    )
};