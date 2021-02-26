import {
  getData,
  removeData,
  setData
} from '@/utils/sessionStorageUtils'
import { logout } from '@/api/securityAPI'
import { resetRouter } from '@/router'

const state = {
  user: getData('user'),
  token: getData('token')
}

const mutations = {
  /**
   * 设置用户
   */
  SET_USER(state, user) {
    setData('user', user)
    state.user = user
  },
  /**
   * 设置令牌
   */
  SET_TOKEN(state, token) {
    setData('token', token)
    state.token = token
  },
  /**
   * 重置状态
   */
  RESET_STATE(state) {
    state.user = ''
    state.token = ''
  }
}

const actions = {
  /**
   * 账户登出
   */
  async logout({ commit, state }) {
    await logout()
    removeData('token')
    removeData('user')
    resetRouter()
    commit('RESET_STATE')
  }
}

export default {
  state,
  mutations,
  actions,
  modules: {}
}
