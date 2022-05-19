import request from './request'

export const userRegister = (userData) =>
  request.post('/auth/register', userData)

export const userLogin = (data) => request.post('auth/login', data)
