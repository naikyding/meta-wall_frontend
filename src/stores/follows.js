import { defineStore } from 'pinia'
import { getUserFollowsAPI, followUserToggleAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import { useUserPostsStore } from './userPosts'
import router from '../router'
import Swal from 'sweetalert2'

export const useFollowsStore = defineStore('user follows', {
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
    followUserSuccess(message) {
      const userPosts = useUserPostsStore()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      this.getUserFollowList()

      userPosts.getUserPosts(router.currentRoute.value.params.id)
    },

    async followUser(postId) {
      try {
        const res = await followUserToggleAPI(postId)
        resStatus(res, this.followUserSuccess)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
