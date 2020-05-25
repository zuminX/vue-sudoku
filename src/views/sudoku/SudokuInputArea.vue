<template>
  <div class="ui popup transition hidden sudoku-number-area">
    <div :key="i" class="sudoku-row" v-for="(rowData, i) in sudokuNumber">
      <div :key="j" @click="selectNumber(data)" class="number" v-for="(data, j) in rowData">
        <input :value="data" class="sudoku-number-input hover-sudoku-number m-opacity-big background-color-blue" disabled type="text">
      </div>
    </div>
  </div>
</template>

<script>
  import {getSudokuArray} from "../../utils/coreUtils";

  export default {
    name: "SudokuInputArea",
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
        //更新数独输入数字，采用对象形式，防止选择相同数字时watch失效
        this.$store.commit("updateSudokuInputNumber", {number: data});
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