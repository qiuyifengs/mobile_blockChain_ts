import { GetterTree } from 'vuex'
import { ContractState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<ContractState, RootState> = {
    totalContracts: state => state.totalContracts,
    ContractMap: state => state.ContractMap,
    latestContractTop10: state => state.latestContractTop10,
    ByAddressMap: state => state.ByAddressMap,
    addrType: state => state.addrType
}
