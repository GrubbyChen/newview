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
      path: '/nvworks/photo',
      name: 'works-photo',
      component: () => import('./views/Works.vue')
    },
    {
      path: '/nvworks/album',
      name: 'works-album',
      component: () => import('./views/Works.vue')
    },
    {
      path: '/nvworks/video',
      name: 'works-video',
      component: () => import('./views/Works.vue')
    },
    {
      path: '/nvcompany',
      name: 'company',
      component: () => import('./views/Company.vue')
    },
    {
      path: '/nvcontact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    }
  ]
})
