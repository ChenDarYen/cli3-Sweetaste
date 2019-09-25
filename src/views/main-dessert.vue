<template>
  <div class="dessert">
    <div class="img-container">
      <div class="img" :style="{'background-image': 'url(' + dessert.imageUrl}"></div>
    </div>
    <div class="info">
      <div class="title"><h2>{{ dessert.title }}</h2></div>
      <div class="price"><h3>{{ dessert.price | currencyFilter }}</h3></div>
      <div class="form-group">
        <label for="quantity">數量</label>
        <select id="quantity" class="form-cntrol" v-model="qty">
          <option v-for="n in 10" :value="n" :key="n">{{ n }}</option>
        </select>
      </div>
      <button class="btn btn-secondary" @click="addToCart(qty)">放入購物車</button>
    </div>
    <div class="description">
      <h3>商品介紹</h3>
      <p>{{ dessert.description }}</p>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ajaxOpen: true,
      dessertId: '',
      dessert: {},
      qty: 1
    }
  },
  methods: {
    getDessert () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.dessertId}`
      this.$http.get(api).then(response => {
        vm.dessert = response.data.product
      })
    },
    addToCart (qty) {
      const message = `成功將 ${this.dessert.title}*${this.qty} 加入購物車`
      this.$store.dispatch('cart/addToCart', {
        id: this.dessert.id,
        qty,
        message
      })
    }
  },
  created () {
    this.dessertId = this.$route.params.dessert_id
    this.getDessert()
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.dessert, .img-container, .img, .info, .description, label, .btn {
  width: 100%;
}
.img-container {
  padding-bottom: 73vw;
  position: relative;
}
.img {
  height: 100%;
  @include bg-cover;
  position: absolute;
}
.info {
  margin-bottom: 4rem;
  color: $primary;
  padding: $sm-spacer $sm-spacer .5*$sm-spacer;
  position: relative;
}
h2, h3 {
  margin-bottom: 0;
}
h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 3rem;
}
h3 {
  font-size: 1.25rem;
}
.form-group {
  margin-top: 1rem;
}
.btn {
  padding: 0;
  @include standard-btn;
  position: absolute;
  bottom: -4rem;
  left: 0;
}
.description {
  background-color: $light;
  padding: $sm-spacer $sm-spacer 2*$sm-spacer;
  color: $info;
  p {
    margin-top: 1rem;
    line-height: 2rem;
    letter-spacing: .1rem;
    white-space: pre-wrap;
  }
}
@include md {
  .dessert {
    padding: $md-spacer $md-spacer 0;
    @include flex-wrap;
  }
  .img-container {
    width: calc(50% - 10px);
    padding-bottom: calc((50% - 10px) * .7);
  }
  .info {
    width: calc(50% - 10px);
    margin-bottom: 0;
    padding: 0;
  }
  .btn {
    bottom: 0;
  }
  .description {
    margin-top: 10px;
  }
}
@include lg {
  .dessert {
    padding: $md-spacer 2*$md-spacer 0;
  }
}
</style>
