import { defineStore } from 'pinia'
import { linePayAPI } from '../api'
import Swal from 'sweetalert2'

export const useLinePayStore = defineStore('Line Pay', {
  state: () => ({}),
  getters: {},
  actions: {
    async goLinePay(payItem) {
      try {
        const { returnCode, info } = await linePayAPI(payItem)
        if (returnCode === '0000') {
          location.href = info.paymentUrl.web
        }
      } catch ({ data }) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
  },
})
