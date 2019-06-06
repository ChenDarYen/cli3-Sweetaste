<template>
  <div>
    <div class="content" @click="directToDessert(dessert.id)" :title="dessert.title">
      <div class="img-container">
        <div class="img" :style="{'background-image': 'url(' + dessert.imageUrl + ')'}"></div>
        <div class="filter"></div>
        <div class="category" v-if="dessert.category">{{ dessert.category }}</div>
      </div>
      <div class="title">{{ dessert.title }}</div>
      <div class="price">{{ dessert.price | currencyFilter }}</div>
    </div>
    <button class="btn btn-light" @click="addToCart(dessert)">加入購物車</button>
  </div>
</template>
<script>
export default {
  props: {
    dessert: {
      type: Object,
      default: () => {
        return {
          title: '',
          id: '',
          price: '',
          category: '',
          imageUrl: ''
        }
      }
    }
  },
  methods: {
    addToCart (item) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.post(api, { data: {
        product_id: item.id,
        qty: 1
      } }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', `成功將 ${item.title}*1 加入購物車`, 'secondary')
          vm.$bus.$emit('cart:update')
        }
      })
    },
    directToDessert (id) {
      this.$router.push({ path: `/main/dessert/${id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.image-container, .img, .filter, .btn {
  width: 100%;
}
.content {
  cursor: pointer;
}
.img-container {
  padding-bottom: 100%;
  position: relative;
}
.img {
  height: 100%;
  @include bg-cover;
  position: absolute;
  top: 0;
  left: 0;
}
.filter {
  height: 100%;
  background-color: $light;
  opacity: .2;
  position: absolute;
  top: 0;
  left: 0;
}
.category {
  padding: 10px;
  background-color: $primary;
  color: $light;
  letter-spacing: .5rem;
  writing-mode: vertical-lr;
  position: absolute;
  top: 0;
  left: 6.6%
}
.title, .price {
  width: 50%;
  color: $primary;
  font-size: 1.25rem;
  line-height: 3.5rem;
  text-align: center;
  border: 1px solid $light;
  float: left;
}
.title:hover {
  text-decoration: underline;
}
.btn {
  @include standard-btn;
}
</style>
