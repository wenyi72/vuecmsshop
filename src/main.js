import Vue from 'vue';//引入Vue框架

import Vuex from 'vuex';//导入vuex组件
Vue.use(Vuex);//显示安装到vue身上去

var store=new Vuex.Store({//引入我们实vuex实现组件的数据共享
    //state共享数据
    state:{
        cartData:[],//这里购物车数据应该从本地获取，里面的商品对象{id,number,price,selected}
        price:100//要获取这里的共享，需要通过this.$store.state.***
    },
    mutations:{//属性mutations专门用来实现修改state中的数据，这是唯一方法
        change(state,obj){//里面所有的函数第一个数一定是state，这是固定写法
            console.log(obj);
            state.price=obj.newPrice+obj.new2Price;
        }
    },
    getters:{//只要是vuex向外提供数据，建议getters把暴露给外的数据进行一层封装
        getPrice(state){
            return state.price;
        }
    }
});

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
    router:router,//把路由匹配对象挂在vm实例身上
    store//把数据共享仓库vuex挂载我们实例身上
});