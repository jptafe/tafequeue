import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    loggedin: false,
    loginID: 0,
    nick: '',
    god: false,
    inQueue: false,
    queueItems: [{ uid: 4567, title: 'foobar', desc: 'barfoo' }]
  },
  mutations: {
    setLoginState (state, gottenData) {
      state.loggedin = gottenData
    },
    setLoginID (state, payload) {
      state.loginID = payload
    },
    setNick (state, gottenData) {
      state.nick = gottenData
    },
    setData (state, gottenData) {
      state.queueItems = gottenData
    },
    setQueueState (state, gottenData) {
      state.inQueue = gottenData
    },
    addQueueItem (state, payload) {
      state.queueItems.push({ uid: state.loginID, title: payload.title, desc: payload.desc })
    },
    delQueueItem (state, payload) {
      state.queueItems.splice(
        state.queueItems.map(
          function (x) {
            return x.uid
          }
        ).indexOf(state.loginID), 1)
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
      this.commit('setLoginID', 1234)
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
      this.commit('addQueueItem', payload)
    },
    removeQueue (state) {
      this.commit('setQueueState', false)
      this.commit('delQueueItem', false)
    },
    updateSettings (state, payload) {
      this.commit('setNick', payload[1].value)
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.loggedin
    },
    whatLoginID (state) {
      return state.loginID
    },
    isGod (state) {
      return state.god
    },
    whatNick (state) {
      return state.nick
    },
    isinQueue (state) {
      return state.inQueue
    },
    listQueue (state) {
      return state.queueItems
    },
    noinQueue (state) {
      return state.queueItems.length
    }
  }
})
