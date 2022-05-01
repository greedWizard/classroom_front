import { apiClient } from "@/logic/api.js";

export const namespaced = true;

export const state = {
    item: null,
    items: [],
    errors: {},
}

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
    errors(state) {
        return state.errors
    }
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_ITEM(state, item) {
        state.item = item
    },
    SET_ERRORS(state, items) {
        state.errors = items
    }
}

export const actions = {
    async create({ commit }, requestBody) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.classroom.createMaterial({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            console.log(response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e.response)
            commit('SET_ERRORS', e.response.body.detail)

        }
    }
}