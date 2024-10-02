<template>
    <div class="tags">

        <!-- .native 用法：在一个自定义组件想要给根标签添加事件，但不生效，就给它添加原生的修饰符 -->
        <el-tag class="tag" size="medium" :closable="index > 0"
            v-for="item, index in tags"
            :key="item.path" 
            :effect="item.title === $route.meta.titles[$route.meta.titles.length - 1] ? 'dark' : 'plain'"
            @click="goTo(item.path)"
            @close="close(index)"
            @contextmenu.native.prevent="rightClick($event,index)"
        >
        <i v-show="item.title === $route.meta.titles[$route.meta.titles.length - 1]" class="cir"></i>
        {{ item.title }}</el-tag>

         <TagsMenu 
            v-show="isShowTagsMenu" 
            :clientX="clientX" 
            :clientY="clientY"
            :clickIndex="clickIndex"
            :tagsLength="tags.length"
            @fn="clickMenu"
        >
         </TagsMenu>
    </div>

</template>

<script>
import TagsMenu from './TagsMenu.vue';
export default {
    data() {
        return {
            tags:[{
                title:"首页",
                path:"/home",
                isActive:true
            }],
            isShowTagsMenu:false,
            clientX:0,
            clientY:0,
            clickIndex:0
        }
    },
    components:{
        TagsMenu
    },
    watch:{
        $route:{
            immediate:true,
            handler(val, oldval){
                console.log(oldval);
                let bool = this.tags.find(item => {
                    return val.path === item.path
                })
                if(!bool){
                    this.tags.push({
                    title:val.meta.titles[val.meta.titles.length - 1],
                    path:val.path,
                    isActive:""
                    
                })
                }


            }
        }
    },
    mounted(){
        // 给文档添加点击事件
        document.addEventListener("click",this.closeMenu);
    },
    beforeDestroy(){
        document.removeEventListener("click",this.closeMenu);
    },
    methods:{
        clickMenu(i){
            if(i === 5){
                // 关闭全部
                this.tags=[{
                    title:"首页",
                    path:"/home",
                    isActive:true
                }]
                if(this.$route.path !== "/home"){
                    // 跳转到首页
                    this.goTo("/home"); 
                }
            }
            else if(i == 4){
                // 关闭右侧
                this.close(this.clickIndex + 1);
                this.tags = this.tags.filter((_, index) => {
                    return index !== this.clickIndex + 1; 
                });
            }
            else if(i == 3){
                // 关闭左侧
                this.close(this.clickIndex - 1);
                this.tags = this.tags.filter((_, index) => {
                    return index !== this.clickIndex - 1; 
                });
            }
            else if(i == 2){
                // 关闭其他
                this.tags = this.tags.filter((_, index) => {
                    return index === 0 || index === this.clickIndex; 
                });
                // 判断当前路由是否为点击项
                if(this.$route.path !== this.tags[this.tags.length - 1].path){
                    this.goTo(this.tags[this.tags.length - 1].path);
                }
            }
            else if(i == 1){
                // 关闭当前
                this.close(this.clickIndex);
                this.tags = this.tags.filter((_, index) => {
                    return index !== this.clickIndex; 
                });
            }
            else{
                // 刷新页面
                location.reload();
            }
            
        },

        rightClick(e,i){
            console.log("右键点击了",e.clientX,e.clientY);
            this.isShowTagsMenu = true;
            this.clientX = e.clientX
            this.clientY = e.clientY
            this.clickIndex = i
            // // 关闭浏览器默认的菜单
            // window.event.returnValue-false;
            // return false
        },
        closeMenu(){
            this.isShowTagsMenu = false;
        },
        goTo(path){
            this.$router.push(path);
            this.closeMenu();
        },
        close(i){
            // 如果当前项与路由项相同，则跳转到tags的最后一项
            if(this.tags[i].path === this.$route.path && i !== this.tags.length -1){
                this.$router.push(this.tags[this.tags.length - 1].path)
            }else if(i === this.tags.length -1){
                this.$router.push(this.tags[this.tags.length - 2].path)
            }
            // 关闭当前项
            this.tags.splice(i, 1);
            this.closeMenu();
        }
    }
}
</script>

<style lang="less" scoped>
    .tags {
        padding-left: 20px;
        padding-top: 5px;

        .tag {
            cursor: pointer;
            margin-right: 5px;

            .cir {
                width: 8px;
                height: 8px;
                margin-right: 4px;
                background-color: #fff;
                border-radius: 50%;
                display: inline-block;
            }
        }
    }
</style>