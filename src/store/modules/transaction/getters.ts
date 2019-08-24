import { GetterTree } from 'vuex'
import { TransactionState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<TransactionState, RootState> = {
    txsTotal: state => state.txsTotal,
    TransactionsMap: state => state.TransactionsMap,
    TransactionsByAddrMap: state => state.TransactionsByAddrMap,
    latestTransactionsTop10: state => state.latestTransactionsTop10,
    TxsDetail: state => state.TxsDetail,
    DetermineAddrType: state => state.DetermineAddrType,
    holderMap: state => state.holderMap,
    accountbalance: state => state.accountbalance,
    txsTop10: state => state.txsTop10,
    ByAddressTxsTotal: state => state.ByAddressTxsTotal,
    holderTotal: state => state.holderTotal,
    TxsByBlockMap: state => state.TxsByBlockMap
}
