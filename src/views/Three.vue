<template>
    <div>
        <a-divider orientation="left">搜索 ：{{name}}</a-divider>

        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData" :loading="loading">
            <a-list-item slot="renderItem" slot-scope="item" key="item.title">

                <img slot="extra" width="200" height="300" alt="logo" :src="item.cover"/>
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-list-item-meta :description="item.synopsis">
                        <a slot="title">{{item.name}}</a>
                    </a-list-item-meta>
                    {{item.content}}
                </router-link>
            </a-list-item>
            <!--<a-spin v-if="loading" class="demo-loading"/>-->
        </a-list>
    </div>
</template>
<script>
    // 兄弟组件传值
    import bus from '../eventBus.js'
    import {selectDetailByTextPage} from '@/api/video'

    export default {
        methods: {
            selectDetailByTextPage() {
                this.loading = true
                this.listData = []
                selectDetailByTextPage({
                    current: this.pagination.current,
                    size: this.pagination.pageSize,
                    name: this.name
                }).then(resp => {
                    this.listData = resp.records
                    this.pagination.current = parseInt(resp.current)
                    this.pagination.total = parseInt(resp.total)
                    this.loading = false
                })
            }
        },
        data() {
            return {
                loading: false,
                name: this.$route.params.text,
                listData: null,
                pagination: {
                    onChange: (page) => {
                        this.pagination.current = page
                        this.selectDetailByTextPage()
                    },
                    pageSize: 10,
                },
            }
        },
        created() {
            this.selectDetailByTextPage()
        },
        mounted() {
            bus.$on('eventBus', msg => {
                this.name = msg
                this.pagination.current = 1
                this.selectDetailByTextPage()
            })
        }
    }
</script>
<style scoped>
</style>
