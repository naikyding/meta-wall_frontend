import request from '../api/request'

export const authLogin = (jwtToken, userData) => {
  request.defaults.headers.common['Authorization'] = jwtToken
  localStorage.setItem('token', jwtToken)
  localStorage.setItem('user', JSON.stringify(userData))
}

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
