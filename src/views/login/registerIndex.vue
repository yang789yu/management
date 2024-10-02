<template>
    <div class="register-page">
        <div class="register-box">
            <h1>后台管理平台</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn-box">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
import {validateUserName} from '../../utils/validate'
import { RegisterApi } from '@/request/api';
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPassword !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                password: '',
                checkPassword: '',
                userName: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                userName: [
                    {
                        required:true,  // 必填项
                        message:"用户名不能为空",
                        trigger:"blur"   // 失去焦点时进行验证
                    },
                    { validator: validateUserName, trigger: 'blur' }
                ]
            }
        }
        
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    RegisterApi(this.ruleForm)
                    .then(res => {
                        if(res.status === 200){
                            this.$alert("是否返回登录页面","注册成功",{
                                confirmButtonText:"确定",
                                callback:() => {
                                    this.$router.push('/login')
                                }
                            })
                        }else if(res.status === 202){
                            this.$alert("用户名已经存在","注册失败",{
                                confirmButtonText:"确定",
                                callback:()=>{
                                    this.ruleForm.userName='',
                                    this.ruleForm.password='',
                                    this.ruleForm.checkPassword=''
                                }
                            })
                        }else{
                            console.log(res.message);
                        }
                    }).catch(err => {
                        console.log('操作失败' + err);
                    })
                    
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        back(){
            this.$router.push('/login');
        }
    },
}
</script>

<style scoped lang="less">
.register-page{
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginbg.jpg") center top no-repeat;
  background-size: cover;
  position: relative;
  .register-box{
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

    .btn-box {
        display: flex;
        justify-content: flex-start; /* 可以使用 space-between, center 等根据需要调整 */
        gap: 20px; /* 设置按钮之间的间距 */
        // width: 100%;
    }
  };
}  
</style>