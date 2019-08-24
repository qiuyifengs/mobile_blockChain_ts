import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { Txserc20State } from './types'
import { RootState } from '../types'

export const state: Txserc20State = {
    Txserc20Map: []
}

const namespaced: boolean = true
export const txserc20: Module<Txserc20State, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
