<template lang="pug">
div
    overlay(:show="mutableShow" :transparent="true" :click="toggle" v-if="overlay")
    transition(name="popover")
        div(:class="`popover${computedPosition}`" v-bind:style="{ top: `${top}px`, left: `${left}px `}" v-if="mutableShow" ref="popover" @click="toggle")
            .angle(v-bind:style="{ transform: `translate3d(${angleOffset}px, 0 ,0) rotate(45deg` }")
            .inner
                slot
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Overlay from '@/components/overlay/src/index.vue'
import { isParent } from '@/utils/utils'

const AUTO = 'auto', TOP = 'top', BOTTOM = 'bottom'

@Component({
    name: 'popover',
    components: {
        Overlay
    }
})
export default class popover extends Vue {
    $refs!: {
        popover: any
    }

    @Prop({
        required: true
    })
    trigger!: string

    @Prop({
        default: AUTO
    })
    position!: string

    @Prop({
        default: false
    })
    show!: boolean

    @Prop({
        default: 1
    })
    overlay!: false

    @Prop({
        default: 92
    })
    width!: number

    mutableShow: boolean = this.show
    top: number = 0
    left: number = 0
    angleOffset: number = 0
    computedPosition: string = TOP
    triggerElement: any = undefined
    parentElement: any = undefined

    @Watch('mutableShow', { deep: true })
    onMutableShow (val: any, oldVal: any) {
        if (val === true) {
            this.$nextTick(() => this.locate())
        }
    }

    mounted() {
        this.$nextTick(() => {
            this.triggerElement = document.querySelector(this.trigger)
            this.triggerElement.addEventListener('click', this.toggle)
            this.parentElement = this.triggerElement.offsetParent
            this.parentElement.addEventListener('scroll', this.locate)

            document.addEventListener('click', (e: any) => {
                if (!isParent(e.target, this.$refs.popover) && !isParent(e.target, this.triggerElement)) {
                    this.mutableShow = false
                }
            })
        })
    }

    private open() {
        this.mutableShow = true
        this.$emit('open', this)
    }

    private close() {
        this.mutableShow = false
        this.$emit('close', this)
    }

    private toggle() {
        this.mutableShow ? this.close() : this.open()
    }

    private locate() {
        if (!this.mutableShow || !this.triggerElement) return false
        const el = this.$refs.popover
        const t = this.triggerElement
        const p = this.parentElement
        const top = t.offsetTop - p.scrollTop
        const tsize = t.getBoundingClientRect()
        const elsize = el.getBoundingClientRect()
        const psize = p.getBoundingClientRect()
        if (this.position !== AUTO) {
            this.computedPosition = this.position
        } else if (top > psize.height / 2) {
            this.computedPosition = TOP
        } else {
            this.computedPosition = BOTTOM
        }

        this.left = t.offsetLeft - elsize.width / 2 + tsize.width / 2
        if (this.left < 0) {
            const left = 4
            this.angleOffset = this.left - left
            this.left = left
        } else if (this.left > psize.width - elsize.width) {
            const left = psize.width - elsize.width - 4
            this.angleOffset = this.left - left
            this.left = left
        }

        if (this.computedPosition === TOP) {
            this.top = t.offsetTop - elsize.height - 10
        } else {
            this.top = t.offsetTop + tsize.height + 10
        }

    }
    
    
}
</script>

<style lang="less" scoped>
</style>