import { defineStore } from 'pinia'

export const useProfileStore = defineStore('Profile Store', {
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
