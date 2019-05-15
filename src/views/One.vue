<template>
    <div>
        <a-carousel effect="fade" autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </a-carousel>

        <a-divider orientation="left"><a-icon type="fire" theme="twoTone" twoToneColor="#eb2f96"/><b> 热映</b></a-divider>
        <a-row :gutter="10">

            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in hot.list" :key="index" style="padding-bottom: 10px">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 180px">
                        <img alt="example" :src="item.cover"
                             slot="cover" height="280px"/>
                        <a-card-meta :title="item.name">
                            <!--<template slot="description">{{item.name}}</template>-->
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="hot.loading"/>
        </a-row>
        <a-row style="text-align: center" v-if="hot.total > hot.size">
            <a-pagination :pageSize.sync="hot.size" v-model="hot.current" :total="hot.total" @change="hotSizeChange"/>
        </a-row>

        <a-divider orientation="left"><a-icon type="like" theme="twoTone" twoToneColor="#eb2f96"/><b> 经典排行榜</b></a-divider>
        <a-row :gutter="10">
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in top.list" :key="index" style="padding-bottom: 10px">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 180px">
                        <img alt="example" :src="item.cover"
                             slot="cover" height="280px"/>
                        <a-card-meta :title="item.name">
                            <!--<template slot="description">{{item.name}}</template>-->
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="top.loading"/>
        </a-row>
        <a-row style="text-align: center" v-if="top.total > top.size">
            <a-pagination :pageSize.sync="top.size" v-model="top.current" :total="top.total" @change="topSizeChange"/>
        </a-row>
    </div>
</template>

<script>
    import {selectHotPage, selectTopPage} from '@/api/video'

    export default {
        comments: {},
        data() {
            return {
                hot:{
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false
                },
               top:{
                   size: 12,
                   list: [],
                   current: 1,
                   total: 1,
                   loading: false
               }
            }
        },
        methods: {
            selectHotPage() {
                this.hot.loading = true
                this.hot.list = []
                window.console.log(this.hot)
                selectHotPage({current:this.hot.current, size: this.hot.size}).then(resp => {
                    this.hot.list = resp.records
                    this.hot.current = parseInt(resp.current)
                    this.hot.total = parseInt(resp.total)
                    this.hot.loading = false
                })
            },
            selectTopPage() {
                this.top.loading = true
                this.top.list = []
                selectTopPage({current:this.top.current, size: this.top.size}).then(resp => {
                    this.top.list = resp.records
                    this.top.current = parseInt(resp.current)
                    this.top.total = parseInt(resp.total)
                    this.top.loading = false
                })
            },
            hotSizeChange(page){
                this.hot.current = page
                this.selectHotPage()
            },
            topSizeChange(page){
                this.top.current = page
                this.selectTopPage()
            }
        },
        created() {
            //分页查询热播电影
            this.selectHotPage()
            //分页查询排行榜电影
            this.selectTopPage()
        }
    }
</script>

<style scoped>
    /* For demo */
    .ant-carousel >>> .slick-slide {
        text-align: center;
        height: 500px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
    }

    .ant-carousel >>> .slick-slide h3 {
        color: #fff;
    }
</style>
