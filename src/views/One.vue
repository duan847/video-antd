<template>
    <div>
        <VideoCard :obj="hot"></VideoCard>
        <VideoCard :obj="tv"></VideoCard>
        <VideoCard :obj="top"></VideoCard>
        <VideoCard :obj="varietyShow"></VideoCard>
        <VideoCard :obj="anime"></VideoCard>
    </div>
</template>

<script>
    import {selectSortPage, selectPage} from '@/api/video'

    import VideoCard from '@/components/VideoCard'

    export default {
        name: 'one',
        components: {
            VideoCard
        },
        data() {
            return {
                hot: {
                    size: 12,
                    list: [],
                    current: 1,
                    type: 128,
                    total: 1,
                    loading: false,
                    title: ' 热映电影',
                    icon: 'fire',
                    showPagination: true,
                },
                mvhot: {
                    size: 12,
                    list: [],
                    current: 1,
                    type: 131,
                    total: 1,
                    loading: false,
                    title: ' 热播',
                    icon: 'fire',
                    showPagination: true,
                },
                top: {
                    size: 12,
                    list: [],
                    current: 1,
                    type: 129,
                    total: 1,
                    loading: false,
                    title: ' 电影排行榜',
                    icon: 'crown',
                    showPagination: true
                },
                tv: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    // type: 12,
                    title: ' 最新电视剧',
                    showPagination: false,
                    showMore: false,
                    classify: [
                        {"key": 131, value: {"showPagination": true}},
                        {"key": 12, value: {"showMore": true}},
                        {"key": 14, value: {"showMore": true}},
                        {"key": 8, value: {"showMore": true}},
                        {"key": 7, value: {"showMore": true}}
                    ]
                }, varietyShow: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type: '11',
                    title: ' 综艺',
                    icon: 'video-camera',
                    showMore: true
                },
                anime: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    type: '10',
                    title: ' 动漫',
                    icon: 'video-camera',
                    showMore: true
                }
            }
        },
        methods: {
            selectHotPage() {
                this.hot.loading = true
                this.hot.list = []
                selectSortPage({current: this.hot.current, size: this.hot.size, type: this.hot.type}).then(resp => {
                    this.hot.list = resp.records
                    this.hot.current = parseInt(resp.current)
                    this.hot.total = parseInt(resp.total)
                    this.hot.loading = false
                })
            },
            selectMVHotPage() {
                this.tv.loading = true
                this.tv.list = []
                this.tv.type = 131
                selectSortPage({current: this.tv.current, size: this.tv.size, type: this.tv.type}).then(resp => {
                    this.tv.list = resp.records
                    this.tv.current = parseInt(resp.current)
                    this.tv.total = parseInt(resp.total)
                    this.tv.loading = false
                    this.tv.showPagination = true
                    this.tv.showMore = false
                })
            },
            selectTopPage() {
                this.top.loading = true
                this.top.list = []
                selectSortPage({current: this.top.current, size: this.top.size, type: this.top.type}).then(resp => {
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
                    case this.hot.type:
                        this.selectHotPage()
                        break
                    case this.top.type:
                        this.selectTopPage()
                        break
                    case this.mvhot.type:
                        this.selectMVHotPage()
                        break

                }
            },
            switchTV(type) {
                if(type === 131) {
                    this.selectMVHotPage()
                }else {
                    this.selectByMVPage()
                }
            }
        },
        created() {
            //分页查询热播电影
            this.selectHotPage()
            //分页查询排行榜电影
            this.selectTopPage()
            //分页查询电视剧
            // this.selectByMVPage()
            this.selectMVHotPage()
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

    .col-padding {
        padding: 0 4px 8px 4px;
    }

    .img {
        width: 100%;
        height: 100%;
    }

    .remarks {
        position: absolute;
        bottom: 7px;
        right: 5px;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        background: rgba(0, 0, 0, .6);
        padding: 0 7px;
        border-radius: 10px;
    }

    .cover {
        position: relative;
        height: 13em;
    }
</style>
