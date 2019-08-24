<template lang="pug">
div
  van-sticky
    h1.moduleTitle Blocks
  search-bar
  navigator-menu
  mescrollVue(ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit")
    .gm-list
      .gm-list-body
        .gm-empty.gm-empty-normal(v-if="isDataEmpty")
          .gm-empty-image
            img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
            p.gm-empty-description no data
        .gm-list-item.gm-list-item-middle(v-for="(item, index) in tableData" :key="index" :data-id='index' v-if="tableData.length > 0")
          .gm-list-line.gm-list-line-multiple
            .gm-list-content
              van-row(type="flex" justify="end")
                van-col.fs12(span="12" style="text-align: right;")
                  span.primary(@click="gotoTxsByBlock(item)") {{ item.transactions.length }} Txns
                  span.ml4 {{ item.blocktime | blocktimeFilter }}
              p(@click="gotoBlockDetail(item)")
                van-tag(plain) Block Hash
                //- span.text-capitalize.form-item-name Block Hash
                span.mr4.ml4.fw600 {{ item.hash | addressFilter }}
                svg-icon.fr.fs17.primary(icon-class="hash-right-link")
              p(@click="gotoSuperNodeBySigner(item)")
                van-tag(plain) Migner
                svg-icon.mr4.ml4.primary(icon-class="signer")
                span.mr4 {{ item.validator | addressFilter }}
                svg-icon.fr.fs17.primary(icon-class="hash-right-link" style="color: #108ee9; font-size: 17px;")
              van-row(type="flex" justify="end")
                van-col(span="6")
                  span.fw600.fs12(style="color: #999; vertical-align: top; margin-right: 2px") #
                  span.fw600(style="color: #999") {{ item.number }}
                  span.fs12(style="display: block; color: #999") Number
                van-col(span="8" style="text-align: center")
                  span.fw600(style="color: #999") {{ item.gasUsed | numberFormatFilter }}
                  span.fs12(style="display: block; color: #999") GasUsed
                van-col(span="10")
                  span.fw600.primary(style="color: #999") ${{ item.gasLimit | numberFormatFilter }}
                  span.fs12(style="display: block; color: #999") GasLimit
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { BlockState } from '@/store/modules/block/types'
import mescrollVue from 'mescroll.js/mescroll.vue'
import { Skeleton, Tag, Notify, NoticeBar, Button, Sticky, Row, Col } from 'vant'
import { blockTimeFormat, numberFormat, addressFormat } from '@/filter'
const blockModule = namespace('block')

@Component({
  name: 'Blocks',
  components: {
    mescrollVue,
    [Skeleton.name]: Skeleton,
    [Tag.name]: Tag,
    [NoticeBar.name]: NoticeBar,
    [Button.name]: Button,
    [Sticky.name]: Sticky,
    [Row.name]: Row,
    [Col.name]: Col
  },
  filters: {
    blocktimeFilter(time: number) {
      return blockTimeFormat(time)
    },
    numberFormatFilter(value: any) {
      return numberFormat(value)
    },
    addressFilter(value: any) {
      return addressFormat(value)
    }
  }
})
export default class Blocks extends Vue {

  @blockModule.Action('getBlocks') getBlocks: any
  @State('blocksMap') blocksMap: any

  @blockModule.Getter('blockTotal')
  blockTotal!: BlockState

  $refs!: {
    mescroll: any 
  }
  value: string = ''
  isDataEmpty: boolean = false
  startBlock: number = 0
  endBlock: number = 0
  tableDataNotice: string = ''
  tableData: string[] = []
  listLoading: boolean = false

  loading: boolean = false
  
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
    const param = {
      page: page.num,
      limit: page.size
    }
    this.listLoading = true
    this.getBlocks(param).then((res: any) => {
      if (page.num === 1) this.tableData = []
      this.tableData = this.tableData.concat(res)
      if (this.tableData.length <= 0) {
        this.isDataEmpty = true
      }

      const self = this as any

      this.startBlock = self.tableData[0].number
      this.endBlock = self.tableData[self.tableData.length - 1].number

      this.$nextTick(() => {
        this.listLoading = false
        mescroll.endSuccess('data success')
        this.tableDataNotice = `Block #${this.endBlock} to #${this.startBlock} of ${this.blockTotal} blocks`
        // Notify({
        //   message: `Block #${this.endBlock} to #${this.startBlock} of ${this.blockTotal} blocks`,
        //   duration: 2000,
        //   background: '#1989fa'
        // })
      })
    }).catch((e: any) => {
      mescroll.endErr()
    })
  }

  gotoBlockDetail(row: any) {
    const id = row.number
    this.$router.push({ name: 'BlockDetail', params: { id } })
  }

  gotoTxsBySigner(row: any) {
    const id = row.validator
    this.$router.push({ name: 'TransactionsByAddress', params: { id } })
  }

  gotoSuperNodeBySigner(row: any) {
    const id = row.validator
    this.$router.push({ name: 'SuperNodeDetail', params: { id } })
  }

  gotoTxsByBlock(row: any) {
    const id = row.number
    console.log(row)
    this.$router.push({ name: 'TxsByBlock', params: { id } })
  }

}
</script>