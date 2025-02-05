import medusaClient from '../../../utils/axios.config'

export async function getTheDraftNotesList(order_id: string) {
    const response = await medusaClient.get(`/admin/custom/draft-order-note/${order_id}/notes`)
    return response.data
}

export async function putTheDraftNote(order_id: string, bodyNote: any) {
    const response = await medusaClient.put(`/admin/custom/draft-order-note/${order_id}/notes`, { bodyNote })
    return response.data
}
export async function deleteTheDraftNote(order_id: string, note_id: number) {
    const response = await medusaClient.delete(`/admin/custom/draft-order-note/${order_id}/notes`, { data: { note_id } })
    return response.data
}

