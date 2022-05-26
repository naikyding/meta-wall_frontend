import request from './request'

export const userRegister = (userData) =>
  request.post('/auth/register', userData)

export const userLogin = (data) => request.post('auth/login', data)

export const userProfile = () => request.get('/user')
export const updateProfile = (data) => request.patch('/user', data)
export const updatePassword = (newPassword) =>
  request.patch('/user/update_password', newPassword)

export const getUserLikes = () => request.get('/likes')
export const toggleUserLikes = (postId) => request.post('/likes', postId)
