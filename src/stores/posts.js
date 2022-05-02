import { defineStore } from 'pinia'

export const usePostStore = defineStore('Post', {
  state: () => ({
    list: [],
  }),
  getters: {},
  actions: {},
})
