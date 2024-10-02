<template>
    <div class="crumb">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="item,index in titles" :key="index">{{item}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 当前路由一发生变化，titles的值马上变化
            // titles的值与当前路由相关
            titles:[]
        }
    },
    watch:{
        $route:{
            immediate:true,  // 刷新页面就立即监听
            // handler（val，oldval）
            handler(){
                // 当前路由：this.$route，即在路由中配置的那些对象
                this.titles = this.$route.meta.titles
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .crumb .el-breadcrumb{
        line-height: 50px;
        font-size: 14px;
    }
</style>