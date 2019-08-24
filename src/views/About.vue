<template lang="pug">
.about
  h1 This is an about page
  van-nav-bar(title="标题" left-text="返回" right-text="按钮" left-arrow)
  van-skeleton(title avatar :row="3")
</template>

<script lang="ts">
import { NavBar, Skeleton } from 'vant'
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: 'About',
  components: {
    [NavBar.name]: NavBar,
    [Skeleton.name]: Skeleton
  }
})
export default class About extends Vue {
}
</script>
