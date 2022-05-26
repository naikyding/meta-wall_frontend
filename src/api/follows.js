import request from './request'

export const getUserFollows = () => request.get('/follows')
