import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ContractState } from './types'
import { RootState } from '../types'

export const state: ContractState = {
    totalContracts: 0,
    ContractMap: [],
    latestContractTop10: [],
    ByAddressMap: [],
    addrType: 1
}

const namespaced: boolean = true
export const contract: Module<ContractState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
