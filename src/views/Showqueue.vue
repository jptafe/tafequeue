<template>
  <div>
    <h1>Show the Queue</h1>
    <div>
      <form @submit.prevent="dequeue" v-for="queueItem in this.$store.state.queueItems" v-bind:key="queueItem.queue_ID">
        <span v-if="queueItem.nick === ''">{{ queueItem.student_NO }}</span>
        <span v-if="queueItem.nick !== ''">{{ queueItem.nick }}</span>
        <span>{{ queueItem.queue_TITLE }}</span>
        <span>{{ queueItem.queue_DESC }}</span>
        <input type="hidden" name="queue_id" :value="queueItem.queue_ID">
        <input type="button" @click="openFixForm" value="suggest fix">
        <input type="submit" v-if="queueItem.student_NO === uid || aGod" value="dequeue">
      </form>
      <fix-form></fix-form>
      <fixes-list></fixes-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'showqueue',
  data () {
    return {
      uid: 0,
      aGod: false
    }
  },
  methods: {
    dequeue (e) {
      this.$store.dispatch('removeQueue', e.srcElement[0].value)
    },
    openFixForm () {

    }
  },
  computed: {
  },
  mounted () {
    this.uid = this.$store.getters.whatLoginID
    this.aGod = this.$store.getters.isGod
  }
}
</script>
<style>
  form span {
    margin-right: .5em;
  }
</style>
