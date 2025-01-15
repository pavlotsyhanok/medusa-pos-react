import medusaClient from '../../../utils/axios.config'
import { NewCustomer } from '../types/NewCustomer'

export async function postCustomer(newCustomer: NewCustomer) {
    const response = await medusaClient.post<NewCustomer>('/admin/customers', newCustomer)
    return response.data
}
