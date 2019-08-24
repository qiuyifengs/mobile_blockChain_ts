import { ActionTree } from 'vuex'
import { DposState } from './types'
import { RootState } from '../types'

import { DposAll, DposByFindone } from '@/api/dpos'

export const actions:ActionTree<DposState, RootState> = {
    getDposAll({ commit }) {
        return new Promise(resolve => {
            try {
                DposAll().then((res: any) => {
                    const data: any[] = []
                    if (res.code === 1) {
                        res.data.forEach((item: any, index: number) => {
                            if (index === 0 || index === 2 || index === 5 || index === 7 || index === 13 || index === 20) {
                                item.location = 1
                            } else if (index === 3 || index === 1 || index === 8 || index === 14 || index === 18) {
                                item.location = 2
                            } else if (index === 9) {
                                item.location = 3
                            } else if (index === 11 || index === 12) {
                                item.location = 4
                            } else if (index === 10) {
                                item.location = 5
                            } else if (index === 15) {
                                item.location = 6
                            } else {
                                item.location = 5
                            }
                            data.push(item)
                        })
                        commit('SET_DPOSMAP', data)
                        resolve(data)
                    }
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    },

    getDposByFindone({ commit }, param) {
        return new Promise(resolve => {
            try {
                DposByFindone(param).then((res: any) => {
                    commit('SET_DPOSBYFINDONE', res.data)
                    resolve(res.data)
                })
            } catch (error) {
                return Promise.reject(error)
            }
        })
    }
}
