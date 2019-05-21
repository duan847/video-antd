// import Vue from 'vue'
import router from './router'
import { message } from 'ant-design-vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$message = message;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
