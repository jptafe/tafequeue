<template>
  <div>
    <h1>Remove from Queue</h1>
    <button @click="dequeueNow">deQueue</button>
  </div>
</template>
<script>

export default {
  name: 'dequeue',
  methods: {
    dequeueNow (e) {
      this.$store.dispatch('removeQueue')
      this.$router.push({ path: 'showqueue' })
    }
  },
  mounted () {
    this.$store.dispatch('removeQueue')
    this.$router.push({ path: 'showqueue' })
  }
}
</script>
