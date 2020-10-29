<template>
  <div class="ui centered grid">
    <div class="four wide column basic segment">
      <button class="ui orange basic circular button tip-popup" data-content="清空填写的数独空格" @click="resetSudokuData">
        <i class="undo icon" />重置
      </button>
    </div>
    <div class="four wide column basic segment">
      <button
        :disabled="canNotRollback"
        class="ui grey basic circular button tip-popup"
        data-content="回滚最近的一次填写"
        @click="sudokuInputCommand.rollback()"
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
  animateCSS
} from '@/utils/publicUtils'
import {
  mapState
} from 'vuex'
import { getTwoDimeNumArray } from '@/utils/coreUtils'
import { isNotHole } from '@/utils/sudokuUtils'
import { SudokuInputCommand } from '@/model/SudokuInputCommand'

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
      sudokuInputCommand: null
    }
  },
  computed: {
    ...mapState({
      recordMode: state => state.sudoku.recordMode,
      serialNumber: state => state.sudoku.serialNumber,
      sudokuInput: state => state.sudoku.sudokuInput
    }),
    canNotRollback() {
      return !this.sudokuInputCommand.canRollback()
    }
  },
  watch: {
    // 监听游戏的序列数，以在新的一局开始时清空数据
    serialNumber: {
      handler() {
        this.sudokuInputCommand = new SudokuInputCommand(this.sudokuData)
      },
      immediate: true
    },
    /**
     * 监听用户的输入
     * @param newValue 输入的数独格子信息
     */
    sudokuInput(newValue) {
      this.sudokuInputCommand.add(newValue)
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
     * 触发提示按钮的动画
     */
    triggerTipsButtonAnimate() {
      animateCSS('#tipsButton', 'shakeX')
    }
  }
}
</script>

