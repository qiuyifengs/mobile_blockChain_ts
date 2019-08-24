import { ActionTree } from 'vuex'
import { Txserc20State } from './types'
import { RootState } from '../types'

import { Txserc20All } from '@/api/txserc20'

export const actions:ActionTree<Txserc20State, RootState> = {

    async getTxserc20All({ commit }, param) {
        try {
            const data = await Txserc20All(param)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    } 
}
