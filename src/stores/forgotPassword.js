import { defineStore } from 'pinia'
import validator from 'validator'

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
    submit(emailForm) {
      if (!emailForm.email) return (this.inputStatus.email = true)

      console.log(emailForm)
    },
  },
})
