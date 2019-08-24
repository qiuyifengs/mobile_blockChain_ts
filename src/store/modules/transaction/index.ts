import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { TransactionState } from './types'
import { RootState } from '../types'

export const state: TransactionState = {
    txsTotal: 0,
    TransactionsMap: [],
    latestTransactionsTop10: [],
    TransactionsByAddrMap: [],
    TxsDetail: [],
    DetermineAddrType: 1,
    holderMap: [],
    accountbalance: [],
    txsTop10: [],
    ByAddressTxsTotal: 0,
    holderTotal: 0,
    TxsByBlockMap: []
}

const namespaced: boolean = true
export const transaction: Module<TransactionState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
