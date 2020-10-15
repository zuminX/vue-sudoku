<template>
  <div>
    <div class="ui segment">
      <p>用户名：{{ user.username }}</p>
      <p>昵称：{{ user.nickname }}</p>
    </div>
    <UserGameInformationList ref="userGameInformationList" />
  </div>
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import UserGameInformationList from '@/components/UserGameInformationList/index'

export default {
  name: 'UserGameInformationModalContent',
  components: { UserGameInformationList },
  computed: {
    ...mapState({
      recordGameNumber: state => state.sudoku.recordGameNumber
    }),
    ...mapGetters(['user'])
  },
  watch: {
    /**
     * 监听记录模式游戏的序列号，用以更新用户游戏记录
     */
    recordGameNumber() {
      this.$refs.userGameInformationList.initGameInformation()
    }
  },

  mounted() {
    this.$refs.userGameInformationList.initGameInformation()
  }
}
</script>
