<template>
  <div>
    <h1>this is about page</h1>
    <button @click="getData">点我展示数据</button>
    <h1>{{ testData }}</h1>
  </div>
</template>

<script>
// import axios from 'axios';
import { TestApi } from '@/request/api';
export default {
  data() {
    return {
      testData:''
    }
  },
  methods:{
    getData(){
      TestApi().then( res => {
        if(res.status === 200){
          console.log("返回的数据")
          console.log(res)
          this.testData=res.msg
        }
        else{
          this.testData = 'hahaha'
        }
      }).catch( err => {
        if(err.response) {
          // 请求已发出，但服务器返回的状态码不是2xx的响应
          console.log("登录失败！",err.response.data.message);
        }else {
          // 其他错误
          console.log("请求错误!", err.message);
        }
      })
    }
  }
}
</script>

<style>

</style>
