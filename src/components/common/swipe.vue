<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in lunbo" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['lunbo']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>