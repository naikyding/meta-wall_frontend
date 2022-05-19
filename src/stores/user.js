import { defineStore } from 'pinia'
import { userRegisterAPI, userLoginAPI } from '@/api'
import validator from 'validator'
import Swal from 'sweetalert2'
import { resStatus } from '../utils/responseHandle'
import router from '../router'
import { authLogin, authLogout } from '../utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    data: {
      nickname: '',
      id: '',
      avatar: '',
    },
    userId: '123123',
  }),
  getters: {},
  actions: {
    logout() {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '已成功登出',
        showConfirmButton: false,
        timer: 1500,
      })

      router.replace({ path: '/login' })

      authLogout()
      this.removeUserData()
    },
    removeUserData() {
      this.data = {
        nickname: '',
        id: '',
        avatar: '',
      }
    },
    saveUserData({ nickname, avatar, id }) {
      this.data.nickname = nickname
      this.data.avatar = avatar
      this.data.id = id
    },
  },
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
        const res = await userRegisterAPI(userData)
        resStatus(res, this.registerSuccess)
      } catch ({ data: { message } }) {
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

export const useLoginStore = defineStore('User Login', {
  state: () => ({
    form: {
      email: '',
      password: '',
    },

    loginError: false,
  }),
  getters: {},
  actions: {
    resetForm() {
      this.form = {
        email: '',
        password: '',
      }

      this.loginError = false
    },

    userLoginSuccess(message, data) {
      const { tokenType, token } = data
      authLogin(tokenType + token, data.user)

      const userStore = useUserStore()
      userStore.saveUserData(data.user)

      this.resetForm()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      router.push({ path: '/' })
    },

    async userLogin(loginData) {
      try {
        if (!loginData.email || !loginData.password) {
          this.loginError = '請輸入登入資訊'
          return false
        }

        const res = await userLoginAPI(loginData)
        resStatus(res, this.userLoginSuccess)
      } catch ({ data }) {
        this.loginError = data.message
      }
    },
  },
})
