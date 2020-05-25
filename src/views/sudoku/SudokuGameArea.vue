<template>
  <div>
    <div class="ui center aligned container">
      <i class="clock outline icon"></i>
      <TimeRecord ref="timeRecord"/>
    </div>
    <div :key="i" class="sudoku-row absolute-center" v-for="(rowData, i) in sudokuData">
      <div :key="j" @click="showSudokuNumber(i, j)" @mouseenter="setTipStyle(i, j)" @mouseleave="hideTipStyle"
           class="number" v-for="(data, j) in rowData">
        <input :class="[tipsStyle[i][j]!==0?style.tipColor:'',
                 tipsStyle[i][j]===1?style.secondaryOpacity:'',
                 gameFinish&&holesData[i][j]===1?(data===sourceSudokuData[i][j]?style.rightBorderColor:style.errorBorderColor):'',
                 holesData[i][j]===0&&tipsStyle[i][j]===0?style.disabledBackgroundColor:'',
                 showRightAnswer&&holesData[i][j]===1?(data===sourceSudokuData[i][j]?style.rightBackgroundColor:style.errorBackgroundColor):'']"
               :disabled="gameFinish||clickMode?true:holesData[i][j]===0"
               :id="`numberInput${i}${j}`"
               :value="showRightAnswer?sourceSudokuData[i][j]:sudokuData[i][j]" @input="inputSudokuNumber(i,j,$event.target.value)"
               class="sudoku-number-input" type="number">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {animateCSS} from "../../utils/publicUtils";
  import {getTwoDimensionalArray} from "../../utils/coreUtils";
  import TimeRecord from "../../components/TimeRecord";
  import {TwoDimensionalArrayValue} from "../../model/TwoDimensionalArrayValue";

  export default {
    name: "SudokuGameArea",
    components: {TimeRecord},
    data() {
      return {
        //点击位置
        clickPosition: {x: -1, y: -1},
        //提示样式
        tipsStyle: getTwoDimensionalArray(),
        //样式
        style: {
          rightBackgroundColor: 'background-color-green',
          errorBackgroundColor: 'background-color-blue',
          disabledBackgroundColor: 'background-color-gray',
          secondaryOpacity: 'm-opacity-big',
          tipColor: 'tip-color',
          rightBorderColor: 'border-color-green',
          errorBorderColor: 'border-color-red',
        },
      }
    },
    computed: {
      ...mapState({
        sudokuData: state => state.sudoku.sudokuData,
        sourceSudokuData: state => state.sudoku.sourceSudokuData,
        holesData: state => state.sudoku.holesData,
        gameFinish: state => state.sudoku.gameFinish,
        showRightAnswer: state => state.sudoku.showRightAnswer,
        positionTips: state => state.sudoku.positionTips,
        clickMode: state => state.sudoku.clickMode,
        sudokuInputNumber: state => state.sudoku.sudokuInputNumber
      }),
    },
    watch: {
      /**
       * 游戏结束时停止计时
       * @param newValue 新的游戏结束状态
       */
      gameFinish(newValue) {
        if (newValue === true) {
          this.$refs.timeRecord.stop();
        }
      },
      /**
       * 当数独输入数字改变时，即在选择模式下选择的数字
       */
      sudokuInputNumber(newValue) {
        //获取选择的数字
        let number = newValue.number;
        if (number !== -1) {
          this.selectSudokuNumber(number);
        }
      },
    },
    mounted() {
      //开始计时
      this.$refs.timeRecord.start();
    },
    methods: {
      /**
       * 隐藏数独选择框
       */
      hideSudokuNumber() {
        //获取点击位置
        let {x, y} = this.clickPosition;
        if (x !== -1 && y !== -1) {
          //隐藏该位置对应的数独选择框
          $(`#numberInput${x}${y}`).popup('hide');
        }
      },
      /**
       * 隐藏数独位置提示的信息
       */
      hideTipStyle() {
        if (this.positionTips) {
          //清空提示样式
          this.tipsStyle = getTwoDimensionalArray();
        }
      },
      //获取store中的mutations
      ...mapMutations([
        'responseSetSudokuData',
        'updateSudokuInputNumber'
      ]),
      /**
       * 处理输入数独数字
       * @param i 行
       * @param j 列
       * @param value 值
       */
      inputSudokuNumber(i, j, value) {
        //将输入的数字填入数独数据中
        this.responseSetSudokuData(new TwoDimensionalArrayValue(i, j, value));
      },
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
       * 从数独选择框中选择数字
       * @param number 选择的数字
       */
      selectSudokuNumber(number) {
        let {x, y} = this.clickPosition;
        //将选择的数字填入数独数据中
        this.responseSetSudokuData(new TwoDimensionalArrayValue(x, y, number));
        this.hideSudokuNumber();
      },
      /**
       * 设置动画
       * @param animate 动画名称
       * @param i 行
       * @param j 列
       */
      setInputAnimate(animate, i, j) {
        animateCSS(`#numberInput${i}${j}`, animate);
      },
      /**
       * 设置数独位置提示的信息
       * @param i 行
       * @param j 列
       */
      setTipStyle(i, j) {
        if (this.positionTips) {
          let newTipsStyle = getTwoDimensionalArray();
          //设置该行的样式为提示样式
          for (let col = 0; col < 9; col++) {
            newTipsStyle[i][col] = 1;
          }
          //设置该列的样式为提示样式
          for (let row = 0; row < 9; row++) {
            newTipsStyle[row][j] = 1;
          }
          //设置该宫的样式为提示样式
          for (let firstRow = Math.floor(i / 3) * 3, row = firstRow; row < firstRow + 3; row++) {
            for (let firstCol = Math.floor(j / 3) * 3, col = firstCol; col < firstCol + 3; col++) {
              newTipsStyle[row][col] = 1;
            }
          }
          //设置该点的样式为当前样式
          newTipsStyle[i][j] = 2;
          //替换为当前的提示样式
          this.tipsStyle = newTipsStyle;
        }
      },
      /**
       * 显示数独选择框
       * @param i 行
       * @param j 列
       */
      showSudokuNumber(i, j) {
        //当前为点击模式且该位置为空且本局游戏未结束
        if (this.clickMode && this.isHole(i, j) && !this.gameFinish) {
          this.hideSudokuNumber();
          //获取点击结点并在其底部中间显示数独选择框
          let thisNode = $(`#numberInput${i}${j}`);
          thisNode.popup({
            popup: $("#sudokuInputArea"),
            position: 'bottom center',
            on: 'click'
          });
          thisNode.popup('toggle');
          //设置当前的点击位置
          this.clickPosition = {x: i, y: j};
        }
      }
    }
  }
</script>

<style scoped>
  /*背景颜色*/
  .tip-color {
    background: #92cffd !important;
  }
</style>