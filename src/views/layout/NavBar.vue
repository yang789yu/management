<template>
    <!-- :class 布尔值为真表示有该类，布尔值为假表示无该类 -->
    <div class="navbar" :class="{isColl:isCollapse}">

        <h1 class="mainLogo">
            <img src="../../assets/logo.png" alt="" width="32">
            <span v-show="!isCollapse">通用后台管理系统</span>
        </h1>

        <!--
            @open="handleOpen"
            @close="handleClose"
            unique-opened="true" // 控制是否展开一个子项
         -->
        <el-menu
            :router="true"
            default-active="3"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"   
            active-text-color="#ffd04b">

            <div v-for="item, idx in menuData" :key="idx">
                <el-submenu :index="item.path" v-if="item.children">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item :index="sitem.path" v-for="sitem, sidx in item.children" :key="sidx">{{ sitem.title }}</el-menu-item>
                </el-submenu>
                
                <el-menu-item :index="item.path" v-else>
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </div>




        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"NavBar",
    data() {
        return {
            menuData:[
                {
                    title:"首页",
                    path:"/"
                },
                {
                    title:"客户管理",
                    path:"/customer",
                    children:[
                        {title:"客户档案",path:"/customer/customer"},
                        {title:"拜访记录",path:"/customer/visit"}
                    ]
                },
                {
                    title:"修养预约",
                    path:"/business",
                    children:[
                        {title:"预约信息",path:"/business/appointment"},
                        {title:"服务项",path:"/business/service"},
                        {title:"结算单",path:"/business/statement"},
                    ]
                },
                {
                    title:"审核管理",
                    path:"/flow",
                    children:[
                        {title:"审核流程定义",path:"/flow/definition"}
                    ]
                }
            ]
        }
    },
    computed:{
        ...mapState({
            isCollapse:state=>state.navCollapse.isCollapse
        })
    }
}
</script>

<style lang="less" scoped>
    .navbar {
        width: 220px;
        height: 100%;
        position: relative;  //表示元素相对于其正常位置进行定位,提升该元素的层级
        background-color: #304156;
        transition: all .3s;   // 过渡效果
        box-shadow: 6px 0 5px #ccc; //表示在元素上添加一个阴影。
        .el-menu {
            border:none
        }

        // 表示同时拥有navbar和isColl这两个类
        &.isColl {
            width: 64px;
        }

        // 实现图文对齐
        img{
            vertical-align: middle;
        }

        .mainLogo {
            padding: 10px 16px;
            position: relative;
            span {
                min-width: 130px;
                color: #fff;
                font-weight: bold;
                display: inline-block;
                position: absolute;  // 使其脱离标准的对齐方式
                left:54px;
                top: 18px;
            }
        }


    }

    // 解决在外层套div的样式显示效果
    // v-deep为穿透组件样式
    .el-menu--collapse .el-submenu__title span,::v-deep .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
            display: none;
    }


</style>