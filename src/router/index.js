import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import { constStore } from '@/store/constStore'

Vue.use(VueRouter)

// 修改路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

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
        icon: 'home',
        keepAlive: true
      }
    }]
  },
  {
    path: '/userInformation',
    component: Layout,
    children: [{
      path: '',
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
      path: '',
      name: 'HistoryRecord',
      component: () => import('@/views/history-record/index'),
      meta: {
        title: '历史游戏',
        icon: 'history'
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
  {
    path: '/external-link',
    component: Layout,
    meta: {
      role: ['ADMIN']
    },
    children: [{
      path: 'http://47.116.68.80:8082/admin',
      meta: {
        title: '后台管理',
        icon: 'link'
      }
    }]
  }
]

/**
 * 获取排行榜路由表
 * @returns {*} 排行榜路由表
 */
export const getLeaderboardRouter = async() => {
  const children = []
  const rankingNameList = await constStore.getRankingNameList()
  let i = 0
  for (const rankingName of rankingNameList) {
    children.push({
      path: `${i++}`,
      name: rankingName,
      component: () => import('@/views/leaderboard/index'),
      meta: {
        rankingName,
        title: rankingName
      }
    })
  }
  return {
    path: '/leaderboard',
    component: Layout,
    redirect: '/leaderboard/0',
    meta: {
      title: '排行榜',
      icon: 'chart'
    },
    children
  }
}

/**
 * 创建路由
 * @returns {VueRouter} 路由对象
 */
const createRouter = () => new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const router = createRouter()

export default router

/**
 * 重置路由表
 */
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

