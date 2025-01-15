import medusaClient from "../../../utils/axios.config";

export async function createPaymentSession(paymentCollectionId: string, providerId: string) {
    const PUBLISHABLE_API_KEY = import.meta.env.VITE_PUBLISHABLE_API_KEY
    // const response = await medusaClient.post(
    //     `/store/payment-collections/${paymentCollectionId}/payment-sessions`
    // );
    // return response.data;
    const response = await medusaClient.post(`/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
        provider_id: providerId
    }, {
        headers: {
            'x-publishable-api-key': PUBLISHABLE_API_KEY,
        },
    });
    return response.data;
}