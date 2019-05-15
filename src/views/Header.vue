<template>
    <div>
        <a-row :gutter="10">
            <a-col :xs="4" :sm="6" :md="6" :lg="6" :xl="8">
                <router-link :to="{ name: 'one'}">首页</router-link>
            </a-col>
            <a-col :xs="16" :sm="10" :md="12" :lg="9" :xl="6">
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
    import bus from '../eventBus.js'
    export default {
        methods: {
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
    }
</style>
