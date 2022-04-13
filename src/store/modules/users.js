import { apiClient } from "@/logic/api.js";

export const namespaced = true;

export const state = {
    currentUser: null,
    items: [],
    registrationErrors: {},
    loginError: undefined,
    authenticationToken: undefined,
}

export const getters = {
    currentUser(state) {
        return state.currentUser;
    },
    registrationErrors(state) {
        return state.registrationErrors
    },
    loginError(state) {
        return state.loginError
    },
    authenticationToken(state) {
        return state.authenticationToken
    },
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_CURRENT_USER(state, item) {
        state.item = item
    },
    SET_REGISTRATION_ERRORS(state, item) {
        state.registrationErrors = item
    },
    SET_LOGIN_ERROR(state, item) {
        state.loginError = item
    },
    SET_AUTHENTICATION_TOKEN(state, item) {
        state.authenticationToken = item
    }
}

export const actions = {
    async registerUser({ commit }, requestBody) {
        const client = await apiClient

        try {
            let response = await client.apis.authentication.registerUser({}, { requestBody: requestBody })
            console.log(response)
            commit('SET_REGISTRATION_ERRORS', {})
        } catch(e) {
            commit('SET_REGISTRATION_ERRORS', e.response.body.detail)
            console.error(e.response.body.detail)
            return
        }
    },
    async authenticateUser({ commit }, requestBody) {
        const client = await apiClient
        console.log(client.authorizations)

        try {
            var response = await client.apis.authentication.authenticateUser({}, { requestBody: requestBody })
            client.authorizations = { BearerAuth: {value: response.body.access_token} }
            commit('SET_AUTHENTICATION_TOKEN', response.body.access_token)
        } catch(e) {
            commit('SET_LOGIN_ERROR', e.response.body.detail)
            console.log(e.response.body.detail)
        }
    }
}