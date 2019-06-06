<template>
<nav aria-label="Page navigation example" v-if="pagination.total_pages > 1">
  <ul class="pagination justify-content-center" :style="pagination.style">
    <li class="page-item"
    :class="{'disabled' : !pagination.has_pre}">
      <a class="page-link" href="#" tabindex="-1"
      @click.prevent="changePage(pagination.current_page - 1)">
        <i class="fas fa-chevron-left"></i>
      </a>
    </li>
    <li class="page-item"
    v-for="(page, key) in pagination.total_pages" :key="key" :class="{'active': page==pagination.current_page}">
      <a class="page-link" href="#"
      @click.prevent="changePage(page)">{{page}}</a></li>
    <li class="page-item"
    :class="{'disabled' : !pagination.has_next}">
      <a class="page-link" href="#"
      @click.prevent="changePage(pagination.current_page + 1)">
        <i class="fas fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</nav>
</template>
<script>
export default {
  props: ['pagination'],
  methods: {
    changePage (page) {
      this.$emit('getInform', page)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.pagination {
  margin: 0;
}
.active a {
  color: $light !important
}
</style>
