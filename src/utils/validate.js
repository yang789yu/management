// 存放项目的验证方法
export function validateUserName(rule, value, callback){
    // if (value === '') {
    //   callback(new Error('请输入密码'));
    // } else {
    //   if (this.ruleForm.checkPass !== '') {
    //     this.$refs.ruleForm.validateField('checkPass');
    //   }
    //   callback();
    // }
    if(value.length < 3 || value.length > 20){
      callback(new Error('输入的用户名长度必须大于3小于20'));
    }else{
      callback();
    }
}