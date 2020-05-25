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
      <button @click="$emit('clickTips')" :class="{'disabled': recordMode}"
              class="ui blue basic circular button tip-popup" data-content="显示一个空格的数字或提示错误填写的格子">
        <i class="question icon"></i>提示
      </button>
    </div>
  </div>
</template>

<script>
  import {animateCSS} from "../../utils/publicUtils";
  import {mapMutations, mapState} from "vuex";
  import {getTwoDimensionalArray} from "../../utils/coreUtils";

  export default {
    name: "SudokuGameButtons",
    computed: {
      ...mapState({
        sudokuData: state => state.sudoku.sudokuData,
        holesData: state => state.sudoku.holesData,
        recordMode: state => state.sudoku.recordMode
      }),
    },
    mounted() {
      //初始化弹出提示
      $(".tip-popup").popup();
    },
    methods: {
      ...mapMutations([
        'updateSudokuData',
      ]),
      /**
       * 判断给定位置是否空缺
       * @param i 行
       * @param j 列
       * @returns {boolean} 空缺返回true，否则返回false
       */
      isHole(i, j) {
        return this.holesData[i][j] === 1;
      },
      /**
       * 重置玩家填写的数独数据
       */
      resetSudokuData() {
        let newSudokuData = getTwoDimensionalArray();
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            //若该位置为空缺，则该位置的数独数据为null
            if (this.isHole(i, j)) {
              newSudokuData[i][j] = null;
            } else {
              newSudokuData[i][j] = this.sudokuData[i][j];
            }
          }
        }
        this.updateSudokuData(newSudokuData);
      },
      /**
       * 设置提示按钮的动画
       * @param animate 动画名
       */
      setTipsButtonAnimate(animate) {
        animateCSS('#tipsButton', animate);
      },
    },
  }
</script>

