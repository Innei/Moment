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
      component: () =>
        import(/* webpackChunkName: "init" */ '@/views/Init.vue'),
      meta: { once: true, title: 'おかえりなさいご主人様 -- Moment' }
    },
    {
      name: 'login',
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: { title: '登陆 -- Moment' }
    },
    {
      name: 'admin',
      path: '/master',
      meta: { private: true, title: ' -- Moment' },
      component: () =>
        import(/* webpackChunkName: "master" */ '@/views/Admin/index.vue'),
      redirect: '/master/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ '@/views/Admin/dashboard.vue'
            ),
          meta: { title: '仪表盘' }
        },
        {
          path: 'moments',
          component: () =>
            import(
              /* webpackChunkName: "manageMoment" */ '@/views/Admin/manageMoment.vue'
            ),
          meta: { title: '管理瞬间' }
        },
        {
          path: 'analytics',
          component: () =>
            import(
              /* webpackChunkName: "analyse" */ '@/views/Admin/setting/index.vue'
            ),
          redirect: '/master/analytics/chart',
          children: [
            {
              path: 'chart',
              meta: { title: '图表' },
              component: () =>
                import(
                  /* webpackChunkName: "chart" */ '@/views/Admin/analyse/chart.vue'
                )
            },
            {
              path: 'table',
              meta: { title: '访客数据' },
              component: () =>
                import(
                  /* webpackChunkName: "table" */ '@/views/Admin/analyse/table.vue'
                )
            }
          ]
        },
        {
          path: 'setting',
          component: () =>
            import(
              /* webpackChunkName: "setting" */ '@/views/Admin/setting/index.vue'
            ),
          redirect: '/master/setting/profile',
          children: [
            {
              path: 'profile',
              meta: { title: '主人信息' },
              component: () =>
                import(
                  /* webpackChunkName: "profile" */ '@/views/Admin/setting/profile.vue'
                )
            },
            {
              path: 'reset',
              meta: { title: '修改密码' },
              component: () =>
                import(
                  /* webpackChunkName: "reset" */ '@/views/Admin/setting/reset.vue'
                )
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // 用这种方式去获取父路由的 meta 信息
  if (to.matched.some(r => r.meta.private)) {
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
  const titleArr = []
  to.matched.map(i => titleArr.unshift(i.meta.title))

  if (to.meta.title) {
    // document.title = to.meta.title
    document.title = titleArr.join('')
  }
})
export default router
