<template>
  <div>
    <h1>Login to Queue</h1>
    <form @submit.prevent="loginNow">
      <input type="text" name="username" placeholder="login" value="foo">
      <input type="password" name="password" placeholder="password" value="bar">
      <input type="submit" value="login">
      <div>{{ loginstate }}</div>
    </form>
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
      loginstate: ''
    }
  },
  methods: {
    loginNow (e) {
      this.$store.dispatch('loginProcess', e.srcElement)
      if (this.$store.getters.isLoggedIn) {
        this.$router.push({ path: 'showqueue' })
      } else {
        this.loginstate = 'user/pass incorrect'
      }
    }
  }
}
</script>
