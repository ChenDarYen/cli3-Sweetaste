<template>
<div>
  <i class="fas fa-shopping-cart">
    <div class="cart-quantity bg-danger text-white" v-if="cartLen>0">{{ cartLen }}</div>
  </i>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['cartLen'])
  },
  methods: {
    ...mapActions('cart', ['getCart'])
  },
  created () {
    const vm = this
    vm.getCart()
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.cart {
  margin: auto 0 0;
}
.fas {
  margin: 0;
  font-size: 24px;
  color: $primary;
  position: relative;
}
.fas:hover {
  color: $secondary;
}
.cart-quantity {
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  position: absolute;
  top: -12px;
  right: -12px;
}
</style>
