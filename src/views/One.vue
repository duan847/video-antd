<template>
    <div>
        <a-carousel effect="fade" autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </a-carousel>

        <a-divider orientation="left">热映</a-divider>
        <a-row :gutter="10">
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in hotList" :key="index" style="padding-bottom: 10px">
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
        </a-row>
        <a-row style="text-align: center">
            <a-pagination :pageSize.sync="hotSize" v-model="hotCurrent" :total="hotTotal" @change="hotSizeChange"/>
        </a-row>
    </div>
</template>

<script>
    import {selectHotPage, selectTopPage} from '@/api/video'

    export default {
        comments: {},
        methods: {
            selectHotPage() {
                selectHotPage({current:this.hotCurrent, size: this.hotSize}).then(resp => {
                    this.hotList = resp.records
                    this.hotCurrent = parseInt(resp.current)
                    this.hotTotal = parseInt(resp.total)
                })
            },
            selectTopPage() {
                selectTopPage({size: this.topSize}).then(resp => {
                    this.TopList = resp.records
                })
            },
            hotSizeChange(page){
                this.hotCurrent = page
                this.selectHotPage()
            }
        },
        data() {
            return {
                hotSize: 12,
                hotList: null,
                hotCurrent: 1,
                hotTotal: 1,
                topSize: 12,
                topList: null
            }
        },
        created() {
            //分页查询热播电影
            this.selectHotPage()
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
