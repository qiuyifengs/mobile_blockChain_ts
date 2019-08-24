<template lang="pug">
div
    van-sticky
        header-nav(title="Transaction Detail")
    van-pull-refresh(v-model="isLoading" @refresh="onRefresh" pulling-text="Down to refresh..." loosing-text="Release the refresh..." style="background-color: #fff")
        .gm-list
            .gm-list-body
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span(@click="openTooltip('hash')")
                                svg-icon.mr4.primary(icon-class="question-circle")
                            span Transaction Hash
                            .gm-list-brief(style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px")
                                svg-icon.success(icon-class="verified" v-if="txsDetailForm.status")
                                svg-icon.error(icon-class="error-fill" v-else)
                                span.ml4.mr4 {{ txsDetailForm.hash | addressFilter }}
                                clipboard-copy.fr(:value="txsDetailForm.from" @click="copy")
                                    svg-icon.primary.fs18(icon-class="copy")
                .gm-list-item.gm-list-item-middle(@click="openTooltip('time')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle")
                            span Time Stamp
                            .gm-list-brief
                                svg-icon(icon-class="time-circle")
                                span {{ txsDetailForm.timestamp | timestampFormat }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('block')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle")
                            span Block
                            .gm-list-brief
                                van-tag.mr4(type="primary" @click="goBlockDetail(txsDetailForm)") {{ txsDetailForm.blockNumber }}
                                strong {{ txsDetailForm.confirmations }} 
                                span block confirmations
                .gm-list-item.gm-list-item-middle
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span(@click="openTooltip('from')")
                                svg-icon.mr4.primary(icon-class="question-circle")
                            span From
                            .gm-list-brief(style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px")
                                span.mr4(@click="gotoTxsByAddress(1)") {{ txsDetailForm.from | addressFilter }}
                                svg-icon.hashRightLink.mr4(icon-class="hash-right-link")
                                clipboard-copy.fr(:value="txsDetailForm.from" @click="copy")
                                    svg-icon.primary.fs18(icon-class="copy")
                .gm-list-item.gm-list-item-middle()
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            span To
                            .gm-list-brief
                                TxsDetailTo(:TxsDetailForm="txsDetailForm" 
                                    :isTokenNullByStatus="isTokenNullByStatus"
                                    :isContract="isContract")

                .gm-list-item.gm-list-item-middle(@click="openTooltip('value')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle" role="button")
                            span Value
                            .gm-list-brief
                                span {{ txsDetailForm.Fvalue | FvalueFilter }} SAS
                .gm-list-item.gm-list-item-middle(v-if="isToken")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            van-collapse.tokenCollapse(v-model="activeNames")
                                van-collapse-item(name="1")
                                    div.fs17(slot="title" style="color: #000") Token Transfered expand
                                    .gm-list
                                        .gm-list-body
                                            .gm-list-item.gm-list-item-middle(v-for="(item, index) in tokensTransferedToLogsArr" :key="index" style="padding: 0")
                                                .gm-list-line.gm-list-line-multiple
                                                    .gm-list-content(style="background-color: #cccccc3b; padding: 0 12px;")
                                                        p(@click="gotoTxsByAddress(2, 'token', item.from)")
                                                            strong From
                                                            span.ml4.mr4 {{ item.from | FvalueFilter }}
                                                            svg-icon.hashRightLink(icon-class="hash-right-link")
                                                        p(@click="gotoTxsByAddress(2, 'token', item.to)")
                                                            strong To
                                                            span.ml4.mr4 {{ item.to | toFilter }}
                                                            svg-icon.hashRightLink(icon-class="hash-right-link")
                                                        p
                                                            span {{ item.value | TokenValueFilter(item.decimals) }}
                                                            span.ml4 {{ item.symbolname }}    
                                
                .gm-list-item.gm-list-item-middle(@click="openTooltip('fee')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle" role="button")
                            span Transaction Fee
                            .gm-list-brief
                                span {{ txsDetailForm.TransactionFee }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('gasLimit')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle" role="button")
                            span Gas Limit
                            .gm-list-brief
                                span {{ txsDetailForm.gasLimit | numberFormatFilter }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('gasLimitUsed')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle" role="button")
                            span Gas User by Transaction
                            .gm-list-brief
                                span {{ txsDetailForm.gasLimitUsed | numberFormatFilter }}
                                span.ml4 ({{ txsDetailForm.gasLimitUsed | gasUsedCalcFilter(txsDetailForm.gasLimit) }} %)
                .gm-list-item.gm-list-item-middle(@click="openTooltip('gasPrice')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle" role="button")
                            span gasPrice
                            .gm-list-brief
                                span {{ txsDetailForm.gasPrice | gasPriceFilter }}
                .gm-list-item.gm-list-item-middle(@click="openTooltip('nonce')")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            svg-icon.mr4.primary(icon-class="question-circle" role="button")
                            span Nonce
                            .gm-list-brief
                                span {{ txsDetailForm.nonce }}
        app-footer               
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store';
import moment from 'moment'
import TxsDetailTo from './components/TxsDetailTo/index.vue'
import { PullRefresh, Skeleton, Toast, Tag, Sticky, Collapse, CollapseItem } from 'vant'
import { fieldFvalue, fieldTo, numberFormat, addressFormat, fieldGasPrice, gasUsedCalc, fieldTokenValue } from '@/filter'

const transactionModule = namespace('transaction')

@Component({
  name: 'TransactionDetail',
  components: {
    TxsDetailTo,
    [PullRefresh.name]: PullRefresh,
    [Skeleton.name]: Skeleton,
    [Tag.name]: Tag,
    [Sticky.name]: Sticky,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  filters: {
    timestampFormat(time: number) {
        let duration = moment(moment.now()).unix() - time
        if (duration < 60) {
            return `${ parseInt(typeof duration) } secs ago (${ moment(time * 1000) })`
        } else if (duration < 180) {
            const coverToDuration = duration / 60
            return `${ parseInt(typeof coverToDuration) } mins ${duration % 60} secs ago (${ moment(time * 1000) })`
        } else {
            return ` ${ moment(time * 1000) }`
        }
    },
    numberFormatFilter(value: any) {
      return numberFormat(value)
    },
    FvalueFilter(value: any) {
        return fieldFvalue(value)
    },
    toFilter(value: any) {
        return fieldTo(value)
    },
    addressFilter(value: any) {
        return addressFormat(value)
    },
    gasPriceFilter(value: any) {
        return fieldGasPrice(value)
    },
    gasUsedCalcFilter(gasUsed: any, gasLimit: any) {
        return gasUsedCalc(gasUsed, gasLimit)
    },
    TokenValueFilter(value: any, decimal: any) {
        return fieldTokenValue(value, decimal)
    }
  }
})
export default class TransactionDetail extends Vue {
    @transactionModule.Action('getDetermineAddrType') getDetermineAddrType: any

    @Prop({
        default: ''
    })
    id!: string

    txsDetailForm: object = {}
    isContract: boolean = false
    isTokenNullByStatus: boolean = false
    isTransactionDetailFormEmpty: boolean = false
    txsReceiptStatus: boolean = false
    isEventLogs: boolean = false
    isToken: boolean = false
    tokensTransferedToLogsArr: any[] = []
    activeNames: string[] = []

    isLoading: boolean = false
    listLoading: boolean = false

    created() {
        this.getTxsDetail(this.id)
    }
    onRefresh() {
        this.getTxsDetail(this.id)
        this.isLoading = false
    }
    openTooltip(value: string) {
        let mes: string = '', title: string = ''
        switch(value) {
            case 'hash':
                title = 'Transaction Hash'
                mes = 'A TxHash or transaction hash is a unique 66 characters identifier that is generated whenever a transaction is executed.'
                break
            case 'block':
                title = 'Block' 
                mes = 'The number of the block in which the transaction was recorded. Block confirmation indicate how many blocks since the transaction is mined.'
                break
            case 'time':
                title = 'Time Stamp'
                mes = 'The date and time at which a transaction is mined.' 
                break
            case 'from':
                title = 'From'
                mes = 'The sending party of the transaction (could be from a contract address).'
                break
            case 'to':
                title = 'To'
                mes = 'The receiving party of the transaction (could be a contract address).'
                break
            case 'value':
                title = 'Value'
                mes = 'The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction.'
                break
            case 'fee':
                title = 'Transaction Fee'
                mes = 'Amount paid to the miner for processing the transaction.'
                break
            case 'gasLimit':
                title = 'gasLimit'
                mes = 'Maximum amount of gas provided for the transaction. For normal Eth transfers, the value is 21,000. For contract this value is higher and bound by block gas limit.'
                break
            case 'gasLimitUsed':
                title = 'Gas User by Transaction'
                mes = 'The exact units of gas that was used for the transaction.'
                break
            case 'gasPrice':
                title = 'Gas Price'
                mes = 'Cost per unit of gas specified for the transaction, in Ether and Gwei. The higher the gas price the higher chance of getting included in a block.'
                break
            case 'nonce':
                title = 'Nonce'
                mes = "Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be the 11th transaction sent from the sender's address."
                break
        }
        Toast(mes)
    }
    goBlockDetail(row: any) {
        const id = row.blockNumber
        this.$router.push({ name: 'BlockDetail', params: { id } })
    }
    getTxsDetail(id: string) {
        this.listLoading = true
        Toast.loading({
            forbidClick: true,
            mask: true,
            message: 'loading'
        })
        store.dispatch('transaction/getTxsDetail', { number: id }).then(() => {
            const formData = store.getters['transaction/TxsDetail'][0]
            this.txsDetailForm = formData
            this.listLoading = false
            Toast.clear()
            if (Object.keys(formData).includes('TokensTransfered') && formData.TokensTransfered.length > 0) {
                this.isToken = true
                this.tokensTransferedToLogsArr = formData.TokensTransfered
            } else {
                this.isTokenNullByStatus = true
            }

            this.isContract = Object.keys(formData).includes('enevt')
        })
    }
    gotoTxsByAddress(type: number, isToken: boolean, address: string) {
        const id = this.getAddress(type, isToken, address)
        const param = {
            page: 1,
            limit: 10
        }
        this.getDetermineAddrType({ id: id }).then((res: any) => {
            if (res.code == 1) {
                if (res.data.code == 1) {
                    this.$router.push({ name: 'ContractByAddress', params: { id } })
                } else {
                    this.$router.push({ name: 'TransactionsByAddress', params: { id }})
                }
            }
        })
    }
    getAddress(type: number, isToken: boolean, address: string) {
        let formData = this.txsDetailForm as any
        const to =  Array.isArray(formData.to) ? formData.to.join() : formData.to

        if (isToken) {
            return address
        } else {
            return type == 1 ? formData.from : type == 2 ? to : formData.contract
        }
    }
    copy() {
       Toast.success('Copy success')
    }
    back() {
        this.$router.go(-1)
    }
}
</script>

<style lang="less">
    .van-cell {
        padding: 10px 0
    }
    .van-collapse-item__content {
        padding: 0
    }
    .van-hairline--top-bottom::after {
        border-width: 0
    }
</style>
