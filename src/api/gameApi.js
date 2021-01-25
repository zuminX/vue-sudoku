import {
  getRequest,
  postRequest
} from './basicApi'

/**
 * 数独API的基地址
 */
const base = '/game'

/**
 * 获取数独数据
 * @param level 难度
 * @param isRecord 是否记录
 */
export const generateSudokuTopic = (level = 0, isRecord = false) => {
  return getRequest(`${base}/generateTopic`, { level, isRecord })
}

/**
 * 提交数独数据
 * @param sudokuData 数独数据
 */
export const submitSudokuData = (sudokuData) => {
  return postRequest(`${base}/check`, sudokuData)
}

/**
 * 获取数独提示信息
 * @param sudokuData 数独数据
 */
export const getSudokuHelp = (sudokuData) => {
  return postRequest(`${base}/help`, sudokuData)
}
