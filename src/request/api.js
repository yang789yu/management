import instance from "./request"

// 将其变成函数的时候，在引入该文件时只有调用的时候才会执行，避免大量api一起执行
// 登录请求
export const LoginApi = (params) => instance.get("/login", {params});

// 注册请求
export const RegisterApi = (params) => instance.post("/register",params); 

// 获取用户可以访问的路由的api
export const GetUserMenuDataApi = () => instance.get("/getusermenudata");

// 测试api
export const TestApi = () => instance.get("/test")

// 获取用户信息
export const GetUserInfoApi = () => instance.get("/getUserInfo");

// 客户管理-客户列表展示
export const GetCustomerListApi = (params) => instance.get("/getcustomer",{params});

// post 请求参数不需要{},get请求需要{}

// 导出表格
export const CustomerExportApi = (params) => instance.post("/export",params);

// 审核流程定义
export const BpmnInfoApi = (params) => instance.post("/bpmnInfo",params);
