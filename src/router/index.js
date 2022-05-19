import { createRouter, createWebHashHistory } from 'vue-router'
import MetaHome from '../views/MetaHome.vue'
import { useAppStore } from '../stores/app'
import { useUserStore } from '../stores/user'

import FilterPost from '@/components/FilterPost.vue'
import PostList from '@/components/PostList.vue'
import TitleArea from '@/components/TitleArea.vue'
import NewPostForm from '../views/post/NewPostForm.vue'
import Follows from '../views/FollowsIndex.vue'
import Likes from '../views/LikesMain.vue'
import Profile from '../views/profile/ProfileMain.vue'
import userMain from '../views/UserMain.vue'

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
          meta: { auth: true },
        },
        // 張貼
        {
          path: 'new-post',
          name: 'post',
          components: {
            'content-top': TitleArea,
            'content-bottom': NewPostForm,
          },
          meta: { auth: true },
        },
        // 跟隨
        {
          path: 'follows',
          name: 'follows',
          components: {
            'content-top': TitleArea,
            'content-bottom': Follows,
          },
          meta: { auth: true },
        },
        // 按讚
        {
          path: 'likes',
          name: 'likes',
          components: {
            'content-top': TitleArea,
            'content-bottom': Likes,
          },
          meta: { auth: true },
        },
        // 個人資料
        {
          path: 'profile/:id',
          name: 'profile',
          components: {
            'content-top': TitleArea,
            'content-bottom': Profile,
          },
          meta: { auth: true },
        },
        // 個人頁
        {
          path: 'user/:id',
          name: 'user',
          components: {
            'content-top': userMain,
            'content-bottom': PostList,
          },
          meta: { auth: true },
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
  const userStore = useUserStore()
  appStore.routerName = to.name

  const localUserData = JSON.parse(localStorage.getItem('user'))
  if (!userStore.data.id && localUserData) userStore.saveUserData(localUserData)

  // 路由驗証
  if (to.meta.auth && !localStorage.getItem('token'))
    return next({ path: '/login' })

  next()
})

export default router
