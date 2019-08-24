<template lang="pug">
div
    div(v-if="isContract")
        span(style="margin-right: 4px") Contract
        span {{ TxsDetailForm.contractAddress }}
        span {{ TxsDetailForm.convertTo }}
        clipboard-copy(:value="convertTo")
            svg-icon(icon-class="copy")
    div(v-if="convertTo === null" style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px; white-space: normal;")
        van-tag.mr4(round type="primary" @click="gotoTxsByAddress(3)") Contract 
        clipboard-copy.fr.primary.fs18(:value="TxsDetailForm.contract" @click="copy")
            svg-icon(icon-class="copy")
        p
            svg-icon.success(icon-class="verified" v-if="TxsDetailForm.status")
            svg-icon.error(icon-class="error-fill" v-else)
            span.ml4 {{ TxsDetailForm.contract | addressFilter }} 
            svg-icon.hashRightLink.mr4(icon-class="hash-right-link") 
            span Creation
    div(v-if="TxsDetailForm.status && convertTo !== null" style="background-color: rgba(204, 204, 204, 0.23); padding: 5px; border-radius: 3px; white-space: normal;")
        span(@click="gotoTxsByAddress(2)") {{ TxsDetailForm.to | toFilter }}
            svg-icon.hashRightLink.mr4(icon-class="hash-right-link") 
        clipboard-copy.fr.primary.fs18(:value="convertTo" @click="copy")
            svg-icon(icon-class="copy")
    //- div(v-if="!TxsDetailForm.status || isTokenNullByStatus")
    //-     span(v-if="!TxsDetailForm.status") {{ TxsDetailForm.to | toFilter }}
    //-     clipboard-copy.fr.primary.fs18(:value="convertTo" @click="copy")
    //-         svg-icon(icon-class="copy")
    //-     br
    //-     div(style="width: 100%")
    //-         img(src="https://etherscan.io/images/svg/shapes/shape-1.svg?v=0.01" width="8")
    //-         span(style="margin-right: 4px") info
    //-         span(style="margin-right: 4px") Warning! Error encountered during contract execution [
    //-         strong(style="margin-right: 4px") Out of gas
    //-         span(style="margin-right: 4px") ]
    //-     div(style="width: 100%")
    //-         img(src="https://etherscan.io/images/svg/shapes/shape-1.svg?v=0.01" width="8")
    //-         span(style="margin-right: 4px") Warning
    //-         span SRT-50 Token Transfer Error (Unable to locate Corresponding Transfer Event Logs), Check with Sender.   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { fieldTo, addressFormat } from '@/filter'
import { Tag, Toast } from 'vant'

const transactionModule = namespace('transaction')

@Component({
    name: 'TxsDetailTo',
    components: {
        [Tag.name]: Tag
    },
    filters: {
        addressFilter(value: any) {
            return addressFormat(value)
        },
        toFilter(value: any) {
            return fieldTo(value)
        }
    }
})
export default class TxsDetailTo extends Vue {
    @transactionModule.Action('getDetermineAddrType') getDetermineAddrType: any

    @Prop()
    TxsDetailForm!: object
    @Prop()
    isTokenNullByStatus!: boolean
    @Prop()
    isContract!: boolean

    @transactionModule.Getter('DetermineAddrType')
    DetermineAddrType!: string

    get convertTo() {
        const form = this.TxsDetailForm as any
        if (Array.isArray(form.to)) {
            return form.to.join()
        } else {
            return form.to
        }
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
        let formData = this.TxsDetailForm as any
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
}
</script>

<style lang="less">
</style>