<template>
  <div class="about">
    <h1>TAFE Queue</h1>
    <h3>provides real-time student support</h3>
    <p>Enter your student number to start</p>
    <button @click="goGet()">Irrelevant Debug Button check devtools to see what happened</button>
  </div>
</template>
<script>

export default {
  name: 'about',
  methods: {
    goGet () {
      this.$store.dispatch('whatIsState')
    }
  }
}
</script>
