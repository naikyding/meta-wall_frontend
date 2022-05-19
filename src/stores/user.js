import { defineStore } from 'pinia'
import { userRegisterAPI } from '@/api'
import validator from 'validator'
import Swal from 'sweetalert2'
import { resStatus } from '../utils/responseHandle'
import router from '../router'

export const useUserStore = defineStore('user', {
  state: () => ({
    data: {
      avatar:
        'data:image/jpeg;base64,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',
    },
    userId: '123123',
  }),
  getters: {},
  actions: {},
})

export const userUserRegister = defineStore('User Register', {
  state: () => ({
    form: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    formStatus: {
      nickname: false,
      email: false,
      password: false,
      passwordConfirm: false,
    },
  }),
  getters: {
    validateStatus: (state) => ({
      nickname:
        state.formStatus.nickname &&
        state.form.nickname &&
        state.rules.nickname.length &&
        !state.rules.nickname.required,
      email:
        state.formStatus.email &&
        !state.rules.email.required &&
        !state.rules.email.validate,
      password:
        state.formStatus.password &&
        !state.rules.password.required &&
        !state.rules.password.length,
      passwordConfirm:
        state.formStatus.passwordConfirm &&
        state.rules.passwordConfirm.same &&
        !state.rules.passwordConfirm.register,
    }),
    rules: (state) => ({
      nickname: {
        required: state.form.nickname === '' && state.formStatus.nickname,
        length: !state.form.nickname || state.form.nickname.length > 1,
      },

      email: {
        required: state.form.email === '' && state.formStatus.email,
        validate:
          state.form.email.length > 0 && !validator.isEmail(state.form.email),
      },
      password: {
        required: state.form.password === '' && state.formStatus.password,
        length:
          state.formStatus.password &&
          state.form.password.length > 0 &&
          state.form.password.length < 8,
      },
      passwordConfirm: {
        required:
          state.form.passwordConfirm === '' && state.formStatus.passwordConfirm,
        same:
          state.form.passwordConfirm.length > 0 &&
          state.form.password === state.form.passwordConfirm,
      },
    }),
  },

  actions: {
    resetForm() {
      this.form = {
        nickname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }
      this.formStatus = {
        nickname: false,
        email: false,
        password: false,
        passwordConfirm: false,
      }
    },

    registerSuccess(message) {
      this.resetForm()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      router.push({ path: '/login' })
    },
    async register(userData) {
      // validate
      if (Object.values(this.validateStatus).includes(false)) return
      try {
        const { data } = await userRegisterAPI(userData)
        resStatus(data, this.registerSuccess)
      } catch ({
        response: {
          data: { message },
        },
      }) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
  },
})
