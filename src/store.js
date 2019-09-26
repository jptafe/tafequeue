import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    count: 0,
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
    loginProcess (state) {
      this.commit('setLoginState', true)
    },
    logoutProcess (state) {
      this.commit('setLoginState', false)
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
  },
  getters: {
    isLoggedIn (state) {
      return state.loggedin
    }
  }
})
