import request from './request'

export const getPostsList = (q = '', s = 'n') =>
  request.get('/posts', {
    params: { q, s },
  })

export const creatPost = (data) => request.post('/post', data)
export const commentPost = (data) => request.post('/comments', data)

export const getPostComments = (postId) =>
  request.get(`/post/comments/${postId}`)
