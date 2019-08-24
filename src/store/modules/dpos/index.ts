import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { DposState } from './types'
import { RootState } from '../types'

export const state: DposState = {
    DposMap: [],
    DposByFindone: {}
}

const namespaced: boolean = true
export const dpos: Module<DposState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
