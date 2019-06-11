// import Vue from 'vue'
import router from './router'
import {selectList} from '@/api/dict.js'
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


//代码字典初始化
var dictMap = new Map();
selectList().then(resp => {
    resp.map(item=>{
        dictMap.set(item.id,item.value);
    })
    Vue.filter('dist', function (value) {
        if (!value) return ''
        return dictMap.get(value).replace("剧","")
    })
})

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
