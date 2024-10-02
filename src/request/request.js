import axios from "axios"
// import { config } from "vue/types/umd"
import router from "@/router";

const instance = axios.create({
    baseURL:"http://127.0.0.1:3000",
    timeout:10000
})

instance.interceptors.request.use(config=>{
    const token = localStorage.getItem("edb-authorization-token");
    if(token && !config.url.endsWith("/login") && !config.url.endsWith("/register")){
        console.log("前端的token")
        console.log(token)
        // config.headers["Authorization"] = "Bearer " + token
        config.headers["Authorization"] = token
    }
    console.log("拦截请求发送")
    return config
},err=>{
    return Promise.reject(err)
});

instance.interceptors.response.use(res=>{
    console.log("响应请求的数据");
    // console.log(res)
    let res_data = res.data;
    if(res_data.status && res_data.status !== 200){
        console.log(res_data.msg || '网络请求错误');
        this.$message.error(res_data.msg || '网络请求错误')
        if(res_data.status === 401){
            // 401一般表示token过期或者没有带
            localStorage.removeItem("edb-authorization-token");
            router.push("/login");
        }
        return false;
    }
    return res_data;
},err=>{
    return Promise.reject(err)
});

export default instance