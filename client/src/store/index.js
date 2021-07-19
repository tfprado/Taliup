import { createStore } from 'vuex'
import auth from './auth'
import users from './users'
import company from './company'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    users,
    company
  }
})
