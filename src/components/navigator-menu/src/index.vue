<template lang="pug">
div
    van-tabbar(route style="border-top: 1px solid #ddd; background-color: hsl(220, 43%, 99%); padding-bottom: 18px")
        van-tabbar-item(v-for="(item, index) in navList" replace :to="item.path" :key="index")
            template(slot="icon")
                svg-icon.mr4(:icon-class="item.icon")
            span {{ item.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { namespace } from 'vuex-class'
import { HomeState } from '@/store/modules/home/types'
import { Tabbar, TabbarItem } from 'vant'
import Route from 'vue-router'

const homeModule = namespace('home')
const navListEn = [
    {
        path: '/',
        name: 'Today',
        icon: 'home'
    },
    {
        path: '/Blocks',
        name: 'Block',
        icon: 'block'
    },
    {
        path: '/Transactions',
        name: 'Transaction',
        icon: 'transaction'
    },
    {
        path: '/SuperNode',
        name: 'Node',
        icon: 'superNode'
    },
    {
        path: '/Tokens',
        name: 'Token',
        icon: 'contract'
    }
    // {
    //     path: '/Search',
    //     name: 'Search',
    //     icon: 'search'
    // }
]

@Component({
    name: 'NavigatorMenu',
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    }
})
export default class NavigatorMenu extends Vue {
    // @homeModule.Action('setCurrentMenu') setCurrentMenu: any
    // @homeModule.Getter('currentMenu')
    // currentMenu!: HomeState
    navList: any[] = navListEn
    active: number = 0
    currentMenu: number = 0
    @Watch('$route',{ immediate: true })
    changeRouter(route: Route){
        let routeId, currentRoute = route as any
        console.log('currentRoute' + currentRoute.name)
        switch(currentRoute.name) {
            case 'Home':
               routeId = 0
               break
            case 'Blocks':
                routeId = 1
                break
            case 'Transactions':
                routeId = 2
                break
            case 'SuperNode':
                routeId = 3
                break
            case 'Tokens':
                routeId = 4
                break
        }
        this.currentMenu = Number(routeId)
        // this.setCurrentMenu(routeId)
    }
    onClick(name: string, title: string) {
        // this.setCurrentMenu(name)
        this.$router.push({ name: `${title}` })
    }
}
</script>
<style lang="less">
.van-tab {
    padding: 0 12px !important
}
</style>