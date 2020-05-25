import {responseSetTwoDimensionalArray} from "../../utils/publicUtils";

const state = {
  //游戏设置
  positionTips: true,
  clickMode: true,
  gameModel: 0,
  recordMode: false,
  //游戏数据
  sudokuData: [],
  sourceSudokuData: [],
  holesData: [],
  //游戏当前状态
  gameFinish: true,
  showRightAnswer: false,
  //选择的数独数
  sudokuInputNumber: {number: -1},
  //游戏结束执行的回调函数数组
  gameFinishCallback: []
}

const getters = {}

const mutations = {
  updatePositionTips(state, positionTips) {
    state.positionTips = positionTips;
  },
  updateClickMode(state, clickMode) {
    state.clickMode = clickMode;
  },
  updateGameModel(state, gameModel) {
    state.gameModel = gameModel;
  },
  updateRecordMode(state, recordMode) {
    state.recordMode = recordMode;
  },
  updateSudokuData(state, sudokuData) {
    state.sudokuData = sudokuData;
  },
  responseSetSudokuData(state, twoDimensionalArrayValue) {
    responseSetTwoDimensionalArray(state.sudokuData, twoDimensionalArrayValue);
  },
  updateSourceSudokuData(state, sourceSudokuData) {
    state.sourceSudokuData = sourceSudokuData;
  },
  updateHolesData(state, holesData) {
    state.holesData = holesData;
  },
  updateGameFinish(state, gameFinish) {
    state.gameFinish = gameFinish;
  },
  updateShowRightAnswer(state, showRightAnswer) {
    state.showRightAnswer = showRightAnswer;
  },
  updateSudokuInputNumber(state, sudokuInputNumber) {
    state.sudokuInputNumber = sudokuInputNumber;
  },
  addGameFinishCallback(state, callback) {
    state.gameFinishCallback.push(callback);
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
