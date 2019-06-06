<template>
<div>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <main role="main" class="main ml-auto mr-lg-3 col-lg-10 px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
  <Alert class="message-alert"/>
</div>
</template>

<script>
import Navbar from '@/components/admin-navbar'
import Sidebar from '@/components/admin-sidebar'
import Alert from '@/components/alert'

export default {
  name: 'adminPage',
  data () {
    return {}
  },
  components: {
    Sidebar,
    Navbar,
    Alert
  }
}
</script>
<style scoped>
.message-alert {
  position: fixed;
  top: 54px;
}
.container-fluid {
  width: 100%;
  overflow: hidden;
}
.main {
  padding-top: 60px
}
</style>
