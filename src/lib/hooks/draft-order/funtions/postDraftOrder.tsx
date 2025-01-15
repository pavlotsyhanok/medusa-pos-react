import medusaClient from '../../../utils/axios.config'
import { DraftOrder } from '../types/CreateDraftOrder'

import { DraftOrderResponse } from "@/lib/hooks/draft-order/types/CreateDraftOrder";

export async function postDraftOrder(newDraftOrder: DraftOrder): Promise<DraftOrderResponse> {
    const response = await medusaClient.post<DraftOrderResponse>('admin/draft-orders', newDraftOrder)
    return response.data
}
