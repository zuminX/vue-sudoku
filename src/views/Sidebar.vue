<template>
  <div>
    <div class="ui left vertical inverted sidebar labeled icon menu" id="toc" style="z-index: 9 !important">
      <a @click="showModal('userInformationModal')" class="item">
        <i class="user icon"></i>
        用户信息
      </a>
      <a @click="showModal('historyRecordModal')" class="item">
        <i class="history icon"></i>
        历史记录
      </a>
      <a @click="showModal('leaderboardModal')" class="item">
        <i class="signal icon"></i>
        排行榜
      </a>
    </div>

    <UserInformationModal/>
    <HistoryRecordModal/>
    <LeaderboardModal/>
  </div>
</template>

<script>
  import {showModal} from "../utils/publicUtils";
  import UserInformationModal from "./modal/UserInformationModal";
  import HistoryRecordModal from "./modal/HistoryRecordModal";
  import LeaderboardModal from "./modal/LeaderboardModal";

  export default {
    name: "Sidebar",
    components: {LeaderboardModal, HistoryRecordModal, UserInformationModal},
    methods: {
      showModal
    }
  }
</script>

<style scoped>

</style>