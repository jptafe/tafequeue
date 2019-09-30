import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios, router)

export default new Vuex.Store({
  state: {
    loggedin: false,
    loginID: 0,
    nick: '',
    god: false,
    inQueue: false,
    queueItems: []
  },
  mutations: {
    setLoginState (state, gottenData) {
      state.loggedin = gottenData
    },
    setLoginID (state, gottenData) {
      state.loginID = gottenData
    },
    setNick (state, gottenData) {
      state.nick = gottenData
    },
    setGod (state, gottenData) {
      state.god = gottenData
    },
    setData (state, gottenData) {
      state.queueItems = gottenData
      var out = gottenData.filter(function (queue) { return queue.student_NO.indexOf(state.loginID) !== -1 })
      if (out.length > 0) {
        state.inQueue = true
      }
    },
    setQueueState (state, gottenData) {
      state.inQueue = gottenData
    },
    addQueueItem (state, gottenData) {
      state.queueItems.push({ student_NO: state.loginID, queue_TITLE: gottenData.title, queue_DESC: gottenData.desc, nick: state.nick })
    },
    delQueueItem (state) {
      console.log(state)
      state.queueItems.splice(
        state.queueItems.map(
          function (x) {
            return x.student_NO
          }
        ).indexOf(state.loginID), 1)
    }
  },
  actions: {
    loginProcess (state, payload) {
      var fd = new FormData()
      fd.append('username', payload[0].value)
      fd.append('password', payload[1].value)
      axios
        .post('srv/ws.php',
          fd,
          { useCredentails: true })
        .then(data => {
          if (data.data.login) {
            this.commit('setLoginState', true)
            this.commit('setLoginID', data.data.login)
            this.commit('setNick', data.data.nick)
            if (data.data.privilege === '0') {
              this.commit('setGod', true)
            }
            router.push({ path: 'showqueue' })
            state.dispatch('getQueue')
          }
        })
    },
    logoutProcess (state) {
      var fd = new FormData()
      fd.append('logout', 'logout')
      axios
        .post('srv/ws.php',
          fd,
          { useCredentails: true })
        .then(data => {
          if (data.data.login === false) {
            this.commit('setLoginState', false)
            this.commit('setGod', false)
            router.push({ path: 'login' })
          }
        })
    },
    getQueue (state) {
      axios
        .get('srv/ws.php?getData=listqueue',
          {},
          { useCredentails: true })
        .then(data => {
          this.commit('setData', data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addQueue (state, payload) {
      var fd = new FormData()
      fd.append('student_NO', state.state.loginID)
      fd.append('problem', payload.title)
      fd.append('description', payload.desc)
      axios
        .post('srv/ws.php?getData=enqueue',
          fd,
          { useCredentails: true })
        .then(data => {
          if (data.data.insert) {
            this.commit('setQueueState', true)
            this.commit('addQueueItem', payload)
            router.push({ path: 'showqueue' })
          }
        })
    },
    removeQueue (state, payload) {
      var url = 'srv/ws.php?getData=dequeue&queueid=' +
        payload + '&student_NO=' + state.state.loginID
      axios
        .get(url,
          {},
          { useCredentails: true })
        .then(data => {
          if (data.data.delete) {
            this.commit('setQueueState', false)
            this.commit('delQueueItem')
          }
        })
    },
    updateSettings (state, payload) {
      var fd = new FormData()
      fd.append('student_NO', state.state.loginID)
      fd.append('nick', payload[1].value)
      fd.append('pass', payload[2].value)
      axios
        .post('srv/ws.php?getData=settings',
          fd,
          { useCredentails: true })
        .then(data => {
          if (data.data.update) {
            this.commit('setNick', payload[1].value)
          }
        })
    },
    whatIsState (state) {
      console.log(state)
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
