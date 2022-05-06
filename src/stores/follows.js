import { defineStore } from 'pinia'

const mockData = [
  {
    name: 'Naiky',
    avatar: 'https://picsum.photos/600/300',
    createdAt: '2022/1/10 12:00',
  },
  {
    name: 'Naiky',
    avatar: 'https://picsum.photos/600/300',
    createdAt: '2022/1/10 12:00',
  },
  {
    name: 'Naiky',
    avatar: 'https://picsum.photos/600/300',
    createdAt: '2022/1/10 12:00',
  },
]

export const useFollowsStore = defineStore('Follows', {
  state: () => ({
    list: mockData, // 跟隨名單
  }),
  getters: {},
  actions: {},
})
