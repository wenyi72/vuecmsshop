<template>
    <div class="home-container">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in lunbo" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul> 
    </div>
</template>

<script>
    export default{
        data(){
            return{
                lunbo:[]
            }
        },
        created() {
            //生命周期函数，当data和methods属性准备好后执行
            this.getLunbo();
        },
        methods:{
            getLunbo(){
                this.$http.get('http://127.0.0.1:3000/api/getLunbo').then(function(res){
                    if(res.body.status==0){
                        this.lunbo=res.body.message;
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .home-container{
        .mint-swipe{
            height: 200px;
            img{
                width: 100%;
                height: 100%;
            }
        }

        .mui-grid-9{
            background-color: #fff;
            .mui-table-view-cell{
                border: none;
                .mui-media-body{
                    font-size: 13px;
                }
                img{
                    width: 50%;
                }
            }
        }
    }
</style>