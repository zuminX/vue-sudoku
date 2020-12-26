<template>
  <div class="ui centered grid">
    <div class="four wide column basic segment">
      <button
        :disabled="canNotReset"
        class="ui orange basic circular button tip-popup"
        data-content="清空填写的数独空格"
        @click="resetSudokuData"
      >
        <i class="undo icon" />重置
      </button>
    </div>
    <div class="four wide column basic segment">
      <button
        :disabled="canNotRollback"
        class="ui grey basic circular button tip-popup"
        data-content="回滚最近的一次填写"
        @click="rollbackOperating"
      >
        <i class="undo alternate icon" />回滚
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
  getTwoDimeNumArray
} from '@/utils/publicUtils'
import {
  mapState
} from 'vuex'
import { isNotHole } from '@/utils/sudokuUtils'
import { SudokuInputMemento } from '@/model/SudokuInputMemento'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { isHole } from '../../../../utils/sudokuUtils'

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
      sudokuInputMemento: null
    }
  },
  computed: {
    ...mapState({
      recordMode: state => state.sudoku.recordMode,
      serialNumber: state => state.sudoku.serialNumber,
      sudokuInput: state => state.sudoku.sudokuInput
    }),
    /**
     * 判断当前是否不能撤回输入
     */
    canNotRollback() {
      return !this.sudokuInputMemento.canRollback()
    },
    /**
     * 判断当前是否不能重置
     */
    canNotReset() {
      return this.sudokuInputMemento.size() === 0
    }
  },
  watch: {
    // 监听游戏的序列数，以在新的一局开始时清空数据
    serialNumber: {
      handler() {
        this.sudokuInputMemento = new SudokuInputMemento(this.sudokuData)
      },
      immediate: true
    },
    /**
     * 监听用户的输入
     * @param newValue 输入的数独格子信息
     */
    sudokuInput(newValue) {
      this.sudokuInputMemento.add(newValue)
    }
  },
  methods: {
    /**
     * 重置玩家填写的数独数据
     */
    resetSudokuData() {
      const initSudokuData = this.getInitSudokuData()
      this.sudokuInputMemento = new SudokuInputMemento(initSudokuData)
      this.$emit('update:sudokuData', initSudokuData)
    },
    /**
     * 获取更改的数独格子列表
     */
    getChangeSudokuGridList() {
      const changeSudokuGridList = []
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (isHole(this.holesData, i, j) && this.sudokuData[i][j]) {
            changeSudokuGridList.push(new SudokuMatrixGrid(i, j, null))
          }
        }
      }
      return changeSudokuGridList
    },
    /**
     * 获取初始数独数据
     */
    getInitSudokuData() {
      const initSudokuData = getTwoDimeNumArray()
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          initSudokuData[i][j] = isNotHole(this.holesData, i, j) ? this.sudokuData[i][j] : null
        }
      }
      return initSudokuData
    },
    /**
     * 触发提示按钮的动画
     */
    triggerTipsButtonAnimate() {
      animateCSS('#tipsButton', 'shakeX')
    },
    /**
     * 回滚操作
     */
    rollbackOperating() {
      this.sudokuInputMemento.rollback(this.sudokuData)
    }
  }
}
</script>

