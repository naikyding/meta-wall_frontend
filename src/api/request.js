import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ? '/api' : apiUrl

const request = axios.create({
  baseURL,
  timeout: 50000,
})

request.interceptors.request.use((config) => {
  const localToken = localStorage.getItem('token')

  if (!config.headers.Authorization && localToken)
    config.headers.Authorization = localToken

  return config
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
export default request
