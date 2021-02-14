import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { guestOnly: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { authOnly: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['auth/authenticated']) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters['auth/authenticated']) {
      next({
        path: '/dashboard'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
