<template>
  <div>
    <div id="toc" class="ui left vertical inverted sidebar labeled icon menu" style="z-index: 9 !important">
      <a class="item" @click="showModal('userInformationModal')">
        <i class="user icon" />
        用户信息
      </a>
      <a class="item" @click="showModal('historyRecordModal')">
        <i class="history icon" />
        历史记录
      </a>
      <a class="item" @click="showModal('leaderboardModal')">
        <i class="signal icon" />
        排行榜
      </a>
    </div>

    <UserInformationModal />
    <HistoryRecordModal />
    <LeaderboardModal />
  </div>
</template>

<script>
import { showModal } from '@/utils/publicUtils'
import UserInformationModal from './userInformation/index'
import HistoryRecordModal from './historyRecord/index'
import LeaderboardModal from './leaderboard/index'

export default {
  name: 'Sidebar',
  components: { LeaderboardModal, HistoryRecordModal, UserInformationModal },
  methods: {
    showModal
  }
}
</script>

<style scoped>

</style>
