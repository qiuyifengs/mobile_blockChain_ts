import { MutationTree } from 'vuex'
import { ContractState } from './types'

export const mutations: MutationTree<ContractState> = {
    SET_TOTALCONTRACTS: (state, totalContracts) => {
        state.totalContracts = totalContracts
    },
    SET_CONTRACTSMAP: (state, ContractMap) => {
        state.ContractMap = ContractMap
    },
    SET_LATESTCONTRACTSTOP10: (state, latestContractTop10) => {
        state.latestContractTop10 = latestContractTop10
    },
    SET_BYADDRESS_MAP: (state, ByAddressMap) => {
        state.ByAddressMap = ByAddressMap
    },
    SET_ADDRTYPE: (state, addrType) => {
        state.addrType = addrType
    }
}
