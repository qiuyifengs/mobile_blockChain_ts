
<template lang="pug">
div
    van-sticky
        header-nav(title="ContractByAddress")
    Overview(:id="id")
    van-tabs(animated swipeable :ellipsis="false" color="#1989fa" type="card" style="padding-top: 12px")
        van-tab
            div(slot="title")
                span(style="display: inline-block") Transfers
                //- van-tag(type="primary") {{ ByAddressTxsTotal }}
            TransfersTable(:id="id")
        van-tab(title="Holders")
            div(slot="title")
                span(style="display: inline-block") Holders
                //- van-tag(type="primary") {{ holderTotal }}
            HoldersTable(:id="id")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { TransactionState } from '@/store/modules/transaction/types'
import { ContractState } from '@/store/modules/contract/types'
import { contract } from '@/store/modules/contract'
import TransfersTable from './components/ContractByAddress/TransfersTable/index.vue'
import HoldersTable from './components/ContractByAddress/HoldersTable/index.vue'
import Overview from './components/ContractByAddress/Overview/index.vue'
import { PullRefresh, Skeleton, Toast, Tab, Tabs, Sticky } from 'vant'

const contractModule = namespace('contract')
const transactionModule = namespace('transaction')

@Component({
    name: 'ContractByAddress',
    components: {
        TransfersTable,
        HoldersTable,
        Overview,
        [PullRefresh.name]: PullRefresh,
        [Skeleton.name]: Skeleton,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Sticky.name]: Sticky
    }
})
export default class ContractByAddress extends Vue {
    @Prop({
        default: ''
    })
    id!: string

    @transactionModule.Getter('holderTotal')
    holderTotal!: TransactionState

    @transactionModule.Getter('ByAddressTxsTotal')
    ByAddressTxsTotal!: TransactionState
}
</script>

<style lang="less" scoped>
 @import url('../assets/styles/gitTab.less');
</style>