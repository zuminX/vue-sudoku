import Vue from 'vue'
import Vuex from 'vuex'
import sudoku from './module/sudoku'
import app from './module/app'
import settings from './module/settings'
import user from '@/store/module/user'
import getters from './getters'
import permission from '@/store/module/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sudoku,
    app,
    settings,
    user,
    permission
  },
  getters
})
