<template>
  <div class="cart-container">
    <div class="cart-content">
      <h2>您的購物車</h2>
      <ul class="cart list-group">
        <li class="cart-item list-group-item" v-for="(item, index) in cart.cart" :key="index">
          <div class="img-container">
            <div class="img" :style="{'background-image': 'url(' + item.product.imageUrl + ')'}"></div>
          </div>
          <div class="dessert-info">
            <div>
              <div class="dessert-title">
                {{ item.product.title }}
              </div>
              <div class="dessert-price">
                {{ item.product.price | currencyFilter }}
              </div>
            </div>
            <div class="dessert-qty d-md-none">
              {{ `* ${item.qty}` }}
            </div>
          </div>
          <div class="qty d-none d-md-inline-block">
            {{ `* ${item.qty}` }}
          </div>
          <div class="cart-total">
            {{ item.product.price * item.qty | currencyFilter }}
          </div>
          <div class="delete" @click="removeFromCart(item.id)">
            <i class="far fa-trash-alt"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="order-content">
      <div class="order">
        <h2>訂單摘要</h2>
        <div class="subtitle">小記</div>
        <div class="amount">{{ cart.total | currencyFilter }}</div>
        <div class="subtitle">運費</div>
        <div class="amount">{{ cart.delivery | currencyFilter }}</div>
        <div class="order-total subtitle">總計</div>
        <div class="order-total amount">{{ cart.total + cart.delivery | currencyFilter }}</div>
      </div>
      <button class="btn btn-secondary" @click="changeSituation('delivery')">結帳</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cart: {
      type: Object,
      default: () => {
        return {
          delivery: 0,
          total: 0,
          cart: []
        }
      }
    }
  },
  methods: {
    getCart () {
      this.$emit('getCart')
    },
    removeFromCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          this.$emit('getCart')
          vm.$bus.$emit('cart:update')
        }
      })
    },
    changeSituation (situation) {
      this.$emit('changeSituation', situation)
    }
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
  @include flex-wrap($f-d: column, $a-i: flex-start);
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
    padding: .5*$sm-spacer 0;
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
  .cart-container {
    padding: $md-spacer 2*$md-spacer;
  }
  .cart-content {
    width: calc(100% - 320px);
  }
  .order-content {
    width: 300px;
  }
}
</style>
