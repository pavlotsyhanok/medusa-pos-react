import medusaClient from '../../../utils/axios.config'
import type { Product } from '../types/Products'

export async function getProductsList() {
  const response = await medusaClient.get<{ products: Product[] }>('/admin/products')
  return response
}
