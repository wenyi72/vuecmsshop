<template>
    <div class="goodsdetailcontainer">
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swipe :lunbo="lunbo"></swipe>
				</div>
			</div>
		</div>
        <div class="mui-card">
			<div class="mui-card-header">
				{{goodsInfo.title}}
			</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>
						<span class="market">市场价:￥{{goodsInfo.market_price}}</span>
						<span class="now">本店价:￥{{goodsInfo.sell_price}}</span>
					</p>
					<div>
						<span class="number">购买数量:</span>
						<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
							<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
							<input id="test" class="mui-input-numbox" type="number" value="5" />
							<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
						</div>
					</div>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" class="mai">立即购买</mt-button>
				<mt-button type="danger">加入购物车</mt-button>
			</div>
		</div>
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>
						商品货号:{{goodsInfo.goods_no}}
					</p>
					<p>
						库存情况:{{goodsInfo.stock_quantity}}件
					</p>
					<p>
						上架时间:{{goodsInfo.add_time|dateFormat}}
					</p>
				</div>
			</div>
		</div>
		<div class="mui-card-footer btn">
			<mt-button type="primary" size="large" class="text" >图文介绍</mt-button>
			<mt-button type="danger" size="large">商品评论</mt-button>
		</div>
    </div>
</template>

<script>
import swipe from "../common/swipe.vue";
import mui from "../../lib/mui/js/mui.js";
    export default {
			data(){
				return{
					id:this.$route.params.id,
					lunbo:[],
					goodsInfo:{}
				}
			},
			components:{
				swipe
			},
			created(){
				this.getGoodsLunbo();//初始化获取轮播图数据
				this.getGoodsInfo();//获取商品的详情
			},
			mounted() {
				mui('.mui-numbox').numbox();
			},
			methods:{
				getGoodsLunbo(){
					this.$http.get('api/getthumbimages/'+this.id).then(function(res){
						if(res.body.message.length==0){//赋值给data的comments属性
							//this.newsInfo=res.body.message[0];
							res.body.message.push({//设置默认图片，追求一个对象
								img:"http://phvbk3pna.bkt.clouddn.com/huawei.png",
								url:"http://phvbk3pna.bkt.clouddn.com/huawei.png"
							});
						}else{
							//由于轮播图子组件中的每个对象需要img和url属性，所以需要构造两个数据
							res.body.message.forEach(ele=>{
								ele.img=ele.src;
								ele.url=ele.src;
							});
						}
						this.lunbo=res.body.message;//赋值给当前data是lunbo属性
					});
				},
				getGoodsInfo(){
					this.$http.get('api/getgoodsinfo/'+this.id).then(function(res){
						if(res.body.status==0){
							this.goodsInfo=res.body.message[0];
						}
					});
				}
				/*getGoodsDesc(){
					this.$router.push('/home/goodsdesc/'+this.id);
				}*/
			}
    }
</script>

<style lang="scss" scoped>
	.goodsdetailcontainer{
    p{
      font-size: 16px;
    }
    .number{
      color: #888;
    }
    .market{
      text-decoration: line-through;
    }
    .now{
      color:red;
      font-weight: bold;
      margin-left:5px;
    }

    .mui-card-footer{
      display: flex;
      justify-content: flex-start;
      .mai{
        margin-right: 5px;
      }
     
    }

     .btn{
        display: flex;
        flex-direction: column;
      }

      .text{
        margin-bottom:5px;
      }
  }
</style>