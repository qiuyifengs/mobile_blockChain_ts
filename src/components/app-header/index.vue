<template lang="pug">
div

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