import axios from 'axios'

const MEDUSA_BASE_URL = import.meta.env.VITE_PUBLIC_MEDUSA_BASE_URL || 'http://localhost:9000'

const medusaClient = axios.create({
  baseURL: MEDUSA_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

medusaClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('medusa_jwt_token='))
    ?.split('=')[1]
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

export default medusaClient
