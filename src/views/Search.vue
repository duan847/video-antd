<template>
    <div style="padding-bottom: 10px">
        <a-divider orientation="left">搜索 ：{{this.name || (type | dist)}}</a-divider>
        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData" :loading="loading"  :grid="{xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }" :style="" >
            <a-list-item slot="renderItem" slot-scope="item" key="item.title" :description="item.name" style="display:flex;padding-right: 10px" >
                <div class="cover">
                    <img class="img"  alt="logo" v-lazy="item.cover" @click="play(item.id)"/>
                    <div class="score" >
                        {{item.score}}</div>
                    <div class="remarks" >
                        {{item.remarks}}</div>
                </div>

                <router-link :to="{ path: 'player', query: { id: item.id }}">
                    <a-list-item-meta :description="item.synopsis">
                        <a slot="title" class="name">{{item.name}}</a><span>a</span>
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
                    orderByField: 'update_time',
                    isAsc: false
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
                    simple: true,
                    position: "both", //分页显示的显示的位置：上下都显示
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
    .img{
        width: 100%;
        height: 100%;
        cursor:pointer;
    }

    .remarks{
        position: absolute;
        bottom: 7px;
        right: 5px;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        background: rgba(0,0,0,.6);
        padding: 0 7px;
        border-radius: 10px;
    }
    .score{
        position: absolute;
        top: 7px;
        right: 5px;
        font-size: 17px;
        line-height: 20px;
        color: #fff;
        padding: 0 7px;
        background: rgba(0,0,0,0.3);
        border-radius: 10px;
    }
    .cover{
        float:left;
        position:relative;
        width:12em;
        height:16em;
        margin-right: 10px;
    }
    .name{
        font-size: 18px;
        color: lightgreen
    }

    .ant-list-pagination{
    }
</style>
