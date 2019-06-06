<template>
<nav class="navbar navbar-expand-md">
  <router-link class="navbar-brand d-none d-md-inline-block" to="/main">
    <img src="../assets/img/logo-all-dark.svg" height="40px">
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
    <i class="fas fa-bars"></i>
  </button>
  <router-link class="navbar-brand d-md-none" to="/main">
    <img src="../assets/img/logotype-sm-dark.svg" height="17.74px">
  </router-link>
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/main">首頁</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/main/desserts">甜點</router-link>
      </li>
    </ul>
  </div>
  <router-link to="/main/cart">
    <Cart/>
  </router-link>
</nav>
</template>
<script>
import Cart from '@/components/cart'

export default {
  components: {
    Cart
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.navbar {
  padding: $sm-spacer !important;
  background-color: #ffffff;
  position: relative
}
.navbar-brand {
  margin: 0
}
.nav-item {
  font-weight: 600;
}
#navbarCollapse {
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0;
  .nav-item {
    width: 100%;
    padding: 0 $sm-spacer;
    line-height: 2.5;
  }
  .nav-item:nth-child(odd) {
    background-color: $light
  }
  .nav-item:nth-child(even) {
    background-color: $info
  }
}
@include md {
  nav {
    padding: $sm-spacer $md-spacer !important
  }
  #navbarCollapse {
    position: initial;
    .navbar-nav {
      margin-right: 30px
    }
    .nav-item {
      background-color: inherit !important
    }
  }
}
</style>
