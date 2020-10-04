import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'

const state = {
  // 游戏设置
  positionTips: true,
  clickMode: true,
  gameModel: 0,
  recordMode: false,
  // 游戏当前状态
  gameFinish: true,
  // 选择的数独数
  sudokuInput: new SudokuMatrixGrid(0, 0, 0),
  // 序列号
  serialNumber: 0
}

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
  state,
  mutations,
  action,
  modules: {}
}
