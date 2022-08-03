<template>
    <div class="notFound">
        <img :src="imgUrl" alt="">
        <h1>404 Not Found, 你的页面走丢了!</h1>
    </div>
</template>
<script>
export default {
    name:'404',
    data(){
        return {
            imgUrl: require('../assets/logo.png')
        }
    }
}
</script>
<style>
.notFound{
    width:100%;
    text-align: center
}
</style>