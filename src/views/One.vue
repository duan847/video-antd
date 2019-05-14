<template>
    <div>
        <a-row :gutter="5">
            <a-col :xs="12" :sm="8" :md="7" :lg="6" :xl="5" v-for="(item,index) in hotList" :key="index">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 240px">
                        <img alt="example" :src="item.cover"
                             slot="cover" height="300px"/>
                        <a-card-meta title="Europe Street beat">
                            <template slot="description">{{item.name}}</template>
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {selectHotPage, selectTopPage} from '@/api/video'

    export default {
        comments: {},
        methods: {
            selectHotPage() {
                selectHotPage({size: this.hotSize}).then(resp => {
                    this.hotList = resp.records
                })
            },
            selectTopPage() {
                selectTopPage({size: this.topSize}).then(resp => {
                    this.TopList = resp.records
                })
            }
        },
        data() {
            return {
                // 浏览器可视区域大于768，跑马灯使用卡片模式
                carouselType: '',
                hotSize: 4,
                hotList: null,
                topSize: 12,
                topList: null
            }
        },
        created() {
            //分页查询热播电影
            this.selectHotPage()
            this.selectTopPage()
        },
        mounted() {
            // 获取浏览器可视区域宽度
            const clientWidth = `${document.documentElement.clientWidth}`
            if (clientWidth > 768) {
                this.carouselType = 'card'
            }
        },
    }
</script>

<style scoped>

</style>
