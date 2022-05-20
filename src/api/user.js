import request from './request'

export const userRegister = (userData) =>
  request.post('/auth/register', userData)

export const userLogin = (data) => request.post('auth/login', data)

export const userProfile = () => request.get('/user')
export const updateProfile = (data) => request.patch('/user', data)
