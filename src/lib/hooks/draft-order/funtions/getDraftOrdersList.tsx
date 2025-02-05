import medusaClient from '../../../utils/axios.config'
import type { DraftOrdersList } from '../types/DraftOrdersList'

export async function getDraftOrdersList() {
    const response = await medusaClient.get<{ draft_orders: DraftOrdersList[] }>('/admin/draft-orders')
    return response.data
}
