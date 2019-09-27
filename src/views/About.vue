<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="goGet()">Hit Me</button>
  </div>
</template>
<script>

export default {
  name: 'about',
  methods: {
    goGet () {
      this.$store.dispatch('getQueue')
    }
  }
}
</script>
