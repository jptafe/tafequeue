<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="incrementCounter()">Press ME</button>
    <div>{{ counter }}</div>
    <input @input="checkPrime()" type="number" v-model="counter">
    <div>Is Prime: {{ primeNumber }} </div>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      counter: 31,
      primeNumber: ''
    }
  },
  methods: {
    incrementCounter () {
      this.counter++
      this.checkPrime()
    },
    checkPrime () {
      if (this.isPrime) {
        this.primeNumber = 'prime'
      } else {
        this.primeNumber = 'not prime'
      }
    }
  },
  computed: {
    isPrime: function () {
      if (this.counter === 1) {
        return false
      } else if (this.counter === 2) {
        return true
      } else {
        for (var x = 2; x < this.counter; x++) {
          if (this.counter % x === 0) {
            return false
          }
        }
        return true
      }
    }
  },
  mounted () {
    this.checkPrime()
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
