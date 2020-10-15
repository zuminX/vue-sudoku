<template>
  <Modal class="big" modal-id="historyRecordModal">
    <template v-slot:header>
      <BasicModalHeader class="teal">历史记录</BasicModalHeader>
    </template>
    <div class="scrolling content">
      <UserGameRecordTable ref="userGameRecordTable" />
    </div>
    <template v-slot:actions>
      <OKModalActions />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import OKModalActions from '@/components/Modal/actions/OKModalActions'
import { mapState } from 'vuex'
import UserGameRecordTable from '@/components/UserGameRecordTable/index'

export default {
  name: 'HistoryRecordModal',
  components: { UserGameRecordTable, OKModalActions, BasicModalHeader, Modal },
  computed: {
    ...mapState({
      recordGameNumber: state => state.sudoku.recordGameNumber
    })
  },
  watch: {
    /**
     * 监听记录模式游戏的序列号，用以更新用户游戏记录
     */
    recordGameNumber() {
      this.$refs.userGameRecordTable.updateCurrentPageData()
    }
  },
  mounted() {
    this.$refs.userGameRecordTable.updateCurrentPageData()
  }
}
</script>
