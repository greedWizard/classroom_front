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
    async getRooms({ commit }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
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
    async createRoom({ commit }, requestBody) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.classroom.createRoom({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            console.log(response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    },
    async deleteRoom({ dispatch }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.classroom.deleteRoom({
                room_id: roomId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            console.log(response.body)
            dispatch('getRooms')
        } catch (e) {
            console.error(e.response.body)
        }
    },
    async getRoom({ commit }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.getRoom({
                room_id: roomId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e.response.body)
        }
    },
    async updateRoom({ commit }, {roomId, requestBody}) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.classroom.updateRoom({
                room_id: roomId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody
            })
            commit('SET_ITEM', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e.response.body)
            commit('SET_ERRORS', e.response.body.detail)
        }
    },
    async join({ commit }, joinSlug) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            await client.apis.classroom.joinBySlug({
                join_slug: joinSlug
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e.response.body)
        }
    }
}