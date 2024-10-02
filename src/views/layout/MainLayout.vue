<template>
    <div class="layout">
        <NavBar></NavBar>
        <div class="layout-right">
            <HeaderView></HeaderView>
            <ContentView></ContentView>
        </div>
    </div>
</template>

<script>
import ContentView from "@/views/layout/ContentView.vue";
import NavBar from "@/views/layout/NavBar.vue";
import HeaderView from "@/views/layout/HeaderView.vue";
export default {
    name:"MainLayout",
    data() {
        return {
            
        }
    },
    components:{
        ContentView,
        NavBar,
        HeaderView
    }
}
</script>

<style lang="less" scoped>
    .layout {
        width: 100%;
        height: 100%;
        display:flex;
        .layout-right {
            padding-left:220px ;
            flex:1 // 表示该元素在一个弹性容器内会占据所有剩余的空间
        }
    }


</style>