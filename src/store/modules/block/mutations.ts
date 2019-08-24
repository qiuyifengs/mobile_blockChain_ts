import { MutationTree } from 'vuex'
import { BlockState } from './types'

export const mutations: MutationTree<BlockState> = {
    SET_BLOCKTOTAL: (state, blockTotal) => {
        state.blockTotal = blockTotal
    },
    SET_BLOCKSMAP: (state, blocksMap) => {
        state.blocksMap = blocksMap
    },
    SET_BLOCKDETAIL: (state, blockDetail) => {
        state.blockDetail = blockDetail
    },
    SET_BYADDRESS_MAP: (state, ByAddressMap) => {
        state.ByAddressMap = ByAddressMap
    },
    SET_TOP10: (state, top10) => {
        state.top10 = top10
    }
}
