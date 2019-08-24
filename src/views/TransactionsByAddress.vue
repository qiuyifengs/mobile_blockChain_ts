
<template lang="pug">
div
    van-sticky
        header-nav(title="TransactionsByAddress")
    Overview(:id="id")
    van-tabs(animated swipeable :ellipsis="false" color="#1989fa" type="card" style="padding-top: 12px")
        van-tab
            div(slot="title")
                span(style="display: inline-block") Transaction
                //- van-tag(type="primary") {{ transactionTotal }}
            TxsTable(:id="id")
        van-tab(title="Comments")
            .gm-empty.gm-empty-normal
                .gm-empty-image
                    img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
                p.gm-empty-description no data
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import Overview from './components/TxsByAddress/Overview/index.vue'
import TxsTable from './components/TxsByAddress/TxsTable/index.vue'
import { Toast, Tab, Tabs, Sticky } from 'vant'
const transactionModule = namespace('transaction')

@Component({
    name: 'TransactionsByAddress',
    components: {
        Overview,
        TxsTable,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Sticky.name]: Sticky
    }
})
export default class TransactionsByAddress extends Vue {
    @Prop({
        default: ''
    })
    id!: string
    
    @transactionModule.Getter('ByAddressTxsTotal') transactionTotal: any
}
</script>

<style lang="less" scoped>
 @import url('../assets/styles/gitTab.less');
</style>

