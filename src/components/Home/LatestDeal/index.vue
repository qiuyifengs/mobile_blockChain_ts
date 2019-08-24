<template lang="pug">
div
    van-skeleton.mt12.mb24(title :row="3" :loading="listLoading")
        .gm-list
            .gm-list-body
                .gm-empty.gm-empty-normal(v-if="isDataEmpty")
                    .gm-empty-image
                        img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
                    p.gm-empty-description no data
                .gm-list-item.gm-list-item-middle(v-for="item in tableData")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            //- .gm-flexbox.gm-flexbox-justify-between.gm-flexbox-align-center.mt4
                            //-     van-tag(type="primary" @click="gotoBlockDetail(item)") {{ item.blockNumber }}
                            //-     span {{ item.Fvalue | FvalueFilter }} SAS
                            p(@click="gotoTxsDetail(item)")
                                svg-icon.success(icon-class="verified" v-if="item.status")
                                svg-icon.error(icon-class="error-fill" v-else)
                                span.ml4.mr4 {{ item.hash | addressFilter }}
                                svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                            p(@click="gotoTxsByAddress(item, 1)") 
                                van-tag(plain) From 
                                span.mr4.ml4 {{ item.from | addressFilter }}
                                svg-icon.fs17.primary.fr(icon-class="hash-right-link")
                            span(v-if="item.status === false && Array.isArray(item.to) && item.to.length === 0 ") data error
                            p(@click="gotoTxsByAddress(item, 2)" v-else-if="item.to !== null")
                                van-tag.mr4(plain) To
                                svg-icon.mr4.primary(icon-class="icon_shield" v-if="Array.isArray(item.to)")
                                span.mr4 {{ item.to | toFilter }}
                                svg-icon.fs17.primary.fr(icon-class="hash-right-link")
                            div(@click="gotoTxsByAddress(item, 3)" v-else) Contract Creation
                            //- p
                            //-     van-tag(plain) Fee
                            //-     span.ml4 {{ item.TransactionFee }}
                            van-row(type="flex" justify="end")
                                van-col(span="6")
                                    span.fw600.fs12(style="color: #999; vertical-align: top; margin-right: 2px") #
                                    span.fw600(style="color: #999") {{ item.blockNumber }}
                                    span.fs12(style="display: block; color: #999") BlockNumber
                                van-col(span="8" style="text-align: center")
                                    span.fw600(style="color: #999") {{ item.Fvalue | FvalueFilter }} SAS
                                    span.fs12(style="display: block; color: #999") Value
                                van-col(span="10")
                                    span.fw600.primary(style="color: #999") ${{ item.TransactionFee }}
                                    span.fs12(style="display: block; color: #999") Fee
                                
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { TransactionState } from '@/store/modules/transaction/types'
import { Skeleton, Toast, Tag, Row, Col } from 'vant'
import { fieldFvalue, fieldTo, numberFormat, addressFormat } from '@/filter'
const transactionModule = namespace('transaction')

@Component({
    name: 'LatestDeal',
    components: {
        [Skeleton.name]: Skeleton,
        [Tag.name]: Tag,
        [Row.name]: Row,
        [Col.name]: Col
    },
    filters: {
        FvalueFilter(value: any) {
            return fieldFvalue(value)
        },
        toFilter(value: any) {
            return fieldTo(value)
        },
        addressFilter(value: any) {
            return addressFormat(value)
        }
    }
})
export default class LatestDeal extends Vue {
    @transactionModule.Action('getTxsTop10') getTxsTop10: any
    @transactionModule.Action('getDetermineAddrType') getDetermineAddrType: any

    loading: boolean = false
    listLoading: boolean = false
    isDataEmpty: boolean = false
    tableData: any[] = []
    intervalid: any = ''

    created() {
        this.listLoading = true
        Toast.loading({
            forbidClick: true,
            mask: true,
            message: 'loading'
        })
        this.intervalid = setInterval(() => {
            
            this.getTxsTop10().then((res: any) => {
                this.listLoading = false
                Toast.clear()
                this.tableData = res
                if (this.tableData.length <= 0) {
                    this.isDataEmpty = true
                }
            })
        }, 3000)
    }

    beforeDestroy() {
        clearInterval(this.intervalid)
    }

    private gotoTxsDetail(row: any) {
        const id = row.hash
        this.$router.push({ name: 'TransactionDetail', params: { id } })
    }

    private gotoTxsByAddress(row: any, type: number) {
         const replaceTo = (value: any) => {
            if (Array.isArray(value)) {
                return value.join()
            } else {
                return value
            }
        }
            
        const id = type == 1 ? row.from : type == 2 ? replaceTo(row.to) : row.contract
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

    private goBlockDetail(row: any) {
        const id = row.blockNumber
        this.$router.push({ name: 'BlockDetail', params: { id } })
    }
}
</script>

<style lang="less">
</style>