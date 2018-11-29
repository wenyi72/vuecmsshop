<template>
    <div>
        <van-tabs v-model="active" @click="getCatImages">
            <van-tab v-for="item in cats" :key="item.id" :title="item.title">
                <div class="photolist">
                    <router-link class="item" tag="li" :to="'/home/photodetail/'+item.id" v-for="item in images" :key="item.id">
                        <img v-lazy="item.img_url">
                        <div class="info">
                            <div class="info-title">{{item.title}}</div>
                            <div class="info-body">{{item.zhaiyao}}</div>
                        </div>
                    </router-link>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                cats:[],//存储标签页分类的名称
                active:0,//默认选中的标签页
                images:[]
            }
        },
        created() {
            this.getImgCat();//初始化标签页的数据
            this.getCatImages(0,'全部');//初始化标签页为全部图片数据
        },
        methods:{
            getImgCat(){//发送Ajax获取图片标签分类名称
                this.$http.get('api/getimgcategory').then(function(res){
                    if(res.body.status==0){
                        this.cats=res.body.message;
                        this.cats.unshift({id:0,title:'全部'});
                    }
                });
            },
            getCatImages(index,title){//标签页点击事件
                console.log(this.cats.length);
                var id=this.cats.length==0?0:this.cats[index].id;
                this.$http.get('api/getcatimages/'+id).then(function(res){
                    if(res.body.status==0){
                        this.images=res.body.message;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .photolist{
        padding: 5px 10px;
        li{
            background-color: #ccc;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0px 0px 20px #aaa;
            position: relative;
            img{
                width: 100%;
                height: 280px;
            }

            .img[lazy=loading]{
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info{
                position: absolute;
                bottom: 0px;
                color: white;
                background-color: rgba(0, 0, 0, 0.5);
                .info-title{
                    font-size: 15px;
                }
                .info-body{
                    font-size: 12px;
                }
            }
        }
        
    }
</style>