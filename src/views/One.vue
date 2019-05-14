<template>
    <div>
        <a-divider orientation="left">热映 </a-divider>
        <a-row :gutter="10">
            <a-col :xs="12" :sm="8" :md="7" :lg="6" :xl="5" v-for="(item,index) in hotList" :key="index">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="width: 240px">
                        <img alt="example" :src="item.cover"
                             slot="cover" height="300px"/>
                        <a-card-meta :title="item.name">
                            <!--<template slot="description">{{item.name}}</template>-->
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
        </a-row>
        <a-row>
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
                hotSize: 4,
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

</style>
