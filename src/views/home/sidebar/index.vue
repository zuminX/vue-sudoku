<template>
  <div>
    <div id="toc" class="ui left vertical inverted sidebar labeled icon menu">
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
import UserInformationModal from './userInformation/index'
import HistoryRecordModal from './historyRecord/index'
import LeaderboardModal from './leaderboard/index'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'Sidebar',
  components: { LeaderboardModal, HistoryRecordModal, UserInformationModal },
  /**
   * 初始化侧边栏
   */
  mounted() {
    $('.ui.sidebar').sidebar({
      context: $('#root')
    }).sidebar('setting', 'transition', 'overlay')
  },
  methods: {
    showModal
  }
}
</script>
