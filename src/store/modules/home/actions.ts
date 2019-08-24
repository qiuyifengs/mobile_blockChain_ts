import { ActionTree } from 'vuex'
import { HomeState } from './types'
import { RootState } from '../types'


export const actions:ActionTree<HomeState, RootState> = {
    setCurrentMenu({ commit }, param) {
        commit('SET_CURRENTMENU', param)
    }
}
