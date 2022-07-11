import { defineStore } from 'pinia'
import { getPostsListAPI, getPostCommentsAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'
import router from '../router'

export const usePostStore = defineStore('posts list', {
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
      this.list = data
    },
    getPostsListError({ message }) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      router.replace({ path: '/login' })
    },

    async getPostsList(q, s) {
      const detailsEl = document.querySelectorAll('details')
      if (detailsEl.length > 0) detailsEl.forEach((item) => (item.open = false))

      try {
        const res = await getPostsListAPI(q, s)
        resStatus(res, this.getPostsListSuccess)
      } catch ({ data }) {
        this.getPostsListError(data)
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
