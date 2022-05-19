import request from './request'

export const userRegister = (userData) =>
  request.post('/auth/register', userData)
