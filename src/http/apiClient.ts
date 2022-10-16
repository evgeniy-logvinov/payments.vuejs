import { auth } from '@/firebaseConfig'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers = await authHeader()
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

const authHeader = async (): Promise<{ Authorization: string }> => {
  const token = await auth.currentUser?.getIdToken()
  if (token) {
    return { Authorization: 'Bearer ' + token }
  } else {
    return { Authorization: '' }
  }
}

export { apiClient }
