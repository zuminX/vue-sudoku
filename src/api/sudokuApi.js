import {
  getRequest
} from './basicApi'

/**
 * 数独API的基地址
 */
const base = '/sudoku'

/**
 * 获取数独的所有难度等级
 */
export const getSudokuLevels = () => {
  return getRequest(`${base}/sudokuLevels`)
}
