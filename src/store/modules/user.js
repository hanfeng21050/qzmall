export default {
  namespaced: true,
  state: {
    name: '',
    id: 0,
    cart: []
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
    }
  }
}
