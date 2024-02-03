// 导入request.js请求工具
import service from '../utils/request1'
// import instance from '../utils/request'

// 提供调用注册接口的函数
export const userRegisterSevrvice=(registerData)=>{
    return service.post('/user/register',{
        userName:registerData.username,
        userPassword:registerData.password
    });
}
// 提供调用登录接口的函数
export const userLoginSevrvice=(loginData)=>{
    return service.post('/user/login',{
        userName:loginData.username,
        userPassword:loginData.password
    });
}