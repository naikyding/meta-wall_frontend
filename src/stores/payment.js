import { defineStore } from 'pinia'
import { linePayAPI } from '../api'

export const useLinePayStore = defineStore('Line Pay', {
  state: () => ({}),
  getters: {},
  actions: {
    async goLinePay(payItem) {
      // console.log('goLinePay')
      const { returnCode, info } = await linePayAPI(payItem)
      if (returnCode === '0000') {
        console.log(info)
        location.href = info.paymentUrl.web
      }
    },
  },
})
