import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { BlockState } from './types'
import { RootState } from '../types'

export const state: BlockState = {
    blockTotal: 0,
    blocksMap: [12, 212, 12],
    blockDetail: [],
    top10: [],
    ByAddressMap: []
}

const namespaced: boolean = true
export const block: Module<BlockState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
