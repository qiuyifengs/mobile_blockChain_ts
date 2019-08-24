<template lang="pug">
div
    van-sticky
        h1.moduleTitle Tokens
    search-bar
    navigator-menu
    mescrollVue(ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit")
        .gm-list
            .gm-list-body
                .gm-list-item.gm-list-item-middle(v-for="item in tableData")
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            p
                                van-tag(plain).mr4 TxHash
                                svg-icon.success(icon-class="verified" v-if="item.status")
                                svg-icon.error(icon-class="error-fill" v-else)
                                span.ml4(@click="gotoTxsDetail(item)") {{ item.transactionHash | addressFilter }}
                                svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                            p(@click="gotoTxsByAddress(item, 1)")
                                van-tag(plain) from
                                span.ml4 {{ item.from | addressFilter }}
                                svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                            p(@click="gotoContractByAddress(item)") 
                                van-tag(plain) Tokens
                                span.ml4 {{ item.contractAddress | addressFilter }}
                                svg-icon.hashRightLink.fr(icon-class="hash-right-link")
                            p 
                                van-tag(plain) Total Supply 
                                span.ml4 ${{ item.totalSupply | totalSupplyFilter(item.decimals) }}
                            p 
                                van-tag(plain) Symbol 
                                span.ml4 {{ item.symbol }}
                                
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store';
import mescrollVue from 'mescroll.js/mescroll.vue'
import { ContractState } from '@/store/modules/contract/types'
import { fieldTotalSupply, addressFormat, numberFormat, } from '@/filter'
import { Notify, Tag, Sticky } from 'vant'

const contractModule = namespace('contract')

@Component({
  name: 'Tokens',
  components: {
    mescrollVue,
    [Tag.name]: Tag,
    [Sticky.name]: Sticky
  },
  filters: {
    addressFilter(value: any) {
        return addressFormat(value)
    },
    totalSupplyFilter(value: any, decimals: number) {
        return fieldTotalSupply(value, decimals)
    }
  }
})
export default class Tokens extends Vue {
    $refs!: {
        mescroll: any
    }
    @contractModule.Action('getContracts') getContracts: any
    @contractModule.Getter('totalContracts')
    totalContracts!: ContractState
    isDataEmpty: boolean = false    
    tableData: string[] = []    
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

    private mescrollInit (mescroll: any) {
        this.mescroll = mescroll
    }

    private upCallback (page: any, mescroll: any) {
        const param = {
            page: page.num,
            limit: page.size
        }
        this.getContracts(param).then((res: any) => {
            if (page.num === 1) this.tableData = []

            if (this.tableData.length <= 0) {
                this.isDataEmpty = true
            }
            this.tableData = this.tableData.concat(res)
            
            this.$nextTick(() => {
                mescroll.endSuccess('data success')
                // Notify({
                //     message: `A total of ${ numberFormat(String(this.totalContracts))} txns found  (Showing the last ${ numberFormat(String(this.tableData.length))} records only)`,
                //     duration: 2000,
                //     background: '#1989fa'
                // })
            })
        }).catch((e: any) => {
            mescroll.endErr()
        })
    }

    private gotoTxsDetail(row: any) {
        const id = row.transactionHash
        this.$router.push({ name: 'TransactionDetail', params: { id } })
    }

    private gotoContractByAddress(row: any) {
        const id = row.contractAddress
        this.$router.push({ name: 'ContractByAddress', params: { id } })
    }

    private gotoTxsByAddress(row: any) {
        const id = row.from
        this.$router.push({ name: 'TransactionsByAddress', params: { id }})
    }

}
</script>