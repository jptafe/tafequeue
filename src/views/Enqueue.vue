<template>
  <div>
    <h1>Add to Queue</h1>
    <form @submit.prevent="enqueueNow">
      <input type="text" name="title">
      <textarea name="desc"></textarea>
      <input type="submit" value="submit">
    </form>
    <div>{{ queueState }}</div>
  </div>
</template>
<script>

export default {
  name: 'enqueue',
  data () {
    return {
      queueState: ''
    }
  },
  methods: {
    enqueueNow (e) {
      this.$store.dispatch('addQueue', e.srcElement)
      if (this.$store.getters.isInqueue) {
        this.$router.push({ path: 'showqueue' })
      } else {
        this.queueState = 'queue item not added'
      }
    }
  },
  mounted () {
  }
}
</script>
