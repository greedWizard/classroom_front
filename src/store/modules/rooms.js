import { apiClient } from "@/logic/api.js";

export const namespaced = true;

export const state = {
    item: null,
    items: [],
}

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    }
}

export const mutations = {
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_ITEM(state, item) {
        state.item = item
    }
}

export const actions = {
    async getRooms({ commit }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        console.log(client.apis.classroom)
        
        try {
            const response = await client.apis.classroom.getCurrentUserRooms({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            console.log(response.body)
            commit('SET_ITEMS', response.body)
        } catch (e) {
            console.error(e)
        }
    },
}