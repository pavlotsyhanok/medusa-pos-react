import medusaClient from '../../../utils/axios.config';

export async function patchUpdateOrder(id: string) {
    const response = await medusaClient.patch(`/admin/custom/order-edit/${id}/draft-order-flag`, {
        is_draft_order: false,
    }
    )
    return response.data
}