<template>
    <div class="layout-content" :class="{hasBg:$route.path==='/home'}">
        <transition name="fade-transition" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
export default {

}
</script>

<style lang = "less" scoped>

    .hasBg{
        background:url('../../assets/images/loginbg1.jpg') center top no-repeat;
        background-size: 100% 100%;
    }

    .layout-content{
        padding: 20px;
        // clac：减 号两边需要空格，否则无效 
        height: calc(100% - 124px);

    }

    .fade-transition-enter, .fade-transition-leave-to{
        opacity: 0;
        transform: translateX(20px);
    }

    .fade-transition-enter-active, .fade-transition-leave-active{
        transition: all .3s;
    }

    .fade-transition-enter-to, .fade-transition-leave{
        opacity: 1;
        transform: translateX(0px);
    }
</style>