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
import BasicModalHeader from '../../components/modal/header/BasicModalHeader'
import Modal from '../../components/modal/Modal'
import LeaderboardModalContent from '../modalContent/LeaderboardModalContent'
import OKModalActions from '../../components/modal/actions/OKModalActions'

export default {
  name: 'LeaderboardModal',
  components: { OKModalActions, LeaderboardModalContent, Modal, BasicModalHeader }
}
</script>
