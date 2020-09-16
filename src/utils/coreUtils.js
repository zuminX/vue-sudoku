/**
 * 获取二维number型数组
 * @returns {number[][]} 二维number型数组
 */
export const getTwoDimeNumArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, 0)
}

/**
 * 获取二维boolean型数组
 * @returns {boolean[][]} 二维boolean型数组
 */
export const getTwoDimeBoolArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, false)
}

/**
 * 获取二维数组
 * @param row 行
 * @param column 列
 * @param initData 初始数据啊
 * @returns {[]} 二维数组
 */
const getTwoDimeArray = (row, column, initData) => {
  const result = []
  for (let i = 0; i < row; i++) {
    result.push([])
    for (let j = 0; j < column; j++) {
      result[i].push(initData)
    }
  }
  return result
}

