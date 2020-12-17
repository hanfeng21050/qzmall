export default {
  namespaced: true,
  state: {
    name: '',
    id: 0,
    cart: [],
    userMenuTitle: ''
  },
  mutations: {
    updateName (state, name) {
      state.name = name
    },
    updateId (state, id) {
      state.id = id
    },
    updateCart (state, cart) {
      state.cart = cart
    },
    updateUserMenuTitle (state, userMenuTitle) {
      state.userMenuTitle = userMenuTitle
    }
  }
}
