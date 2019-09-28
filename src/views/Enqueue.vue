<template>
  <div>
    <h1>Add to Queue</h1>
    <form @submit.prevent="enqueueNow">
      <input type="text" name="title">
      <textarea type="text" name="desc"></textarea>
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
      var fields = { title: e.srcElement[0].value, desc: e.srcElement[1].value }
      this.$store.dispatch('addQueue', fields)
      if (this.$store.getters.isinQueue) {
        this.$router.push({ path: 'showqueue' })
      } else {
        this.queueState = 'queue item not added'
      }
    }
  }
}
</script>
