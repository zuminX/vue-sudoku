/**
 * 数独矩阵的格子
 */
export class SudokuMatrixGrid {
  constructor(row, column, value) {
    if (row < 0 || column < 0) {
      throw new Error('下标越界')
    }
    this._row = row
    this._column = column
    this._value = value
  }

  get row() {
    return this._row
  }

  get column() {
    return this._column
  }

  get value() {
    return this._value
  }
}
