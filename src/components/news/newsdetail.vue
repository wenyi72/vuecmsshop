<template>
    <div class="detail-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <div class="subtitle">
            <span>发布时间：{{newsInfo.add_time|dateFormat}}</span>
            <span class="click">点击{{newsInfo.click}}次</span>
        </div>
        <hr>

        <div class="content" v-html="newsInfo.content"></div>

        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../common/comment.vue'
    export default{
        data(){
            return {//把当前文章id进行保存
                id:this.$route.params.id,
                newsInfo:{}
            }
        },
        created() {
            this.getNewsInfo();//初始化请求
        },
        methods:{
            getNewsInfo(){//发送ajax请求，获取新闻资讯详情
                this.$http.get('api/getnew/'+this.id).then(function(res){
                    if(res.body.status==0){//赋值给data的comments属性
                        this.newsInfo=res.body.message[0];
                    }
                });
            }
        },
        components:{
            comment   
        }
    }
</script>

<style lang='scss' scoped>
    .detail-container{
        padding: 0 10px;
        .title{
            font-size: 16px;
            color: black;
            text-align: center;
            padding: 10px 0;
        }

        .subtitle{
            color: blue;
            font-size: 13px;
            .click{
                float: right
            }
        }
    }
    .detail-container /deep/ img{
        width: 100%;
    }
</style>