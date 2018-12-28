import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/nvworks',
      name: 'works',
      component: () => import('./views/Works.vue')
    },
    {
      path: '/contact',
      name: 'about',
      component: () => import('./views/AboutUS.vue')
    }
  ]
})
