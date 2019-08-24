import { MutationTree } from 'vuex'
import { HomeState } from './types'

export const mutations: MutationTree<HomeState> = {
    SET_CURRENTMENU: (state, currentMenu) => {
        state.currentMenu = currentMenu
    }
}
