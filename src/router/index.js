import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index'),
    meta: {
      title: '数独游戏'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index'),
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
