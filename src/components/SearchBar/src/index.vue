<template lang="pug">
div
  //- van-search(placeholder="请输入搜索关键词" v-model="searchText")
  van-popup(v-model="show" position="top" :style="{ height: '60px' }")

  form.gm-search(action='#' ref="search" onSubmit)
    .gm-search-input
      .gm-search-synthetic-ph(ref="searchSyntheticPh")
        span.gm-search-synthetic-ph-container
          i.gm-search-synthetic-ph-icon
          span.gm-search-synthetic-ph-placeholder(ref="placeholder" style="visibility: visible") Search
      input.gm-search-value(type="search" placeholder="Search" onBlur="blur" v-model="searchText" @click="onClick" ref="input")
      a.gm-search-clear(ref="clear" @click="clear")
    .gm-search-cancel.gm-search-cancel-anim.cancel(ref="cancel" @click="onCancel" style="margin-right: -40px") 取消
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Search, Sticky, Popup } from 'vant'

const transactionModule = namespace('transaction')

@Component({
  name: 'SearchBar',
  components: {
    [Search.name]: Search,
    [Sticky.name]: Sticky,
    [Popup.name]: Popup
  }
})
export default class SearchBar extends Vue {
  @transactionModule.Action('getDetermineAddrType') getDetermineAddrType: any

  $refs!: {
    input: any,
    search: any,
    clear: any,
    cancel: any,
    placeholder: any
    searchSyntheticPh: any
  }
  searchText: any = ''
  show: boolean = false

  @Watch('searchText', { deep: true })
  onMutableInput (val: any, oldVal: any) {
    if (this.searchText !== '') {
      this.$refs.clear.classList.add('gm-search-clear-show')
      this.$refs.placeholder.style = "visibility: hidden;"
    } else {
      this.$refs.clear.classList.remove('gm-search-clear-show')
      this.$refs.placeholder.style = "visibility: visible;"
    }
    this.search()
  }

  private getTxsByHash() {
    const id = this.searchText.trim()

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

  private search() {
    console.log(this.searchText)
    const id = this.searchText.trim()
    if (/^[0-9]+$/.test(this.searchText)) {
      this.$router.push({ name: 'BlockDetail', params: { id: id } })  
    } else {
      if (this.searchText.trim().length <= 40) {
        this.getTxsByHash()
      } else {
        this.$router.push({ name: 'TransactionDetail', params: { id } })
      }
    }
  }

  private onClick () {
    this.$refs.cancel.classList.add('gm-search-cancel-show')
    this.$refs.cancel.style = 'margin-right: 0px'
    this.$refs.search.classList.add('gm-search-start')
    this.$refs.input.focus()

    this.$refs.searchSyntheticPh.style="width: 70px"
  }

  private onCancel() {
    this.$refs.cancel.classList.remove('gm-search-cancel-show')
    this.$refs.cancel.style = 'margin-right: -40px'
    this.$refs.search.classList.remove('gm-search-start')
    this.$refs.clear.classList.remove('gm-search-clear-show')
    this.$refs.placeholder.style = "visibility: visible;"
    this.$refs.input.blur()

    this.$refs.searchSyntheticPh.style=""
  }

  private clear() {
    this.searchText = ''
  }

  private blur() {
    console.log('blur')
  }
}
</script>

<style lang="less">
</style>