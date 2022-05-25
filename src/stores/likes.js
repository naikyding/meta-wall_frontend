import { defineStore } from 'pinia'
import { getUserLikesAPI, toggleUserLikesAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'

export const useLikesStore = defineStore('Likes', {
  state: () => ({
    list: [], // 跟隨名單
  }),
  getters: {},
  actions: {
    getUserLikesSuccess(message, data) {
      this.list = data
    },

    async getUserLikes() {
      try {
        const res = await getUserLikesAPI()
        resStatus(res, this.getUserLikesSuccess)
      } catch (error) {
        console.log(error)
      }
    },

    toggleLikeSuccess(message, data) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      this.getUserLikes()
    },

    async toggleLike(postId) {
      try {
        const res = await toggleUserLikesAPI(postId)
        resStatus(res, this.toggleLikeSuccess)
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
  },
})
