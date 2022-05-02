import { defineStore } from 'pinia'

export const usePostStore = defineStore('Post', {
  state: () => ({
    list: [
      {
        _id: '123',
        name: 'Naiky',
        avatar: 'https://picsum.photos/600/400',
        createdAt: '2022/1/10 12:00',
        content: '外面看起來就超冷.... 我決定回被窩繼續睡....>.<',
        image: 'https://picsum.photos/600/400',
        likes: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }],
        comment: [
          {
            _id: '123',
            name: 'NIKE',
            avatar: 'https://picsum.photos/700/400',
            message: '123123123',
            createdAt: '2022/1/10 12:00',
          },
          {
            _id: '123',
            name: 'NIKE',
            avatar: 'https://picsum.photos/700/400',
            message: '123',
            createdAt: '2022/1/10 12:00',
          },
          {
            _id: '123',
            name: 'NIKE',
            avatar: 'https://picsum.photos/700/400',
            message: '123',
            createdAt: '2022/1/10 12:00',
          },
        ],
      },
    ],
  }),
  getters: {},
  actions: {},
})
