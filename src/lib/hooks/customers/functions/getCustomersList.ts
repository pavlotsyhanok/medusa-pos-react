import medusaClient from '../../../utils/axios.config'
import { Customer } from '../types/Customer'

export async function getCustomersList() {
  const response = await medusaClient.get<{ customers: Customer[] }>('/admin/customers')
  return response.data.customers
}
