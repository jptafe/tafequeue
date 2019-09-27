import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    loggedin: false,
    inQueue: false,
    queueItems: []
  },
  mutations: {
    setLoginState (state, gottenData) {
      state.loggedin = gottenData
    },
    setData (state, gottenData) {
      state.queueItems = gottenData
    },
    setQueueState (state, gottenData) {
      state.inQueue = gottenData
    }
  },
  actions: {
    loginProcess (state, payload) {
      if (payload[0].value === 'foo' &&
          payload[1].value === 'bar') {
        this.commit('setLoginState', true)
      } else {
        this.commit('setLoginState', false)
      }
    },
    logoutProcess (state) {
      this.commit('setLoginState', false)
    },
    getQueue (state) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .then(data => {
          this.commit('setData', data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addQueue (state, payload) {
      this.commit('setQueueState', true)
    },
    removeQueue (state, payload) {
      this.commit('setQueueState', false)
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.loggedin
    },
    isInqueue (state) {
      return state.inQueue
    },
    listQueue (state) {
      return state.queueItems
    }
  }
})
