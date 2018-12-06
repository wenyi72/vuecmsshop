<template>
    <div class="shopcar-container">
        <div class="mui-card" v-for="(item,index) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path"  />
                    <div>
                        <h3 class="title">{{item.title}}</h3>
                        <div class="info">
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox :goods_number="$store.getters.getGoodsNumber[item.id]" :id="item.id"></numbox>
                            <a href="#" class="del" @click.prevent="delCarGoods(item.id,index)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">
                 <div class="mui-card-content-inner jiesuan">
                     <div class="info">
                        <p>总计（不含运费）</p>
                        <p class="you">已勾选商品<span class="number">{{$store.getters.getSelectGoodsInfo['selectedNumber']}}</span>,总价<span class="price">¥{{ $store.getters.getSelectGoodsInfo['selectedPrice'] }}</span></p>
                     </div>
                     <mt-button type="danger">结算</mt-button>
                </div>
            </div>
		</div>
        <hr>
        <p>{{$store.getters.getGoodsNumber}}</p>
        <p>{{$store.getters.getGoodsSelected}}</p>
        <p>{{$store.getters.getSelectGoodsInfo}}</p>
    </div>
</template>

<script>
import numbox from "../common/carnumbox.vue";
    export default{
        data(){
            return{
                //flag:true,
                goodsList:[]
            }
        },
        created() {//初始化购物车商品数据
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){//获取购物车商品
                var ids=this.$store.getters.getGoodsIds;//先获取到购物车商品的id
                if(ids==''){//如果购物车没有数据，则不发生ajax请求
                    return;
                }
                this.$http.get('api/getshopcarlist/'+ids).then(function(res){
                    if(res.body.status==0){
                        this.goodsList=res.body.message;
                    }
                });
            },
            changeSelected(id,selected){//购物车商品的switch开关切换事件
                console.log(id,selected);
                this.$store.commit('changeSelected',{id:id,selected:selected});//调用mutations中的方法，修改商品的选中状态
            },
            delCarGoods(id,index){//删除购物车的商品
                this.goodsList.splice(index,1);//重新渲染数据，删除goodslist中商品
                this.$store.commit('del',id);//同步到本地存储
            }
        },
        components:{
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.shopcar-container {
  .mui-card-content-inner{
    display: flex;
    .title{
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .price{
        color:red;
      }

      .del{
        margin-left: 3px;
      }
    }
    img{
      width: 60px;
      height: 60px;
      margin-right: 10px;
      margin-left: 10px;
    }
  }


   .jiesuan{
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info {
        display:flex;
        flex-direction: column;
        .you{
          margin-left: 10px;
        }
        .number{
          color:red;
          font-weight: bold;
        }
        .price{
          color:red;
          font-weight: bold;
        }
      }
    }
}
</style>