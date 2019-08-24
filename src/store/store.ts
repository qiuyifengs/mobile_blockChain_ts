import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './modules/types'
import { block } from './modules/block'
import { transaction } from './modules/transaction'
import { dpos } from './modules/dpos'
import { contract } from './modules/contract'
import { txserc20 } from './modules/txserc20'
import { home } from './modules/home'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        home,
        block,
        transaction,
        contract,
        dpos,
        txserc20
    }
}

export default new Vuex.Store<RootState>(store)
