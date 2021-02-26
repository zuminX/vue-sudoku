import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 安全相关API的基地址
 */
const baseUrl = 'security'

const securityAPI = {
  login: new APIInfo('login', 'post', baseUrl),
  captchaImage: new APIInfo('captchaImage', 'get', baseUrl),
  logout: new APIInfo('logout', 'post', baseUrl)
}

/**
 * 登录用户
 * @param loginForm 账号表单
 */
export const login = (loginForm) => {
  return request(securityAPI.login, loginForm)
}

/**
 * 获取验证码
 */
export const captchaImage = () => {
  return request(securityAPI.captchaImage)
}

/**
 * 退出登录
 */
export const logout = () => {
  return request(securityAPI.logout)
}
