<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" ></loading>
    </div>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="user.username" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-3 text-danger" v-if="error">請輸入正確的電子郵件與密碼</p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'loginPage',
  data () {
    return {
      isLoading: false,
      error: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.isLoading = true
      this.$http.post(api, vm.user).then(response => {
        console.log(api)
        vm.isLoading = false
        if (response.data.success) {
          vm.$router.push('/admin')
        } else {
          vm.error = true
        }
      })
    }
  }
}
</script>
<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  height: 100vh;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
