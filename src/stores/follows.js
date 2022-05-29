import { defineStore } from 'pinia'
import { getUserFollowsAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import router from '../router'

export const useFollowsStore = defineStore('Follows', {
  state: () => ({
    list: [], // 跟隨名單
  }),
  getters: {
    isFollows: (state) => {
      const userId = router.currentRoute.value.params.id
      return state.list.some((item) => item.userId._id == userId)
    },
  },
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
