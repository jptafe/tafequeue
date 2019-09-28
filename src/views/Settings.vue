<template>
  <div>
    <h1>This is an settings page</h1>
    <form @submit.prevent="updateSettings">
      <input type="number" :value="loginID" disabled>
      <input type="text" name="nickname" v-model="nick">
      <input type="password" v-model="pass1" name="password" @change="passwordsEqual" placeholder="password">
      <input type="password" v-model="pass2" name="password_again" @change="passwordsEqual" placeholder="password again">
      <input type="submit" value="update changes">
    </form>
    <div>{{ errorDIV }}</div>
  </div>
</template>
<script>

export default {
  name: 'settings',
  data () {
    return {
      pass1: '',
      pass2: '',
      errorDIV: '',
      nick: ''
    }
  },
  computed: {
    loginID () {
      return this.$store.getters.whatLoginID
    }
  },
  methods: {
    passwordsEqual () {
      if (this.pass1.length > 0 && this.pass2.length > 0) {
        if (this.pass1 !== this.pass2) {
          this.errorDIV = 'passwords do not match'
        } else {
          this.errorDIV = ''
        }
      } else {
        this.errorDIV = ''
      }
    },
    updateSettings (e) {
      if (this.pass1 === this.pass2) {
        this.$store.dispatch('updateSettings', e.srcElement)
      } else {
        this.errorDIV = 'passwords do not match'
      }
    }
  },
  mounted () {
    this.nick = this.$store.getters.whatNick
  }
}
</script>
