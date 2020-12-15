import Vue from 'vue'

/**
 * 响应式的设置数独矩阵中的一个格子
 * @param array 数独矩阵
 * @param sudokuMatrixGrid 数独矩阵中的一个格子
 */
export const responseSetTwoDimensionalArray = (array, sudokuMatrixGrid) => {
  const { row, column, value } = sudokuMatrixGrid
  const rowArrayData = array[row]
  rowArrayData[column] = value
  Vue.set(array, row, rowArrayData)
}
