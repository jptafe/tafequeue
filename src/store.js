import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    count: 0,
    data: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setData (state, gottenData) {
      state.data = gottenData
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    getData (state) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .then(data => {
          console.log(data)
          this.commit('setData', data.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
