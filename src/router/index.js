import { createRouter, createWebHistory } from 'vue-router'
import MetaHome from '../views/MetaHome.vue'
import { useAppStore } from '../stores/app'
import { useUserStore } from '../stores/user'

import FilterPost from '@/components/FilterPost.vue'
import PostList from '@/components/PostList.vue'
import UserPostList from '@/components/UserPostList.vue'
import TitleArea from '@/components/TitleArea.vue'
import NewPostForm from '../views/post/NewPostForm.vue'
import Follows from '../views/FollowsIndex.vue'
import Likes from '../views/LikesMain.vue'
import Profile from '../views/profile/ProfileMain.vue'
import userMain from '../views/UserMain.vue'

import Error404 from '../views/errors/Error404Page.vue'

const router = createRouter({
  history: createWebHistory(),
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
          path: 'profile',
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
            'content-bottom': UserPostList,
          },
          meta: { auth: true },
        },
      ],
    },
    {
      path: '/reset-password/:userId/:token',
      name: 'resetPassword',
      component: () => import('../views/login/LoginMain.vue'),
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
    // 忘記密碼
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('../views/login/LoginMain.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: Error404,
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
  if (to.meta.auth && !localStorage.getItem('token')) {
    appStore.routerName = 'login'
    return next({ path: '/login' })
  }

  next()
})

export default router
