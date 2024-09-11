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
            <el-input v-model.number="ruleForm.captchacode"></el-input>
            <img src="../../assets/images/loginbg1.jpg" alt="" :style="{ width: 100 + 'px', height: 39 + 'px' }" @click="getCaptChaCode">
          </div>  
        </el-form-item>
        <el-form-item id="login-btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {validateUserName} from '../../utils/validate'
// import { GetCaptchaCodeApi, LoginApi } from '@/request/api'
export default {
  name:'loginIndex',
  data() {
    return {
      ruleForm:{
        username:"adjkljs",
        password:"123456",
        captchacode:"888888"
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
      captchaSrc:""
    }
  },
  created(){
    // this.getCaptChaCode();
  },
  methods: {
    async getCaptChaCode(){

      // let res = GetCaptchaCodeApi();
      //   console.log(res);
      //   if (res == false) return;
      // 展示验证码图片
      // this.captchaSrc = "data:image/gif;base64," + res.img;
      // // 保存uuid，给到登录时候作为参数传过去后端
      // localStorage.setItem("management-captcha-uuid",res.uuid)

    },
    submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
            // 校验通过
            alert('submit!');
            // let res = await LoginApi.apply({
            //   username:this.ruleForm.username,
            //   password:this.ruleForm.password,
            //   code:this.ruleForm.captchacode,
            //   uuid:localStorage.getItem("edb-captcha-uuid")
            // })
            // if (res == false) return; 
            // console.log(res);

            //登录成功之后的逻辑
            // 提示用户登录成功
            this.$message({message:"登录成功！",type:"success"});
            // 清除uuid
            // localStorage.removeItem("edb-captcha-uuid");
            // 保存token
            // localStorage.setItem("edb-authorization-token",res.token);
            // 跳转首页
            this.$router.push("/")
            // console.log(res);

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
  };
}  
  
</style>