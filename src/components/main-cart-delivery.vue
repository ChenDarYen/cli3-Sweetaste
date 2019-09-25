<template>
  <div class="delivery-container">
    <div class="delivery">
      <div class="delivery-form">
        <h1>運送</h1>
        <div class="last-name form-group">
          <label for="lastName">姓氏</label>
          <input id="lastName" class="form-control" name="lastName" type="text" placeholder="李"
          v-validate="'required'" :class="{'invalid' : errors.has('lastName')}"
          v-if="!confirm" v-model="deliveryData.user.lastName">
          <span class="text-secondary">{{ errors.first('lastName') }}</span>
          <span class="confirm" v-if="confirm">{{ deliveryData.user.lastName }}</span>
        </div>
        <div class="first-name form-group">
          <label for="firstName">名字</label>
          <input id="firstName" class="form-control" name="firstName" type="text" placeholder="白"
          v-validate="'required'" :class="{'invalid' : errors.has('firstName')}"
          v-if="!confirm" v-model="deliveryData.user.firstName">
          <span class="text-secondary">{{ errors.first('firstName') }}</span>
          <span class="confirm" v-if="confirm">{{ deliveryData.user.firstName }}</span>
        </div>
        <div class="tel form-group">
          <label for="tel">聯絡電話</label>
          <input id="tel" class="form-control" name="tel" type="text" placeholder="0912-345-678"
          v-validate="'required'" :class="{'invalid' : errors.has('tel')}"
          v-if="!confirm" v-model="deliveryData.user.tel">
          <span class="text-secondary">{{ errors.first('tel') }}</span>
          <span class="confirm" v-if="confirm">{{ deliveryData.user.tel }}</span>
        </div>
        <div class="email form-group">
          <label for="email">電子郵件</label>
          <input id="email" class="form-control" name="email" type="text" placeholder="libai@tung.com"
          v-validate="'required|email'" :class="{'invalid' : errors.has('email')}"
          v-if="!confirm" v-model="deliveryData.user.email">
          <span class="text-secondary">{{ errors.first('email') }}</span>
          <span class="confirm" v-if="confirm">{{ deliveryData.user.email }}</span>
        </div>
        <div class="address form-group">
          <label for="address">配送地址</label>
          <input id="address" class="form-control" name="address" type="text" placeholder="長安城胡姬酒肆"
          v-validate="'required'" :class="{'invalid' : errors.has('address')}"
          v-if="!confirm" v-model="deliveryData.user.address">
          <span class="text-secondary">{{ errors.first('address') }}</span>
          <span class="confirm" v-if="confirm">{{ deliveryData.user.address }}</span>
        </div>
        <div class="message form-group">
          <label for="message">備註</label>
          <textarea id="message" class="form-control"
          v-if="!confirm" v-model="deliveryData.message" rows="5"></textarea>
          <span class="confirm" v-if="confirm">{{ deliveryData.message }}</span>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn btn-light btn-unconfirm" v-if="!confirm"
        @click="changeSituation('cart')">
          回到購物車
        </button>
        <button class="btn btn-secondary btn-unconfirm" v-if="!confirm"
        @click="confirmOrder">
          下一步
        </button>
        <button class="btn btn-secondary btn-confirm" v-if="confirm"
        @click="paidOrder">
          付款
        </button>
      </div>
    </div>
    <div class="information d-none d-md-inline-block">
      <div class="info-item">
        <h2>訂單摘要</h2>
        <div class="content">
          <div class="subtitle">小記</div>
          <div class="amount">{{ cartTotal | currencyFilter }}</div>
          <div class="subtitle">運費</div>
          <div class="amount">{{ delivery | currencyFilter }}</div>
          <div class="order-total subtitle">總計</div>
          <div class="order-total amount">{{ cartTotal + delivery | currencyFilter }}</div>
        </div>
      </div>
      <div class="info-item">
        <h2>購物清單</h2>
        <div class="content">
          <ul class="cart list-group">
            <li class="cart-item list-group-item" v-for="(item, index) in cart.carts" :key="index">
              <div class="img" :style="{'background-image': 'url(' + item.product.imageUrl + ')'}"></div>
              <div class="dessert-info">
                <div>
                  <div class="dessert-title">
                    {{ `${item.product.title} *${item.qty}` }}
                  </div>
                  <div class="dessert-price">
                    {{ item.qty * item.product.price | currencyFilter }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ajaxOpen: true,
      confirm: false,
      deliveryData: {
        user: {
          lastName: '',
          firstName: '',
          tel: '',
          email: '',
          address: ''
        },
        message: ''
      },
      orderId: ''
    }
  },
  computed: {
    ...mapGetters('cart', ['cart', 'cartTotal', 'delivery'])
  },
  methods: {
    changeSituation (situation) {
      this.$emit('changeSituation', situation)
    },
    confirmOrder () {
      if (this.ajaxOpen) {
        this.ajaxOpen = false
        const vm = this
        this.$validator.validate().then(result => {
          if (result) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
            this.$http.post(api, { data: this.deliveryData }).then(response => {
              if (response.data.success) {
                vm.orderId = response.data.orderId
                vm.confirm = true
                vm.ajaxOpen = true
                vm.$store.dispatch('cart/getCart')
              }
            })
          }
        })
      }
    },
    paidOrder () {
      this.ajaxOpen = false
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push({ path: '/main/checkout' })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.delivery-container, .delivery, .delivery-form, label, input, textarea, h1,
.tel, .email, .address, .message, .btn-container, .btn-confirm,
.information, .info-item, h2, .content, .cart, .cart-item  {
  width: 100%;
}
.delivery-form {
  padding: $sm-spacer;
  color: $light;
  background-color: $primary;
  @include flex-wrap;
}
h1 {
  font-size: 2rem;
  font-weight: 900;
  line-height: 3.125rem;
  margin-bottom: $sm-spacer;
}
label {
  font-size: 1.25rem;
  margin-bottom: .5rem;
}
input, textarea {
  padding: 20rem;
}
.form-group {
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}
.invalid {
  border: 2px solid $secondary;
}
.last-name, .first-name {
  width: calc(50% - 5px);
}
.confirm {
  line-height: 2rem;
}
.message .conform {
  white-space: pre-wrap
}
.btn-container {
  line-height: 2rem;
  @include flex-wrap;
}
.btn {
  @include standard-btn;
}
.btn-unconfirm {
  width: 50%;
}
.btn-light {
  color: $info;
}
.btn-secondary {
  color: $primary;
}
@include md {
  .delivery-container {
    padding: $md-spacer;
    @include flex-wrap;
  }
  .delivery {
    width: calc(100% - 320px);
  }
  .information {
    width: 300px;
    color: $info;
  }
  .info-item:first-child {
    margin-bottom: 20px;
  }
  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 4rem;
    background-color: $light;
    margin-bottom: 0;
  }
  .content {
    padding: 1rem;
    border: 1px solid $light;
    @include flex-wrap;
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
  .cart-item {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .cart-item {
    @include flex-wrap(flex-start, center);
  }
  .img {
    width: 120px;
    height: 80px;
    @include bg-cover;
    margin-right: 20px;
  }
  .dessert-title {
    line-height: 1.375rem;
  }
  .dessert-price {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
@include lg {
  .delivery-container {
    padding: $md-spacer 2*$md-spacer;
  }
}
</style>
