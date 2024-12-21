import medusaClient from '../../utils/axios.config'

interface User {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  avatar_url: string | null
  metadata: unknown | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

interface MeResponse {
  user: User
}

export function getMe() {
  return medusaClient.get<MeResponse>('/admin/users/me')
}
