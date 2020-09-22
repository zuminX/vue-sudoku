<template>
  <div id="root" class="fullHeight">

    <Sidebar />

    <div class="pusher">
      <div class="ui segment m-shadow-small">
        <h1 class="ui teal header center aligned">数独游戏</h1>
      </div>

      <!--菜单图标，点击打开侧边栏-->
      <div
        class="ui black big launch right attached fixed button"
        @click="showSidebar('toc')"
        @mouseenter="changeMenuNameVisible"
        @mouseleave="changeMenuNameVisible"
      >
        <i class="content icon" />
        <span id="menuName" class="text">菜单</span>
      </div>

      <div id="sudokuArea" class="ui container m-padded-tb-large">
        <!--加载数独区域时的占位符-->
        <div v-if="loading.sudokuDataDown" class="absolute-center">
          <div class="ui placeholder sudoku-placeholder" />
        </div>
        <!--数独区域-->
        <SudokuGameArea v-else ref="sudokuGameArea" />
      </div>

      <!--按钮区域-->
      <div class="m-container-tiny">
        <div class="ui container">
          <!--向服务器上传数独数据时，显示的提示信息-->
          <div v-if="loading.sudokuDataUp" class="ui active centered inline text loader">正在向服务器上传您的数独数据，请勿进行其他操作！</div>
          <!--数独游戏的按钮-->
          <SudokuGameButtons
            v-else-if="!gameFinish"
            ref="sudokuGameButtons"
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
      </div>

      <!--设置区域-->
      <div class="m-container-small m-padded-tb-big">
        <div class="ui container">
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
      </div>

    </div>

    <CheckSubmitModal @clickCheck="submitSudokuData" />
    <AnswerResultModal :answer-information="answerInformation" />
  </div>
</template>

<script>
import {
  animateCSS,
  showModal,
  showSidebar,
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
import Sidebar from './sidebar/index'
import AnswerResultModal from './modal/AnswerResultModal'
import CheckSubmitModal from './modal/CheckSubmitModal'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { AnswerInformation } from '@/model/AnswerInformation'
import {
  hasInput,
  hideSudokuZeroData
} from '@/utils/sudokuUtils'

export default {
  name: 'Home',
  components: {
    CheckSubmitModal,
    AnswerResultModal,
    SudokuGameButtons,
    SudokuGameArea,
    SudokuHelp,
    SudokuSetting,
    Sidebar
  },
  data() {
    return {
      loading: {
        sudokuDataDown: true,
        sudokuDataUp: false
      },
      answerInformation: new AnswerInformation()
    }
  },
  computed: {
    ...mapState({
      gameModel: state => state.sudoku.gameModel,
      gameFinish: state => state.sudoku.gameFinish,
      sudokuData: state => state.sudoku.sudokuData,
      recordMode: state => state.sudoku.recordMode,
      gameFinishCallback: state => state.sudoku.gameFinishCallback
    }),
    showRightAnswer: {
      get() {
        return this.$store.state.sudoku.showRightAnswer
      },
      set(value) {
        this.$store.commit('updateShowRightAnswer', value)
      }
    }
  },
  watch: {
    /**
     * 当游戏结束且记录模式开启时，更新用户信息
     * @param newValue 新的游戏结束状态
     */
    gameFinish(newValue) {
      if (newValue === true && this.recordMode === true) {
        const callback = this.gameFinishCallback
        for (let i = 0, size = callback.length; i < size; i++) {
          callback[i]()
        }
      }
    }
  },
  updated() {
    this.initPopup()
    this.initDropdown()
  },
  mounted() {
    this.initSudokuData()
    this.initSidebar()
    this.changeMenuNameVisible()
  },
  methods: {
    ...mapMutations([
      'updateSudokuData',
      'updateSourceSudokuData',
      'updateHolesData',
      'updateGameFinish',
      'updateShowRightAnswer',
      'responseSetSudokuData',
      'updateSerialNumber'
    ]),
    showModal,
    showSidebar,
    /**
     * 初始化数独数据
     */
    async initSudokuData() {
      this.startSudokuDataDown()
      const { success, data } = await generateSudokuTopic(+this.gameModel, this.recordMode)
      this.stopSudokuDataDown()
      if (success) {
        hideSudokuZeroData(data.matrix, data.holes)

        this.updateSudokuData(data.matrix)
        this.updateHolesData(data.holes)
        this.updateShowRightAnswer(false)
        this.updateGameFinish(false)
        this.updateSerialNumber()

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
        // 根据填写是否正确，显示不同的动画shakeX
        this.$refs.sudokuGameArea.setInputAnimate(hasInput(this.sudokuData, row, column) ? 'shakeX' : 'flash', row, column)
        this.responseSetSudokuData(new SudokuMatrixGrid(row, column, data.value))
      }
    },
    /**
     * 向服务器提交数独数据
     */
    async submitSudokuData() {
      this.startSudokuDataUp()
      const { success, data } = await submitSudokuData(this.sudokuData)
      this.stopSudokuDataUp()
      if (success) {
        // 更新答题信息并显示答题结果的弹出层
        this.answerInformation = new AnswerInformation(data.situation, data.spendTime)
        this.showModal('answerResultModal')
        this.updateSourceSudokuData(data.matrix)
        this.updateGameFinish(true)
      }
    },
    /**
     * 开始上传数独数据
     */
    startSudokuDataUp() {
      this.loading.sudokuDataUp = true
    },
    /**
     * 结束上传数独数据
     */
    stopSudokuDataUp() {
      this.loading.sudokuDataUp = false
    },
    /**
     * 开始接收数独数据
     */
    startSudokuDataDown() {
      this.loading.sudokuDataDown = true
    },
    /**
     * 结束接收数独数据
     */
    stopSudokuDataDown() {
      this.loading.sudokuDataDown = false
    },
    /**
     * 初始化弹出提示
     */
    initPopup() {
      $('.tip-popup').popup()
    },
    /**
     * 初始化侧边栏
     */
    initSidebar() {
      $('.ui.sidebar').sidebar({
        context: $('#root')
      }).sidebar('setting', 'transition', 'overlay')
    },
    /**
     * 初始化下拉选
     */
    initDropdown() {
      $(`.ui.dropdown`).dropdown()
    },
    /**
     * 改变菜单名字的可见性
     */
    changeMenuNameVisible() {
      $('#menuName').transition('horizontal flip')
    }
  }
}
</script>

<style scoped>
.sudoku-placeholder {
  height: 450px;
  width: 450px;
}
</style>