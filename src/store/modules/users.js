import { apiClient } from "@/logic/api.js";


export const namespaced = true;

export const state = {
    currentUser: undefined,
    items: [],
    registrationErrors: {},
    loginError: undefined,
    errors: {},
    acessToken: undefined,
}

export const getters = {
    currentUser(state) {
        return state.currentUser
    },
    registrationErrors(state) {
        return state.registrationErrors
    },
    loginError(state) {
        return state.loginError
    },
    accessToken(state) {
        return state.accessToken || localStorage.getItem('accessToken')
    },
    isAuthenticated(state) {
        return Boolean(state.currentUser || localStorage.getItem('accessToken'))
    }
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_CURRENT_USER(state, item) {
        state.currentUser = item
    },
    SET_REGISTRATION_ERRORS(state, item) {
        state.registrationErrors = item
    },
    SET_LOGIN_ERROR(state, item) {
        state.loginError = item
    },
    SET_ACCESS_TOKEN(state, token) {
        state.accessToken = token
    }
}

export const actions = {
    async registerUser({ commit }, requestBody) {
        const client = await apiClient

        try {
            await client.apis.user.registerUser({}, { requestBody: requestBody })
            commit('SET_REGISTRATION_ERRORS', {})
        } catch(e) {
            commit('SET_REGISTRATION_ERRORS', e.response.body.detail)
            console.error(e.response.body.detail)
            return
        }
    },
    async authenticateUser({ commit }, requestBody) {
        const client = await apiClient

        try {
            var response = await client.apis.user.authenticateUser({}, {requestBody: requestBody })
            localStorage.setItem('accessToken', response.body.access_token)
            commit('SET_ACCESS_TOKEN', response.body.access_token)
            commit('SET_LOGIN_ERROR', undefined)
        } catch(e) {
            commit('SET_LOGIN_ERROR', e.response.body.detail)
        }
    },
    async getCurrentUser({ commit }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.user.currentUserInfo({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
            commit('SET_CURRENT_USER', response.body)
        } catch (e) {
            localStorage.removeItem('accessToken')
        }
    },
    async updateUser({commit}, requestBody) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.user.updateCurrentUser({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            commit('SET_CURRENT_USER', response.body)
            commit('SET_REGISTRATION_ERRORS', {})
            alert('Success')
        } catch (e) {
            console.error(e)
            commit('SET_REGISTRATION_ERRORS', e.response.body.detail)
        }
    },
    logout({ commit }) {
        localStorage.removeItem('accessToken')
        commit('SET_ACCESS_TOKEN', undefined)
        commit('SET_CURRENT_USER', undefined)
    }
}