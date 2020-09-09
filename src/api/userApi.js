import {getRequest, postRequest} from "./basicApi";

/**
 * 用户API的基地址
 */
const base = "/user";


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