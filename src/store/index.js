import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    id: 0
  },
  mutations: {
    updateName (state, name) {
      state.name = name
    },
    updateId (state, id) {
      state.id = id
    },
    clear (state) {
      state.name = ''
      state.id = 0
    }
  },
  plugins: [createPersistedState({
    getItem: key => Vue.cookie.get(key),
    setItem: (key, value) => Vue.cookie.set(key, value)
  })]
})
