import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { HomeState } from './types'
import { RootState } from '../types'

export const state: HomeState = {
    currentMenu: 0
}

const namespaced: boolean = true
export const home: Module<HomeState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
