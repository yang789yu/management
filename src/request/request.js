import axios from "axios"
// import { config } from "vue/types/umd"

const instance = axios.create({
    baseURL:"http://xue.cnkdl.cn:23683",
    timeout:10000
})

instance.interceptors.request.use(config=>{
    // const token = localStorage.getItem("edb-authorization-token");
    // if(token && !config.url.endsWith("/login") && !config.url.endsWith("/captchaImage")){
    //     config.headers["Authorization"] = "Bearer " + token
    // }
    return config
},err=>{
    return Promise.reject(err)
});

instance.interceptors.response.use(res=>{

    let res_data = res.data;

    if(res_data.code !== 200 || '网络请求错误'){
        Message.error(res.msg);
        return false;
    }
    return res_data
},err=>{
    return Promise.reject(err)
});

export default instance