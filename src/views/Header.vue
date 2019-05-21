<template>
    <div>
        <a-row>
            <a-col :xs="6" :sm="6" :md="6" :lg="6" :xl="8" @click="home" class="logo" >
                <img src="../assets/logo.png" style="width: 80px" alt="首页"/>
            </a-col>
            <a-col :xs="14" :sm="10" :md="12" :lg="9" :xl="6">
                <a-input-search
                        placeholder="搜索" @search="onSearch"
                />
            </a-col>
            <a-col :xs="4" :sm="6" :md="4" :lg="3" :xl="10">
                <span style="float:right">
                    <a-badge dot><a-avatar shape="square" icon="user"/></a-badge>
                </span>
            </a-col>
            <a-divider/>
        </a-row>

    </div>
</template>

<script>
    import {
        Row,
        Col,
        Input,
        Badge,
        Avatar,
        Divider
    } from 'ant-design-vue'
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Input)
    Vue.use(Badge)
    Vue.use(Avatar)
    Vue.use(Divider)

    import bus from '../eventBus.js'
    export default {
        data(){
            return {
                logo : '../../assets/img/login.png'
            }
        },
        methods: {
            home(){
                this.$router.push({name: "one"})
            },
            onSearch (text) {
                if(text) {
                    bus.$emit('eventBus', text)
                    this.$router.push({name: "three", params: {"text": text}})
                }
            },
        },
    }
</script>

<style scoped>
    .ant-layout-header {
        background: #7dbcea;
        padding:0 20px;
    }
    .logo{
        cursor:pointer
    }
</style>
