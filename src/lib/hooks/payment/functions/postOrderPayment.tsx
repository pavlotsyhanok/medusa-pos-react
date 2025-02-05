import medusaClient from '../../../utils/axios.config';

export async function postOrderPayment(orderId: string) {
    const PUBLISHABLE_API_KEY = import.meta.env.VITE_PUBLISHABLE_API_KEY;

    const response = await medusaClient.post(`admin/orders/${orderId}/complete`, {},
        {
            headers: {
                'x-publishable-api-key': PUBLISHABLE_API_KEY,
            },
        }
    );
    return response.data;
}