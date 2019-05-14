<template>
    <div id="components-layout-demo-basic">
        <a-layout>
            <a-affix>
                <a-layout-header>
                    <Header></Header>
                </a-layout-header>
            </a-affix>
            <a-layout-content>
                <router-view></router-view>
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
    #components-layout-demo-basic .ant-layout-header,
    #components-layout-demo-basic .ant-layout-footer {
        background: #fff;
        color: #fff;
    }

    #components-layout-demo-basic .ant-layout-footer {
        line-height: 1.5;
    }

    #components-layout-demo-basic .ant-layout-content {
        min-height: 120px;
        line-height: 120px;
    }

    #components-layout-demo-basic > .ant-layout {
        margin-bottom: 48px;
    }

    #components-layout-demo-basic > .ant-layout:last-child {
        margin: 0;
    }
</style>
