<template>
<nav class="navbar navbar-dark navbar-expand-sm fixed-top bg-dark flex-md-nowrap shadow">
  <router-link class="navbar-brand text-center px-2" to="main">Sweetaste</router-link>
  <button class="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarCollapse">
    <span class="navbar-toggler-icon"></span>
  </button>
  <ul class="navbar-nav d-none d-sm-flex d-lg-none">
    <li class="nav-item text-nowrap">
      <router-link class="nav-link" :class="{'active': $route.name == 'Product'}" to="/admin/products">Product</router-link>
    </li>
    <li class="nav-item text-nowrap">
      <router-link class="nav-link" :class="{'active': $route.name == 'Order'}" to="/admin">Order</router-link>
    </li>
  </ul>
  <div id="navbarCollapse" class="collapse navbar-collapse px-3 px-sm-0">
    <form class="form-inline py-2 ml-auto row">
      <input class="form-control form-control-dark col-8 mr-2" type="text" placeholder="Search" aria-label="Search">
      <button type="submit" class="btn btn-outline-primary mr-2 col-3">Search</button>
    </form>
    <ul class="navbar-nav pb-2 pb-sm-0">
      <li class="nav-item text-nowrap d-sm-none">
        <router-link class="nav-link" to="/admin/products">Product</router-link>
      </li>
      <li class="nav-item text-nowrap d-sm-none">
        <router-link class="nav-link" to="/admin">Order</router-link>
      </li>
      <li class="nav-item text-nowrap px-0 px-md-3">
        <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
      </li>
    </ul>
  </div>
</nav>
</template>
<script>
export default {
  methods: {
    logout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

nav {
  padding: 7px;
}
.btn {
  @include admin-btn;
}
@include md {
  nav {
    padding: 0 !important;
  }
}
</style>
