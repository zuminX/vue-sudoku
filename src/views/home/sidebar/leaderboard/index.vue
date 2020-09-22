<template>
  <div>
    <Modal class="big" modal-id="leaderboardModal">
      <template v-slot:header>
        <BasicModalHeader class="orange">排行榜</BasicModalHeader>
      </template>
      <LeaderboardModalContent />
      <template v-slot:actions>
        <OKModalActions />
      </template>
    </Modal>
  </div>
</template>

<script>

import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import LeaderboardModalContent from '@/views/home/sidebar/leaderboard/components/LeaderboardModalContent'
import OKModalActions from '@/components/Modal/actions/OKModalActions'

export default {
  name: 'LeaderboardModal',
  components: { OKModalActions, LeaderboardModalContent, BasicModalHeader, Modal }
}
</script>
