import { MutationTree } from 'vuex'
import { DposState } from './types'

export const mutations: MutationTree<DposState> = {
    SET_DPOSMAP: (state, DposMap) => {
        state.DposMap = DposMap
    },
    
    SET_DPOSBYFINDONE: (state, DposByFindone) => {
        state.DposByFindone = DposByFindone
    }
}
