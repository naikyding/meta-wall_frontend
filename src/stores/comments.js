import { defineStore } from 'pinia'
import { commentPostAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'
import { useLikesStore } from '@/stores/likes.js'
import { usePostStore } from './posts'
import router from '../router'
import { useUserPostsStore } from './userPosts'

export const useCommentStore = defineStore('user comments', {
  state: () => ({
    form: {
      content: null,
    },
  }),
  getters: {},
  actions: {
    resetForm() {
      this.form.content = null
    },

    commentSuccess(message, data) {
      const likeStore = useLikesStore()
      const postStore = usePostStore()
      const userPosts = useUserPostsStore()

      this.resetForm()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      likeStore.getUserLikes()
      const userPostId = router.currentRoute.value.params.id
      if (userPostId)
        return userPosts.getPostComments(undefined, data.comment.postId)
      postStore.getPostComments(undefined, data.comment.postId)
    },

    async comment(form) {
      if (!form.content) return false

      try {
        const res = await commentPostAPI(form)
        resStatus(res, this.commentSuccess)
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
