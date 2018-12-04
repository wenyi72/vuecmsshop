import Vue from 'vue';//引入Vue框架

import VueResource from 'vue-resource';//此模块用于发送ajax请求
Vue.use(VueResource);//安装到vue的身上

Vue.http.options.root="http://127.0.0.1:3000/";
//Vue.http.options.emulateJSON=true;//设置全局post请求体，默认post表单传递数据

import VueRouter from 'vue-router';//引入vue-router路由
Vue.use(VueRouter);//安装到vue身上去

import { Tab, Tabs } from 'vant';//引入vant标签页组件
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);

import moment from 'moment';
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dateStr).format(pattern);
});

import router from './router.js';//引入路由模块，获取对象

import {Header,Button} from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name,Header);

import { Swipe, SwipeItem, Lazyload } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);//懒加载组件

import './lib/mui/css/mui.min.css';//css组件

import './lib/mui/css/icons-extra.css';//文字组件

import VuePreview from 'vue-preview';//引入图片预览组件
Vue.use(VuePreview);

import app from './app.vue'//app.vue根组件
new Vue({
    el:"#app",
    //return:c=>c(app),
    render:function(c){
    return c(app);
    },
    router:router
});