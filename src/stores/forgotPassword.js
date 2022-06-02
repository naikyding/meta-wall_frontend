import { defineStore } from 'pinia'
import validator from 'validator'
import { forgotPasswordAPI } from '@/api'
import { resStatus } from '../utils/responseHandle'
import Swal from 'sweetalert2'
import router from '../router'

export const useForgotPasswordStore = defineStore('Fogot Password Store', {
  state: () => ({
    form: {
      email: '',
    },

    inputStatus: {
      email: false,
    },
  }),
  getters: {
    rules: (state) => ({
      email: {
        required: state.inputStatus.email && state.form.email === '',

        validate:
          state.inputStatus.email &&
          state.form.email.length > 0 &&
          !validator.isEmail(state.form.email),
      },
    }),
  },
  actions: {
    resetForm() {
      this.form = {
        email: '',
      }
      this.inputStatus = {
        email: false,
      }
    },
    submitSuccess(message) {
      this.resetForm()
      router.push({ path: '/login' })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
    },
    async submit(emailForm) {
      if (!emailForm.email) return (this.inputStatus.email = true)
      try {
        const res = await forgotPasswordAPI(emailForm)
        resStatus(res, this.submitSuccess)
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
  },
})

export const resetPasswordByToken = defineStore('Reset Password By Token', {
  state: () => ({}),
  getters: {},
  actions: {},
})
