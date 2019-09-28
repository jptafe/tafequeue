<template>
  <div>
    <h1>Show the Queue</h1>
    <div>
      <form @submit.prevent="dequeue" v-for="queueItem in queue" v-bind:key="queueItem.uid">
        <span>{{ queueItem.uid }}</span>
        <span>{{ queueItem.title }}</span>
        <span>{{ queueItem.desc }}</span>
        <input type="submit" v-if="queueItem.uid === uid || aGod" value="dequeue">
        <input type="button" value="suggest fix">
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'showqueue',
  data () {
    return {
      queue: [],
      uid: 0,
      aGod: false
    }
  },
  methods: {
    dequeue (e) {
      this.$store.dispatch('removeQueue')
    }
  },
  computed: {
  },
  mounted () {
    this.queue = this.$store.getters.listQueue
    this.uid = this.$store.getters.whatLoginID
    this.aGod = this.$store.getters.isGod
  }
}
</script>
