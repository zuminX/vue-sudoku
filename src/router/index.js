import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      title: '数独游戏'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register'),
    meta: {
      title: '注册'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
