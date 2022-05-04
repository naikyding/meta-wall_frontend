import { createRouter, createWebHashHistory } from 'vue-router'
import MetaHome from '../views/MetaHome.vue'
import { useAppStore } from '../stores/app'

import FilterPost from '@/components/FilterPost.vue'
import PostList from '@/components/PostList.vue'

import TitleArea from '@/components/TitleArea.vue'

import NewPostForm from '../views/post/NewPostForm.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MetaHome,
      children: [
        // 首頁
        {
          path: '',
          name: 'index',
          components: {
            'content-top': FilterPost,
            'content-bottom': PostList,
          },
        },
        // 張貼
        {
          path: 'new-post',
          name: 'post',
          components: {
            'content-top': TitleArea,
            'content-bottom': NewPostForm,
          },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // 登入
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginMain.vue'),
    },
    // 註冊
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/login/LoginMain.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  appStore.routerName = to.name
  next()
})

export default router
