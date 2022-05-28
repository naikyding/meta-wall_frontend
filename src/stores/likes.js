import { defineStore } from 'pinia'
import { usePostStore } from '@/stores/posts'
import { getUserLikesAPI, toggleUserLikesAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import { useUserPostsStore } from '@/stores/userPosts'
import Swal from 'sweetalert2'
import router from '../router'

export const useLikesStore = defineStore('Likes', {
  state: () => ({
    list: [], // 跟隨名單
    activePostId: null,
    postModel: {
      status: false,
    },
  }),
  getters: {
    activePostContent: (state) => {
      return state.list.find((post) => post._id === state.activePostId) || {}
    },
  },
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

    toggleLikeSuccess(message) {
      const postStore = usePostStore()
      const userPosts = useUserPostsStore()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      if (message === '移除按讚') {
        this.activePostId = null
        this.postModel.status = false
      }
      this.getUserLikes()
      const userPostId = router.currentRoute.value.params.id
      if (userPostId)
        userPosts.getUserPosts(router.currentRoute.value.params.id)
      postStore.getPostsList()
    },

    async toggleLike(postId) {
      const detailsEl = document.querySelector(`.details_${postId.postId}`)
      if (detailsEl) detailsEl.open = false
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

    showPost(postId) {
      this.activePostId = postId
      this.postModel.status = true
    },

    closePostModel() {
      this.postModel.status = false
      this.activePostId = null
    },
  },
})
