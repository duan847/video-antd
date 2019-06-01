// import Vue from 'vue'
import router from './router'
import {
    Layout,
    Card,
    Col,
    Row,
    Affix,
    Input,
    Avatar,
    Pagination,
    Divider,
    Tabs,
    Button,
    message,
    List,
    Spin,
    Icon,
    BackTop,
    Tooltip,
    LocaleProvider
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
Vue.use(Avatar)
Vue.use(Pagination)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(Button)
Vue.use(List)
Vue.use(Spin)
Vue.use(Icon)
Vue.use(BackTop)
Vue.use(Tooltip)
Vue.use(LocaleProvider)

//图片懒加载
Vue.use(VueLazyload)

Vue.filter('dist', function (value) {
    if (!value) return ''
    switch (value) {
        case 128:
            return '热映'
        case 129:
            return '经典'
        case 131:
            return '热播'
        case 132:
            return '热播'
        case 12:
            return '国产'
        case 14:
            return '港台'
        case 8:
            return '欧美'
        case 7:
            return '日韩'
    }
})
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
