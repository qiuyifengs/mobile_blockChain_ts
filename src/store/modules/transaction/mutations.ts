import { MutationTree } from 'vuex'
import { TransactionState } from './types'

export const mutations: MutationTree<TransactionState> = {
    SET_TXSTOTAL: (state, txsTotal) => {
        state.txsTotal = txsTotal
    },
    SET_TRANSACTIONSMAP: (state, TransactionsMap) => {
        state.TransactionsMap = TransactionsMap
    },
    SET_TRANSACTIONBYADDR_MAP: (state, TransactionsByAddrMap) => {
        state.TransactionsByAddrMap = TransactionsByAddrMap
    },
    SET_TXSDETAIL: (state, TxsDetail) => {
        state.TxsDetail = TxsDetail
    },
    SET_DETERMINEADDRTYPE: (state, DetermineAddrType) => {
        state.DetermineAddrType = DetermineAddrType
    },
    SET_LATESTTRANSACTIONSTOP10: (state, latestTransactionsTop10) => {
        state.latestTransactionsTop10 = latestTransactionsTop10
    },
    SET_HOLDER_MAP: (state, holderMap) => {
        state.holderMap = holderMap
    },
    SE_ACCOUNBALANCE: (state, accountbalance) => {
        state.accountbalance = accountbalance
    },
    SET_TXSTOP10: (state, txsTop10) => {
        state.txsTop10 = txsTop10
    },
    SET_BYADDRESSTXSTOTAL: (state, ByAddressTxsTotal) => {
        state.ByAddressTxsTotal = ByAddressTxsTotal
    },
    SET_HOLDERTOTAL: (state, holderTotal) => {
        state.holderTotal = holderTotal
    },
    SET_TXSBYBLOCKMAP: (state, TxsByBlockMap) => {
        state.TxsByBlockMap = TxsByBlockMap
    }
}
