<template>
    <div id="components-layout-demo-basic">
        <a-layout>
            <a-affix>
                <a-layout-header>
                    <Header/>
                </a-layout-header>
            </a-affix>
            <a-layout-content>
                <div>
                    <a-back-top/>
                    <keep-alive exclude="player">
                        <router-view/>
                    </keep-alive>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
    import Header from './Header'
    export default {
        components: {
            Header
        }
    }
</script>

<style scoped>
    #components-layout-demo-basic .ant-layout-header {
        background: #fff;
        color: #fff;
        padding: 0 20px;
    }

    #components-layout-demo-basic .ant-layout-content {
        background: #fff;
        min-height: 120px;
        margin: 0 0.3em;
    }
</style>
