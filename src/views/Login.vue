<template>
  <div>
    <h1>Login to Queue</h1>
    <form>
      <input type="text"  placeholder="login">
      <input type="button" value="login" @click="loginNow()">
    </form>
  </div>
</template>
<script>

export default {
  name: 'login',
  methods: {
    loginNow () {
      this.$store.dispatch('loginProcess')
    }
  },
  mounted () {
  }
}
</script>
