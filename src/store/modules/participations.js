import { apiClient } from "@/logic/api.js";

export const namespaced = true;

export const state = {
    item: null,
    items: [],
    errors: {},
    my: undefined,
    homeworks: {},
}

export const getters = {
    item(state) {
        return state.item;
    },
    items(state) {
        return state.items
    },
    my(state) {
        return state.my
    },
    homeworks(state) {
        return state.getHomeworks
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
    },
    SET_MY(state, item) {
        state.my = item
    },
    SET_HOMEWORKS(state, item){
        state.homeworks = item
    }
}

export const actions = {
    async getParticipations({ commit }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try { 
            const response = await client.apis.participation.getParticipations({
                room_id: roomId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEMS', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    },
    // async getHomeworks({ commit }, { roomId, userId }) {
    //     const client = await apiClient
    //     const accessToken = localStorage.getItem('accessToken')
        
    //     try { 
    //         const response = await client.apis.participation.getHomeworks({
    //             room_id: roomId,
    //             user_id: userId,
    //         }, {
    //             requestInterceptor: (request) => {
    //                 request.headers.Authorization = `Bearer ${accessToken}`
    //             },
    //         })
    //         commit('SET_ITEMS', response.body)
    //         commit('SET_ERRORS', {})
    //     } catch (e) {
    //         console.error(e)
    //         commit('SET_ERRORS', e.response.body.detail)

    //     }
    // },
    async my({ commit }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try { 
            const response = await client.apis.participation.my({
                room_id: roomId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_MY', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    },
    async delete({ commit, state }, { roomId, userId, }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try { 
            await client.apis.participation.delete({
                room_id: roomId,
                user_id: userId,
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEMS', state.items.filter(e => e.user.id !== userId ))
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e.response.body.detail)

        }
    }
}