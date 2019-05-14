import Vue from 'vue'
import router from './router'
import {Layout} from 'ant-design-vue'
import {Card} from 'ant-design-vue'
import {Col} from 'ant-design-vue'
import {Row} from 'ant-design-vue'
import {Affix} from 'ant-design-vue'
import {Input} from 'ant-design-vue'
import {Badge} from 'ant-design-vue'
import {Avatar} from 'ant-design-vue'
import {Pagination} from 'ant-design-vue'
import {Divider} from 'ant-design-vue'
import App from './App'
Vue.config.productionTip = false

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

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
