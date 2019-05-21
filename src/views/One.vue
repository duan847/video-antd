<template>
    <div>
        <VideoCard :obj="hot"></VideoCard>

            <a-divider orientation="left">
                <a-icon type="video-camera" theme="twoTone" twoToneColor="#eb2f96"/>
                <b class="title"> 电视剧</b>
                <a-divider type="vertical"/>
                <a @click="switchTV('12')" :disabled="tv.type === '12' ? true : false">国产</a>
                <a-divider type="vertical"/>
                <a @click="switchTV('14')" :disabled="tv.type === '14' ? true : false">港台</a>
                <a-divider type="vertical"/>
                <a @click="switchTV('8')" :disabled="tv.type === '8' ? true : false">欧美</a>
                <a-divider type="vertical"/>
                <a @click="switchTV('7')" :disabled="tv.type === '7' ? true : false">日韩</a>
            </a-divider>
        <a-row ref="container">
            <a-col :xs="8" :sm="6" :md="4" :lg="4" :xl="2" v-for="(item,index) in tv.list" :key="index" class="col-padding">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card hoverable :bodyStyle="{padding:'10px 2px'}" >
                        <div slot="cover" class="cover" >
                            <img alt="图片" :src="item.cover" class="img" />
                            <div class="remarks" >
                                {{item.remarks}}</div>
                        </div>
                        <a-card-meta :title="item.name"/>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="tv.loading"/>
        </a-row>
        <a-row>
            <div v-if="!tv.loading" class="load-more">
                <router-link :to="{ name: 'three', params: { type: tv.type }}">
                    <a-button type="dashed">查看更多</a-button>
                </router-link>
            </div>
        </a-row>
        <VideoCard :obj="top"></VideoCard>
        <VideoCard :obj="varietyShow"></VideoCard>
        <VideoCard :obj="anime"></VideoCard>
    </div>
</template>

<script>
    import {selectHotPage, selectTopPage, selectPage} from '@/api/video'

    import VideoCard from '@/components/VideoCard'
    export default {
        components: {
            VideoCard
        },
        data() {
            return {
                hot: {
                    size: 12,
                    list: [],
                    current: 1,
                    type:-1,
                    total: 1,
                    loading: false,
                    title:' 热映电影',
                    icon:'fire',
                    showPagination:true,
                },
                top: {
                    size: 12,
                    list: [],
                    current: 1,
                    type:-2,
                    total: 1,
                    loading: false,
                    title:' 电影排行榜',
                    icon:'crown',
                    showPagination:true
                },
                tv: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type: '12',
                    title:' 最新电视剧'
                }, varietyShow: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type: '11',
                    title:' 综艺',
                    icon:'video-camera',
                    showMore:true
                },
                anime: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type: '10',
                    title:' 动漫',
                    icon:'video-camera',
                    showMore:true
                }
            }
        },
        methods: {
            selectHotPage() {
                this.hot.loading = true
                this.hot.list = []
                selectHotPage({current: this.hot.current, size: this.hot.size}).then(resp => {
                    this.hot.list = resp.records
                    this.hot.current = parseInt(resp.current)
                    this.hot.total = parseInt(resp.total)
                    this.hot.loading = false
                })
            },
            selectTopPage() {
                this.top.loading = true
                this.top.list = []
                selectTopPage({current: this.top.current, size: this.top.size}).then(resp => {
                    this.top.list = resp.records
                    this.top.current = parseInt(resp.current)
                    this.top.total = parseInt(resp.total)
                    this.top.loading = false
                })
            },
            selectByMVPage() {
                this.tv.loading = true
                this.tv.list = []
                selectPage({
                    current: this.tv.current,
                    size: this.tv.size,
                    type: this.tv.type,
                    orderByField: 'update_time',
                    isAsc: false
                }).then(resp => {
                    this.tv.list = resp.records
                    this.tv.current = parseInt(resp.current)
                    this.tv.total = parseInt(resp.total)
                    this.tv.loading = false
                })
            },
            selectByVarietyShowPage() {
                this.varietyShow.loading = true
                this.varietyShow.list = []
                selectPage({
                    current: this.varietyShow.current,
                    size: this.varietyShow.size,
                    type: this.varietyShow.type,
                    orderByField: 'update_time',
                    isAsc: false
                }).then(resp => {
                    this.varietyShow.list = resp.records
                    this.varietyShow.current = parseInt(resp.current)
                    this.varietyShow.total = parseInt(resp.total)
                    this.varietyShow.loading = false
                })
            },
            selectByAnimePage() {
                this.anime.loading = true
                this.anime.list = []
                selectPage({
                    current: this.anime.current,
                    size: this.anime.size,
                    type: this.anime.type,
                    orderByField: 'update_time',
                    isAsc: false
                }).then(resp => {
                    this.anime.list = resp.records
                    this.anime.current = parseInt(resp.current)
                    this.anime.total = parseInt(resp.total)
                    this.anime.loading = false
                })
            },
            sizeChange(type) {
                switch (type) {
                    case -1:
                        this.selectHotPage()
                        break
                    case -2:
                        this.selectTopPage()
                        break
                }
            },
            switchTV(type) {
                this.tv.type = type
                this.selectByMVPage()
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

    .title {
        font-size: 20px;
    }
    .load-more {
        text-align: center;
        margin-top: 20px;
        height: 32px;
        line-height: 32px;
    }
    .col-padding{
        padding: 0 4px 8px 4px;
    }

    .img{
        width: 100%;
        height: 100%;
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
    .cover{
        position:relative;
        height: 13em;
    }
</style>
