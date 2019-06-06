<template>
  <div>
    <nav is="Navbar" class="navbar"></nav>
    <main>
      <router-view></router-view>
    </main>
    <Footer/>
    <Alert class="message-alert"/>
  </div>
</template>
<script>
import Alert from '@/components/alert'
import Navbar from '@/components/main-navbar'
import Footer from '@/components/main-footer'

export default {
  data () {
    return {
    }
  },
  components: {
    Alert,
    Navbar,
    Footer
  }
}
</script>
<style scoped>
.navbar {
  width: 100%;
  position: fixed !important;
  top: 0;
  z-index: 20;
}
main {
  margin-top: 100px;
}
.message-alert {
  position: fixed;
  top: 100px;
}
</style>
