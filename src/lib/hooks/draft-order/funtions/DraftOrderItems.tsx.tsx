import medusaClient from '../../../utils/axios.config'
import type { DraftOrder } from '../types/CreateDraftOrder'

export async function postCreateDraftOrderEdit(draftOrderId: string) {
    const response = await medusaClient.post(`/admin/order-edits`, { order_id: draftOrderId })
    return response.data
}

export async function postDraftOrderEdit(draftOrderId: string) {
    const response = await medusaClient.post(`/admin/order-edits/${draftOrderId}/confirm`);
    return response.data;
}

export async function deleteDraftOrderItem(id: string, item_id: any) {
    const response = await medusaClient.delete(`/admin/custom/draft-order/${id}/items/${item_id}`)
    return response.data
}

export async function postDraftOrderItem(draftOrderId: string, items: DraftOrder) {
    const response = await medusaClient.post(`admin/order-edits/${draftOrderId}/items`, { items })
    return response.data
}

