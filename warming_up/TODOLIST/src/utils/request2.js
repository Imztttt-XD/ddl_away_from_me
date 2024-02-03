import axios from 'axios'
import { ElMessage } from 'element-plus'


export const service = axios.create({
  // 改为填入对应的后端地址
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
})

service.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin']='*';
    const token = window.localStorage.getItem('token');
    if(token){
      config.headers.Authorization = token;
    }
    return config
    },
  error =>Promise.reject(error)
);

service.interceptors.response.use(
  response => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ code: 200, message: '', data: '' }
     * 规则是当 code 为 200 时表示请求成功，为 401 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 message 会返回错误信息
     */
    if (response.data.code === 1) {
      return Promise.resolve(response.data)
    } else {
      // 这里做错误提示
      // ElMessage.error(options)
      return Promise.reject(response.data)
    }
    // 可以判断code是否为401来跳转到登陆页面并清除登录信息
  },
  error => {
    let message = error.message
    if (message == 'Network Error') {
        message = '后端网络故障'
    } else if (message.includes('timeout')) {
        message = '接口请求超时'
    } else if (message.includes('Request failed with status code')) {
        message = '接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({
        message,
        type: 'error'
    })
    return Promise.reject(error)
  }
);
export default service;
