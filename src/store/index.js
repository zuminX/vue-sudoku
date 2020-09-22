import Vue from 'vue'
import Vuex from 'vuex'
import sudoku from './module/sudoku'
import app from './module/app'
import settings from './module/settings'
import { getData } from '@/utils/sessionStorageUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: JSON.parse(getData('user'))
  },
  mutations: {
    INIT_CURRENT_USER(state, user) {
      state.currentUser = user
    }
  },
  getters: {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device
  },
  actions: {},
  modules: {
    sudoku,
    app,
    settings
  }
})
