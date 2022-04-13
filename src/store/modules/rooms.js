// import { apiClient } from "@/logic/api.js";

// export const namespaced = true;

// export const state = {
//     item: null,
//     items: [],
// }

// export const getters = {
//     item(state) {
//         return state.item;
//     },
//     items(state) {
//         return state.items
//     }
// }

// export const mutations = {
//     SET_ITEMS(state, items) {
//         state.items = items;
//     },
//     SET_ITEM(state, item) {
//         state.item = item
//     }
// }

// export const actions = {
//     fetchItems({ commit }, page, size) {
//         if(!size) {
//             size = 10
//         }
//         apiClient.then(client => client.apis.lateron.fetchAll(
//             {}, 
//             { parameters: { page: page, size: size } })
//               .then((data => {
//                 commxit('SET_ITEMS', data.body.items)
//                 return data
//         })).catch(
//             err => { console.error(err) }
//         ))
//     },
//     fetchItem({ commit }, id) {
//         return apiClient
//             .then(function (client) {
//                 return client.apis.lateron.fetch({ lateron_id: id })
//             }).then(data => {
//                     return data
//                 }
//             ).then(data => {
//                     commit('SET_ITEM', data.body)
//                 }
//             ).catch(err => console.error(err))
//     }
// }