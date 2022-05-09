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
            const response = await client.apis.classroom.createRoomPost({}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            commit('SET_ITEM', response.body)
            commit('SET_ERRORS', {})
        } catch (e) {
            console.error(e.response)
            commit('SET_ERRORS', e.response.body.detail)
        }
    },
    async fetch({ commit }, roomId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.classroom.getRoomPosts({room_id: roomId}, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            commit('SET_ITEMS', response.body)
        } catch (e) {
            console.error(e.response)
        }
    },
    async delete({ dispatch }, roomPost) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            await client.apis.classroom.deleteRoomPost({
                room_post_id: roomPost.id
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            dispatch('fetch', roomPost.room_id)
        } catch (e) {
            console.error(e)
        }
    },
    async attachFilesToRoomPost(context, { roomPostId, requestBody }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            await client.apis.classroom.attachFilesToRoomPost({
                room_post_id: roomPostId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
        } catch (e) {
            console.error(e)
        }
    },
    async getRoomPost({ commit }, roomPostId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.getRoomPost({room_post_id: roomPostId},
                {
                    requestInterceptor: (request) => {
                        request.headers.Authorization = `Bearer ${accessToken}`
                    },
                }
            )
            commit('SET_ITEM', response.body)
        }
        catch (e) {
            console.error(e)
        }
    }
}