import request from './request'

export const getPostsList = (q = '', s = 'n') =>
  request.get('/posts', {
    params: { q, s },
  })
