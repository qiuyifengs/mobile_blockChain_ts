import { GetterTree } from 'vuex'
import { DposState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<DposState, RootState> = {
    DposMap: state => state.DposMap,
    DposByFindone: state => state.DposByFindone
}
