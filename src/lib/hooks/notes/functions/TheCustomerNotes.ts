import medusaClient from '../../../utils/axios.config'

export async function getTheCustomerNotesList(customer_id: string) {
    const response = await medusaClient.get(`/admin/custom/customer-note/${customer_id}/notes`)
    return response.data
}

export async function putTheCustomerNote(customer_id: string, bodyNote: any) {
    const response = await medusaClient.put(`/admin/custom/customer-note/${customer_id}/notes`, { bodyNote })
    return response.data
}
export async function deleteTheCustomerNote(customer_id: string, note_id: number) {
    const response = await medusaClient.delete(`/admin/custom/customer-note/${customer_id}/notes`, { data: { note_id } })
    return response.data
}

