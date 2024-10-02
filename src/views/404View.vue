<template>
    <p>找不到页面,正在为你返回首页{{ pnts }}</p>
</template>

<script>
export default {
    data() {
        return {
            pnts:''
        }
    },
    created(){
        console.log("进入404");
        let t = setInterval(()=>{
            this.pnts += '..';
            if(this.pnts.length === 10){
                clearInterval(t);
            }
        },400)
        setTimeout(() => {
            this.$router.push('/');
        },2000)
    }
}
</script>

<style>

</style>