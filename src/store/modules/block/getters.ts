import { GetterTree } from 'vuex'
import { BlockState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<BlockState, RootState> = {
    blockTotal: state => state.blockTotal,
    blocksMap: state => state.blocksMap,
    blockDetail: state => state.blockDetail,
    ByAddressMap: state => state.ByAddressMap,
    top10: state => state.top10
}
