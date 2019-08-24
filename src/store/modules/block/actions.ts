import { ActionTree } from 'vuex'
import { BlockState } from './types'
import { RootState } from '../types'

import { BlockAll, BlockCount, BlockTop10, BlockByNumber, BlockNumberTime, AddressByMiner } from '@/api/block'

export const actions:ActionTree<BlockState, RootState> = {
    getBlockTop10({ commit }) {
        return new Promise(resolve => {
            try {
                BlockTop10().then((res: any) => {
                    commit('SET_TOP10', res.data)
                    resolve(res.data)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getBlocks({ commit }, param: any) {
        return new Promise(resolve => {
            try {
                BlockAll(param).then((res: any) => {
                    commit('SET_BLOCKSMAP', res.data.docs)
                    commit('SET_BLOCKTOTAL', res.data.total)
                    resolve(res.data.docs)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    async getBlockCount({ commit }, param: any) {
        try {
            const data = await BlockCount(param)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    getBlockByNumber({ commit }, param) {
        return new Promise(resolve => {
            try {
                BlockByNumber(param).then((res: any) => {
                    commit('SET_BLOCKDETAIL', res.data)
                    resolve(res.data)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    async getBlockNumberTime({ commit }, param) {
        try {
            const data = await BlockNumberTime(param)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async getAddressByMiner({ commit }, param) {
        await AddressByMiner(param).then(res => {
            commit('SET_BYADDRESS_MAP', res.data.docs)
        })
    }
}
