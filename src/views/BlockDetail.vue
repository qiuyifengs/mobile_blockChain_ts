<template lang="pug">
div
    van-sticky
        header-nav(title="Block Detail")
    van-pull-refresh(v-model="isLoading" @refresh="onRefresh" pulling-text="Down to refresh..." loosing-text="Release the refresh..." style="background-color: #fff")
        //- van-skeleton.mt12.mb24(title :row="1" :row-width="skeletonRowWidthArr" :loading="listLoading")
        .gm-list
            .gm-list-body
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-wrap
                        .gm-list-content
                            span(@click="openTooltip('blockHeight')")
                                svg-icon.mr4(icon-class="question-circle" role="button")
                            span Block Height
                        .gm-list-extra(style="flex-basis: 50%")
                            .gm-stepper.showNumber
                                .gm-stepper-handler-wrap
                                    span.gm-stepper-handler.gm-stepper-handler-up(@click="getBlockDetail(2)" role="button" v-waves)
                                        svg-icon(icon-class="plus")
                                    span.gm-stepper-handler.gm-stepper-handler-down(@click="getBlockDetail(1)" role="button" v-waves)
                                        svg-icon(icon-class="minus")
                                .gm-stepper-input-wrap
                                    span.primary.fw600 {{ blockDetailForm.number }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('time')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span Time Stamp
                            .gm-list-brief
                                svg-icon.mr4(icon-class="time-circle")
                                span {{ blockDetailForm.timestamp | timestampFilter }}
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span(@click="openTooltip('transactions')")
                                svg-icon.mr4(icon-class="question-circle" role="button")
                            span Transactions
                        .gm-list-extra(@click="gotoTxsByBlock(blockDetailForm.number)")
                            span.gm-badge.gm-badge-not-a-wrapper
                                sup.gm-badge-text {{ txsByBlockCount }}
                        .gm-list-arrow.gm-list-arrow-horizontal
                .gm-list-item.gm-list-item-middle(@click="openTooltip('blockHash')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span Block Hash
                            .gm-list-brief
                                span {{ blockDetailForm.hash | addressFilter }}
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span(@click="openTooltip('parentHash')")
                                svg-icon.mr4(icon-class="question-circle" role="button")
                            span Parent Hash
                            .gm-list-brief(@click="gotoParentHash" style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px")
                                svg-icon.mr4.fs13(icon-class="link")
                                span {{ blockDetailForm.parentHash | addressFilter }}
                                svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span(@click="openTooltip('minedBy')")
                                svg-icon.mr4(icon-class="question-circle" role="button")
                            span MinedBy
                            .gm-list-brief(@click="gotoTxsMinByHash(blockDetailForm.coinbase)" style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px")
                                svg-icon.mr4.fs13(icon-class="link")
                                span {{ blockDetailForm.coinbase | addressFilter }}
                                svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                .gm-list-item.gm-list-item-middle(@click="openTooltip('extraData')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span ExtraData
                            .gm-list-brief
                                span.fw600 {{ blockDetailForm.extraData | addressFilter }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('size')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span Size
                            .gm-list-brief
                                span {{ blockDetailForm.size | numberFormatFilter }} bytes
                .gm-list-item.gm-list-item-middle(@click="openTooltip('gasUsed')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span GasUsed
                            .gm-list-brief
                                span.mr4 {{ blockDetailForm.gasUsed | numberFormatFilter }}
                                span ({{ blockDetailForm.gasUsed | gasUsedCalcFilter(blockDetailForm.gasLimit) }} %)
                .gm-list-item.gm-list-item-middle(@click="openTooltip('gasLimit')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span GasLimit
                            .gm-list-brief
                                span {{ blockDetailForm.gasLimit | numberFormatFilter }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('nonce')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4(icon-class="question-circle" role="button")
                            span Nonce
                            .gm-list-brief
                                span {{ blockDetailForm.nonce }}
    app-footer
    

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { namespace } from 'vuex-class'
import { PullRefresh, Skeleton, Toast, Sticky } from 'vant'
import { blockTimeFormat, timestampFormat, numberFormat, addressFormat, gasUsedCalc, fieldNonce } from '@/filter'
import store from '@/store/store'

@Component({
    name: 'BlockDetail',
    components: {
        [PullRefresh.name]: PullRefresh,
        [Skeleton.name]: Skeleton,
        [Sticky.name]: Sticky
    },
    filters: {
        blocktimeFilter(time: number) {
            return blockTimeFormat(time)
        },
        numberFormatFilter(value: any) {
            return numberFormat(value)
        },
        timestampFilter(value: any) {
            return timestampFormat(value)
        },
        addressFilter(value: any) {
            return addressFormat(value)
        },
        gasUsedCalcFilter(gasUsed: any, gasLimit: any) {
            return gasUsedCalc(gasUsed, gasLimit)
        },
        nonceFilter(value: any) {
            return fieldNonce(value)
        }
    }
})
export default class BlockDetail extends Vue {
    @Prop({
        default: ''
    })
    id!: string

    txsByBlockCount: number = 0
    blockDetailForm: object = {}
    isLoading: boolean = false
    listLoading: boolean = false
    skeletonRowWidthArr: string[] = []
    
    created() {
        this.getBlockDetail(0)
    }
    onRefresh() {
        this.getBlockDetail(0)
        this.isLoading = false
    }
    openTooltip(value: string) {
        let mes: string = '', title: string = ''
        switch(value) {
            case 'blockHeight':
                title = 'Block Height'
                mes = 'Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block.'
                break
            case 'time':
                title = 'Time Stamp' 
                mes = 'The date and time at which a transaction is mined.'
                break
            case 'transactions':
                title = 'Transactions'
                mes = 'The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves Ether value.' 
                break
            case 'blockHash':
                title = 'Block Hash'
                mes = 'Hash of the block header from the previous block.'
                break
            case 'parentHash':
                title = 'ParentHash'
                mes = 'The hash of the block from which this block was generated, also known as its parent block.'
                break
            case 'minedBy':
                title = 'MinedBy'
                mes = 'Miner who successfully include the block onto the blockchain.'
                break
            case 'extraData':
                title = 'ExtraData'
                mes = 'Any data that can be included by the miner in the block.'
                break
            case 'size':
                title = 'Size'
                mes = "The block size is actually determined by the block's gas limit."
                break
            case 'gasUsed':
                title = 'GasUsed'
                mes = 'The total gas used in the block and its percentage of gas filled in the block.'
                break
            case 'gasLimit':
                title = 'GasLimit'
                mes = 'Total gas limit provided by all transactions in the block.'
                break
            case 'nonce':
                title = 'Nonce'
                mes = "Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be the 11th transaction sent from the sender's address."
                break
        }
        Toast(mes)
    }
    getBlockDetail(operate: number) {
        this.listLoading = true
        Toast.loading({
            forbidClick: true,
            mask: true,
            message: 'loading'
        })
        
        let number = (this as any).blockDetailForm.number
        const id = operate == 1 ? number -=1 : operate == 2 ? number += 1 : this.id

        store.dispatch('block/getBlockByNumber', { number: id }).then(() => {
          const data = store.getters['block/blockDetail'][0]
          this.blockDetailForm = data
          this.txsByBlockCount = data.transactions.length
          Toast.clear()
          this.listLoading = false
        })
    }

    private setBlockNumer(operate: number) {
        let number = (this as any).blockDetailForm.number
        const blockNumber = operate == 1 ? number -= 1 : operate == 2 ? number += 1 : this.id
        this.getBlockDetail(blockNumber)
    }

    private gotoParentHash() {
        this.getBlockDetail(1)
    }

    private gotoTxsMinByHash(id: any) {
        this.$router.push({ name: 'TransactionsByAddress', params: { id } })
    }

    private gotoTxsByBlock(id: any) {
        this.$router.push({ name: 'TxsByBlock', params: { id } })
    }
}
</script>

