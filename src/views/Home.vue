<template>
    <div id="components-layout-demo-basic">
        <a-layout>
            <a-affix>
                <a-layout-header>
                    <Header/>
                </a-layout-header>
            </a-affix>
            <a-layout-content><div>
                <a-back-top />
                <router-view></router-view>
            </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
    import Header from './Header'

    export default {
        data() {
            return {
                top: 10,
                bottom: 10,
            }
        },
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

    #components-layout-demo-basic > .ant-layout {
        margin-bottom: 48px;
    }

    #components-layout-demo-basic > .ant-layout:last-child {
        margin: 0;
    }
</style>
