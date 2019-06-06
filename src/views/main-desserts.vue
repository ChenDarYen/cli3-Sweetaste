<template>
  <div class="desserts">
    <div class="banner">
      <div class="banner-bg" :style="{'background-image': 'url(' + bannerBg + ')'}"></div>
      <img class="quote" src="../assets/img/lg-想吃甜點是不需要理由的.svg">
    </div>
    <div class="content">
      <div class="category">
        <ul class="list-group">
          <li class="list-group-item">甜點類別</li>
          <li class="list-group-item" v-for="(item, index) in categories" :key="index"
          :class="{'active': item === category}"
          @click="category = item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="windows">
        <template v-for="(item, index) in dessertsDisplay">
          <Window class="window" :dessert="item" :key="index"
          v-if="index >= (pagination.current_page - 1) * 6 && index < pagination.current_page * 6"/>
        </template>
        <Pagination class="windows-pagination" is="Pagination"
        :pagination="pagination" @getInform="changePage"/>
      </div>
    </div>
  </div>
</template>
<script>
import Window from '@/components/main-window'
import Pagination from '@/components/pagination'

export default {
  data () {
    return {
      bannerBg: 'http://tinyurl.com/y2l2a8ge',
      category: '所有甜點',
      categories: ['所有甜點', '本日精選', '人氣推薦', '新品上市'],
      desserts: [],
      dessertsDisplay: [],
      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
        style: {
          fontSize: '1.5rem'
        }
      }
    }
  },
  methods: {
    getDesserts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      this.$http.get(api).then(response => {
        vm.desserts = [...vm.desserts, ...response.data.products]
        if (response.data.pagination.has_next) {
          vm.getDesserts(page + 1)
        } else {
          vm.filtDesserts()
        }
      })
    },
    filtDesserts () {
      const vm = this
      if (vm.category === '所有甜點') {
        vm.dessertsDisplay = vm.desserts.filter(item => {
          return item.is_enabled
        })
      } else {
        vm.dessertsDisplay = vm.desserts.filter(item => {
          return item.category === vm.category && item.is_enabled
        })
      }
      vm.pagination.total_pages = Math.ceil(vm.dessertsDisplay.length / 6)
      vm.pagination.current_page = 1
      vm.pagination.has_pre = false
      vm.pagination.has_next = Math.ceil(vm.dessertsDisplay.length / 6) > 1
    },
    changePage (page) {
      this.pagination.current_page = page
      if (page === 1) {
        this.pagination.has_pre = false
      } else {
        this.pagination.has_pre = true
      }
      if (page === this.pagination.total_pages) {
        this.pagination.has_next = false
      } else {
        this.pagination.has_next = true
      }
    }
  },
  watch: {
    category: function () {
      this.filtDesserts()
    }
  },
  created () {
    this.getDesserts()
  },
  components: {
    Window,
    Pagination
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.desserts, .banner, .banner-bg, .content, .category, .list-group, .list-group-item, .windows, .window {
  width: 100%;
}
.banner {
  height: 73.8vw;
  position: relative;
}
.banner-bg {
  height: 100%;
  @include bg-cover;
}
.quote {
  width: 60px;
  position: absolute;
  top: $sm-spacer;
  right: $sm-spacer;
}
.list-group-item {
  color: $primary;
  font-size: 1.5rem;
  line-height: 4rem;
  font-weight: 600;
  text-align: center;
  border: solid $light;
  border-width: 0 1px 1px;
  transition: background-color 1s;
  &:first-child {
    background-color: $primary;
    color: $light
  }
}
.active {
  background-color: $light !important;
}
.windows {
  padding: $sm-spacer;
  text-align: center
}
.window {
  margin-bottom: $sm-spacer;
}
@include md {
  .desserts {
    padding: 0 $md-spacer
  }
  .banner {
    height: 48.4vw;
  }
  .quote {
    width: 90px;
    top: $md-spacer;
    right: $md-spacer;
  }
  .content {
    margin-top: 60px;
    @include flex-wrap;
  }
  .category {
    width: 250px;
  }
  .windows {
    width: calc(100% - 270px);
    padding: 0 0 $md-spacer;
    @include flex-wrap(flex-start);
  }
  .window {
    width: calc(50% - 10px);
    margin: 0 20px 20px 0;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
@include lg {
  .category {
    width: 300px;
  }
  .windows {
    width: calc(100% - 320px);
  }
  .window {
    width: calc((100% - 40px) / 3);
    &:nth-child(2n) {
      margin-right: 20px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
