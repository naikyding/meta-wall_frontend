import { defineStore } from 'pinia'

export const useNewPostStore = defineStore('New Post Store', {
  state: () => ({
    previewImg: {
      url: '',
      name: '',
      size: 0,
    },

    form: {
      content: '',
      imgUrl: '',
    },
  }),

  getters: {
    submitBtnStatus: (state) => {
      return state.form.content &&
        state.form.imgUrl &&
        state.previewImg.size < 1048576
        ? 'bg-primary text-white hover:bg-secondary hover:text-black active:bg-primary'
        : 'bg-[#A8B0B9] text-black cursor-not-allowed'
    },
  },

  actions: {
    imgPreview(e) {
      const uploadFile = e.target.files[0]
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
    },
  },
})
