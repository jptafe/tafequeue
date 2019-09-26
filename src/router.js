import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/enqueue',
      name: 'enqueue',
      component: () => import(/* webpackChunkName: "enqueue" */ './views/Enqueue.vue')
    },
    {
      path: '/dequeue',
      name: 'dequeue',
      component: () => import(/* webpackChunkName: "dequeue" */ './views/Dequeue.vue')
    },
    {
      path: '/showqueue',
      name: 'showqueue',
      component: () => import(/* webpackChunkName: "showqueue" */ './views/Showqueue.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
