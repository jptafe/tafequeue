<template>
  <div>
    <h1>Show the Queue</h1>
    <div>{{ queue }}</div>
  </div>
</template>
<script>

export default {
  name: 'showqueue',
  data () {
    return {
      queue: []
    }
  },
  methods: {
  },
  mounted () {
    this.queue = this.$store.getters.listQueue
  }
}
</script>
