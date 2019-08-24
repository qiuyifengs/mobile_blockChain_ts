import { ActionTree } from 'vuex'
import { ContractState } from './types'
import { RootState } from '../types'

import { ContractAll, ContractCount, ContractTop10, ContractByAddress } from '@/api/contract'

export const actions:ActionTree<ContractState, RootState> = {
    getContracts({ commit }, param: any) {
        return new Promise(resolve => {
            try {
                ContractAll(param).then((res: any) => {
                    commit('SET_CONTRACTSMAP', res.data.docs)
                    commit('SET_TOTALCONTRACTS', res.data.total)
                    resolve(res.data.docs)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getContractByAddress({ commit }, param) {
        return new Promise(resolve => {
            try {
                ContractByAddress(param).then(res => {
                    commit('SET_BYADDRESS_MAP', res.data.docs)
                    resolve(res)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    // async getContractByAddress({ commit }, param) {
    //     await ContractByAddress(param).then(res => {
            
    //         commit('SET_ADDRTYPE', res.data.docs[0].type)
    //         // if (Array.isArray(res.data.docs) && res.data.docs.length > 0) {}
    //     })
    // },

    async getContractCount({ commit }, param) {
        try {
            const data = await ContractCount(param)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async getContractTop10({ commit }, param) {
        try {
            const data = await ContractTop10(param)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    } 
}
