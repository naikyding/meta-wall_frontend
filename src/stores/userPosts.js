import { defineStore } from 'pinia'
import { getUserPostListAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import { getPostCommentsAPI } from '@/api'

export const useUserPostsStore = defineStore('User Posts List', {
  state: () => ({
    user: {},
    list: [],
    filter: {
      q: '',
      s: 'n',
    },
  }),
  getters: {},
  actions: {
    getUserPostsSuccess(message, data) {
      this.list = data.posts
      this.user.avatar = data.avatar
      this.user.nickname = data.nickname
      this.user.id = data._id
      this.user.follower = data.follower
    },

    async getUserPosts(userId, q = '', s = 'n') {
      try {
        const res = await getUserPostListAPI(userId, q, s)
        resStatus(res, this.getUserPostsSuccess)
      } catch (error) {
        console.log(error)
      }
    },

    getPostCommentsSuccess(message, data) {
      const activePost = this.list.find((item) => item._id === data._id)
      activePost.comments = data.comments
    },

    async getPostComments(e, postId) {
      if (e && !e.target.open) return false
      try {
        const res = await getPostCommentsAPI(postId)
        resStatus(res, this.getPostCommentsSuccess)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
