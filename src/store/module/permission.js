import {
  asyncRouterMap,
  constantRouterMap,
  getLeaderboardRouter
} from '@/router'

function hasPermission(roles, route) {
  return route.meta && route.meta.role ? roles.some(role => route.meta.role.indexOf(role) >= 0) : true
}

async function getAdditionRouters() {
  let routers = []
  routers = routers.concat(await getLeaderboardRouter())
  return routers
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    async GenerateRoutes({ commit }, data) {
      const { roles } = data
      const accessedRouters = asyncRouterMap.filter(v => {
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              return hasPermission(roles, child)
            })
          }
          return true
        }
        return false
      })
      return accessedRouters.concat(await getAdditionRouters())
    }
  }
}

export default permission
