<template>
  <div class="checkout">
    <div class="background">
      <img src="../assets/img/lg-付款成功.svg">
      <button class="btn btn-secondary" @click="toDesserts">繼續逛逛</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toDesserts () {
      this.$router.push({ path: '/main/desserts' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.checkout, .background, .background button {
  width: 100%;
}
.background {
  margin-bottom: 4rem;
  height: calc(100vh - 176px);
  background-image: url('http://tinyurl.com/y59rscuq');
  @include bg-cover;
  position: relative;
  img {
    height: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .btn {
    @include standard-btn;
    position: absolute;
    left: 0;
    top: 100%;
  }
}
@include md {
  .checkout {
    padding: 0 $md-spacer $md-spacer;
  }
  .background {
    height: 45vw;
    img {
      top: 40%;
    }
    .btn {
      width: 32%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
