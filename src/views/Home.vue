<template>
  <div class="fullHeight" id="root">

    <Sidebar @showModal="showModal"/>

    <div class="pusher">
      <div class="ui segment m-shadow-small">
        <h1 class="ui teal header center aligned">数独游戏</h1>
      </div>

      <!--菜单图标，点击打开侧边栏-->
      <div @click="showSidebar" @mouseenter="changeMenuNameVisible" @mouseleave="changeMenuNameVisible"
           class="ui black big launch right attached fixed button">
        <i class="content icon"></i>
        <span class="text" id="menuName">菜单</span>
      </div>

      <div class="ui container m-padded-tb-large" id="sudokuArea" style="min-width: 460px !important; min-height: 460px !important;">
        <!--加载数独区域时的占位符-->
        <div class="absolute-center" v-if="loading.sudokuDataDown">
          <div class="ui placeholder" style="height: 450px; width: 450px;"></div>
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
              <SudokuHelp @clickSudokuHow="showModal('sudokuHowModal')"
                          @clickSudokuWhat="showModal('sudokuWhatModal')"></SudokuHelp>
            </div>
          </div>
        </div>
      </div>

      <!--数独选择框-->
      <SudokuInputArea id="sudokuInputArea"></SudokuInputArea>

    </div>

    <CheckSubmitModal @clickCheck="submitSudokuData"/>
    <AnswerResultModal :answer-information="answerInformation"/>
    <SudokuInformationModal/>
    <UserInformationModal/>
    <HistoryRecordModal/>
    <LeaderboardModal/>
  </div>
</template>

<script>
  import semantic from '../../semantic/dist/semantic'
  import {Message} from "element-ui";
  import {
    animateCSS,
    showModal
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
  import {hideSudokuZeroData} from "../utils/coreUtils";
  import Sidebar from "./Sidebar";
  import SudokuInformationModal from "./modal/SudokuInformationModal";
  import AnswerResultModal from "./modal/AnswerResultModal";
  import CheckSubmitModal from "./modal/CheckSubmitModal";
  import UserInformationModal from "./modal/UserInformationModal";
  import HistoryRecordModal from "./modal/HistoryRecordModal";
  import LeaderboardModal from "./modal/LeaderboardModal";
  import {TwoDimensionalArrayValue} from "../model/TwoDimensionalArrayValue";
  import {AnswerInformation} from "../model/AnswerInformation";

  export default {
    name: 'Home',
    components: {
      LeaderboardModal,
      HistoryRecordModal,
      UserInformationModal,
      CheckSubmitModal,
      AnswerResultModal,
      SudokuInformationModal,
      SudokuGameButtons,
      SudokuGameArea,
      SudokuInputArea,
      SudokuHelp,
      SudokuSetting,
      Sidebar
    },
    data() {
      return {
        //加载状态
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
    mounted() {
      this.initSudokuData();
      //初始化弹出提示
      $(".tip-popup").popup();
      //初始化侧边栏
      $('.ui.sidebar').sidebar({
        context: $('#root')
      }).sidebar('setting', 'transition', 'overlay');
      //隐藏菜单名字
      $('#menuName').transition('hide');
    },
    methods: {
      /**
       * 改变菜单名字的可见性
       */
      changeMenuNameVisible() {
        //设置过渡动画为水平翻转
        $('#menuName').transition('horizontal flip');
      },
      ...mapMutations([
        'updateSudokuData',
        'updateSourceSudokuData',
        'updateHolesData',
        'updateGameFinish',
        'updateShowRightAnswer',
        'responseSetSudokuData'
      ]),
      /**
       * 初始化数独数据
       */
      initSudokuData() {
        //设置为下载数独数据中
        this.loading.sudokuDataDown = true;
        generateSudokuTopic(+this.gameModel, this.recordMode)
        .then(data => {
          if (data) {
            //隐藏数独数据中为零的数据
            hideSudokuZeroData(data.matrix, data.holes);
            //更新当前的数据
            this.updateSudokuData(data.matrix);
            this.updateHolesData(data.holes);
            this.updateShowRightAnswer(false);
            this.updateGameFinish(false);
            this.loading.sudokuDataUp = false;
            //设置为下载数独数据结束
            this.loading.sudokuDataDown = false;
            //设置数独区域一个弹出动画
            animateCSS("#sudokuArea", "bounceIn");
          }
        })
      },
      /**
       * 显示指定ID的弹出层
       * @param id 弹出层的ID
       */
      showModal(id) {
        showModal(`#${id}`);
      },
      /**
       * 显示侧边栏
       */
      showSidebar() {
        $('#toc').sidebar('toggle');
      },
      /**
       * 显示数独的提示信息
       */
      showTips() {
        getSudokuHelp(this.sudokuData)
        .then(data => {
          //若数据不为空，即玩家的数独数据与初始的数独终盘的数据不一致
          if (data) {
            let row = data.row;
            let column = data.column;
            let animation = "flash";
            //若用户填写了数据，则改为使用抖动的动画
            if (this.sudokuData[row][column] !== null) {
              animation = "shake";
            }
            //设置此位置的数据为数独终盘对应的数据
            this.responseSetSudokuData(new TwoDimensionalArrayValue(row, column, data.value));
            //设置该位置显示一个动画
            this.$refs.sudokuGameArea.setInputAnimate(animation, row, column);
          } else {
            Message.info({message: "已无更多的提示信息"});
            //设置该按钮一个抖动动画
            this.$refs.sudokuGameButtons.setTipsButtonAnimate("shake");
          }
        })
      },
      /**
       * 向服务器提交数独数据
       */
      submitSudokuData() {
        //设置为上传数独数据中
        this.loading.sudokuDataUp = true;
        submitSudokuData(this.sudokuData)
        .then(data => {
          //设置为上传数独数据结束
          this.loading.sudokuDataUp = false;
          if (data) {
            //更新答题信息并显示答题结果的弹出层
            this.answerInformation = new AnswerInformation(data.situation, data.spendTime);
            this.showModal('answerResultModal');
            //更新当前的数据
            this.updateSourceSudokuData(data.matrix);
            this.updateGameFinish(true);
          }
        })
      }
    },
  }
</script>
