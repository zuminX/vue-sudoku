import {SudokuMatrixGrid} from "@/model/SudokuMatrixGrid";
import {deepClone} from "@/utils/tool";
import {responseSetTwoDimensionalArray} from "@/utils/coreUtils";

/**
 * 数独输入记忆类
 */
export class SudokuInputMemento {
  _inputList;
  _preSudokuData;

  constructor(sudokuData) {
    this._preSudokuData = deepClone(sudokuData)
    this._inputList = []
  }

  /**
   * 添加输入记录
   * @param sudokuMatrixGrid 数独矩阵格子对象
   */
  add(sudokuMatrixGrid) {
    this.addList([sudokuMatrixGrid])
  }

  /**
   * 添加连续的输入记录
   * @param sudokuMatrixGridList 数独矩阵格子列表对象
   */
  addList(sudokuMatrixGridList = []) {
    let preDataList = []
    for (let sudokuMatrixGrid of sudokuMatrixGridList) {
      const {row, column, value} = sudokuMatrixGrid
      preDataList.push(new SudokuMatrixGrid(row, column, this._preSudokuData[row][column]));
      this._preSudokuData[row][column] = value
    }
    this._inputList.push(preDataList)
  }

  /**
   * 回滚玩家填写的数独数据
   */
  rollback(sudokuData) {
    let inputData = this._inputList.pop()
    for (let data of inputData) {
      responseSetTwoDimensionalArray(sudokuData, data);
    }
  }

  /**
   * 判断是否能回滚输入
   * @returns {boolean} 若可以，则返回true；否则返回false
   */
  canRollback() {
    return this._inputList.length > 0
  }
}
