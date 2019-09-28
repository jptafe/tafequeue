import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

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
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      beforeEnter (to, from, next) {
        if (store.getters.isLoggedIn) {
          next({ name: 'showqueue' })
        } else {
          next()
        }
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
      beforeEnter (to, from, next) {
        if (store.getters.isLoggedIn === false) {
          next({ name: 'login' })
        } else {
          next()
        }
      }
    },
    {
      path: '/enqueue',
      name: 'enqueue',
      component: () => import(/* webpackChunkName: "enqueue" */ './views/Enqueue.vue'),
      beforeEnter (to, from, next) {
        if (store.getters.isLoggedIn === false) {
          next({ name: 'login' })
        } else {
          if (store.getters.isInqueue === true) {
            next({ name: 'showqueue' })
          } else {
            next()
          }
        }
      }
    },
    {
      path: '/dequeue',
      name: 'dequeue',
      component: () => import(/* webpackChunkName: "dequeue" */ './views/Dequeue.vue'),
      beforeEnter (to, from, next) {
        if (store.getters.isLoggedIn === false) {
          next({ name: 'login' })
        } else {
          if (store.getters.isInqueue === false) {
            next({ name: 'showqueue' })
          } else {
            next()
          }
        }
      }
    },
    {
      path: '/showqueue',
      name: 'showqueue',
      component: () => import(/* webpackChunkName: "showqueue" */ './views/Showqueue.vue'),
      beforeEnter (to, from, next) {
        if (store.getters.isLoggedIn === false) {
          next({ name: 'login' })
        } else {
          next()
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue'),
      beforeEnter (to, from, next) {
        if (store.getters.isLoggedIn === false) {
          next({ name: 'login' })
        } else {
          next()
        }
      }
    }
  ]
})
