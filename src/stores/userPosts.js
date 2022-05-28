import { defineStore } from 'pinia'
import { getUserPostListAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'

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
    },

    async getUserPosts(userId, q = '', s = 'n') {
      try {
        const res = await getUserPostListAPI(userId, q, s)
        resStatus(res, this.getUserPostsSuccess)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
