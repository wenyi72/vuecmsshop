<template>
    <div>
        <h1>member组件
            <hr>
            共享的价格：{{$store.state.price}}
            <button @click="changePrice">改变价格</button>
        </h1>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                price:this.$store.state.price
            }
        },
        methods:{
            changePrice(){
                //this.$store.state.price=200;
                //调用vuex中的mutations中的方法才可以修改数据
                this.$store.commit('change',{newPrice:500,new2Price:1000});
            }
        }
    }
</script>

<style scoped>

</style>