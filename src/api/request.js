import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ? '/api' : apiUrl

const request = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgzNzM3ZjIzMGIxMzgyZmQ3ZjAwYTAiLCJuaWNrbmFtZSI6Ik5haWt5MDUxNyIsImlhdCI6MTY1Mjc5OTA3MywiZXhwIjoxNjUzNDAzODczfQ.pmYkzXytjemfQNZ5hFn0xqpvcyguVT3b0AkgXldE7Xs',
  },
})

export default request
