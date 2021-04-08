import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('userInfo') || null)
  },
  mutations: {
    setUser (state, val) {
      state.user = JSON.parse(val)
      window.localStorage.setItem('userInfo', val)
    }
  },
  actions: {
  },
  modules: {
  }
})
