<template lang="pug">
div
    transition(name="overlay")
        div(:class="'overlay ' + (transparent ? 'transparent' : '')" v-if="show" @click="click && click()")
            .inner(v-bind:style="{ opacity: opacity }")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'overlay'
})
export default class overlay extends Vue {
    @Prop({
        required: true
    })
    show!: boolean

    @Prop({
        default: undefined
    })
    click!: any

    @Prop({
        default: false
    })
    transparents!: boolean

    @Prop({
        default: 1
    })
    opacity!: number
}
</script>

<style lang="less" scoped>
</style>