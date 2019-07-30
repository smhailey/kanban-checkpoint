import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'
let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}  //REVIEW I added this Monday and now I do not get a "TypeError: Cannot read property '5d3c88f512be44170875b949' of undefined" found in src/components/Task.vue
  },
  mutations: {
    resetState(state, data) {
      state.user = {}
    },
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.tasks)
    },
    setComments(state, data) {
      Vue.set(state.comments, data.taskId, data.comments)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(res => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
          router.push({ name: 'boards' })
        })
    },
    //#endregion

    //#region -- LISTS --
    getListsByBoard({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId + '/lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, payload) {
      api.post('lists', payload)
        .then(res => {
          dispatch('getListsByBoard', payload.boardId)
        })
    },
    deleteList({ commit, dispatch }, payload) {
      api.delete('lists/' + payload._id)
        .then(res => {
          dispatch('getListsByBoard', payload.boardId)
          router.push({ name: 'board' })
        })
    },
    //#endregion

    //#region -- TASKS --
    getTasksByListId({ commit, dispatch }, payload) {
      api.get('lists/' + (payload._id || payload.listId) + '/tasks')
        .then(res => {
          let newPayload = {
            listId: payload.listId || payload._id,
            tasks: res.data
          }
          commit('setTasks', newPayload)
        })
    },
    addTask({ commit, dispatch }, payload) {
      api.post('tasks', payload)
        .then(res => {
          dispatch('getTasksByList', payload)
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload._id)
        .then(res => {
          dispatch('getTasksByList', payload)
          router.push({ name: 'board' })
        })
    },
    //#endregion

    //#region -- COMMENTS --

    getCommentsByTask({ commit, dispatch }, payload) {
      api.get('tasks/' + (payload._id || payload.taskId) + '/comments')
        .then(res => {
          let newPayload = {
            taskId: payload.taskId || payload._id,
            comments: res.data
          }
          commit('setComments', newPayload)
        })
    },
    addComment({ commit, dispatch }, payload) {
      api.post('comments', payload)
        .then(res => {
          dispatch('getCommentsByList', payload)
        })
    },
    deleteComment({ commit, dispatch }, payload) {
      api.delete('comments/' + payload._id)
        .then(res => {
          dispatch('getCommentsByTask', payload)
          router.push({ name: 'board' })
        })
    },
    //#endregion
  }
})