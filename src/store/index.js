import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  mutations: {
    clear (state) {
      state.user.name = ''
      state.user.id = 0
      state.user.cart = []
    }
  }
})
