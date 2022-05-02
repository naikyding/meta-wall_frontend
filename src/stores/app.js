import { defineStore } from 'pinia'

export const useAppStore = defineStore('App Store', {
  state: () => ({
    routerName: '',
    disableMemberItem: true,
  }),
  getters: {
    navStatus: (state) => {
      const navDisableRouter = ['login', 'register']
      return navDisableRouter.includes(state.routerName)
    },
  },
  actins: {},
})
