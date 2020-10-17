import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

// 所有权限通用路由表
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '数独游戏',
        icon: 'home'
      }
    }]
  },
  {
    path: '/userInformation',
    component: Layout,
    children: [{
      path: 'userInformation',
      name: 'UserInformation',
      component: () => import('@/views/user-information/index'),
      meta: {
        title: '信息',
        icon: 'people'
      }
    }]
  },
  {
    path: '/historyRecord',
    component: Layout,
    children: [{
      path: 'historyRecord',
      name: 'HistoryRecord',
      component: () => import('@/views/history-record/index'),
      meta: {
        title: '历史游戏',
        icon: 'history'
      }
    }]
  },
  {
    path: '/leaderboard',
    component: Layout,
    children: [{
      path: 'leaderboard',
      name: 'Leaderboard',
      component: () => import('@/views/leaderboard/index'),
      meta: {
        title: '排行榜',
        icon: 'chart'
      }
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index'),
    meta: {
      title: '注册'
    },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

// 异步挂载的路由
export const asyncRouterMap = [
]

export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const originalPush = VueRouter.prototype.push

/**
 * 解决重定向时报错
 * @param location
 * @param onResolve
 * @param onReject
 * @returns {Promise<Route | *>|Promise<Route>|void}
 */
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
