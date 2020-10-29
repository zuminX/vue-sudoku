import {
  getData,
  removeData,
  setData
} from '@/utils/sessionStorageUtils'
import { logout } from '@/api/securityApi'
import { resetRouter } from '@/router'

const state = {
  user: getData('user'),
  token: getData('token')
}

const mutations = {
  SET_USER(state, user) {
    setData('user', user)
    state.user = user
  },
  SET_TOKEN(state, token) {
    setData('token', token)
    state.token = token
  },
  RESET_STATE(state) {
    state.user = ''
    state.token = ''
  }
}

const actions = {
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
