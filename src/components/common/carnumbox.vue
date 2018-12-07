<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1">
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" ref="number" :value="goods_number" @change="changeNumber"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
    export default {
        mounted() {//在mounted生命周期中进行数字输入框的初始化操作
            mui('.mui-numbox').numbox();
        },
        props:['goods_number','id'],//接受父传过来的商品的数量和商品id
        methods:{
            changeNumber(){//修改购物车商品的数量
                var number=this.$refs.number.value;//获取数字输入框的数字,给input绑定一个ref属性，通过
                //console.log('数量：'+number,"id"+this.id);
                this.$store.commit('changeNumber',{id:this.id,number:number});//调用mutations中的方法，把数量同步到本地存储
            }
        }
    }
</script>

<style scoped>

</style>