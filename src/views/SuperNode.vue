<template lang="pug">
div
  van-sticky
    h1.moduleTitle SuperNode
  search-bar
  navigator-menu
  van-pull-refresh(v-model="isLoading" @refresh="onRefresh" pulling-text="Down to refresh..." loosing-text="Release the refresh..." style="background-color: #fff")
    van-skeleton.mt12.mb24(title :row="1" :loading="listLoading")
      .gm-list
        .gm-list-body
          .gm-empty.gm-empty-normal(v-if="DposMap.length <= 0")
              .gm-empty-image
                img(alt="no data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K")
                p.gm-empty-description no data
          .gm-list-item.gm-list-item-middle(v-for="item in DposMap")
            .gm-list-line.gm-list-line-multiple
              .gm-list-content.gm-list-line-multiple
                .gm-flexbox.gm-flexbox-justify-between.gm-flexbox-align-center
                  van-tag(type="primary") {{ item.mints }}
                  span
                    svg-icon.iconfont-country.mr4.v-align-middle(:icon-class="item.location | locationCoverImgFilter")
                    span.fs12 {{ item.location | nationNameFilter }}
                p
                  van-tag.mr4(plain) Address
                  svg-icon.success(icon-class="verified" v-if="item.code == 1")
                  svg-icon.error(icon-class="error-fill" v-else)
                  span.ml4.mr4(@click="gotoDposDetail(item)") {{ item.addr | addressFilter }}
                  svg-icon.fs17.primary.fr(icon-class="hash-right-link")
                p
                  van-tag.mr4(plain) Votes
                  span {{ item.votes | votesFilter }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { DposState } from '@/store/modules/dpos/types'
import { PullRefresh, Skeleton, Toast, Tag, Sticky } from 'vant'
import { numberFormat, addressFormat } from '@/filter'

const dposModule = namespace('dpos')

@Component({
  name: 'SuperNode',
  components: {
    [PullRefresh.name]: PullRefresh,
    [Skeleton.name]: Skeleton,
    [Tag.name]: Tag,
    [Sticky.name]: Sticky
  },
  filters: {
    addressFilter(value: any) {
      return addressFormat(value)
    },
    votesFilter(value: any) {
      return numberFormat(parseInt(value))
    },
    locationCoverImgFilter (value: number) {
      let location = ''
      switch(value) {
        case 1:
          location = 'nation-CN'
          break
        case 2:
          location = 'nation-SG'
          break
        case 3:
          location = 'nation-HK'
          break
        case 4:
          location = 'nation-JP'
          break
        case 5:
          location = 'nation-KR'
          break
        case 6:
          location = 'nation-KY'
          break
        case 7:
          location = 'nation-US'
          break
      }
      return location
    },
    nationNameFilter(value: number) {
      let location = ''
      switch(value) {
        case 1:
          location = 'China'
          break
        case 2:
          location = 'Singapore'
          break
        case 3:
          location = 'Hong Kong'
          break
        case 4:
          location = 'Japan'
          break
        case 5:
          location = 'South Korea'
          break
        case 6:
          location = 'Cayman Islands'
          break
        case 7:
          location = 'United Kingdom'
          break
      }
      return location
    }
  }
})
export default class SuperNode extends Vue {

  @dposModule.Action('getDposAll') getDposAll: any

  DposMap: any[] = []
  isLoading: boolean = false
  listLoading: boolean = false
  
  created() {
    this.getData()
  }
  onRefresh() {
    this.getData()
    this.isLoading = false
  }
  getData() {
    this.listLoading = true
    Toast.loading({
      forbidClick: true,
      mask: true,
      message: 'loading'
    })
    this.getDposAll().then((res: any) => {
      this.DposMap = res
      Toast.clear()
      this.listLoading = false
    })
  }
  gotoDposDetail(row: any) {
    const id = row.addr
    this.$router.push({ name: 'SuperNodeDetail', params: { id } })
  }

}
</script>

<style lang="less" scoped>
  .iconfont-country {
    width: 23px;
    height: 17px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,.15);
  }

</style>
