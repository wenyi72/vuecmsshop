<template>
    <div class="goodslistcontainer">
        <router-link class="item" :to="'/home/goodsdetail/'+item.id" tag="div" v-for="item in goodslist" :key="item.id">
            <img v-lazy="item.img_url" alt="">
            <h2 class="title">{{item.title}}</h2>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="hot">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                goodslist:[],
                pageindex:1
            }
        },
        created() {
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(function(res){
                    if(res.body.status==0){
                        //需要拼接加载后面的数据，放在同一个数组
                        this.goodslist=this.goodslist.concat(res.body.message);
                    }
                });
            },
            loadMore(){
                this.pageindex++;
                this.getGoodsList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodslistcontainer{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 8px;
        .item{
            width: 48%;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            box-shadow: 0 0 5px #ccc;
            border-radius: 3px;
            padding: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between; 
            .title{
                font-size: 15px;
            }
            .info{
                background-color: rgba(109,103,103,0.2);
                padding: 3px 5px;
                margin: 0px;
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                    }
                    .old{
                        text-decoration: line-through;
                        margin-left: 8px;
                        font-size: 12px;
                    }
                }
                .hot{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        img{
            width: 100%;
        }
    }
</style>