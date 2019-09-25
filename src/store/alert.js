export default {
  namespaced: true, // 將 actions, mutations, getters 都放入模組區域變數中
  state: {
    messages: []
  },
  mutations: {
    PUSHMESSAGE (state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    SLICEMESSAGE (state, index) {
      state.messages.splice(index, 1)
    }
  },
  actions: {
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)

      context.commit('PUSHMESSAGE', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage (context, index) {
      context.commit('SLICEMESSAGE', index)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('SLICEMESSAGE', i)
          }
        })
      }, 5000)
    }
  },
  getters: {
    messages: state => state.messages
  }
}
