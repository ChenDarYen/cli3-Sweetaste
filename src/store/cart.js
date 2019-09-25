import Axios from 'axios'

export default {
  namespaced: true, // 將 actions, mutations, getters 都放入模組區域變數中
  state: {
    cart: {},
    cartLen: 0,
    cartTotal: 0,
    delivery: 100
  },
  mutations: {
    CART (state, { cart, cartLen, cartTotal }) {
      state.cart = cart
      state.cartLen = cartLen
      state.cartTotal = cartTotal
    }
  },
  actions: {
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      Axios.get(api).then((response) => {
        context.commit('CART', {
          cart: response.data.data,
          cartLen: response.data.data.carts.length,
          cartTotal: response.data.data.total
        })
      })
    },
    addToCart (context, { id, qty, message }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      Axios.post(api, {
        data: {
          product_id: id,
          qty
        }
      }).then(response => {
        if (response.data.success) {
          const status = 'secondary'
          context.dispatch('alert/updateMessage', { message, status }, { root: true })
          context.dispatch('getCart')
        }
      })
    },
    removeFromCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      Axios.delete(api).then(response => {
        if (response.data.success) {
          context.dispatch('getCart')
        }
      })
    }
  },
  getters: {
    cart: state => state.cart,
    cartLen: state => state.cartLen,
    cartTotal: state => state.cartTotal,
    delivery: state => state.delivery
  }
}
