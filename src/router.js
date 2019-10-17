import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path:'/',
      component: Home
    }
  ]
})


export default router
