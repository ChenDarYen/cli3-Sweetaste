<template>
  <div>
    <Cart v-if="situation === 'cart'"
    @changeSituation="changeSituation"/>
    <Delivery v-if="situation === 'delivery'"
    @changeSituation="changeSituation"/>
  </div>
</template>
<script>
import Cart from '@/components/main-cart-cart'
import Delivery from '@/components/main-cart-delivery'

export default {
  data () {
    return {
      situation: 'cart'
    }
  },
  methods: {
    changeSituation (situation) {
      this.situation = situation
    }
  },
  components: {
    Cart,
    Delivery
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.cart-container, .cart-content, .order-content, h2, .img, .cart, .cart-item, .cart-total, .dessert-qty, .order, .btn {
  width: 100%;
}
h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 4rem;
  text-align: center;
  background-color: $light;
}
.cart-container {
  color: $primary;
}
.cart {
  padding: 0 $sm-spacer;
  @include flex-wrap(flex-start);
  position: relative;
}
.cart-item {
  margin-top: $sm-spacer;
  @include flex-wrap;
}
.img-container {
  width: 50%;
  padding-bottom: calc(50% * .675);
  position: relative;
}
.img {
  height: 100%;
  @include bg-cover;
  position: absolute;
}
.dessert-info {
  width: calc(50% - 1rem);
  @include flex-wrap($j-c: column, $a-i: flex-start);
}
.dessert-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.dessert-price {
  line-height: 1.375rem;
}
.dessert-qty {
  text-align: right
}
.cart-total, .delete {
  line-height: 2.8125rem;
}
.cart-total {
  margin-top: .5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: right;
  border: solid $light;
  border-width: 1px 0;
}
.delete {
  position: absolute;
  bottom: 0;
  left: 0;
}
.order-content {
  margin-top: $sm-spacer;
  .order {
    padding: 0 $sm-spacer;
    @include flex-wrap;
    h2 {
      margin-bottom: .5rem;
    }
  }
  .subtitle, .amount {
    line-height: 1.875rem;
  }
  .subtitle {
    width: 50px;
  }
  .amount {
    width: calc(100% - 50px);
    text-align: right;
  }
  .order-total {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 3.75rem;
  }
  .btn {
    @include standard-btn;
  }
}
@include md {
  .cart-container {
    padding: $md-spacer;
    @include flex-wrap;
  }
  .cart-content {
    width: calc(100% - 270px);
  }
  .order-content {
    width: 250px;
  }
  .cart {
    padding: 0;
  }
  .cart-item {
    padding: $sm-spacer 0;
    margin: 0;
    align-items: center;
    border-bottom: 1px solid $light;
  }
  .img-container {
    width: 100px;
    padding-bottom: 100px;
  }
  .dessert-info {
    width: 120px;
  }
  .cart-total {
    width: 80px;
    margin-top: 0;
    border: none;
  }
  .delete {
    position: initial
  }
  .order-content {
    margin-top: 0;
  }
  .order {
    background: $primary;
    padding: 1rem;
    color: $light;
      h2 {
      background-color: inherit;
      border-bottom: 1px solid $light;
    }
  }
}
@include lg {
  .cart-content {
    width: calc(100% - 320px);
  }
  .order-content {
    width: 300px;
  }
}
</style>
