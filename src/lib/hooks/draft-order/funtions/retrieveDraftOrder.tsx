import medusaClient from '../../../utils/axios.config'

export async function retrieveDraftOrder(draftOrderId: string) {
    const response = await medusaClient.get(`/admin/draft-orders/${draftOrderId}`)
    console.log("Draft order response:", response.data);
    return response.data
}

