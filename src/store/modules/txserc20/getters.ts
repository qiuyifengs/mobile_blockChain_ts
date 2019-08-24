import { GetterTree } from 'vuex'
import { Txserc20State } from './types'
import { RootState } from '../types'

export const getters: GetterTree<Txserc20State, RootState> = {
    Txserc20Map: state => state.Txserc20Map
}
