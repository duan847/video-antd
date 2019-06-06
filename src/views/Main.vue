<template>
    <div id="components-layout-demo-basic">
        <a-locale-provider :locale="zh_CN">
            <a-layout>
                <a-affix>
                    <a-layout-header>
                        <Header/>
                    </a-layout-header>
                </a-affix>
                <a-layout-content>
                    <div>
                        <SocketIM/>
                        <!--<a-back-top/>-->
                        <!--<keep-alive exclude="player">-->
                            <!--<router-view/>-->
                        <!--</keep-alive>-->
                    </div>
                </a-layout-content>
                <a-layout-footer><Footer/></a-layout-footer>
            </a-layout>
        </a-locale-provider>
    </div>
</template>

<script>
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';

    moment.locale('zh-cn');
    import Header from './Header'
    import Footer from './Footer'
    import SocketIM from '@/components/SocketIM'
    export default {
        data() {
            return {
                zh_CN,
            }
        },
        components: {
            Header,Footer,SocketIM
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
