import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '@/views/course'
import Store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login')
  },
  {
    path: '/learn',
    name: 'learn',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn')
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/user',
    name: 'user',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'user' */'@/views/user')
  },
  {
    path: '/course-info/:courseId',
    name: 'CourseInfo',
    props: true,
    component: () => import(/* webpackChunkName: 'CourseInfo' */'@/views/course-info')
  },
  {
    path: '/lesson-video/:lessonId',
    name: 'LessonVideo',
    props: true,
    component: () => import(/* webpackChunkName: 'LessonVideo' */'@/views/course-info/video')
  },
  {
    path: '/pay/:courseId',
    name: 'pay',
    props: true,
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!Store.state.user) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
