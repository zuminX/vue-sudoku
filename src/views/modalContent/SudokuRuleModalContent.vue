<template>
  <div class="scrolling content">
    <h4 class="ui horizontal divider header"><i class="chess board icon" />概念</h4>
    <div class="ui container m-padded-tb-large">
      <img class="ui centered medium image" src="../../assets/images/sudoku-puzzle-blank.png">
      <div class="ui text container">
        <p class="m-padded-tb-large">
          数独游戏在9x9的方格内进行，分为3x3的小方格，被称为“区”
        </p>
      </div>
    </div>

    <h4 class="ui horizontal divider header"><i class="eye icon" />起步</h4>
    <div class="ui container m-padded-tb-large">
      <img class="ui centered medium image" src="../../assets/images/puzzle-dark.jpg">
      <div class="ui text container">
        <p class="m-padded-tb-large">
          数独游戏首先从已经填入数字的格子开始，利用1至9之间的数字填满空格，一个格子只能填入一个数字
        </p>
      </div>
    </div>

    <h4 class="ui horizontal divider header"><i class="tag icon" />行规则</h4>
    <div class="ui container m-padded-tb-large">
      <img class="ui centered medium image" src="../../assets/images/sudoku-row-allowed.jpg">
      <div class="ui container center aligned m-padded-tb">
        <i class="checkmark big green icon" />
      </div>
      <img class="ui centered medium image" src="../../assets/images/sudoku-row-not-allowed.jpg">
      <div class="ui container center aligned m-padded-tb">
        <i class="remove big red icon" />
      </div>

      <div class="ui text container">
        <p class="m-padded-tb-large">
          每个数字在每一行只能出现一次
        </p>
      </div>
    </div>

    <h4 class="ui horizontal divider header"><i class="tag icon" />列规则</h4>
    <div class="ui container m-padded-tb-large">
      <div class="ui container" style="max-width: 200px !important">
        <div class="ui grid">
          <div class="left floated six wide column">
            <img
              class="ui centered tiny image"
              src="../../assets/images/sudoku-column-allowed.jpg"
              style="height:300px;width:50px"
            >
            <div class="ui container center aligned m-padded-tb">
              <i class="checkmark big green icon" />
            </div>
          </div>
          <div class="right floated six wide column">
            <img
              class="ui centered tiny image"
              src="../../assets/images/sudoku-column-not-allowed.jpg"
              style="height:300px;width:50px"
            >
            <div class="ui container center aligned m-padded-tb">
              <i class="remove big red icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="ui text container">
        <p class="m-padded-tb-large">
          每个数字在每一列只能出现一次
        </p>
      </div>
    </div>

    <h4 class="ui horizontal divider header"><i class="tag icon" />宫规则</h4>
    <div class="ui container m-padded-tb-large">
      <div class="ui container" style="max-width: 300px !important">
        <div class="ui grid">
          <div class="left floated six wide column">
            <img class="ui centered medium image" src="../../assets/images/sudoku-region-allowed.jpg">
            <div class="ui container center aligned m-padded-tb">
              <i class="checkmark big green icon" />
            </div>
          </div>
          <div class="right floated six wide column">
            <img class="ui centered medium image" src="../../assets/images/sudoku-region-not-allowed.jpg">
            <div class="ui container center aligned m-padded-tb">
              <i class="remove big red icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="ui text container">
        <p class="m-padded-tb-large">
          每个数字在每一区只能出现一次
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SudokuRuleModalContent'
}
</script>

<style scoped>
  .ui.header:first-child {
    margin-top: 2em !important;
  }
</style>
