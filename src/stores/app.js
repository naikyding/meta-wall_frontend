import { defineStore } from 'pinia'

const routerTitle = {
  likes: '我按讚的貼文',
  post: '張貼動態',
  follows: '追蹤名單',
  profile: '修改個人資料',
}

export const useAppStore = defineStore('app store', {
  state: () => ({
    routerName: '',
    disableMemberItem: true,

    // loader display
    loading: false,
  }),
  getters: {
    navStatus: (state) => {
      const navDisableRouter = [
        'login',
        'register',
        'forgotPassword',
        'resetPassword',
      ]
      return navDisableRouter.includes(state.routerName)
    },
    contentTopTitle: (state) => {
      return routerTitle[state.routerName]
    },
  },
  actins: {},
})

export const useLoginMainStore = defineStore('login main', {
  state: () => ({
    activeComponentIndex: 0,
  }),
  getters: {},
  actions: {},
})
