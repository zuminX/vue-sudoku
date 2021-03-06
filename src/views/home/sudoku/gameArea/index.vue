<template>
  <div>
    <div class="ui center aligned container">
      <i class="clock outline icon" />
      <TimeRecord ref="timeRecord" />
    </div>
    <div v-for="(rowData, i) in sudokuData" :key="i" class="sudoku-row absolute-center">
      <div
        v-for="(data, j) in rowData"
        :key="j"
        class="number"
        @click="showSudokuNumber(i, j)"
        @mouseenter="setTipStyle(i, j)"
        @mouseleave="hideTipStyle"
      >
        <input
          :id="inputId(i, j)"
          :class="[tipsStyle[i][j]!==0?style.tipColor:'',
                   tipsStyle[i][j]===1?style.secondaryOpacity:'',
                   gameFinish&&holesData[i][j]?(data===sourceSudokuData[i][j]?style.rightBorderColor:style.errorBorderColor):'',
                   !holesData[i][j]&&tipsStyle[i][j]===0?style.topicBackgroundColor:'',
                   showRightAnswer&&holesData[i][j]?(data===sourceSudokuData[i][j]?style.rightBackgroundColor:style.errorBackgroundColor):'']"
          :disabled="inputDisabled(i, j)"
          :value="inputValue(i, j)"
          class="sudoku-number-input"
          type="number"
          @input="addSudokuInput(i,j,$event.target.value)"
        >
      </div>
    </div>

    <!--数独选择框-->
    <SudokuInputArea id="sudokuInputArea" @selectNumber="selectSudokuNumber" />
  </div>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
import {
  animateCSS,
  getTwoDimeNumArray
} from '@/utils/publicUtils'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { ClickPosition } from '@/model/ClickPosition'
import {
  isHole,
  setSudokuColumn,
  setSudokuPalace,
  setSudokuRow
} from '@/utils/sudokuUtils'
import SudokuInputArea from '@/views/home/sudoku/gameArea/components/SudokuInputArea'
import TimeRecord from '@/components/TimeRecord/index'
import { responseSetTwoDimensionalArray } from '@/utils/coreUtils'

export default {
  name: 'SudokuGameArea',
  components: { TimeRecord, SudokuInputArea },
  props: {
    showRightAnswer: {
      type: Boolean,
      required: true
    },
    sudokuData: {
      type: Array,
      required: true
    },
    sourceSudokuData: {
      type: Array,
      required: true
    },
    holesData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      clickPosition: new ClickPosition(),
      tipsStyle: getTwoDimeNumArray(),
      style: {
        rightBackgroundColor: 'background-color-green',
        errorBackgroundColor: 'background-color-blue',
        topicBackgroundColor: 'background-color-gray',
        secondaryOpacity: 'm-opacity-big',
        tipColor: 'tip-color',
        rightBorderColor: 'border-color-green',
        errorBorderColor: 'border-color-red'
      }
    }
  },
  computed: {
    ...mapState({
      gameFinish: state => state.sudoku.gameFinish,
      positionTips: state => state.sudoku.positionTips,
      clickMode: state => state.sudoku.clickMode,
      sudokuInput: state => state.sudoku.sudokuInput
    })
  },
  watch: {
    /**
     * 游戏结束时停止计时
     * @param newValue 新的游戏结束状态
     */
    gameFinish(newValue) {
      if (newValue === true) {
        this.$refs.timeRecord.stop()
      }
    },
    /**
     * 监听输入的数独格子信息，并将输入响应式的修改到数独数据中
     */
    sudokuInput(inputValue) {
      if (inputValue && inputValue.value !== 0) {
        responseSetTwoDimensionalArray(this.sudokuData, inputValue)
      }
    }
  },
  mounted() {
    // 开始计时
    this.$refs.timeRecord.start()
  },
  methods: {
    ...mapMutations([
      'updateSudokuInput'
    ]),
    /**
     * 隐藏数独选择框
     */
    hideSudokuNumber() {
      if (ClickPosition.isNotInit(this.clickPosition)) {
        const { row, column } = this.clickPosition
        // 隐藏该位置对应的数独选择框
        $(`#numberInput${row}${column}`).popup('hide')
      }
    },
    /**
     * 隐藏数独位置提示的信息
     */
    hideTipStyle() {
      if (this.positionTips) {
        this.tipsStyle = getTwoDimeNumArray()
      }
    },
    /**
     * 增加输入的数独格子信息
     */
    addSudokuInput(row, column, value) {
      this.updateSudokuInput(new SudokuMatrixGrid(row, column, value))
    },
    /**
     * 从数独选择框中选择数字
     * @param number 选择的数字
     */
    selectSudokuNumber(number) {
      const { row, column } = this.clickPosition
      this.addSudokuInput(row, column, number)
      this.hideSudokuNumber()
    },
    /**
     * 设置动画
     * @param animate 动画名称
     * @param i 行
     * @param j 列
     */
    setInputAnimate(animate, i, j) {
      animateCSS(`#numberInput${i}${j}`, animate)
    },
    /**
     * 设置数独位置提示的信息
     * @param i 行
     * @param j 列
     */
    setTipStyle(i, j) {
      if (this.positionTips) {
        const newTipsStyle = getTwoDimeNumArray()
        setSudokuRow(newTipsStyle, i, 1)
        setSudokuColumn(newTipsStyle, j, 1)
        setSudokuPalace(newTipsStyle, i, j, 1)
        // 设置该点的样式为当前样式
        newTipsStyle[i][j] = 2

        this.tipsStyle = newTipsStyle
      }
    },
    /**
     * 显示数独选择框
     * @param i 行
     * @param j 列
     */
    showSudokuNumber(i, j) {
      if (this.clickMode && isHole(this.holesData, i, j) && !this.gameFinish) {
        this.hideSudokuNumber()
        this.showSudokuInputArea(i, j)
        this.clickPosition = new ClickPosition(i, j)
      }
    },
    /**
     * 在底部中间显示数独选择框
     * @param i 行
     * @param j 列
     */
    showSudokuInputArea(i, j) {
      const thisNode = $(`#${this.inputId(i, j)}`)
      thisNode.popup({
        popup: $('#sudokuInputArea'),
        position: 'bottom center',
        on: 'click'
      })
      thisNode.popup('toggle')
    },
    /**
     * 判断该数独输入框是否禁用
     * @param i 行
     * @param j 列
     * @returns {boolean} 禁用返回true，否则返回false
     */
    inputDisabled(i, j) {
      return this.gameFinish || this.clickMode ? true : !this.holesData[i][j]
    },
    /**
     * 获取该数独输入框的值
     * @param i 行
     * @param j 列
     * @returns {number} 数独数据的值
     */
    inputValue(i, j) {
      return this.showRightAnswer ? this.sourceSudokuData[i][j] : this.sudokuData[i][j]
    },
    /**
     * 获取输入框的ID
     * @param i 行
     * @param j 列
     * @returns {string} ID
     */
    inputId(i, j) {
      return `numberInput${i}${j}`
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
