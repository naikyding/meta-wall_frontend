import { defineStore } from 'pinia'
import validator from 'validator'
import Swal from 'sweetalert2'
import { resStatus } from '../utils/responseHandle'
import router from '../router'
import { forgotPasswordAPI } from '@/api'
import { authLogin, authLogout } from '../utils/auth'

import {
  userRegisterAPI,
  userLoginAPI,
  userProfileAPI,
  updateProfileAPI,
  updatePasswordAPI,
  resetPasswordAPI,
} from '@/api'

export const useUserStore = defineStore('user data', {
  state: () => ({
    data: {
      nickname: '',
      id: '',
      avatar: '',
      gender: '',
    },
  }),
  getters: {},
  actions: {
    logout() {
      router.replace({ path: '/login' })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '已成功登出',
        showConfirmButton: false,
        timer: 1500,
      })

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
    saveUserData({ nickname, avatar, id, gender }) {
      this.data.nickname = nickname
      this.data.avatar = avatar
      this.data.id = id
      this.data.gender = gender
    },
  },
})

export const useUserRegister = defineStore('user register', {
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
    errorMessageStatus: false,
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
        format:
          state.form.password &&
          !/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)[a-zA-Z0-9]*$/.test(
            state.form.password
          ),
      },
      passwordConfirm: {
        required:
          state.form.passwordConfirm === '' && state.formStatus.passwordConfirm,
        same:
          state.form.passwordConfirm.length > 0 &&
          state.form.password === state.form.passwordConfirm,
      },
    }),
    formValidate: (state) =>
      !Object.values(state.validateStatus).includes(false),
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
      this.errorMessageStatus = false
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
      if (!this.formValidate) {
        this.errorMessageStatus = true
        return false
      }

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

export const useLoginStore = defineStore('user login', {
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

    googleAuth() {
      location.href = `${import.meta.env.VITE_API_URL}/auth/google`
    },

    facebookAuth() {
      location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`
    },
  },
})

export const useProfileStore = defineStore('user profile', {
  state: () => ({
    form: {
      nickname: '',
      avatar: '',
      gender: '',
    },

    file: {
      buffer: null,
    },
    error: {
      required: false,
    },
  }),
  getters: {
    formValidateStatus: (state) => {
      const nicknameStatus =
        state.form.nickname && state.form.nickname.length > 1
      const genderStatus = state.form.gender ? true : false

      const validateStatus = nicknameStatus && genderStatus
      if (validateStatus) state.error.required = false

      return validateStatus
    },
  },
  actions: {
    avatarImagePreview(e) {
      const uploadFile = e.target.files[0]
      this.file.buffer = uploadFile
      if (!uploadFile) return false

      const imgUrl = URL.createObjectURL(uploadFile)
      this.form.avatar = imgUrl
    },

    saveProfileForm(defaultData = { nickname: '', avatar: '', gender: '' }) {
      this.form = defaultData
    },

    getUserProfileSuccess(message, { user }) {
      const userStore = useUserStore()
      userStore.saveUserData(user)
      localStorage.setItem('user', JSON.stringify(user))

      const { nickname, avatar, gender } = user
      this.saveProfileForm({ nickname, avatar, gender })
    },

    async getUserProfile() {
      const res = await userProfileAPI()
      resStatus(res, this.getUserProfileSuccess)
    },

    updateUserProfileSuccess(message) {
      this.getUserProfile()

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
    },

    async updateUserProfile(formData) {
      if (!this.formValidateStatus) {
        this.error.required = true
        return false
      }
      try {
        const { nickname, gender } = formData
        const form = new FormData()
        form.append('nickname', nickname)
        form.append('gender', gender)

        if (this.file.buffer) {
          form.append('avatar', this.file.buffer)
        }

        const res = await updateProfileAPI(form)
        resStatus(res, this.updateUserProfileSuccess)
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

export const useUserPassword = defineStore('user password', {
  state: () => ({
    form: {
      password: '',
      passwordConfirm: '',
    },

    error: {
      status: false,
      message: '請填寫完整!',
    },
  }),

  getters: {
    formValidateStatus: (state) => {
      const passwordStatus = state.form.password ? true : false
      const passwordConfirmStatus = state.form.passwordConfirm ? true : false
      const validateSataus = passwordStatus && passwordConfirmStatus

      return validateSataus
    },
  },

  actions: {
    resetForm() {
      this.form = {
        password: '',
        passwordConfirm: '',
      }
    },

    updatePasswordSuccess(message) {
      const profileMainStore = useProfileMainStore()

      this.resetForm()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })

      profileMainStore.activeIndex = 0
    },

    updatePasswordError({ message }) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
    },

    async updatePassword(passwordForm) {
      try {
        if (!this.form.password || !this.form.passwordConfirm) return false
        const res = await updatePasswordAPI(passwordForm)
        resStatus(res, this.updatePasswordSuccess)
      } catch ({ data }) {
        this.updatePasswordError(data)
      }
    },

    resetPasswordSuccess(message) {
      this.resetForm()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })

      router.replace({ path: '/login' })
    },

    async resetPassword(form) {
      if (
        !form.password ||
        !form.passwordConfirm ||
        !form.userId ||
        !form.token
      )
        return false
      try {
        const res = await resetPasswordAPI(form)
        resStatus(res, this.resetPasswordSuccess)
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

export const useProfileMainStore = defineStore('user profilie main Store', {
  state: () => ({
    activeIndex: 0,
  }),
  getters: {
    tabStyle: (state) => (index) =>
      state.activeIndex === index
        ? 'bg-black text-white'
        : 'bg-white text-black',
  },
  actions: {},
})

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
