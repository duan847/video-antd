<template>
    <div>
        <!--热映电影-->
        <VideoCard :obj="movieHot"/>
        <!--电视剧-->
        <VideoCard :obj="tv"/>
        <!--经典电影-->
        <VideoCard :obj="movieTop"/>
        <!--综艺视频-->
        <VideoCard :obj="varietyShow"/>
        <!--动漫-->
        <VideoCard :obj="anime"/>
    </div>
</template>

<script>
    import {selectSortPage, selectPage} from '@/api/video'

    import VideoCard from '@/components/VideoCard'

    export default {
        name: 'home',
        components: {
            VideoCard
        },
        data() {
            return {
                movieHot: {
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
                tvHot: {
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
                movieTop: {
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
                this.movieHot.loading = true
                this.movieHot.list = []
                selectSortPage({current: this.movieHot.current, size: this.movieHot.size, type: this.movieHot.type}).then(resp => {
                    this.movieHot.list = resp.records
                    this.movieHot.current = parseInt(resp.current)
                    this.movieHot.total = parseInt(resp.total)
                    this.movieHot.loading = false
                })
            },
            selectTvHotPage() {
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
                this.movieTop.loading = true
                this.movieTop.list = []
                selectSortPage({current: this.movieTop.current, size: this.movieTop.size, type: this.movieTop.type}).then(resp => {
                    this.movieTop.list = resp.records
                    this.movieTop.current = parseInt(resp.current)
                    this.movieTop.total = parseInt(resp.total)
                    this.movieTop.loading = false
                })
            },
            selectByTvPage() {
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
                    case this.movieHot.type:
                        this.selectHotPage()
                        break
                    case this.movieTop.type:
                        this.selectTopPage()
                        break
                    case this.tvHot.type:
                        this.selectTvHotPage()
                        break
                }
            },
            switchTV(type) {
                if(type === this.tvHot.type) {
                    this.selectTvHotPage()
                }else {
                    this.selectByTvPage()
                }
            }
        },
        created() {
            //分页查询热映电影
            this.selectHotPage()
            //分页查询经典电影
            this.selectTopPage()
            //分页查询热播电视剧
            this.selectTvHotPage()
            //分页查询综艺视频
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
