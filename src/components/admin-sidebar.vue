<template>
<nav class="d-none d-lg-block bg-light sidebar">
  <div class="pl-3">
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" :class="{'active': $route.name == 'Order'}" href="#"
        to="/admin">
          <span data-feather="file-text"></span>
          Order
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{'active': $route.name == 'Product'}" href="#"
        to="/admin/products">
          <span data-feather="file-text"></span>
          Product
        </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>
<style scoped>
.sidebar {
  width: 150px;
  height: 100vw;
  padding-top: 60px;
  position: fixed;
  top: 0;
  left: 0
}
</style>
