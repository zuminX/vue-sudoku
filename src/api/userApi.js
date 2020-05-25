import {getRequest, postRequest} from "./basicApi";

/**
 * 用户API的基地址
 */
let base = "/user";

/**
 * 登录用户
 * @param loginForm 账号表单
 */
export const login = (loginForm) => {
  return postRequest("/doLogin", loginForm);
}

/**
 * 注册用户
 * @param registerForm 注册表单
 */
export const register = (registerForm) => {
  return postRequest(`${base}/register`, registerForm);
}

/**
 * 获取用户的游戏信息
 */
export const getUserGameInformation = () => {
  return getRequest(`${base}/gameInformation`);
}

/**
 * 获取历史游戏记录
 */
export const getHistoryGameRecord = (page, pageSize) => {
  return getRequest(`${base}/historyGameRecord`, {page, pageSize});
}