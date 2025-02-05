import medusaClient from '../../../utils/axios.config'

export async function retrieveDraftOrder(draftOrderId: string) {
    try {
        const response = await medusaClient.get(`/admin/orders/${draftOrderId}`)
        console.log("Draft order response:", response.data);
        return response.data
    } catch (error) {
        console.error("Error retrieving draft order:", error);
        throw error;
    }
}

