import { defineStore } from 'pinia'
import { getPostsListAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'

export const usePostStore = defineStore('Post', {
  state: () => ({
    list: [],
    filter: {
      q: '',
      s: 'n',
    },
  }),
  getters: {},
  actions: {
    getPostsListSuccess(message, data) {
      // this.list = data
      this.list = data
    },

    async getPostsList(q, s) {
      const { data } = await getPostsListAPI(q, s)
      resStatus(data, this.getPostsListSuccess)
    },
  },
})
