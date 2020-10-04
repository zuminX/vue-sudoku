<template>
  <div class="ui centered grid">
    <div class="four wide column basic segment">
      <button class="ui orange basic circular button tip-popup" data-content="清空填写的数独空格" @click="resetSudokuData">
        <i class="undo icon" />重置
      </button>
    </div>
    <div class="four wide column basic segment">
      <button
        :disabled="notChange"
        class="ui grey basic circular button tip-popup"
        data-content="回滚最近的一次填写"
        @click="rollbackSudokuData"
      >
        <i class="undo icon" />回滚
      </button>
    </div>
    <div class="four wide column basic segment">
      <button class="ui green circular button" @click="$emit('clickSubmit')">
        <i class="upload icon" />提交
      </button>
    </div>
    <div id="tipsButton" class="four wide column basic segment">
      <button
        v-prevent-click
        :class="{'disabled': recordMode}"
        class="ui blue basic circular button tip-popup"
        data-content="显示一个空格的数字或提示错误填写的格子"
        @click="$emit('clickTips')"
      >
        <i class="question icon" />提示
      </button>
    </div>
  </div>
</template>

<script>
import {
  animateCSS,
  responseSetTwoDimensionalArray
} from '@/utils/publicUtils'
import {
  mapState
} from 'vuex'
import { getTwoDimeNumArray } from '@/utils/coreUtils'
import { isNotHole } from '@/utils/sudokuUtils'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { deepClone } from '@/utils'

export default {
  name: 'SudokuGameButtons',
  props: {
    sudokuData: {
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
      preSudokuData: null,
      changeSudokuData: []
    }
  },
  computed: {
    ...mapState({
      recordMode: state => state.sudoku.recordMode,
      serialNumber: state => state.sudoku.serialNumber,
      sudokuInput: state => state.sudoku.sudokuInput
    }),
    notChange() {
      return this.changeSudokuData.length === 0
    }
  },
  watch: {
    // 监听游戏的序列数，以在新的一局开始时清空数据
    serialNumber: {
      handler() {
        this.preSudokuData = deepClone(this.sudokuData)
        this.changeSudokuData = []
      },
      immediate: true
    },
    /**
     * 监听用户的输入
     * @param newValue 输入的数独格子信息
     */
    sudokuInput(newValue) {
      const { row, column, value } = newValue
      this.changeSudokuData.push(new SudokuMatrixGrid(row, column, this.preSudokuData[row][column]))
      this.preSudokuData[row][column] = value
    }
  },
  methods: {
    /**
     * 重置玩家填写的数独数据
     */
    resetSudokuData() {
      const newSudokuData = getTwoDimeNumArray()
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          newSudokuData[i][j] = isNotHole(this.holesData, i, j) ? this.sudokuData[i][j] : null
        }
      }
      this.$emit('update:sudokuData', newSudokuData)
    },
    /**
     * 回滚玩家填写的数独数据
     */
    rollbackSudokuData() {
      responseSetTwoDimensionalArray(this.sudokuData, this.changeSudokuData.pop())
    },
    /**
     * 触发提示按钮的动画
     */
    triggerTipsButtonAnimate() {
      animateCSS('#tipsButton', 'shakeX')
    }
  }
}
</script>

