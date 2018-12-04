<template>
    <div class="photo-container">
        <h2 class="title">{{photoInfo.title}}</h2>
        <p class="subtitle">
            <span>发表事件：{{photoInfo.add_time|dateFormat}}</span>
            <span class="click">点击{{photoInfo.click}}次</span>
        </p>
        <hr>

        <vue-preview :slides="images"></vue-preview>

        <div class="content" v-html="photoInfo.content">
            
        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../common/comment.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,//设置id属性，保存当前图片的id
                photoInfo:{},//存储当前图片的详情数据
                images:[]//存储所有的缩略图
            }
        },
        created() {
            this.getImgInfo();//初始化图片的详情数据
            this.getThumbImages();//加载图片的缩略图
        },
        methods:{
            getImgInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.photoInfo=res.body.message[0];
                    }
                });
            },
            getThumbImages(){//获取图片缩略图
                this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                    console.log(res.body.message);
                    if(res.body.status==0){
                        res.body.message.forEach(ele=>{
                            console.log(ele);
                            ele.msrc=ele.src;
                            ele.w=600;
                            ele.h=400;
                        });
                        this.images=res.body.message;
                    }
                });
            }
        },
        components:{
            comment   
        }
    }
</script>

<style lang="scss" scoped>
    .photo-container{
        .title{
            text-align: center;
            padding: 5px;
            color: blue;
            font-size: 18px
        }
        .subtitle{
            color: #ccc;
            .click{
                float: right;
            }
        }
        .images img{
            width: 100%;
            padding: 5px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>