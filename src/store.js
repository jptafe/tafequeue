import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    loggedin: false,
    somedata: []
  },
  mutations: {
    setLoginState (state, gottenData) {
      state.loggedin = gottenData
    },
    setData (state, gottenData) {
      state.somedata = gottenData
    }
  },
  actions: {
    loginProcess (state, payload) {
      if(payload[0].value == 'foo' &&
          payload[1].value == 'bar') {
        this.commit('setLoginState', true)
      } else {
        this.commit('setLoginState', false)
      }
    },
    logoutProcess (state) {
      this.commit('setLoginState', false)
    },
    getData (state) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .then(data => {
          this.commit('setData', data.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.loggedin
    }
  }
})
