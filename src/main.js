import Vue from 'vue';//引入Vue框架

import Vuex from 'vuex';//导入vuex组件
Vue.use(Vuex);//显示安装到vue身上去

var cartData=JSON.parse(localStorage.getItem('cartData')||'[]');//一开始就要获取从本地存储获取购物车中的商品
var store=new Vuex.Store({//引入我们实vuex实现组件的数据共享
    //state共享数据
    state:{
        cartData:cartData//这里购物车数据应该从本地获取，里面的商品对象{id,number,price,selected}
    },
    mutations:{//属性mutations专门用来实现修改state中的数据，这是唯一方法
        add(state,data){
            var flag=false;//默认没有相同的商品
            state.cartData.forEach(function(item,index){//如果有相同商品，数量data.number个，数字最好转化为整形
                if(item.id==data.id){
                    //找到相同商品，数量增加data.number个，数字最好转化为整形
                    item.number=parseInt(data.number)+parseInt(item,number);
                    flag=true;//找到相同商品，把标识改为true
                }
            });
            if(flag==false){
                state.cartData.push(data);//上面循环没有找到相同商品，则添加一个商品
            }
            localStorage.setItem('cartData',JSON.stringify(state.cartData));//要把商品写入本地存储(只能存储字符串类型)
        },
        changeSelected(state,obj){
            state.cartData.forEach(function(item,index){//找到对应的商品id,修改带过来的状态
              if(item.id==obj.id){
                item.selected=obj.selected;
              }
            })
            localStorage.setItem('cartData',JSON.stringify(state.cartData));//需要同步到本地存储
        },
        del(state,id){//删除购物车中的商品
            state.cartData.forEach(function(item,index){
                if(item.id==id){//找到要删除的商品的id
                    state.cartData.splice(index,1);//删除当前的id元素 arr.splice(索引，删除的长度)，  索引从自己开始
                }
                localStorage.setItem('cartData',JSON.stringify(state.cartData));//同步到本地存储
            });
        },
        changeNumber(state,obj){
            state.cartData.forEach(function(item,index){//修改数量
                if(item.id==obj.id){
                    item.number=obj.number;//找到了对应的商品id，需要数量
                }
            });
            localStorage.setItem('cartData',JSON.stringify(state.cartData));//需要同步到本地存储
        }
    },
    getters:{//只要是vuex向外提供数据，建议getters把暴露给外的数据进行一层封装
        getTotalNumber(state){//算出商品的总数量
            var totalNumber=0;
            state.cartData.forEach(function(item,index){
                totalNumber+=parseInt(item.number);
            })
            return totalNumber;//返回外面所需要的值
        },
        getGoodsIds(state){//获取购物车商品的字符串ids
            var ids=[];
            state.cartData.forEach(function(item,index){
                ids.push(item.id);
            })
            return ids.join(',');
        },
        getGoodsNumber(state){//获取购物车商品id和对数量的对象{商品id:商品数量}
            var obj={};
            state.cartData.forEach(function(item,index){
                obj[item.id]=item.number;
            });
            return obj;
        },
        getGoodsSelected(state){//获取商品的选中状态 {商品id:商品选中状态}
            var obj = {};
            state.cartData.forEach(function(item,index){
            obj[item.id] = item.selected;
            });
            return obj;
        },
        getSelectGoodsInfo(state){//获取购物车选中商品的总数量和价格
            var obj = {
                selectedNumber:0,
                selectedPrice:0
            }
            state.cartData.forEach(function(item,index){
                if(item.selected == true){//判断是否选中
                    obj['selectedNumber'] += parseInt(item.number);
                    obj['selectedPrice'] += parseInt(item.price)*parseInt(item.number);
                }
            })
            return obj;
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

import { Swipe, SwipeItem, Lazyload, Switch } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);

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