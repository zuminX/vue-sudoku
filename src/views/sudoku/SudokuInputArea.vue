<template>
  <div class="ui popup transition hidden sudoku-number-area">
    <div v-for="(rowData, i) in sudokuNumber" :key="i" class="sudoku-row">
      <div v-for="(data, j) in rowData" :key="j" class="number" @click="selectNumber(data)">
        <input
          :value="data"
          class="sudoku-number-input hover-sudoku-number m-opacity-big background-color-blue"
          disabled
          type="text"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getSudokuArray } from '@/utils/sudokuUtils'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { ClickPosition } from '@/model/ClickPosition'

export default {
  name: 'SudokuInputArea',
  props: {
    clickPosition: {
      type: ClickPosition,
      required: true
    }
  },
  data() {
    return {
      sudokuNumber: getSudokuArray()
    }
  },
  methods: {
    /**
     * 选择数独数字
     * @param data 数字
     */
    selectNumber(data) {
      this.$store.commit('updateSudokuInput', new SudokuMatrixGrid(this.clickPosition.row, this.clickPosition.column, data))
    }
  }
}
</script>

<style scoped>
/*数独数字区域*/
.sudoku-number-area {
  padding: 0 !important;
  border: none !important;
}

/*悬停数独数字透明度*/
.hover-sudoku-number:hover {
  opacity: 1 !important;
}
</style>
