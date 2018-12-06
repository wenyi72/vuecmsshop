<template>
    <div>
        <div class="mui-numbox">
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" :value="goods_number" />
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
    export default {
        mounted() {
            mui('.mui-numbox').numbox();
        },
        props:['goods_number']
    }
</script>

<style scoped>

</style>