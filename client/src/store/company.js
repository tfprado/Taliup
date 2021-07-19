import axios from 'axios'

export default {
    namespaced: true,
    state: {
        companies: [],
        editCompany: null,
        errorMessage: null,
        errors: null,
        successMessage: null
    },
    getters: {
        companies(state) {
            return state.companies
        },
        editCompany(state) {
            return state.editCompany
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
        SET_COMPANIES(state, data) {
            state.companies = data
        },
        SET_EDIT_COMPANY(state, data) {
            state.editCompany = data
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
        async getCompanies({ commit }) {
            try {
                axios.get('company/index').then((response) => {
                    commit('SET_COMPANIES', response.data.companies.data)
                })
            } catch (error) {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_COMPANIES', null)
                commit('SET_ERRORS', error.response.data)
            }
        },
        async getEditCompany({ commit }, companyId) {
            try {
                axios.get('company/show/' + companyId).then((response) => {
                    console.log("SUCC: ", response.data);
                    commit('SET_EDIT_COMPANY', response.data.company)
                })
            } catch (error) {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_COMPANIES', null)
                commit('SET_ERRORS', error.response.data)
            }
        },
        async editCompany({ commit }, form) {
            axios.post('company/update', form).then((response) => {
                commit('SET_EDIT_COMPANY', response.data.company)
                commit('SET_SUCCESS', 'COMPANY Updated!')
                commit('SET_ERRORS', null)
            }).catch(error => {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_ERRORS', error.response.data)
                commit('SET_SUCCESS', null)
            });
        },
        async createCompany({ commit }, form) {
            axios.post('company/create', form).then((response) => {
                commit('SET_EDIT_COMPANY', response.data.company)
                commit('SET_SUCCESS', 'Company Created!')
                commit('SET_ERRORS', null)
            }).catch(error => {
                console.log("ERRRR:: ", error.response.data);
                commit('SET_ERRORS', error.response.data)
                commit('SET_SUCCESS', null)
            });
        },
        async deleteCompany({ commit }, id) {
            axios.post('company/destroy/' + id).then((response) => {
                commit('SET_EDIT_COMPANY', response.data.company)
                commit('SET_SUCCESS', 'Company Deleted!')
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
