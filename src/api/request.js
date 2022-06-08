import axios from 'axios'
import { useAppStore } from '../stores/app'
const baseURL = import.meta.env.VITE_API_URL

const request = axios.create({
  baseURL,
  timeout: 50000,
})

request.interceptors.request.use((config) => {
  const localToken = localStorage.getItem('token')
  const appStore = useAppStore()
  appStore.loading = true

  if (!config.headers.Authorization && localToken)
    config.headers.Authorization = localToken

  return config
})

request.interceptors.response.use(
  (response) => {
    const appStore = useAppStore()
    appStore.loading = false
    return response.data
  },
  (error) => {
    const appStore = useAppStore()
    appStore.loading = false
    return Promise.reject(error.response)
  }
)
export default request
