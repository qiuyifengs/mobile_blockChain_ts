<template lang="pug">
div
    mescroll-vue(ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit")
        .gm-list
            .gm-list-body
                .gm-empty.gm-empty-normal(v-if="isDataEmpty")
                    .gm-empty-image
                        img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
                        p.gm-empty-description no data
                .gm-list-item.gm-list-item-middle(v-for="item in tableData")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            p(@click="gotoTxsByAddress(item)")
                                van-tag(plain) Address
                                span.ml4.mr4 {{ item.accountAddr | addressFilter }}
                                svg-icon.hashRightLink.ml4.fr(icon-class="hash-right-link")
                            p
                                van-tag(plain) Quantity
                                span.ml4 {{ item.balance | bananceFilter(item.decimals) }}
                            p
                                van-tag.mr4(plain) Percentage
                                span(v-if="Object.keys(item).includes('percentage')") {{ item.percentage | percentageCompanyFilter }} %
                                span(v-else) {{ item.balance | percentageFilter(ByAddressTxsTotal) }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { TransactionState } from '@/store/modules/transaction/types'
import { Tag } from 'vant'
import { addressFormat } from '@/filter'

const fomatFloat = (value: number, n: number) => {
    let f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        s += '.';
    }
    for (var i = s.length - s.indexOf('.'); i <= n; i++) {
        s += "0";
    }
    return s;
}
const transactionModule = namespace('transaction')
@Component({
    name: 'HoldersTable',
    components: {
        [Tag.name]: Tag
    },
    filters: {
        addressFilter(value: any) {
            return addressFormat(value)
        },
        bananceFilter(value: any, decimals: any) {
            return value / Math.pow(10, decimals)
        },
        percentageCompanyFilter(value: any) {
            return fomatFloat(value, 6)
        },
        percentageFilter(value: any, total: any) {
            return Number(fomatFloat(value, 6)) / total
        }
    }
})
export default class HoldersTable extends Vue {
    @Prop()
    id!: string

    $refs!: {
        mescroll: any 
    }
    @transactionModule.Action('getTxsHolderlist') getTxsHolderlist: any
    @transactionModule.Getter('ByAddressTxsTotal')
    ByAddressTxsTotal!: TransactionState
    customColorMethod: any[] = [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
    ]
    tableData: any[] = []
    isDataEmpty: boolean = false
    mescroll: any = null
    mescrollDown: object = {
        textInOffset: 'pull to refresh',
        textOutOffset: 'Release the update',
        textLoading: 'loading...'
    }
    mescrollUp: object = {
        callback: this.upCallback,
        page: {
            num: 0,
            size: 30
        },
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">loading..</p>',
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5, 
        toTop: {
            src: 'http://www.mescroll.com/demo/res/img/mescroll-totop.png'
        },
        empty: {
            icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
            tip: "no data"
        }
    }
    beforeRouteEnter (to: any, from: any, next: any) {
        next((vm: any) => {
        vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
        })
    }
    beforeRouteLeave (to: any, from: any, next: any) {
        this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
        next()
    }
    mescrollInit (mescroll: any) {
      this.mescroll = mescroll
    }
    upCallback (page: any, mescroll: any) {
        const obj = {
            id: this.id,
            params: {
                page: page.num,
                limit: page.size
            }
        }
        this.getTxsHolderlist(obj).then((res: any) => {
            if (page.num === 1) this.tableData = []
            this.tableData = this.tableData.concat(res)
            if (this.tableData.length <= 0) {
                this.isDataEmpty = true 
            }
            this.$nextTick(() => {
                mescroll.endSuccess('data success')
            })
        }).catch((e: any) => {
            mescroll.endErr()
        })
    }
    gotoTxsByAddress(row: any) {
        const id = row.accountAddr
        this.$router.push({ name: 'TransactionsByAddress', params: {id}})
    }
}
</script>

<style lang="less">
</style>