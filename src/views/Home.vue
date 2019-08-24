<template lang="pug">
div
  van-sticky
    h1.moduleTitle Today
  search-bar
  navigator-menu
  van-tabs(animated swipeable :ellipsis="false" color="#1989fa" type="card" style="padding-top: 12px")
    van-tab(title="Latest Block")
      latest-block
    van-tab(title="Latest Deal")
      latest-deal
  //- tab-container
  //-   div(role="tablist")
  //-     button(type="buttton" role="tab" aria-selected="true") Latest Block
  //-     button(type="button" role="tab") Latest Deal
  //-   div(role="tabpanel")
  //-     latest-block
  //-   div(role="tabpanel" hidden)
  //-     latest-deal
  //- app-footer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Tab, Tabs, Sticky } from 'vant'
@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky
  }
})
export default class Home extends Vue {
  onClick() {}
}
</script>

<style lang="less" scoped>
 @import url('../assets/styles/gitTab.less');
</style>