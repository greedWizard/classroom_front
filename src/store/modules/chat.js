import { apiClient } from "@/logic/api.js";

export const namespaced = true;

export const state = {
    item: null,
    items: [],
    errors: {},
    messages: [],
}

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
    messages(state) {
        return state.messages
    }
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_ITEM(state, item) {
        state.item = item
    },
    SET_MESSAGES(state, items) {
        state.messages = items
    },
    SET_ERRORS(state, items) {
        state.errors = items
    }
}

export const actions = {
    async fetch({ commit }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.chat.myDialogs({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_MESSAGES', response.body)
        }
        catch (e) {
            console.error(e)
        }
    },
}