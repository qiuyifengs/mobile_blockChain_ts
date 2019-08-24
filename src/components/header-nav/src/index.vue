<template lang="pug">
div
  .gm-navbar.gm-navbar-light
        .gm-navbar-left(role="button")
            span(v-back)
                svg-icon.fs18(icon-class="left_2")
                span.fw600 Back
        .gm-navbar-title
            span {{ title }}
        .gm-navbar-right
          router-link.primary.fw600(to="/") Home
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { back } from '@/directive/back-link'

@Component({
  name: 'HeaderNav',
  directives:{back}
})
export default class HeaderNav extends Vue {
  @Prop({
    default: ''
  })
  title!: string
}
</script>

<style lang="less">
</style>