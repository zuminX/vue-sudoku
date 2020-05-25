<template>
  <div>
    <div class="ui top attached segment">
      <h3 class="ui orange header"><i class="help icon"></i>帮助</h3>
    </div>
    <div class="ui bottom attached segment m-padded-tb-large">
      <div class="center aligned">
        <button @click="$emit('clickSudokuWhat')" class="ui green basic circular button fluid">
          数独是什么？
        </button>
      </div>
      <div class="center aligned m-padded-tb-large">
        <button @click="$emit('clickSudokuHow')" class="ui green basic circular button fluid">
          数独如何玩？
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SudokuHelp"
  }
</script>
