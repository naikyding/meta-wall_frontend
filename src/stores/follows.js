import { defineStore } from 'pinia'
import { getUserFollowsAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'

export const useFollowsStore = defineStore('Follows', {
  state: () => ({
    list: [], // 跟隨名單
  }),
  getters: {},
  actions: {
    getUserFollowListSuccess(message, { follows }) {
      this.list = follows
    },
    async getUserFollowList() {
      try {
        const res = await getUserFollowsAPI()
        resStatus(res, this.getUserFollowListSuccess)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
