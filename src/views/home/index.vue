<template>
  <div id="root">
    <div id="sudokuArea" class="ui container m-padded-tb-large">
      <!--加载数独区域时的占位符-->
      <div v-if="loading.sudokuDataDown" class="absolute-center">
        <div class="ui placeholder sudoku-placeholder" />
      </div>
      <!--数独区域-->
      <SudokuGameArea
        v-else
        ref="sudokuGameArea"
        :holes-data="holesData"
        :show-right-answer="showRightAnswer"
        :source-sudoku-data="sourceSudokuData"
        :sudoku-data="sudokuData"
      />
    </div>

    <!--按钮区域-->
    <div class="ui container m-container-tiny">
      <!--向服务器上传数独数据时，显示的提示信息-->
      <div v-if="loading.sudokuDataUp" class="ui active centered inline text loader">正在向服务器上传您的数独数据，请勿进行其他操作！</div>
      <!--数独游戏的按钮-->
      <SudokuGameButtons
        v-else-if="!gameFinish"
        ref="sudokuGameButtons"
        :holes-data="holesData"
        :sudoku-data.sync="sudokuData"
        @clickSubmit="submitSudokuData"
        @clickTips="showTips"
      />
      <!--游戏结束时显示-->
      <div v-else class="ui one column centered grid">
        <div class="ui center aligned column">
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="showRightAnswerCheckbox" v-model="showRightAnswer" type="checkbox">
            <label for="showRightAnswerCheckbox">显示正确答案</label>
          </div>
        </div>
      </div>
    </div>

    <!--设置区域-->
    <div class="ui container m-container-small m-padded-tb-big">
      <div class="ui two column centered grid">
        <div class="eleven wide column">
          <SudokuSetting @clickNewGame="initSudokuData" />
        </div>

        <!--帮助按钮区域-->
        <div class="five wide column">
          <SudokuHelp />
        </div>
      </div>
    </div>

    <CheckSubmitModal @clickCheck="submitSudokuData" />
    <AnswerResultModal :answer-information="answerInformation" />
  </div>
</template>

<script>
import {
  animateCSS,
  responseSetTwoDimensionalArray,
  showWarnToast
} from '@/utils/publicUtils'
import SudokuSetting from './sudoku/setting/index'
import {
  mapMutations,
  mapState
} from 'vuex'
import SudokuHelp from './sudoku/help/index'
import {
  generateSudokuTopic,
  getSudokuHelp,
  submitSudokuData
} from '@/api/gameApi'
import SudokuGameArea from './sudoku/gameArea/index'
import SudokuGameButtons from './sudoku/gameButtons/index'
import AnswerResultModal from './modal/AnswerResultModal'
import CheckSubmitModal from './modal/CheckSubmitModal'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { AnswerInformation } from '@/model/AnswerInformation'
import {
  hasInput,
  hideSudokuZeroData
} from '@/utils/sudokuUtils'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'Home',
  components: {
    CheckSubmitModal,
    AnswerResultModal,
    SudokuGameButtons,
    SudokuGameArea,
    SudokuHelp,
    SudokuSetting
  },
  data() {
    return {
      loading: {
        sudokuDataDown: true,
        sudokuDataUp: false
      },
      answerInformation: new AnswerInformation(),
      showRightAnswer: false,
      sudokuData: [[]],
      sourceSudokuData: [[]],
      holesData: [[]]
    }
  },
  computed: {
    ...mapState({
      gameModel: state => state.sudoku.gameModel,
      gameFinish: state => state.sudoku.gameFinish,
      recordMode: state => state.sudoku.recordMode
    })
  },
  updated() {
    this.initPopup()
    this.initDropdown()
  },
  mounted() {
    this.initSudokuData()
  },
  methods: {
    ...mapMutations([
      'updateGameFinish',
      'updateSerialNumber'
    ]),
    showModal,
    /**
     * 初始化数独数据
     */
    async initSudokuData() {
      this.loading.sudokuDataDown = true
      const { success, data } = await generateSudokuTopic(+this.gameModel, this.recordMode)
      this.loading.sudokuDataDown = false
      if (success) {
        hideSudokuZeroData(data.matrix, data.holes)

        this.updateGameFinish(false)
        this.updateSerialNumber()
        this.showRightAnswer = false
        this.sudokuData = data.matrix
        this.holesData = data.holes

        await animateCSS('#sudokuArea', 'bounceIn')
      }
    },
    /**
     * 显示数独的提示信息
     */
    async showTips() {
      const { success, data } = await getSudokuHelp(this.sudokuData)
      if (success) {
        // 不存在提示信息
        if (!data) {
          showWarnToast({
            message: '已无更多的提示信息'
          })
          this.$refs.sudokuGameButtons.triggerTipsButtonAnimate()
          return
        }
        const { row, column } = data
        // 根据填写是否正确，显示不同的动画
        this.$refs.sudokuGameArea.setInputAnimate(hasInput(this.sudokuData, row, column) ? 'shakeX' : 'flash', row, column)
        // 将提示的数字填入数独数据中
        responseSetTwoDimensionalArray(this.sudokuData, new SudokuMatrixGrid(row, column, data.value))
      }
    },
    /**
     * 向服务器提交数独数据
     */
    async submitSudokuData() {
      this.loading.sudokuDataUp = true
      const { success, data } = await submitSudokuData(this.sudokuData)
      this.loading.sudokuDataUp = false
      if (success) {
        // 更新答题信息并显示答题结果的弹出层
        this.answerInformation = new AnswerInformation(data.situation, data.spendTime)
        this.showModal('answerResultModal')
        this.sourceSudokuData = data.matrix
        this.updateGameFinish(true)
      }
    },
    /**
     * 初始化弹出提示
     */
    initPopup() {
      $('.tip-popup').popup()
    },
    /**
     * 初始化下拉选
     */
    initDropdown() {
      $(`.ui.dropdown`).dropdown()
    }
  }
}
</script>

<style scoped>
.sudoku-placeholder {
  height: 450px;
  width: 450px;
}

/*
  临时修复显示不出滚动条且无法滚动的问题
  与Semantic的侧边栏有关
*/
#root {
  height: 1000px !important;
}
</style>
