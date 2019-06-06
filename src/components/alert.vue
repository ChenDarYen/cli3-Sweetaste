<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" v-for="(item, i) in messages" :key="i"
    :class="'alert-' + item.status" :style="{'top': `${50*i}px`}">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlertMessage',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status, width, right) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning', width = 'auto', right = '20px') => {
      vm.updateMessage(message, status, width, right)
    })
  }
}
</script>
<style lang="scss" scoped>
.message-alert {
  width: 100%;
}
.alert {
  width: 100%;
  text-align: right;
  position: absolute;
  z-index: 10;
}
</style>
