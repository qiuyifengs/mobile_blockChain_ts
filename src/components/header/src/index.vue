<template lang="pug">
div
  header.Header
    .gm-navbar.gm-navbar-transparent
      .gm-navbar-left.fs24
        svg-icon(icon-class='menu')
      .gm-navbar-title
      .gm-navbar-right.fs24
        svg-icon(icon-class="search")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppHeader'
})
export default class AppHeader extends Vue {
  @Prop({
    default: ''
  })
  title!: string
}
</script>

<style lang="less">
</style>