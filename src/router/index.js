import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 所有权限通用路由表
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
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
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

// 异步挂载的路由
export const asyncRouterMap = [
  {
  }
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
