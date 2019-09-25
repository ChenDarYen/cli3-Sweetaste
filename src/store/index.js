import Vue from 'vue'
import Vuex from 'vuex'

import cart from './cart'
import alert from './alert'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 嚴格模式下，狀態變更只能放在 mutation 函數內
  modules: {
    cart,
    alert
  }
})
