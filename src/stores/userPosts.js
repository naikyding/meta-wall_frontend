import { defineStore } from 'pinia'
import { getUserPostListAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'
import { getPostCommentsAPI, followUserToggleAPI } from '@/api'
import router from '../router'
import { useFollowsStore } from '../stores/follows'

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
        const detailsEl = document.querySelectorAll('details')
        if (detailsEl.length > 0) detailsEl.forEach((el) => (el.open = false))
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
        this.getUserPosts()
      }
    },

    followUserSuccess(message) {
      const followsStore = useFollowsStore()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      followsStore.getUserFollowList()
      this.getUserPosts(router.currentRoute.value.params.id)
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
