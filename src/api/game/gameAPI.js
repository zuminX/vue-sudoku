import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 数独游戏API的基地址
 */
const baseUrl = 'game/game'

const gameAPI = {
  generateSudokuTopic: new APIInfo('generateTopic', baseUrl),
  submitSudokuData: new APIInfo('check', baseUrl, 'post'),
  getSudokuHelp: new APIInfo('help', baseUrl, 'post')
}

/**
 * 获取数独数据
 * @param level 难度ID
 * @param isRecord 是否记录
 */
export const generateSudokuTopic = (level = 0, isRecord = false) => {
  return request(gameAPI.generateSudokuTopic, { level, isRecord })
}

/**
 * 提交数独数据
 * @param sudokuData 数独数据
 */
export const submitSudokuData = (sudokuData) => {
  return request(gameAPI.submitSudokuData, sudokuData)
}

/**
 * 获取数独提示信息
 * @param sudokuData 数独数据
 */
export const getSudokuHelp = (sudokuData) => {
  return request(gameAPI.getSudokuHelp, sudokuData)
}
