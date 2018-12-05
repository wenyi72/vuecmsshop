<template>
    <div class="comment">
        <h2 class="title">发表评论</h2>
        <textarea cols="30" rows="10" placeholder="输入填写的内容（最多120字）" v-model="content"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="list">
            <div class="list-item" v-for="(item,index) in comments" :key="index">
                <div class="user">第{{index+1}}楼用户：{{item.user_name}} 发表时间：{{item.add_time|dateFormat}}</div>
                <div class="content">
                    {{item.content}}
                </div>
            </div>
            <mt-button type="danger" plain size="large" @click="loadMore">加载更多</mt-button>
        </div>
    </div> 
</template>

<script>
import { Toast } from 'mint-ui';//引入弹框提示组件
    export default {
        data(){
            return {
                content:'',
                pageindex:1,//默认加载第一页的评论数据
                comments:[]//保存评论的数据
            }
        },
        props:['id'],
        created() {
            this.getComments()//初始化获取评论的数据
        },
        methods:{
            getComments(){//获取当前文章的评论数据,id是父给子传递
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(function(res){
                    if(res.body.status==0){
                        if(res.body.message.length==0){
                            Toast('没有更多');
                        }
                        //this.comments=res.body.message;
                        this.comments=this.comments.concat(res.body.message);
                    }
                });
            },
            postComment(){//发表评论文章
                if(this.content.trim()==''){
                    Toast('不能为空！');
                    return;
                }
                //post第二个评论参数post请求体参数，第三个模拟post表单传递数据（也可全局）
                this.$http.post('api/postComment/'+this.id,{content:this.content},{emulateJSON:true}).then(function(res){
                    if(res.body.status==0){
                        Toast('评论成功');
                        //this.comments.push({add_time:Date.now(),content:this.content});//把当前的评论数据放在数组的末端
                        this.content='';//清空评论的信息
                        this.comments=[];//清空数据
                        this.pageindex=1;//把页码重置为1
                        this.getComments();//重新加载最新的评论信息
                    }
                });
            },
            loadMore(){//点击加载更多评论
                this.pageindex++;//页面进行+1
                this.getComments();//调用getComments获取最新的评论数据
            }
        }

    }
</script>

<style lang="scss" scoped>
.comment{
    .title{
        font-size: 18px
    }
    textarea{
        height: 130px
    }
    .list{
        padding: 5px 0px;
        .list-item{
            padding: 5px 1px;
            .user{
                background-color: #ccc;
                font-size: 12px
            }
        }
    }
}
</style>