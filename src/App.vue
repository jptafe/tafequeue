<template>
  <div id="app">
    <div id="status" v-if="checkLoginState()">
      <ul>
        <li>Queue Items: {{ queueCount }}</li>
        <li>TAFE ID: {{ tafeID }}</li>
        <li v-if="nickName.length > 0">Nick Name: {{ nickName }}</li>
      </ul>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="checkLoginState() === false" to="/login">Login</router-link> |
      <router-link v-if="checkLoginState()" to="/settings">Settings</router-link> |
      <router-link v-if="checkLoginState() && queueStatus() === false" to="/enqueue">Enqueue</router-link> |
      <router-link v-if="checkLoginState() && queueStatus()" to="/dequeue">Dequeue</router-link> |
      <router-link v-if="checkLoginState()" to="/showqueue">Show Queue</router-link> |
      <router-link v-if="checkLoginState()" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  methods: {
    checkLoginState () {
      return this.$store.getters.isLoggedIn
    },
    queueStatus () {
      return this.$store.getters.isinQueue
    }
  },
  computed: {
    queueCount () {
      return this.$store.getters.noinQueue
    },
    tafeID () {
      return this.$store.getters.whatLoginID
    },
    nickName () {
      return this.$store.getters.whatNick
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
