<template>
    <div>
        <!--热映电影-->
        <VideoCard :obj="movie"/>
        <!--电视剧-->
        <VideoCard :obj="tv"/>
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
                movie: {
                    size: 12,
                    list: [],
                    current: 1,
                    type: 128,
                    total: 1,
                    loading: false,
                    title: ' 火热电影',
                    movieHotType: 128,
                    movieTopType: 129,
                    movieRecentType: 132,
                    icon: 'fire',
                    showPagination: true,
                    classify: [
                        {"key": 128, value: {"showPagination": true}},
                        {"key": 132, value: {"showPagination": true}},
                        {"key": 129, value: {"showPagination": true}}
                    ]
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
                tv: {
                    size: 12,
                    list: [],
                    current: 1,
                    total: 1,
                    loading: false,
                    title: ' 电视剧',
                    icon: 'video-camera',
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
                    type: 133,
                    title: ' 综艺',
                    icon: 'video-camera',
                    showPagination: true
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
            /**
             * 分页查询火热电影（热映电影、热播电影）
             * @param type
             */
            selectMovieHotPage(type) {
                this.movie.loading = true
                this.movie.list = []
                selectSortPage({current: this.movie.current, size: this.movie.size, type: type}).then(resp => {
                    this.movie.list = resp.records
                    this.movie.current = parseInt(resp.current)
                    this.movie.total = parseInt(resp.total)
                    this.movie.loading = false
                })
            },
            /**
             * 分页查询热播电视剧
             */
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
            /**
             * 分页查询电视剧
             */
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
            /**
             * 分页查询综艺热播
             */
            selectVarietyShowHotPage() {
                this.varietyShow.loading = true
                this.varietyShow.list = []
                selectSortPage({
                    current: this.varietyShow.current,
                    size: this.varietyShow.size,
                    type: this.varietyShow.type
                }).then(resp => {
                    this.varietyShow.list = resp.records
                    this.varietyShow.current = parseInt(resp.current)
                    this.varietyShow.total = parseInt(resp.total)
                    this.varietyShow.loading = false
                })
            },
            /**
             * 分页查询综艺视频
             */
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
            /**
             * 分页查询动漫
             */
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
            /**
             * 根据不同视频类型，处理页码变化
             * @param type
             */
            sizeChange(type) {
                switch (type) {
                    case this.movie.movieHotType:
                        this.selectMovieHotPage(this.movie.movieHotType)
                        break
                    case this.movie.movieRecentType:
                        this.selectMovieHotPage(this.movie.movieRecentType)
                        break
                    case this.varietyShow.type:
                        this.selectVarietyShowHotPage()
                        break
                    case this.tvHot.type:
                        this.selectTvHotPage()
                        break
                }
            },
            /**
             * 切换子分类
             * @param type
             */
            switchTV(type) {
                if(type === this.tvHot.type) {
                    this.selectTvHotPage()
                } else if(type === this.movie.movieHotType) {
                    this.selectMovieHotPage(this.movie.movieHotType)
                } else if(type === this.movie.movieRecentType) {
                    this.selectMovieHotPage(this.movie.movieRecentType)
                }else if(type === this.movie.movieTopType) {
                    this.selectMovieHotPage(this.movie.movieTopType)
                } else {
                    this.selectByTvPage()
                }
            }
        },
        created() {
            //分页查询热映电影
            this.selectMovieHotPage(this.movie.movieHotType)
            //分页查询热播电视剧
            this.selectTvHotPage()
            //分页查询热播
            this.selectVarietyShowHotPage()
            //分页查询动漫
            this.selectByAnimePage()
        }
    }
</script>

<style scoped>
</style>
