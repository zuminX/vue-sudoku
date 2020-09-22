import {
  getTwoDimeBoolArray,
  getTwoDimeNumArray
} from './coreUtils'

/**
 * 判断指定位置是否为空缺格子
 * @param holes 题目空缺数组
 * @param i 行
 * @param j 列
 * @returns {boolean} 是空缺格子返回true，否则返回false
 */
export const isHole = (holes, i, j) => {
  return holes[i][j]
}

/**
 * 判断指定位置是否不为空缺格子
 * @param holes 题目空缺数组
 * @param i 行
 * @param j 列
 * @returns {boolean} 不是空缺格子返回true，否则返回false
 */
export const isNotHole = (holes, i, j) => {
  return !isHole(holes, i, j)
}

/**
 * 判断用户在指定位置是否填写了数字
 * @param sudokuData 数独数据
 * @param i 行
 * @param j 列
 * @returns {boolean} 填写了返回true，否则返回false
 */
export const hasInput = (sudokuData, i, j) => {
  return sudokuData[i][j] !== '' && sudokuData[i][j] != null
}

/**
 * 获取数独数字数组
 * @returns {number[][]} 数独数组
 */
export const getSudokuArray = () => {
  return [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
}
/**
 * 隐藏数独数据中为零的数据
 * @param sudokuData 数独数据
 * @param holesData 挖洞数据
 */
export const hideSudokuZeroData = (sudokuData, holesData) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (holesData[i][j]) {
        sudokuData[i][j] = null
      }
    }
  }
}
/**
 * 将字符串转化为数独矩阵
 * @param matrix 数独矩阵的字符串形式
 */
export const convertToSudokuMatrix = (matrix) => {
  const result = getTwoDimeNumArray()
  for (let i = 0, num = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      result[i][j] = matrix.charAt(num++)
    }
  }
  return result
}
/**
 * 将字符串转化为题目空缺数组
 * @param holes 题目空缺数组的字符串形式
 */
export const convertToSudokuHoles = (holes) => {
  const result = getTwoDimeBoolArray()
  for (let i = 0, num = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      result[i][j] = +(holes.charAt(num++)) === 1
    }
  }
  return result
}

/**
 * 设置数独指定行的数据
 * @param sudokuData 数独数据
 * @param row 行
 * @param data 数据
 */
export const setSudokuRow = (sudokuData, row, data) => {
  for (let col = 0; col < 9; col++) {
    sudokuData[row][col] = data
  }
}

/**
 * 设置数独指定列的数据
 * @param sudokuData 数独数据
 * @param column 列
 * @param data 数据
 */
export const setSudokuColumn = (sudokuData, column, data) => {
  for (let row = 0; row < 9; row++) {
    sudokuData[row][column] = data
  }
}

/**
 * 设置数独指定宫的数据
 * @param sudokuData 数独数据
 * @param row 行
 * @param column 列
 * @param data 数据
 */
export const setSudokuPalace = (sudokuData, row, column, data) => {
  const firstRow = Math.floor(row / 3) * 3
  const firstCol = Math.floor(column / 3) * 3
  for (let i = firstRow; i < firstRow + 3; i++) {
    for (let j = firstCol; j < firstCol + 3; j++) {
      sudokuData[i][j] = data
    }
  }
}
