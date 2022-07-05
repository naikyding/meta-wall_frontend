import request from './request'

export const getPostsList = (q = '', s = 'n') =>
  request.get('/posts', {
    params: { q, s },
  })

export const createPost = (data) => request.post('/post', data)

export const commentPost = (data) => request.post('/comments', data)

export const getUserPostList = (postId, q = '', s = 'n') =>
  request.get(`/post/${postId}`, {
    params: { q, s },
  })

export const getPostComments = (postId) =>
  request.get(`/post/comments/${postId}`)
