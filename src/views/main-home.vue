<template>
  <div>
    <div class="banner">
      <div class="banner-bg" :style="{'background-image': 'url(' + banner.img + ')'}"></div>
      <div class="banner-nav">
        <div v-for="(item, index) in banner.nav" :key="index" class="banner-nav-item"
        :class="{'active': item.category === category}"
        @click="directToWindows(); category = item.category">
          <div class="background" :style="{'background-image': 'url(' + item.img + ')'}"></div>
          <div class="filter"></div>
          <div class="category">{{ item.category }}</div>
        </div>
      </div>
    </div>
    <Copy class="copy" v-for="(item, index) in copies" :key="index" :copy="item"
    :class="item.direction"/>
    <img src="../assets/img/lg-想吃甜點是不需要理由的.svg" class="quote d-none d-md-block">
    <img src="../assets/img/sm-橫式-想吃甜點是不需要理由的.svg" class="quote d-md-none" height="60px">
    <div class="windows">
      <Window class="window" v-for="dessert in dessertsDisplay" :key="dessert.id" :dessert="dessert"/>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Copy from '@/components/main-home-copy'
import Window from '@/components/main-window'

export default {
  data () {
    return {
      category: '本日精選',
      banner: {
        img: 'http://tinyurl.com/y3cjwcrw',
        nav: [
          {
            img: 'http://tinyurl.com/y43hm4pu',
            category: '本日精選'
          },
          {
            img: 'http://tinyurl.com/yxmn86we',
            category: '人氣推薦'
          },
          {
            img: 'http://tinyurl.com/y4ypow5e',
            category: '新品上市'
          }
        ]
      },
      copies: [
        {
          direction: 'right',
          quoteSm: require('../assets/img/sm-橫式-為什麼選擇了做甜點.svg'),
          quoteMd: require('../assets/img/lg-為什麼選擇了做甜點.svg'),
          img: 'http://tinyurl.com/y5wy82h8',
          content: '青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。'
        },
        {
          direction: 'left',
          quoteSm: require('../assets/img/sm-橫式-為什麼一定要吃甜點.svg'),
          quoteMd: require('../assets/img/lg-為什麼一定要吃甜點.svg'),
          img: 'http://tinyurl.com/y6s6f7bw',
          content: '青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。'
        }
      ],
      desserts: [],
      dessertsDisplay: []
    }
  },
  methods: {
    getDesserts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      this.$http.get(api).then(response => {
        vm.desserts = [...vm.desserts, ...response.data.products]
        vm.filtDesserts(page)
      })
    },
    filtDesserts (page = 1) {
      let vm = this
      if (vm.desserts.length < page * 10) {
        vm.getDesserts(page)
      } else {
        page = page - 1
        for (let i = 0; i < 10; i++) {
          if (vm.desserts[page * 10 + i].category === vm.category && vm.desserts[page * 10 + i].is_enabled && vm.dessertsDisplay.length < 3) {
            vm.dessertsDisplay.push(vm.desserts[page * 10 + i])
          }
        }
        if (vm.dessertsDisplay.length < 3) {
          vm.filtDesserts(page + 2)
        }
      }
    },
    directToWindows () {
      let windowsPos = $('.window').offset().top
      $('html, body').animate({ scrollTop: windowsPos - 100 }, 1000)
    }
  },
  watch: {
    category: function () {
      this.dessertsDisplay = []
      this.filtDesserts()
    }
  },
  created () {
    this.getDesserts()
  },
  components: {
    Copy,
    Window
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.banner, .banner-bg, .banner-nav, .windows {
  width: 100%
}
.banner-bg {
  height: 73vw;
  @include bg-cover;
}
.banner-nav {
  @include flex-wrap;
}
.banner-nav-item {
  width: 33.1%;
  height: 180px;
  position: relative;
  .background, .filter {
    height: 100%;
    width: 100%;
  }
  .filter {
    background-color: $primary;
    opacity: .85;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .5s;
  }
  &:hover .filter {
    opacity: .95;
  }
  .category {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    writing-mode: vertical-rl;
    white-space: nowrap;
    letter-spacing: .25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
}
.active{
  .filter {
    background-color: $secondary !important
  }
  .category {
    color: $primary !important;
  }
}
.quote {
  display: block;
  margin: $sm-spacer auto;
}
.windows {
  padding: 0 $sm-spacer;
  .window {
    width: 100%;
    margin-bottom: $sm-spacer;
    display: none;
  }
  .window:first-child {
    display: block !important;
  }
}
@include md {
  .quote {
    width: 8.6vw;
    margin: 7.8vw auto;
  }
  .windows {
    padding: 0 $md-spacer;
    @include flex-wrap;
    .window {
      width: 45vw;
      margin-bottom: $md-spacer;
      &:nth-child(2) {
        display: block !important
      }
    }
  }
}
@include lg {
  .banner {
    padding: 0 $md-spacer;
    margin-bottom: 7vw;
    position: relative;
  }
  .banner-bg {
    height: 48.4vw;
  }
  .banner-nav {
    width: 83%;
    margin: 0 auto;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -7vw;
  }
  .banner-nav-item {
    width: 33.22%;
  }
  .quote {
    margin: 80px auto;
  }
  .window {
    width: 30vw !important;
    display: block !important;
  }
}
</style>
