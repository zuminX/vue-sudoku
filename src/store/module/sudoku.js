import { responseSetTwoDimensionalArray } from '@/utils/publicUtils'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'

const state = {
  // 游戏设置
  positionTips: true,
  clickMode: true,
  gameModel: 0,
  recordMode: false,
  // 游戏数据
  sudokuData: [],
  sourceSudokuData: [],
  holesData: [],
  // 游戏当前状态
  gameFinish: true,
  // 选择的数独数
  sudokuInput: new SudokuMatrixGrid(0, 0, 0),
  // 序列号
  serialNumber: 0
}

const getters = {}

const mutations = {
  updatePositionTips(state, positionTips) {
    state.positionTips = positionTips
  },
  updateClickMode(state, clickMode) {
    state.clickMode = clickMode
  },
  updateGameModel(state, gameModel) {
    state.gameModel = gameModel
  },
  updateRecordMode(state, recordMode) {
    state.recordMode = recordMode
  },
  updateSudokuData(state, sudokuData) {
    state.sudokuData = sudokuData
  },
  responseSetSudokuData(state, sudokuMatrixGrid) {
    responseSetTwoDimensionalArray(state.sudokuData, sudokuMatrixGrid)
  },
  updateSourceSudokuData(state, sourceSudokuData) {
    state.sourceSudokuData = sourceSudokuData
  },
  updateHolesData(state, holesData) {
    state.holesData = holesData
  },
  updateGameFinish(state, gameFinish) {
    state.gameFinish = gameFinish
  },
  updateSudokuInput(state, sudokuInput) {
    state.sudokuInput = sudokuInput
  },
  updateSerialNumber(state) {
    state.serialNumber++
  }
}

const action = {}

export default {
  getters,
  state,
  mutations,
  action,
  modules: {}
}
