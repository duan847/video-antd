<template>
    <div>
        <a-divider orientation="left">
            <a-icon :type="obj.icon" theme="twoTone" twoToneColor="#eb2f96"/>
            <b class="title"> {{obj.title}}</b></a-divider>
        <a-row>
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in obj.list" :key="index" class="col-padding">
                <router-link :to="{ name: 'two', params: { id: item.id }}">
                    <a-card style="">
                        <img alt="example" :src="item.cover" slot="cover" class="img"/>
                        <a-card-meta :title="item.name">
                            <!--<template slot="description">{{item.name}}</template>-->
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
            <a-spin v-if="obj.loading"/>
        </a-row>
        <a-row style="text-align: center" v-if="obj.showPagination && obj.total > obj.size">
            <a-pagination :pageSize.sync="obj.size" v-model="obj.current" :total="obj.total" @change="sizeChange"/>
        </a-row>
        <a-row style="text-align: center" v-if="obj.showMore && obj.total > obj.size">
            <div v-if="!obj.loading" class="load-more">
                <router-link :to="{ name: 'three', params: { type: obj.type }}">
                    <a-button type="dashed">查看更多</a-button>
                </router-link>
            </div>
        </a-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newData: {}
            }
        },
        props:["obj"],
        methods: {
            sizeChange(page) {
                this.obj.current = page
                this.$parent.sizeChange(this.obj.type);
            }
        },watch: {
            chartData: function(newVal){
                window.console.log(newVal)
                this.newData = newVal;
            }
        }
    }
</script>

<style scoped>
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
        height: 25em;
    }
</style>