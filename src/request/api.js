import instance from "./request"

// 获取验证码请求
// 将其变成函数的时候，在引入该文件时只有调用的时候才会执行，避免大量api一起执行
export const GetCaptchaCodeApi = () => instance.get("/prod-api/captchaImage")

// 登录请求
export const LoginApi = (params) => instance.post("/prod-api/login", params);

export const GetUserRoutersApi = () => instance.get("/prod-api/getRouters");