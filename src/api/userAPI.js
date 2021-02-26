import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 用户API的基地址
 */
const baseUrl = 'user'

const userAPI = {
  register: new APIInfo('register', baseUrl, 'post'),
  getUserGameInformation: new APIInfo('gameInformation', baseUrl),
  getHistoryGameRecord: new APIInfo('historyGameRecord', baseUrl)
}

/**
 * 注册用户
 * @param registerForm 注册表单
 */
export const register = (registerForm) => {
  return request(userAPI.register, registerForm)
}

/**
 * 获取用户的游戏信息
 */
export const getUserGameInformation = () => {
  return request(userAPI.getUserGameInformation)
}

/**
 * 获取历史游戏记录
 *
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getHistoryGameRecord = (page, pageSize) => {
  return request(userAPI.getHistoryGameRecord, { page, pageSize })
}
