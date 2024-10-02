<template>
  <div class="login-page">
    <div class="login-box">
      <h1>后台管理平台</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="'密\xa0\xa0\xa0码'" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchacode">
          <div class="captcha-box">
            <el-input v-model.number="ruleForm.captchacode" placeholder="验证码，点击图片刷新"></el-input>
            <el-tag :style="{ width: 140 + 'px', height: 39 + 'px' }" @click="getCaptChaCode">{{ viewCaptChaCode }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item id="login-btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">登录</el-button>
          <el-button style="margin-top: 20px; width: 100%;" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {validateUserName} from '../../utils/validate'
import { mapMutations, mapActions } from 'vuex'
import { LoginApi } from '@/request/api'
export default {
  name:'loginIndex',
  data() {
    return {
      viewCaptChaCode:'',
      ruleForm:{
        username:"",
        password:"",
        captchacode:"",
        captchaSrc:""
      },
      rules:{
        username:[
          {
            required:true,  // 必填项
            message:"用户名不能为空",
            trigger:"blur"   // 失去焦点时进行验证
          },
          // 自定义的校验方式
          {
             validator: validateUserName, 
             trigger: 'blur' 
          }
        ],
        password:[
          {
            required:true,  // 必填项
            message:"密码不能为空",
            trigger:"blur"   // 失去焦点时进行验证
          },
        ],
        captchacode:[
          {
            required:true,  // 必填项
            message:"验证码不能为空",
            trigger:"blur"   // 失去焦点时进行验证
          },
        ]
      },
    }
  },
  computed:{

    
  },
  mounted(){
    this.getCaptChaCode();
    if(localStorage.getItem('rememberInfo')){
      // 有上次登录信息，显示上次登录
      let rememberData = JSON.parse(localStorage.getItem('rememberInfo'))
      const {username, password} = rememberData
      this.ruleForm.username = username
      this.ruleForm.password = password 
    }
  },
  created(){
    this.changeMenuData([]);
  },
  methods: {
    getCaptChaCode(){
      this.viewCaptChaCode = '';
      let codeString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let codeArray = codeString.split('');
      let num = codeArray.length;
      let newCodeArray = [];
      for (let i = 0; i < 5; i++){
        let index = Math.floor(Math.random() * num)
        newCodeArray.push(codeArray[index])
      }
      this.viewCaptChaCode = newCodeArray.join('');
      // 保存uuid，给到登录时候作为参数传过去后端
      // localStorage.setItem("management-captcha-uuid",res.uuid)

    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验通过
            // 对验证码进行校验
            if(!this.ruleForm.captchacode || this.ruleForm.captchacode !== this.viewCaptChaCode){
              this.$message.error("验证码错误");
              return;
            }
            let userInfo = {
              username:this.ruleForm.username,
              password:this.ruleForm.password
            }
            // 测试使用api来进行登录请求
            LoginApi(userInfo)
            .then(res => {
                if (res.status === 200){
                  console.log("登录成功返回的信息")
                  console.log(res);
                  // 登录成功之后的逻辑
                  localStorage.setItem("edb-authorization-token",res.token);
                  let rememberInfo = JSON.stringify({...userInfo})
                  localStorage.setItem('rememberInfo',rememberInfo);  // 记住密码时，保存login
                  this.$message({message:"登录成功！",type:"success"});
                  this.$router.push("/");  // 跳转到首页
                  this.asyncChangeUserInfo();


                }else{
                  localStorage.removeItem('rememberInfo')
                  this.$alert("用户名或密码错误","登录失败",{
                    confirmButtonText:'确定',
                    callback:()=>{
                      this.ruleForm.username='',
                      this.ruleForm.password=''
                    }
                  })
                }
            }).catch(err => {
              if(err.response) {
                // 请求已发出，但服务器返回的状态码不是2xx的响应
                console.log("登录失败！",err.response.data.message);
              }else {
                // 其他错误
                console.log("请求错误!", err.message);
              }
            });

            // 测试使用axios.get来发送请求
            // axios.get('http://127.0.0.1:3000/login',{
            //   params:{
            //     userName:this.ruleForm.username,
            //     password:this.ruleForm.password
            //   }
            // }).then(res => {
            //   if (res.data.status === 200){
            //     // 登录成功之后的逻辑
            //     console.log("登录成功",res.data.message)
            //     localStorage.setItem("edb-authorization-token",res.data.token);
            //     let rememberInfo = JSON.stringify({...userInfo})
            //     localStorage.setItem('rememberInfo',rememberInfo);  // 记住密码时，保存login
            //     this.$message({message:"登录成功！",type:"success"});
            //     this.$router.push("/");
            //   }else{
            //     localStorage.removeItem('rememberInfo')
            //     this.$alert("用户名或密码错误","登录失败",{
            //       confirmButtonText:'确定',
            //       callback:()=>{
            //         this.ruleForm.username='',
            //         this.ruleForm.password=''
            //       }
            //     })
            //   }
            // }).catch(err => {
            //   if(err.response) {
            //     // 请求已发出，但服务器返回的状态码不是2xx的响应
            //     console.log("登录失败！",err.response.data.message);
            //   }else {
            //     // 其他错误
            //     console.log("请求错误!", err.message);
            //   }
            // });
          } else {
            // 校验不通过
            this.$message({
              showClose: true,
              message: 'error submit!!',
              type: 'warning'
            });
            return false;
          }
        });
    },
    // 跳转到注册
    register(){
      this.$router.push('/register');
    },

    // 获取vuex中的changeMenuData方法
    ...mapMutations({changeMenuData:"userMenuData/changeMenuData"}),

    ...mapActions({asyncChangeUserInfo:"userInfo/asyncChangeUserInfo"})
  },
}
</script>

<style lang="less">
.login-page{
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginbg.jpg") center top no-repeat;
  background-size: cover;
  position: relative;
  .login-box{
    width: 400px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding-top: 20px;
    padding-right: 40px;
    border-radius: 10%; // 圆角
    h1{
      text-align: center;
      margin-bottom: 20px;
      padding-left: 40px;  // 左边距
      font-size: 20px;
    };
    .captcha-box{
      display: flex;
      img{
        width: 100px; 
        height: 39px;
        margin-left: 20px
      }
    };
    .login-btn{
      width: 100%;
    };
    #login-btn-box .el-form-item__content{
      margin-left: 40px !important; 
    }
    .el-button .el-button {
      margin-left: 0px; 
    }
  };
}  
  
</style>