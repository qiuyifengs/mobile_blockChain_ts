<template lang="pug">
div
    header-nav(title="SuperNode Detail")
    van-pull-refresh(v-model="isLoading" @refresh="onRefresh" style="background-color: #fff")
        van-skeleton.mt12.mb24(title :row="1" :loading="listLoading")
            .gm-list
                .gm-list-body
                    .gm-list-item.gm-list-item-middle
                        .gm-list-line.gm-list-line-multiple
                            .gm-list-content
                                span Account
                                .gm-list-brief
                                    span {{ dposForm.address }}
                    .gm-list-item.gm-list-item-middle
                        .gm-list-line.gm-list-line-multiple
                            .gm-list-content
                                span Votes  
                                .gm-list-brief
                                    span {{ dposForm.votes | votesFilter }}
                    .gm-list-item.gm-list-item-middle
                            .gm-list-line.gm-list-line-multiple
                                .gm-list-content
                                    span Mints
                                    .gm-list-brief
                                        span {{ dposForm.mints }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { State, Action, Getter, namespace } from 'vuex-class'
import store from '@/store/store'
import { PullRefresh, Skeleton, Toast } from 'vant'

@Component({
    name: 'SuperNodeDetail',
    components: {
        [PullRefresh.name]: PullRefresh,
        [Skeleton.name]: Skeleton
    },
    filters: {
        votesFilter (value: string) {
            return (Number(value) / Math.pow(10, 18)).toLocaleString()
        }
    }
})
export default class SuperNodeDetail extends Vue {
    @Prop({
        default: ''
    })
    id!: string

    dposForm: object = {}
    isLoading: boolean = false
    listLoading: boolean = false
    
    created() {
        this.getDposDetail(this.id)
    }
    onRefresh() {
        this.getDposDetail(this.id)
        this.isLoading = false
    }
    private getDposDetail(id: string) {
        this.listLoading = true
            Toast.loading({
            forbidClick: true,
            mask: true,
            message: 'loading'
        })
        store.dispatch('dpos/getDposByFindone', { id: id }).then(() => {
            this.dposForm = store.getters['dpos/DposByFindone']
            Toast.clear()
            this.listLoading = false
        })
    }
}
</script>

