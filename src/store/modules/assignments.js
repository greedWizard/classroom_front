import { apiClient } from "@/logic/api.js";
import store from '@/store'


export const namespaced = true;

export const state = {
    item: {},
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
    async fetchForTeacher({ commit }, roomPostId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')
        
        try {
            const response = await client.apis.classroom.getAssignmentsForRoomPost({
                assigned_room_post_id: roomPostId
            }, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                }
            })
            
            commit('SET_ITEMS', response.body)
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e)
        }
    },
    async create({ commit }, requestBody) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.assignHomework({}, {
                requestInterceptor: request => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            alert(response.body)
            console.log(response.body)

            commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
            commit('SET_ERRORS', e)
        }
    },
    async attachFiles(context, { assignmentId, requestBody }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.attachFilesToAssignment({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            var currentAssignment = context.getters['item']
            var currentAttachments = currentAssignment.attachments.concat(Array.from(response.body))

            store.commit('attachments/SET_ITEMS', currentAttachments)

            context.commit(
                'SET_ITEM',
                Object.assign(
                    currentAssignment, 
                    { attachments: currentAttachments }
                )
            )
        } catch (e) {
            console.error(e)
        }
    },
    async requestChanges(context, { assignmentId, requestBody }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.requestAssignmentChanges({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async reassign(context, assignmentId) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.reassignHomework({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
    async rateHomework(context, { assignmentId, requestBody }) {
        const client = await apiClient
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await client.apis.classroom.rateHomework({
                assignment_id: assignmentId
            }, {
                requestInterceptor: (request) => {
                    request.headers.Authorization = `Bearer ${accessToken}`
                },
                requestBody: requestBody,
            })
            context.commit('SET_ITEM', response.body)
        } catch (e) {
            console.error(e)
        }
    },
}