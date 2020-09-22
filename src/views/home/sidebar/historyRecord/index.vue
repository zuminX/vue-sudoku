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
import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import HistoryRecordModalContent from '@/views/home/sidebar/historyRecord/components/HistoryRecordModalContent'
import OKModalActions from '@/components/Modal/actions/OKModalActions'

export default {
  name: 'HistoryRecordModal',
  components: { OKModalActions, HistoryRecordModalContent, BasicModalHeader, Modal }
}
</script>
