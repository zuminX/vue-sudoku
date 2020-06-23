<template>
  <div class="fullHeight" id="root">

    <Sidebar/>

    <div class="pusher">
      <div class="ui segment m-shadow-small">
        <h1 class="ui teal header center aligned">数独游戏</h1>
      </div>

      <!--菜单图标，点击打开侧边栏-->
      <div @click="showSidebar('toc')" @mouseenter="changeMenuNameVisible" @mouseleave="changeMenuNameVisible"
           class="ui black big launch right attached fixed button">
        <i class="content icon"></i>
        <span class="text" id="menuName">菜单</span>
      </div>

      <div class="ui container m-padded-tb-large" id="sudokuArea">
        <!--加载数独区域时的占位符-->
        <div class="absolute-center" v-if="loading.sudokuDataDown">
          <div class="ui placeholder sudoku-placeholder"></div>
        </div>
        <!--数独区域-->
        <SudokuGameArea ref="sudokuGameArea" v-else></SudokuGameArea>
      </div>

      <!--按钮区域-->
      <div class="m-container-tiny">
        <div class="ui container">
          <!--向服务器上传数独数据时，显示的提示信息-->
          <div class="ui active centered inline text loader" v-if="loading.sudokuDataUp">正在向服务器上传您的数独数据，请勿进行其他操作！</div>
          <!--数独游戏的按钮-->
          <SudokuGameButtons @clickSubmit="submitSudokuData" @clickTips="showTips" ref="sudokuGameButtons"
                             v-else-if="!gameFinish"></SudokuGameButtons>
          <!--游戏结束时显示-->
          <div class="ui one column centered grid" v-else>
            <div class="ui center aligned column">
              <div class="ui toggle checkbox m-padded-tb tip-popup">
                <input id="showRightAnswerCheckbox" type="checkbox" v-model="showRightAnswer">
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
              <SudokuSetting @clickNewGame="initSudokuData"></SudokuSetting>
            </div>

            <!--帮助按钮区域-->
            <div class="five wide column">
              <SudokuHelp/>
            </div>
          </div>
        </div>
      </div>

      <!--数独选择框-->
      <SudokuInputArea id="sudokuInputArea"></SudokuInputArea>
    </div>

    <CheckSubmitModal @clickCheck="submitSudokuData"/>
    <AnswerResultModal :answer-information="answerInformation"/>
  </div>
</template>

<script>
  import {
    animateCSS,
    showModal,
    showSidebar,
    showWarnToast
  } from '../utils/publicUtils'
  import SudokuSetting from "./sudoku/SudokuSetting";
  import {
    mapMutations,
    mapState
  } from "vuex";
  import SudokuHelp from "./sudoku/SudokuHelp";
  import SudokuInputArea from "./sudoku/SudokuInputArea";
  import {
    generateSudokuTopic,
    getSudokuHelp,
    submitSudokuData
  } from "../api/gameApi";
  import SudokuGameArea from "./sudoku/SudokuGameArea";
  import SudokuGameButtons from "./sudoku/SudokuGameButtons";
  import Sidebar from "./Sidebar";
  import AnswerResultModal from "./modal/AnswerResultModal";
  import CheckSubmitModal from "./modal/CheckSubmitModal";
  import {TwoDimensionalArrayValue} from "../model/TwoDimensionalArrayValue";
  import {AnswerInformation} from "../model/AnswerInformation";
  import {
    hasInput,
    hideSudokuZeroData
  } from "../utils/sudokuUtils";

  export default {
    name: 'Home',
    components: {
      CheckSubmitModal,
      AnswerResultModal,
      SudokuGameButtons,
      SudokuGameArea,
      SudokuInputArea,
      SudokuHelp,
      SudokuSetting,
      Sidebar
    },
    data() {
      return {
        loading: {
          sudokuDataDown: true,
          sudokuDataUp: false,
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
          return this.$store.state.sudoku.showRightAnswer;
        },
        set(value) {
          this.$store.commit('updateShowRightAnswer', value);
        }
      },
    },
    watch: {
      /**
       * 当游戏结束且记录模式开启时，更新用户信息
       * @param newValue 新的游戏结束状态
       */
      gameFinish(newValue) {
        if (newValue === true && this.recordMode === true) {
          const callback = this.gameFinishCallback;
          for (let i = 0, size = callback.length; i < size; i++) {
            callback[i]();
          }
        }
      },
    },
    updated() {
      this.initPopup();
      this.initDropdown();
    },
    mounted() {
      this.initSudokuData();
      this.initSidebar();
      this.changeMenuNameVisible();
    },
    methods: {
      ...mapMutations([
        'updateSudokuData',
        'updateSourceSudokuData',
        'updateHolesData',
        'updateGameFinish',
        'updateShowRightAnswer',
        'responseSetSudokuData'
      ]),
      showModal,
      showSidebar,
      /**
       * 初始化数独数据
       */
      async initSudokuData() {
        this.startSudokuDataDown();
        const {success, data} = await generateSudokuTopic(+this.gameModel, this.recordMode);
        this.stopSudokuDataDown();
        if (success) {
          hideSudokuZeroData(data.matrix, data.holes);

          this.updateSudokuData(data.matrix);
          this.updateHolesData(data.holes);
          this.updateShowRightAnswer(false);
          this.updateGameFinish(false);

          animateCSS("#sudokuArea", "bounceIn");
        }
      },
      /**
       * 显示数独的提示信息
       */
      async showTips() {
        const {success, data} = await getSudokuHelp(this.sudokuData);
        if (success) {
          //不存在提示信息
          if (!data) {
            showWarnToast({
              message: "已无更多的提示信息"
            });
            this.$refs.sudokuGameButtons.triggerTipsButtonAnimate();
            return;
          }
          let row = data.row;
          let column = data.column;
          this.responseSetSudokuData(new TwoDimensionalArrayValue(row, column, data.value));
          this.$refs.sudokuGameArea.setInputAnimate(hasInput(this.sudokuData, row, column) ? "shakeX" : "flash", row, column);
        }
      },
      /**
       * 向服务器提交数独数据
       */
      async submitSudokuData() {
        this.startSudokuDataUp();
        const {success, data} = await submitSudokuData(this.sudokuData)
        this.stopSudokuDataUp();
        if (success) {
          //更新答题信息并显示答题结果的弹出层
          this.answerInformation = new AnswerInformation(data.situation, data.spendTime);
          this.showModal('answerResultModal');
          this.updateSourceSudokuData(data.matrix);
          this.updateGameFinish(true);
        }
      },
      /**
       * 开始上传数独数据
       */
      startSudokuDataUp() {
        this.loading.sudokuDataUp = true;
      },
      /**
       * 结束上传数独数据
       */
      stopSudokuDataUp() {
        this.loading.sudokuDataUp = false;
      },
      /**
       * 开始接收数独数据
       */
      startSudokuDataDown() {
        this.loading.sudokuDataDown = true;
      },
      /**
       * 结束接收数独数据
       */
      stopSudokuDataDown() {
        this.loading.sudokuDataDown = false;
      },
      /**
       * 初始化弹出提示
       */
      initPopup() {
        $(".tip-popup").popup();
      },
      /**
       * 初始化侧边栏
       */
      initSidebar() {
        $('.ui.sidebar').sidebar({
          context: $('#root')
        }).sidebar('setting', 'transition', 'overlay');
      },
      /**
       * 初始化下拉选
       */
      initDropdown() {
        $(`.ui.dropdown`).dropdown();
      },
      /**
       * 改变菜单名字的可见性
       */
      changeMenuNameVisible() {
        $('#menuName').transition('horizontal flip');
      },
    },
  }
</script>

<style scoped>
  .sudoku-placeholder {
    height: 450px;
    width: 450px;
  }

  #sudokuArea {
    min-width: 460px !important;
    min-height: 460px !important;
  }
</style>
