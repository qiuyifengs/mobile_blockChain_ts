<template lang="pug">
div
    van-collapse.tokenCollapse(v-model="activeNames")
        van-collapse-item(name="1")
            div.fs17(slot="title" style="color: #000") Token expand
                van-tag.fr(round type="danger") {{ holderMap.length }}
            .gm-empty.gm-empty-normal(v-if="holderMap.length <= 0")
                .gm-empty-image
                    img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
                p.gm-empty-description no data
            .gm-list
                .gm-list-body
                    .gm-list-item.gm-list-item-middle(v-for="item in holderMap")
                        .gm-list-line.gm-list-line-multiple(style="padding: 0")
                            .gm-list-content
                                .gm-list-brief(style="background-color: rgba(204, 204, 204, 0.23); padding: 4px 12px; border-radius: 3px")
                                    p
                                        van-tag(type="primary") {{ item.symbol }}
                                        span.ml4 {{ item.tokenAddr | addressFilter }}
                                        svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                                    p
                                        span balance {{ item.balance | balanceFilter(item.decimal) }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { TransactionState } from '@/store/modules/transaction/types'
import { addressFormat, fieldBalanceHolder } from '@/filter'
import { Tag, Collapse, CollapseItem,  } from 'vant'

const transactionModule = namespace('transaction')
@Component({
    name: 'HolderPanel',
    components: {
        [Tag.name]: Tag,
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem
    },
    filters: {
        addressFilter(value: any) {
            return addressFormat(value)
        },
        balanceFilter(balance: any, decimal: number) {
            return fieldBalanceHolder(balance, decimal)
        }
    }
})
export default class HolderPanel extends Vue {
    @Prop()
    id!: string
    @transactionModule.Action('getTxsHolderlist') getTxsHolderlist: any
    @transactionModule.Getter('holderMap')
    holderMap!: TransactionState
    isDataEmpty: boolean = false
    activeNames: string[] = []
    @Watch('id')
    changeId(value: string) {
        console.log(value)
        this.getTxsHolderListMap()
    }
    getTxsHolderListMap() {
        const param = {
            id: this.id,
            params: {
                page: 1,
                limit: 50
            }
        }
        this.getTxsHolderlist(param)
    }
    gotoTokenByAddress(row: any) {
        const id = row.address
        this.$router.push({ name: 'ContractByAddress', params: { id }})
    }
}
</script>

<style lang="less">
    .el-collapse {
        border: none !important
    }
    .el-collapse-item__header {
        color: #000 !important;
        font-size: 17px !important;
        border-bottom: none !important;
        font-weight: normal !important
    }
    .el-collapse-item__wrap {
        border-bottom: none !important
    }
</style>