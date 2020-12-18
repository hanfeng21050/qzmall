export default {
  namespaced: true,
  state: {
    user: {},
    cart: [],
    userMenuTitle: ''
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    updateCart (state, cart) {
      state.cart = cart
    },
    updateUserMenuTitle (state, userMenuTitle) {
      state.userMenuTitle = userMenuTitle
    }
  }
}
