import { GetterTree } from 'vuex'
import { HomeState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<HomeState, RootState> = {
    currentMenu: state => state.currentMenu
}
