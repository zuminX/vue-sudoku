import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/index'),
    meta: {
      title: '登录'
    },
    hidden: true
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index'),
    meta: {
      title: '数独游戏'
    },
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index'),
    meta: {
      title: '注册'
    },
    hidden: true
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: '概览', icon: 'dashboard' }
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
