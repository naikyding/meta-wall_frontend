import { defineStore } from 'pinia'
import { getPostsListAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'
import router from '../router'

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
      try {
        const res = await getPostsListAPI(q, s)
        resStatus(res, this.getPostsListSuccess)
      } catch ({ data }) {
        this.getPostsListError(data)
      }
    },
  },
})
