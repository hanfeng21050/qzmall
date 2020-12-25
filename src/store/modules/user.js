export default {
  namespaced: true,
  state: {
    user: {},
    carts: [],
    userMenuTitle: ''
  },
  mutations: {
    updateUser (state, user) {
      state.user = user
    },
    updateCarts (state, carts) {
      state.carts = carts
    },
    addCart (state, cart) {
      // 判断购物车中是否存在当前商品
      var index = state.carts.findIndex((item) => {
        return item.skuId === cart.skuId
      })
      if (index === -1) {
        state.carts.push(cart)
      } else {
        state.carts[index].skuQuantity += cart.skuQuantity
      }
    },
    updateUserMenuTitle (state, userMenuTitle) {
      state.userMenuTitle = userMenuTitle
    }
  }
}
