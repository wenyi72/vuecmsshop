<template>
    <div class="photo-container">
        <h2 class="title">{{photoInfo.title}}</h2>
        <p class="subtitle">
            <span>发表事件：{{photoInfo.add_time|dateFormat}}</span>
            <span class="click">点击{{photoInfo.click}}次</span>
        </p>
        <hr>
        <div class="images">
            <img src="http://phvbk3pna.bkt.clouddn.com/xibanya.jpg" alt="">
        </div>
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
                photoInfo:{}//存储当前图片的详情数据
            }
        },
        created() {
            this.getImgInfo();
        },
        methods:{
            getImgInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.photoInfo=res.body.message[0];
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