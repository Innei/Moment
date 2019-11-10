import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import master from '@/api/master'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: { title: 'Moment' }
    },
    {
      name: 'init',
      path: '/init',
      component: () => import('@/views/Init.vue'),
      meta: { once: true, title: 'おかえりなさいご主人様 -- Moment' }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登陆 -- Moment' }
    },
    {
      name: 'admin',
      path: '/master',
      meta: { private: true },
      component: () => import('@/views/Admin/index.vue'),
      redirect: '/master/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/Admin/dashboard.vue'),
          meta: { title: '仪表盘 -- Moment' }
        },
        {
          path: 'moments',
          component: () => import('@/views/Admin/manageMoment.vue'),
          meta: { title: '管理瞬间 -- Moment' }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.private) {
    const { data } = await master.checkLogged()
    if (data.ok === 1) {
      return next()
    } else {
      return next({ name: 'login' })
    }
  }
  next()
})

router.afterEach(to => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export default router
