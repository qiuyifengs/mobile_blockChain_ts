import { MutationTree } from 'vuex'
import { Txserc20State } from './types'

export const mutations: MutationTree<Txserc20State> = {
    SET_TXSER20MAP: (state, Txserc20Map) => {
        state.Txserc20Map = Txserc20Map
    }
}
