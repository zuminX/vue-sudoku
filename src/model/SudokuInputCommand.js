import {SudokuMatrixGrid} from "@/model/SudokuMatrixGrid";
import {deepClone} from "@/utils/tool";
import {responseSetTwoDimensionalArray} from "@/utils/publicUtils";

export class SudokuInputCommand {
  _inputList;
  _sudokuData;
  _preSudokuData;

  constructor(sudokuData) {
    this._sudokuData = sudokuData
    this._preSudokuData = deepClone(sudokuData)
    this._inputList = []
  }

  /**
   * 添加输入记录
   * @param sudokuMatrixGrid 数独矩阵格子对象
   */
  add(sudokuMatrixGrid) {
    const {row, column, value} = sudokuMatrixGrid
    this._inputList.push(new SudokuMatrixGrid(row, column, this._preSudokuData[row][column]))
    this._preSudokuData[row][column] = value
  }

  /**
   * 回滚玩家填写的数独数据
   */
  rollback() {
    responseSetTwoDimensionalArray(this._sudokuData, this._inputList.pop())
  }

  /**
   * 判断是否能回滚输入
   * @returns {boolean} 若可以，则返回true；否则返回false
   */
  canRollback() {
    return this._inputList.length > 0
  }

}
