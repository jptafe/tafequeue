<template>
  <div>
    <h1>Logout from Queue</h1>
    <input type="button" value="logout" @click="logoutNow()">
  </div>
</template>
<script>

export default {
  name: 'logout',
  methods: {
    logoutNow () {
      this.$store.dispatch('logoutProcess')
    }
  },
  mounted () {
    this.$store.dispatch('logoutProcess')
  }
}
</script>
