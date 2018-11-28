import VueRouter from 'vue-router';//路由

//引入路由匹配对应的组件
import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import shopcar from './components/tabbar/shopcar.vue';
import search from './components/tabbar/search.vue';
import newslist from './components/news/newslist.vue';
import newsdetail from './components/news/newsdetail.vue';
import photolist from './components/photo/photolist.vue';

var router=new VueRouter({//定义路由匹配
    routes:[
        {path:"/",redirect:'/home'},
        {path:"/home",component:home},
        {path:"/member",component:member},
        {path:"/shopcar",component:shopcar},
        {path:"/search",component:search},
        {path:"/home/newslist",component:newslist},
        {path:"/home/newsdetail/:id",component:newsdetail},
        {path:"/home/photolist",component:photolist}
    ],
    'linkActiveClass':'mui-active'//修改路由匹配到的默认类，修改为mui的类
});

export default router;