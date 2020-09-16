<template>
  <div>
    <Modal class="big" modal-id="historyRecordModal">
      <template v-slot:header>
        <BasicModalHeader class="teal">历史记录</BasicModalHeader>
      </template>
      <HistoryRecordModalContent />
      <template v-slot:actions>
        <OKModalActions />
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '../../components/modal/Modal'
import OKModalActions from '../../components/modal/actions/OKModalActions'
import HistoryRecordModalContent from '../modalContent/HistoryRecordModalContent'
import BasicModalHeader from '../../components/modal/header/BasicModalHeader'

export default {
  name: 'HistoryRecordModal',
  components: { BasicModalHeader, HistoryRecordModalContent, OKModalActions, Modal }
}
</script>
