import {
  getRequest,
  postRequest
} from "./basicApi";
import LeaderboardModalContent from "../views/modalContent/LeaderboardModalContent";

/**
 * 数独API的基地址
 */
let base = "/game";

/**
 * 获取数独数据
 * @param level 难度
 * @param isRecord 是否记录
 */
export const generateSudokuTopic = (level = 0, isRecord = false) => {
  return getRequest(`${base}/generateTopic`, {level, isRecord});
}

/**
 * 提交数独数据
 * @param sudokuData 数独数据
 */
export const submitSudokuData = (sudokuData) => {
  return postRequest(`${base}/check`, sudokuData);
}

/**
 * 获取数独提示信息
 * @param sudokuData 数独数据
 */
export const getSudokuHelp = (sudokuData) => {
  return postRequest(`${base}/help`, sudokuData);
}

/**
 * 获取数独的所有难度等级
 */
export const getSudokuLevels = () => {
  return getRequest(`${base}/sudokuLevels`);
}

/**
 * 获取排行榜数据
 */
export const getLeaderboardData = () => {
  return getRequest(`${base}/rank`);
}



