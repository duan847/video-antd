<template>
    <div>
        <a-divider orientation="left">
            <a-icon :type="obj.icon" theme="twoTone" twoToneColor="#eb2f96"/>
            <b class="title"> {{obj.title}}</b> &nbsp;<a @click="switchClassify(item)" v-for="(item,index) in obj.classify" :disabled="obj.type === item.key ? true : false" :key="index">{{item.key | dist}}<a-divider type="vertical"  v-if="obj.classify.length - 1 !== index"/></a>
        </a-divider>
<!--        没有数据时显示加载中-->
                <a-row  v-if="obj.loading">
                    <a-col :xs="8" :sm="6" :md="4" :lg="4" :xl="2" v-for="(index) in obj.size" :key="index" class="col-padding">
                        <a-card :bodyStyle="{padding:'0.52em 0.1em'}">
                            <div slot="cover" class="cover" >
                                <a-spin />
                                <div class="remarks"></div>
                            </div>
                            <span :slot="title">&nbsp;</span>
                        </a-card>
                    </a-col>
                </a-row>
        <a-row>
            <a-col :xs="8" :sm="6" :md="4" :lg="4" :xl="2" v-for="(item,index) in obj.list" :key="index" class="col-padding">
                <router-link :to="{ name: 'player', params: { id: item.id }}">
                    <a-card hoverable :bodyStyle="{padding:'0.7em 0.1em'}" >
                        <div slot="cover" class="cover" >
                            <img alt="图片" v-lazy="item.cover" class="img" />
                                                    <div class="remarks" >
                                      {{item.remarks}}</div>
                        </div>
                        <a-card-meta :title="item.name"/>
                    </a-card>
                </router-link>
            </a-col>
<!--            <a-spin v-if="obj.loading"/>-->
        </a-row>
        <a-row v-if="obj.showPagination && obj.total > obj.size">
            <a-pagination :pageSize.sync="obj.size" v-model="obj.current" :total="obj.total" @change="sizeChange" class="load-more"/>
        </a-row>
        <a-row v-if="obj.showMore && obj.total > obj.size">
            <div v-if="!obj.loading" class="load-more">
                <router-link :to="{ path: 'search', query: { type: obj.type }}">
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
            },switchClassify(item){
                this.obj.type = item.key
                this.obj.showPagination = item.value.showPagination
                this.obj.showMore = item.value.showMore
                this.$parent.switchTV(this.obj.type);
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
        margin-top: 3px;
        margin-bottom: 12px;
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
