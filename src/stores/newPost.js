import { defineStore } from 'pinia'
import { creatPostAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'
import router from '../router/index'

export const useNewPostStore = defineStore('New Post Store', {
  state: () => ({
    previewImg: {
      url: '',
      name: '',
      size: 0,
      buffer: null,
    },

    form: {
      content: '',
    },
  }),

  getters: {
    imageOverSize: (state) => {
      return state.previewImg.size > 1048576
    },

    submitBtnStatus: (state) => {
      if (state.previewImg.buffer && state.previewImg.size > 1048576)
        return 'bg-[#A8B0B9] text-black cursor-not-allowed'

      return state.form.content
        ? 'bg-primary text-white hover:bg-secondary hover:text-black active:bg-primary'
        : 'bg-[#A8B0B9] text-black cursor-not-allowed'
    },
  },

  actions: {
    resetForm() {
      this.removePreview()
      this.form.content = ''
    },

    imgPreview(e) {
      const uploadFile = e.target.files[0]
      this.previewImg.buffer = uploadFile
      if (!uploadFile) return false

      const imgUrl = URL.createObjectURL(uploadFile)
      this.previewImg.url = imgUrl
      this.previewImg.name = uploadFile.name
      this.previewImg.size = uploadFile.size + 0
    },

    removePreview() {
      this.previewImg.url = ''
      this.previewImg.name = ''
      this.previewImg.size = 0
      this.previewImg.buffer = null
    },

    submitPostSuccess(message) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      this.resetForm()
      router.push({ path: '/' })
    },

    submitPostError(message) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
    },

    async submitPost() {
      if (this.imageOverSize || !this.form.content) return false

      const form = new FormData()
      form.append('content', this.form.content)

      if (this.previewImg.buffer) form.append('image', this.previewImg.buffer)

      const { data } = await creatPostAPI(form)
      resStatus(data, this.submitPostSuccess, this.submitPostError)
    },
  },
})
