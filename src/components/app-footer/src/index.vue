<template lang="pug">
div
    .container-footer(style="background-image: linear-gradient(150deg,#19a0ff,#2d1582)")
        .gm-card(style="border-radisu: 0; background: url('https://etherscan.io/images/world-map-white.png') 0px 30% no-repeat")
            .gm-card-header
                .gm-card-header-content
                    img(:src="footerIcon" width="20")
                    span.fs24(style="color: #fff") Powered by SASSCAN
            .gm-card-body
                span(style="color: #fff; font-size: 12px") SASSCAN is a Block Explorer and Analytics Platform for SAS, a decentralized smart contracts platform.
            .gm-card-footer.mt24
                .gm-card-footer-content
                    a.footer-link(href="https://www.blockchain.com/zh-cn/explorer" target="_blank") 
                        span Powered by SASSCAN
                    a.footer-link(href="https://eospark.com/" target="_blank")
                        span EOSPark
                .gm-card-footer-extra
                    a.footer-link(href="https://etherscan.io/" target="_blank")
                        span Etherscan(ETH)
                    a.footer-link(href="https://www.omniexplorer.info/" target="_blank")
                        span Omni Explorer(USDT)
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppFooter'
})
export default class AppFooter extends Vue {
    footerIcon: any = require('../../../assets/common/footer.png')
    footerBg: any = require('../../../assets/common/footer-bg.png')
}
</script>

<style lang="less" scoped>
    .footer-link {
        display: block;
        color: #fff;
        margin-bottom: 12px
    }
</style>