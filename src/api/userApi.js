import {
  getRequest,
  postRequest
} from './basicApi'

/**
 * 用户API的基地址
 */
const base = '/user'

/**
 * 注册用户
 * @param registerForm 注册表单
 */
export const register = (registerForm) => {
  return postRequest(`${base}/register`, registerForm)
}

/**
 * 获取用户的游戏信息
 */
export const getUserGameInformation = () => {
  return getRequest(`${base}/gameInformation`)
}

/**
 * 获取历史游戏记录
 *
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getHistoryGameRecord = (page, pageSize) => {
  return getRequest(`${base}/historyGameRecord`, { page, pageSize })
}

/**
 * 获取系统的用户
 *
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getUserList = (page, pageSize) => {
  return getRequest(`${base}/userList`, { page, pageSize })
}

/**
 * 修改用户
 * @param modifyUserForm 修改用户表单
 */
export const modifyUser = (modifyUserForm) => {
  console.log(modifyUserForm)
  return postRequest(`${base}/modifyUser`, modifyUserForm)
}

/**
 * 新增用户
 * @param addUserForm 新增用户表单
 */
export const addUser = (addUserForm) => {
  return postRequest(`${base}/addUser`, addUserForm)
}

/**
 * 根据条件搜索用户
 *
 * @param searchUser 搜索用户的条件
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const searchUser = (searchUser, page, pageSize) => {
  searchUser.page = page
  searchUser.pageSize = pageSize
  return postRequest(`${base}/searchUser`, searchUser)
}

/**
 * 根据名称搜索用户
 *
 * @param name 名称
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const searchUserByName = (name, page, pageSize) => {
  return getRequest(`${base}/searchUserByName`, { name, page, pageSize })
}
