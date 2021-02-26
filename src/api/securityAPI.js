import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 安全相关API的基地址
 */
const baseUrl = 'security'

const securityAPI = {
  login: new APIInfo('login', baseUrl, 'post'),
  captchaImage: new APIInfo('captchaImage', baseUrl),
  logout: new APIInfo('logout', baseUrl, 'post')
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
