<template>
    <div>
        <a-divider orientation="left">搜索 ：{{this.name || (type | dist)}}</a-divider>

        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData" :loading="loading">
            <a-list-item slot="renderItem" slot-scope="item" key="item.title">

                <img slot="extra" width="180em" height="300em" alt="logo" v-lazy="item.cover" @click="play(item.id)"/>
                <router-link :to="{ path: 'player', query: { id: item.id }}">
                    <a-list-item-meta :description="item.synopsis">
                        <a slot="title">{{item.name}}</a>
                    </a-list-item-meta>
                    {{item.content}}
                </router-link>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
    // 兄弟组件传值
    import bus from '../eventBus.js'
    import {selectPage} from '@/api/video'

    export default {
        name: 'search',
        methods: {
            selectPage() {
                this.loading = true
                this.listData = []
                selectPage({
                    current: this.pagination.current,
                    size: this.pagination.pageSize,
                    name: this.name,
                    type: this.type,
                }).then(resp => {
                    this.listData = resp.records
                    this.pagination.current = parseInt(resp.current)
                    this.pagination.total = parseInt(resp.total)
                    this.loading = false
                })
            },play(id){
                this.$router.push({path: "player", query: {id: id}})
            }
        },
        data() {
            return {
                loading: false,
                name: this.$route.query.name,
                type: this.$route.query.type,
                listData: null,
                pagination: {
                    onChange: (page) => {
                        this.pagination.current = page
                        this.selectPage()
                    },
                    pageSize: 10,
                },
            }
        },
        created() {
            this.selectPage()
        },
        mounted() {
            bus.$on('eventBus', msg => {
                this.name = msg
                this.pagination.current = 1
                this.selectPage()
            })
        }
    }
</script>
<style scoped>
</style>
