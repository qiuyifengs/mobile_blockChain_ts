<template lang="pug">
div.mb12
    van-skeleton.mt12.mb24(title :row="1" :loading="listLoading")
        .gm-list
            .gm-list-header(style="text-align: left")
                svg-icon.mr4(icon-class="overview")
                span Overview
            .gm-list-body
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span Total Supply
                            .gm-list-brief
                                span {{ tokenMoreInfo.totalSupply }}
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span Symbol
                            .gm-list-brief
                                span {{ tokenMoreInfo.symbol }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { TransactionState } from '@/store/modules/transaction/types'
import { contract } from '@/store/modules/contract';
import { ContractState } from '@/store/modules/contract/types'
import { PullRefresh, Skeleton, Toast} from 'vant'

const Bignumber = require('bignumber.js')
const transactionModule = namespace('transaction')
const contractModule = namespace('contract')

@Component({
    name: 'Overview',
    components: {
        [PullRefresh.name]: PullRefresh,
        [Skeleton.name]: Skeleton
    },
    filters: {
    }
})
export default class Overview extends Vue {
    @Prop()
    id!: string

    @contractModule.Action('getContractByAddress') getContractByAddress: any
    @transactionModule.Action('getTxsHolderlist') getTxsHolderlist: any
    @transactionModule.Action('getAccountbalance') getAccountbalance: any

    @transactionModule.Getter('holderMap')
    holderMap!: TransactionState

    @transactionModule.Getter('accountbalance')
    accountbalanceMap!: TransactionState

    @contractModule.Getter('ByAddressMap')
    ByAddressMap!: ContractState

    @contractModule.Getter('addrType')
    addrType!: ContractState

    loading: boolean = false
    tokenMoreInfo: object = {}
    isLoading: boolean = false
    listLoading: boolean = false

    created() {
        this.async_getContractAddress()       
    }

    onRefresh() {
        this.async_getContractAddress()
        this.isLoading = false
    }
    async_getContractAddress() {
        this.loading = true
        const obj = {
            id: this.id,
            params: {
                page: 1,
                limit: 10
            }
        }
        this.listLoading = true
            Toast.loading({
            forbidClick: true,
            mask: true,
            message: 'loading'
        })
        this.getContractByAddress(obj).then((res: any) => {
            if (res.code === 1) {
                const data = res.data.docs[0]
                let decimals = data.decimals
                decimals = (decimals || 18)
                decimals = decimals < 1 ? 18 : decimals

                const x = new Bignumber(data.totalSupply)
                const y = new Bignumber(Math.pow(10, decimals))

                const params = {
                    name: data.name,
                    symbol: data.symbol,
                    total: Number(x.dividedBy(y)),
                    totalSupply: String(x.dividedBy(y)).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
                    transactionHash: data.transactionHash
                }
                this.tokenMoreInfo = params
                Toast.clear()
                this.listLoading = false
            }
        })
        this.loading = false
    }

    private async_getTxsByAddrToBalance() {
        this.getAccountbalance({ id: this.id })
    }

    private async_getTxsHolderListMap() {
        const param = {
            id: this.id,
            params: {
                page: 1,
                limit: 50
            }
        }
        this.getTxsHolderlist(param)
    }
}
</script>

<style lang="less">
</style>