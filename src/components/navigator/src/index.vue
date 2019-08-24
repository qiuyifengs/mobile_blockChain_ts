<template lang="pug">
    .navigator-component(ref="viewport")
        Scroll(ref="scroll" direction="horizontal")
            ul.tab-list(direction="horizontal")
                li.tab-item(v-for="item in navList" @click="selectNav(item)")
                    slot(name="item" :text="item.name" :index="item.id")
                        span.tab-name(:class="{'link-active':isCurrentTab(item.id)}") {{ item.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Scroll from '@/components/navigator/src/index.vue'

const EVENT_CHANGE = 'change'

@Component({
  name: 'navigator',
  components: {
      Scroll
  }
})
export default class navigator extends Vue {
    $refs!: {
        scroll: any,
        tabList: any,
        viewport: any
    }
    
    @Prop({
        type: String,
        default() {
            return [{
                id: 1,
                name: 'default'
            }]
        }
    })
    navList!: any;

    @Prop({
        type: Number,
        default: null
    })
    currentTabIndex!: number

    currentTab: number = 4
    current: number = 1
    
    mounted() {
        this._initTabListWidth()
        this.$emit(EVENT_CHANGE)
        if (this.currentTabIndex === null) {
            this.current = this.currentTab
        } else {
            this.current = this.currentTabIndex
        }
        setTimeout(() => {
            this._adjust(this.current)
        }, 500)
    }

    private isCurrentTab (index: number) {
        return index === this.current
    }

    private selectNav (item: any) {
        this.current = item.id
        this._adjust(item.id)
        this.$emit(EVENT_CHANGE, item)
    }

    private _initTabListWidth() {
        const tabList = this.$refs.tabList
        const items = tabList.children
        let width = 0
        for (let i = 0; i < items.length; i++) {
          width += items[i].clientWidth
        }
        tabList.style.width = (width + 1) + 'px'
    }

    private _adjust(tabId: any) {
        const viewportWidth: any = this.$refs.viewport.clientWidth
        const tabListWidth: any = this.$refs.tabList.clientWidth
        const minTranslate = Math.min(0, viewportWidth - tabListWidth)
        const middleTranslate = viewportWidth / 2
        const items: any = this.$refs.tabList.children
        let width = 0
        this.navList.every((item: any, index: number) => {
          if (item.id === tabId) {
            return false
          }
          width += items[index].clientWidth
          return true
        })
        let translate = middleTranslate - width
        translate = Math.max(minTranslate, Math.min(0, translate))
        this.$refs.scroll.scrollTo(translate, 0, 300)
      }
}
</script>

<style lang="less" scoped>
    .navigator-component {
        background: none;
        .scroll-content {
            display: inline-block
        }
        .tab-list {
            margin: 0 auto;
            .tab-item {
                display: inline-block;
                line-height: 54px;
                .tab-name {
                    display: block;
                    position: relativ;
                    padding: 0 15px 0 14px;
                    font-size: 14px;
                    color: #666;
                }
                    
            }
            
            
        }
       
        
    }
</style>


