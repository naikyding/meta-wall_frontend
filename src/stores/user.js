import { defineStore } from 'pinia'
import validator from 'validator'
import Swal from 'sweetalert2'
import { resStatus } from '../utils/responseHandle'
import router from '../router'
import { authLogin, authLogout } from '../utils/auth'
import { useProfileMainStore } from './profile'

import {
  userRegisterAPI,
  userLoginAPI,
  userProfileAPI,
  updateProfileAPI,
  updatePasswordAPI,
} from '@/api'

export const useUserStore = defineStore('user', {
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

export const useProfileStore = defineStore('User Profile', {
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

      const { nickname, gender } = formData
      const form = new FormData()
      form.append('nickname', nickname)
      form.append('gender', gender)

      if (this.file.buffer) {
        form.append('avatar', this.file.buffer)
      }

      const res = await updateProfileAPI(form)
      resStatus(res, this.updateUserProfileSuccess)
    },
  },
})

export const useUserPassword = defineStore('User Password', {
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

    updatePasswordSuccess(message, data) {
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

    async updatePassword(newPassword) {
      try {
        if (!this.form.password || !this.form.passwordConfirm) return false
        const res = await updatePasswordAPI(newPassword)
        resStatus(res, this.updatePasswordSuccess)
      } catch ({ data }) {
        this.updatePasswordError(data)
      }
    },
  },
})
