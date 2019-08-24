<template lang="pug">
div.mb12
   .gm-list
        .gm-list-header(style="text-align: left")
            svg-icon.mr4(icon-class="overview")
            span Overview
        .gm-list-body
            .gm-list-header
                div(style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px; text-align: left")
                    span {{ id | addressFilter }}
                    clipboard-copy.fr(:value="id" @click="copy")
                        svg-icon.primary.fs18(icon-class="copy")
            .gm-list-item.gm-list-item-middle
                .gm-list-line.gm-list-line-multiple
                    .gm-list-content
                        span Balance
                        .gm-list-brief
                            span {{ accountbalanceMap.Fbalance | FbalanceFilter }}
            .gm-list-item.gm-list-item-middle
                .gm-list-line.gm-list-line-multiple
                    .gm-list-content
                        HolderPanel(:id="id")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { TransactionState } from '@/store/modules/transaction/types'
import HolderPanel from '../HolderPanel/index.vue'
import { addressFormat } from '@/filter'
import { Toast } from 'vant'

const transactionModule = namespace('transaction')

@Component({
    name: 'Overview',
    components: {
        HolderPanel
    },
    filters: {
        FbalanceFilter(value: any) {
            return Number(value).toFixed(4)
        },
        addressFilter(value: any) {
            return addressFormat(value)
        }
    }
})
export default class Overview extends Vue {
    @Prop()
    id!: string
    @transactionModule.Action('getAccountbalance') getAccountbalance: any
    @transactionModule.Getter('accountbalance')
    accountbalanceMap!: TransactionState
    activeNames: string[] = ['1']
    @Watch('id')
    changeId(value: string) {
        this.getAccountbalance({ id: this.id })
    }
    gotoTokenByAddress(row: any) {
        const id = row.address
        this.$router.push({ name: 'ContractByAddress', params: { id }})
    }
    copy() {
       Toast.success('Copy success')
    }
}
</script>