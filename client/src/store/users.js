import axios from 'axios'

export default {
    namespaced: true,
    state: {
        users: [],
        editUser: null,
        errorMessage: null,
        errors: null,
        successMessage: null
    },
    getters: {
        users(state) {
            return state.users
        },
        editUser(state) {
            return state.editUser
        },
        errors(state) {
            return state.errors
        },
        errorMessage(state) {
            return state.errorMessage
        },
        successMessage(state) {
            return state.successMessage
        }
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        },
        SET_EDIT_USER(state, data) {
            state.editUser = data
        },
        SET_ERRORS(state, data) {
            if (data == null) {
                state.errorMessage = null
                state.errors = null
            } else {
                state.errorMessage = data.message
                state.errors = data.errors
            }
        },
        SET_SUCCESS(state, data) {
            state.successMessage = data
        },
        CLEAR_ALL_MESSAGES(state) {
            state.errorMessage = null
            state.errors = null
            state.successMessage = null
        }
    },
    actions: {
        async getUsers({ commit }) {
            try {
                axios.get('user/users').then((response) => {
                    commit('SET_USERS', response.data.users.data)
                })
            } catch (error) {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_USERS', null)
                commit('SET_ERRORS', error.response.data)
            }
        },
        async getEditUser({ commit }, userId) {
            try {
                axios.get('user/show/' + userId).then((response) => {
                    commit('SET_EDIT_USER', response.data.user)
                })
            } catch (error) {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_USERS', null)
                commit('SET_ERRORS', error.response.data)
            }
        },
        async editUser({ commit }, form) {
            axios.post('user/edit', form).then((response) => {
                commit('SET_EDIT_USER', response.data.user)
                commit('SET_SUCCESS', 'User Updated!')
                commit('SET_ERRORS', null)
            }).catch(error => {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_ERRORS', error.response.data)
                commit('SET_SUCCESS', null)
            });
        },
        async createUser({ commit }, form) {
            axios.post('user/create', form).then((response) => {
                commit('SET_EDIT_USER', response.data.user)
                commit('SET_SUCCESS', 'User Created!')
                commit('SET_ERRORS', null)
            }).catch(error => {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_ERRORS', error.response.data)
                commit('SET_SUCCESS', null)
            });
        },
        async deleteUser({ commit }, id) {
            axios.post('user/delete/' + id).then((response) => {
                commit('SET_EDIT_USER', response.data.user)
                commit('SET_SUCCESS', 'User Deleted!')
                commit('SET_ERRORS', null)
            }).catch(error => {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_ERRORS', error.response.data)
                commit('SET_SUCCESS', null)
            });
        },
        clearMessages({ commit }) {
            commit('CLEAR_ALL_MESSAGES')
        }
    },
}
