import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'

const state = {
  // 游戏设置
  positionTips: true,
  clickMode: true,
  gameModel: 1,
  recordMode: false,
  // 游戏当前状态
  gameFinish: true,
  // 选择的数独数
  sudokuInput: new SudokuMatrixGrid(0, 0, 0),
  // 序列号
  serialNumber: 0,
  // 记录模式游戏的序列号
  recordGameNumber: 0
}

const mutations = {
  /**
   * 更新位置提示标志
   */
  updatePositionTips(state, positionTips) {
    state.positionTips = positionTips
  },
  /**
   * 更新点击模式标志
   */
  updateClickMode(state, clickMode) {
    state.clickMode = clickMode
  },
  /**
   * 更新游戏模式
   */
  updateGameModel(state, gameModel) {
    state.gameModel = gameModel
  },
  /**
   * 更新记录模式标志
   */
  updateRecordMode(state, recordMode) {
    state.recordMode = recordMode
  },
  /**
   * 更新游戏结束标志
   */
  updateGameFinish(state, gameFinish) {
    state.gameFinish = gameFinish
    if (gameFinish === true && state.recordMode === true) {
      state.recordGameNumber++
    }
  },
  /**
   * 更新数独输入数据
   */
  updateSudokuInput(state, sudokuInput) {
    state.sudokuInput = sudokuInput
  },
  /**
   * 增加游戏局数序列号
   */
  addSerialNumber(state) {
    state.serialNumber++
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  modules: {}
}
