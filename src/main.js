// import Vue from 'vue'
import router from './router'
import {
    Layout,
    Card,
    Col,
    Row,
    Affix,
    Input,
    Badge,
    Avatar,
    Pagination,
    Divider,
    Tabs,
    Button,
    message,
    List,
    Spin,
    Icon,
    BackTop
} from 'ant-design-vue'
import App from './App'
Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.use(Layout)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Affix)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Avatar)
Vue.use(Pagination)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(Button)
Vue.use(List)
Vue.use(Spin)
Vue.use(Icon)
Vue.use(BackTop)

//图片懒加载
Vue.use(VueLazyload)


new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
