<template>
    <div>
        <a-divider orientation="left">
            <a-icon :type="obj.icon" theme="twoTone" twoToneColor="#eb2f96"/>
            <b class="title"> {{obj.title}}</b></a-divider>
        <a-row>
            <a-col :xs="12" :sm="8" :md="6" :lg="6" :xl="3" v-for="(item,index) in obj.list" :key="index" class="col-padding">
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
    import {
        Divider,
        Icon,
        Card,
        Row,
        Col,
        Pagination
    } from 'ant-design-vue'
    Vue.use(Divider)
    Vue.use(Icon)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Pagination)

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
        height: 20em;
    }
</style>
