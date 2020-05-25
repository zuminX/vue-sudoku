/**
 * axios请求封装
 */

import axios from 'axios'
import router from '../router'
import {Message} from "element-ui";

//设置POST请求的内容类型为JSON且编码格式为UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

/**
 * 使用axios中的拦截器进行请求的拦截
 */
axios.interceptors.response.use(success => {
  let response = success.data;
  //请求失败
  if (!response.success) {
    //显示错误信息
    Message.error({message: response.message})
    return;
  }
  //否则返回请求数据
  return response.data;
}, error => {
  //根据请求响应的状态，显示不同的错误信息
  let status = error.response.status;
  if (status === 500 || status === 504) {
    Message.error({message: '服务器发生异常'})
  } else if (status === 403) {
    Message.error({message: '权限不足'})
  } else if (status === 401) {
    Message.error({message: '尚未登录，请先登录'})
    //跳转到首页
    router.replace('/');
  } else {
    //发送未知异常
    let message = error.response.data.message;
    if (message) {
      Message.error({message: message})
    } else {
      Message.error({message: '未知错误!'})
    }
  }
})

/**
 * 基地址
 */
let base = '';

/**
 * 发送POST请求
 * @param url 地址
 * @param params 参数
 */
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: JSON.stringify(params)
  })
}

/**
 * 发送PUT请求
 * @param url 地址
 * @param params 参数
 */
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 发送GET请求
 * @param url 地址
 * @param params 参数
 */
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}

/**
 * 发送DELETE请求
 * @param url 地址
 * @param params 参数
 */
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params
  })
}
