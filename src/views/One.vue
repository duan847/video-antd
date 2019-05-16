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
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="top.loading"/>
        </a-row>
        <a-row style="text-align: center" v-if="top.total > top.size">
            <a-pagination :pageSize.sync="top.size" v-model="top.current" :total="top.total" @change="topSizeChange"/>
        </a-row>


        <a-divider orientation="left"><a-icon type="video-camera" theme="twoTone" twoToneColor="#eb2f96"/><b> 电视剧</b></a-divider>
        <a-row :gutter="10">
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in tv.list" :key="index" style="padding-bottom: 10px">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 180px">

                        <img alt="example" :src="item.cover"
                             slot="cover" height="280px"/>
                        <a-card-meta :title="item.name">
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="tv.loading"/>
        </a-row>
        <a-row>
            <div v-if="!tv.loading" :style="{ textAlign: 'center', marginTop: '20px', height: '32px', lineHeight: '32px' }">
                <router-link :to="{ name: 'three', params: { type: tv.type }}"><a-button type="dashed">查看更多</a-button></router-link>
            </div>
        </a-row>

        <a-divider orientation="left"><a-icon type="video-camera" theme="twoTone" twoToneColor="#eb2f96"/><b> 综艺</b></a-divider>
        <a-row :gutter="10">
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in varietyShow.list" :key="index" style="padding-bottom: 10px">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 180px">
                        <img alt="example" :src="item.cover"
                             slot="cover" height="280px"/>
                        <a-card-meta :title="item.name">
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="varietyShow.loading"/>
        </a-row>
        <a-row>
            <div v-if="!varietyShow.loading" :style="{ textAlign: 'center', marginTop: '20px', height: '32px', lineHeight: '32px' }">
                <router-link :to="{ name: 'three', params: { type: varietyShow.type }}"><a-button type="dashed">查看更多</a-button></router-link>
            </div>
        </a-row>

        <a-divider orientation="left"><a-icon type="video-camera" theme="twoTone" twoToneColor="#eb2f96"/><b> 动漫</b></a-divider>
        <a-row :gutter="10">
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in anime.list" :key="index" style="padding-bottom: 10px">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 180px">

                        <img alt="example" :src="item.cover"
                             slot="cover" height="280px"/>
                        <a-card-meta :title="item.name">
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="anime.loading"/>
        </a-row>
        <a-row>
            <div v-if="!anime.loading" :style="{ textAlign: 'center', marginTop: '20px', height: '32px', lineHeight: '32px' }">
                <router-link :to="{ name: 'three', params: { type: anime.type }}"><a-button type="dashed">查看更多</a-button></router-link>
            </div>
        </a-row>
    </div>
</template>

<script>
    import {selectHotPage, selectTopPage,selectPage} from '@/api/video'

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
               },
                tv:{
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type:'12,14,8,7,16'
                },varietyShow:{
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type:'11'
                },
                anime:{
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type:'10'
                }
            }
        },
        methods: {
            selectHotPage() {
                this.hot.loading = true
                this.hot.list = []
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
            selectByMVPage() {
            this.tv.loading = true
            this.tv.list = []
            selectPage({current:this.tv.current, size: this.tv.size,type:this.tv.type,orderByField:'update_time'}).then(resp => {
                this.tv.list = resp.records
                this.tv.current = parseInt(resp.current)
                this.tv.total = parseInt(resp.total)
                this.tv.loading = false
            })
        },
        selectByVarietyShowPage() {
            this.varietyShow.loading = true
            this.varietyShow.list = []
            selectPage({current:this.varietyShow.current, size: this.varietyShow.size,type:this.varietyShow.type,orderByField:'update_time'}).then(resp => {
                this.varietyShow.list = resp.records
                this.varietyShow.current = parseInt(resp.current)
                this.varietyShow.total = parseInt(resp.total)
                this.varietyShow.loading = false
            })
        },
            selectByAnimePage() {
                this.anime.loading = true
                this.anime.list = []
                selectPage({current:this.anime.current, size: this.anime.size,type:this.anime.type,orderByField:'update_time'}).then(resp => {
                    this.anime.list = resp.records
                    this.anime.current = parseInt(resp.current)
                    this.anime.total = parseInt(resp.total)
                    this.anime.loading = false
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
            //分页查询电视剧
            this.selectByMVPage()
            //分页查询综艺节目
            this.selectByVarietyShowPage()
            //分页查询动漫
            this.selectByAnimePage()
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
