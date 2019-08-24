<template lang="pug">
    button.gm-button(@click="handleClick" 
        :disabled="buttonDisabled || loading"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
            type ? `gm-button-${type}` : '',
            buttonSize ? `gm-button-${buttonSize}` : '',
            {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle
            } 
        ]")
        i.gm-icon-loading(v-if="loading")
        i(:class="icon" v-if="icon && !loading")
        span(v-if="$slots.default")
            slot
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop } from "vue-property-decorator";

@Component({
  name: 'gmButton'
})
export default class button extends Vue {
    @Inject('')
     gmForm: any
    @Inject('gmFormItem') gmFormItem: any

    @Prop()
    size!: string
    @Prop()
    loading!: boolean
    @Prop()
    disabked!: boolean
    @Prop()
    plain!: boolean
    @Prop()
    autofocus!: boolean
    @Prop()
    round!: boolean
    @Prop()
    circle!: boolean

    @Prop({ type: String, default: '' })
    type: Object = {}

    @Prop({ type: String, default: 'default' })
    icon: Object = {}

    @Prop({ type: String, default: 'button' })
    nativeType: Object = {}

}
</script>

