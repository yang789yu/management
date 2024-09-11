<template>
    <div class="header">
        <el-button icon="el-icon-s-unfold" v-show="!isShow" @click="changeShow"></el-button>
        <el-button icon="el-icon-s-fold" v-show="isShow" @click="changeShow"></el-button>
        HeaderView
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name:"HeaderView",
    data() {
        return {
            isShow:true
        }
    },
    methods:{
        ...mapMutations({
            changeIsCollapse:"navCollapse/changeIsCollapse"
        }),
        changeShow(){
            this.isShow = !this.isShow;
            this.changeIsCollapse();
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        height: 84px;
        box-shadow: 0px 5px 5px #ddd;
    }
</style>