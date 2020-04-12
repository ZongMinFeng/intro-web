import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './icons' // icon
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css'
// import './components/common/directives';
import 'babel-polyfill'
import store from './store'

import Router from 'vue-router'

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
};

// 拖拽el-dialog
import './directives'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.use(VueDirectiveImagePreviewer);

// 图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(preview);


Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
//设置axios超时时间10秒
axios.defaults.timeout = 10000
//原型上挂在axios,便于全局使用
Vue.prototype.$axios = axios

Vue.use(Mint);

//使用mockjs模拟数据
import './mock/index';

import {Toast} from 'mint-ui';

Vue.prototype.Toast = Toast;

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const loginFlag = store.state.loginFlag;
    if (!loginFlag && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
