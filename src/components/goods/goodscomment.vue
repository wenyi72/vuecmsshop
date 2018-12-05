<template>
    <div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from "../common/comment.vue";
    export default {
        data(){
            return{
                id:this.$route.params.id
            }
        },
        components:{
            comment
        }
    }
</script>

<style scoped>

</style>