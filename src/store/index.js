import Vue from 'vue'
import Vuex from 'vuex'
import sudoku from "./module/sudoku";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: JSON.parse(window.sessionStorage.getItem("user"))
  },
  mutations: {
    INIT_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
  },
  modules: {
    sudoku
  }
})
