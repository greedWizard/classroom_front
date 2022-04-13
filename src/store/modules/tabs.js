// import { apiClient } from "@/logic/api.js";

export const namespaced = true;

export const state = {
    currentTab: 'home',
}

export const getters = {
    currentTab(state) {
        return state.currentTab;
    },
}

export const mutations = {
    SET_TAB(state, item) {
        state.currentTab = item;
    },
}

export const actions = {
    async setTab({ commit }, tab) {
        commit('SET_TAB', tab)
    }
}