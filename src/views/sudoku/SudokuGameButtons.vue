<template>
  <!--数独游戏的按钮-->
  <div class="ui three column centered grid">
    <div class="right aligned column basic segment">
      <button @click="resetSudokuData" class="ui orange basic circular button tip-popup" data-content="清空填写的数独空格">
        <i class="undo icon"></i>重置
      </button>
    </div>
    <div class="center aligned column basic segment">
      <button @click="$emit('clickSubmit')"
              class="ui green circular button">
        <i class="upload icon"></i>提交
      </button>
    </div>
    <div class="left aligned column basic segment" id="tipsButton">
      <button :class="{'disabled': recordMode}" @click="$emit('clickTips')"
              class="ui blue basic circular button tip-popup" data-content="显示一个空格的数字或提示错误填写的格子">
        <i class="question icon"></i>提示
      </button>
    </div>
  </div>
</template>

<script>
  import {animateCSS} from "../../utils/publicUtils";
  import {
    mapMutations,
    mapState
  } from "vuex";
  import {getTwoDimeNumArray} from "../../utils/coreUtils";
  import {isNotHole} from "../../utils/sudokuUtils";

  export default {
    name: "SudokuGameButtons",
    computed: {
      ...mapState({
        sudokuData: state => state.sudoku.sudokuData,
        holesData: state => state.sudoku.holesData,
        recordMode: state => state.sudoku.recordMode
      }),
    },
    methods: {
      ...mapMutations([
        'updateSudokuData',
      ]),
      /**
       * 重置玩家填写的数独数据
       */
      resetSudokuData() {
        let newSudokuData = getTwoDimeNumArray();
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            newSudokuData[i][j] = isNotHole(this.holesData, i, j) ? this.sudokuData[i][j] : null;
          }
        }
        this.updateSudokuData(newSudokuData);
      },
      /**
       * 触发提示按钮的动画
       */
      triggerTipsButtonAnimate() {
        animateCSS('#tipsButton', "shakeX");
      },
    },
  }
</script>

