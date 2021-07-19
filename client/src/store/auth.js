import axios from 'axios'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        users: []
    },
    getters: {
        authenticated (state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
        users(state) {
            return state.users
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        },
        SET_USERS(state, data) {
            state.users = data
        }
    },
    actions: {
        async signIn({ dispatch }, credentials) {
            axios.post('auth/signin', credentials).then((response) => {
                dispatch('attempt', response.data.token)
            })
        },
        async attempt({ commit, state }, token) {
            if (token){
                commit('SET_TOKEN', token)
            }
            
            if (!state.token) {
                return
            }

            try {
                let response = await axios.get('auth/me')

                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                throw new Error(e);
            }
        },
        signOut ({ commit }) {
            return axios.post('auth/signout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        },
        async getUsers({ commit }) {
            try {
                axios.get('auth/users').then((response) => {
                    commit('SET_USERS', response.data.users.data)
                })
            } catch (e) {
                commit('SET_USERS', null)
                throw new Error(e);
            }
        }
    },
}
