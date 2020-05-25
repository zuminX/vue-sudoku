<template>
  <div class="ui left vertical inverted sidebar labeled icon menu" id="toc" style="z-index: 9 !important">
    <a class="item" @click="$emit('showModal','userInformationModal')">
      <i class="user icon"></i>
      用户信息
    </a>
    <a class="item" @click="$emit('showModal','historyRecordModal')">
      <i class="history icon"></i>
      历史记录
    </a>
    <a class="item" @click="$emit('showModal','leaderboardModal')">
      <i class="signal icon"></i>
      排行榜
    </a>
  </div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style scoped>

</style>