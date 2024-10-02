import { GetUserInfoApi } from "@/request/api"

export default{
    namespaced:true,
    state:{

        // 用户信息做本地存储
        userInfo:JSON.parse(localStorage.getItem("edb-userInfo")) || {
            permissions:null,
            roles:null,
            user:null
        }
    },
    mutations:{
        changeUserInfo(state, payload){
            state.userInfo = payload
            localStorage.setItem("edb-userInfo",JSON.stringify(state.userInfo))
        }
    },
    actions:{
        async asyncChangeUserInfo({commit}){
            let GetUserInfoApiRes = await GetUserInfoApi();
            console.log(GetUserInfoApiRes);
            if(!GetUserInfoApiRes) return;
            commit("changeUserInfo",{
                permissions:GetUserInfoApiRes.permissions,
                roles:GetUserInfoApiRes.roles,
                user:GetUserInfoApiRes.user
            })
        }
    }
}