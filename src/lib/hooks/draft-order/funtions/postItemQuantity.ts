import medusaClient from '../../../utils/axios.config'


export async function postItemQuantity(draftOrderId: string, item_id: string, quantity: number) {
    const response = await medusaClient.post(`/admin/order-edits/${draftOrderId}/items/item/${item_id}`, { quantity })
    return response.data
}
