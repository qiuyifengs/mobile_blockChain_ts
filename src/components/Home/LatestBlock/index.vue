<template lang="pug">
div
    van-skeleton.mt12.mb24(title :row="3" :loading="listLoading")
        .gm-list.mt12
            .gm-list-body
                .gm-empty.gm-empty-normal(v-if="isDataEmpty")
                    .gm-empty-image
                        img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
                    p.gm-empty-description no data
                .gm-list-item.gm-list-item-middle(v-for="(item, index) in tableData" :key="index" :data-id='index')
                    .gm-list-line.gm-list-line-multiple
                        .gm-list-content
                            .gm-flexbox.gm-flexbox-justify-between.gm-flexbox-align-center
                                van-tag(type="primary" @click="gotoBlockDetail(item)") {{ item.number }}
                                span.fs12 {{ item.blocktime | blocktimeFilter }}

                            p(@click="gotoBlockDetail(item)")
                                van-tag(plain) Hash
                                span.mr4.ml4 {{ item.hash | addressFilter }}
                                svg-icon.primary.fs17.fr(icon-class="hash-right-link")
                            p(@click="gotoSuperNodeBySigner(item)")
                                van-tag(plain) Miner
                                svg-icon.mr4.ml4.primary(icon-class="signer")
                                span.mr4 {{ item.coinbase | addressFilter }}
                                svg-icon.primary.fs17.fr(icon-class="hash-right-link")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { Skeleton, Toast, Tag } from 'vant'
import { blockTimeFormat, numberFormat, addressFormat } from '@/filter'

const blockModule = namespace('block')

@Component({
    name: 'LatestBlock',
    components: {
        [Skeleton.name]: Skeleton,
        [Tag.name]: Tag
    },
    filters: {
        blocktimeFilter(time: number) {
            return blockTimeFormat(time)
        },
        addressFilter(value: any) {
            return addressFormat(value)
        }
    }
})
export default class LatestBlock extends Vue {
    
    @blockModule.Action('getBlockTop10') getBlockTop10: any

    loading: boolean = false
    listLoading: boolean = false
   
    isDataEmpty: boolean = false
    tableData: any[] = []
    intervalid: any = ''
    skeletonRowWidthArr: string[] = []

    created() {
        this.listLoading = true
        Toast.loading({
            forbidClick: true,
            mask: true,
            message: 'loading'
        })
        this.intervalid = setInterval(() => {
            
            this.getBlockTop10().then((res: any) => {
                this.tableData = res
                Toast.clear()
                this.listLoading = false
                if (this.tableData.length <= 0) {
                    this.isDataEmpty = true
                }
            })
        }, 3000)
    }

    beforeDestroy() {
        clearInterval(this.intervalid)
    }
    
    private gotoBlockDetail(row: any) {
        const id = row.number
        this.$router.push({ name: 'BlockDetail', params: { id } })
    }

    private gotoSuperNodeBySigner(row: any) {
        const id = row.validator
        this.$router.push({ name: 'SuperNodeDetail', params: { id } })
    }

}
</script>

<style lang="less">
</style>