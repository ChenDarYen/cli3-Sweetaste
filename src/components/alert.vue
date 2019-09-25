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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AlertMessage',
  computed: {
    ...mapGetters('alert', ['messages'])
  },
  methods: {
    ...mapActions('alert', ['removeMessage'])
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
