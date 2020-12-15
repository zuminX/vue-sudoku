/**
 * 数独矩阵格子类
 */
export class SudokuMatrixGrid {
  _row;
  _column;
  _value;

  constructor(row, column, value) {
    if (row < 0 || row > 9 || column < 0 || column > 9) {
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
