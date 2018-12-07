<template>
    <div class="app-container">
        <mt-header fixed title="wenyi72-app">
            <span slot="left" v-show="flag">
                <mt-button icon="back" @click="goBack">返回</mt-button>
            </span>
        </mt-header>
        
        <router-view></router-view>
        
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getTotalNumber}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                flag:false//控制返回显示和隐藏
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        },
        watch:{//使用watch来监听路由对象
            '$route':function(newValue,oldValue){
                //console.log(newValue,oldValue);
                //如果newValue.path == /home，把flag设置为false,否则为true
                if(newValue.path=='/home'){
                    this.flag=false;
                }else{
                    this.flag=true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-container{
        padding-top: 40px;
        padding-bottom: 50px
    }
</style>