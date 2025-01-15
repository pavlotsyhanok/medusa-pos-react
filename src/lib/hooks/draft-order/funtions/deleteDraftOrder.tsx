import medusaClient from '../../../utils/axios.config'
import type { DraftOrdersList } from '../types/DraftOrdersList'

export async function deleteDraftOrder(id: string) {
    try {
        const response = await medusaClient.delete<{ draft_orders: DraftOrdersList[] }>(`/admin/draft-orders/${id}`)
        return response.data
    } catch (error) {
        console.error('Error deleting draft order:', error)
        throw error
    }
}
