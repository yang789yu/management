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
// import axios from 'axios'
export default {
  name:'loginIndex',
  data() {
    return {
      ruleForm:{
        username:"",
        password:"",
        captchacode:""
      },
      rules:{
        username:[
          {
            required:true,  // 必填项
            message:"用户名不能为空",
            trigger:"blur"   // 失去焦点时进行验证
          },
          { validator: validateUserName, trigger: 'blur' }
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
    getCaptChaCode(){
      // axios.get("http://xue.cnkdl.cn:23683/prod-api/captchaImage")
      // .then(res=>{
      //   console.log(res);
      //   if(res.data.code===200){
      //     this.captchaSrc = "data:image/gif;base64," + res.data.img
      //   }
      // })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验通过
            alert('submit!');
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