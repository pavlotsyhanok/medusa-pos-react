import medusaClient from '../../../utils/axios.config'
import { User } from '../types/User'


export async function getMe() {
  return await medusaClient.get<User>('/admin/users/me')
}
