<template>
    <a-list
            itemLayout="vertical"
            size="large"
            :pagination="pagination"
            :dataSource="listData"
    >
        <div slot="footer"><b>ant design vue</b> footer part</div>
        <a-list-item slot="renderItem" slot-scope="item" key="item.title">
            <template slot="actions" v-for="{type, text} in actions">
        <span :key="type">
          {{text}}
        </span>
            </template>
            <router-link :to="{ name: 'two', params: { id: item.id }}">
            <img slot="extra" width="200" height="300" alt="logo" :src="item.cover" />
            <a-list-item-meta :description="item.synopsis">
                <a slot="title" >{{item.name}}</a>
            </a-list-item-meta>
            {{item.content}}
            </router-link>
        </a-list-item>
    </a-list>
</template>
<script>
    import {selectDetailByTextPage} from '@/api/video'

    export default {
        methods: {
            selectDetailByTextPage() {
                selectDetailByTextPage({current:this.hotCurrent, size: this.hotSize, name:this.$route.params.text}).then(resp => {
                    this.listData = resp.records
                    // this.hotCurrent = parseInt(resp.current)
                    // this.hotTotal = parseInt(resp.total)
                })
            }
            },
        data () {
            return {
                listData : null,
                pagination: {
                    onChange: (page) => {
                        window.console.log(page)
                    },
                    pageSize: 3,
                },
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            }
        },
        created() {
           this.selectDetailByTextPage()
        }
    }
</script>
<style>

</style>