<template lang="pug">
    .mf-loading-container
        img(src="./loading.gif")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: 'loading'
})
export default class loading extends Vue {}
</script>
