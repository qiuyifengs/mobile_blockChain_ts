import { ActionTree } from 'vuex'
import { TransactionState } from './types'
import { RootState } from '../types'
import { 
    TxsCount, 
    TxsTop10, 
    TxsAll, 
    TxsByBlock, 
    TxsByHash,
    TxsByAddress,
    TxsByaddrTobalance,
    TxsByManyaddrssTobalance,
    TxsDetermineAddress,
    TxsHolderlist
 } from '@/api/transaction'

export const actions:ActionTree<TransactionState, RootState> = {
    getTxsTop10({ commit }) {
        return new Promise(resolve => {
            try {
                TxsTop10().then(res => {
                    commit('SET_TXSTOP10', res.data)
                    resolve(res.data)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getTxsAll({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsAll(param).then((res: any) => {
                    commit('SET_TRANSACTIONSMAP', res.data.docs)
                    commit('SET_TXSTOTAL', res.data.total)
                    resolve(res.data.docs)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getTxsHolderlist({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsHolderlist(param).then(res => {
                    commit('SET_HOLDER_MAP', res.data.docs)
                    commit('SET_HOLDERTOTAL', res.data.total)
                    resolve(res.data.docs)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getTxsByAddress({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsByAddress(param).then(res => {
                    commit('SET_TRANSACTIONBYADDR_MAP', res.data.docs)
                    commit('SET_BYADDRESSTXSTOTAL', res.data.total)
                    resolve(res.data.docs)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
        
    },

    getTxsByBlock({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsByBlock(param).then(res => {
                    commit('SET_TXSBYBLOCKMAP', res.data.docs)
                    resolve(res.data.docs)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getAccountbalance({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsByaddrTobalance(param).then(res => {
                    commit('SE_ACCOUNBALANCE', res.data)
                    resolve(res.data)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
        
    },

    getDetermineAddrType({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsDetermineAddress(param).then((res: any) => {
                    commit('SET_DETERMINEADDRTYPE', res.data.code)
                    resolve(res)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getTxsDetail({ commit }, param) {
        return new Promise(resolve => {
            try {
                TxsByHash(param).then((res: any) => {
                    commit('SET_TXSDETAIL', res.data)
                    resolve(res.data)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    async getTxsCount({ commit }, param) {
        try {
            const data = await TxsCount(param)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
