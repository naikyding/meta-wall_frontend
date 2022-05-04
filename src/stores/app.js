import { defineStore } from 'pinia'

const routerTitle = {
  likes: '我按讚的貼文',
  post: '張貼動態',
  follow: '追蹤名單',
  profile: '修改個人資料',
}

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
    contentTopTitle: (state) => {
      return routerTitle[state.routerName]
    },
  },
  actins: {},
})
