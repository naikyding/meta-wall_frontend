import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL

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
