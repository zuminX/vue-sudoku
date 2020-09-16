<template>
  <div>
    <Modal modal-id="sudokuWhatModal">
      <template v-slot:header>
        <BasicModalHeader>数独是什么</BasicModalHeader>
      </template>
      <SudokuAboutModalContent />
      <template v-slot:actions>
        <KnowModalActions />
      </template>
    </Modal>

    <Modal class="small" modal-id="sudokuHowModal">
      <template v-slot:header>
        <BasicModalHeader>数独如何玩</BasicModalHeader>
      </template>
      <SudokuRuleModalContent />
      <template v-slot:actions>
        <KnowModalActions />
      </template>
    </Modal>
  </div>
</template>

<script>
import BasicModalHeader from '../../components/modal/header/BasicModalHeader'
import SudokuAboutModalContent from '../modalContent/SudokuAboutModalContent'
import KnowModalActions from '../../components/modal/actions/KnowModalActions'
import SudokuRuleModalContent from '../modalContent/SudokuRuleModalContent'
import Modal from '../../components/modal/Modal'

export default {
  name: 'SudokuInformationModal',
  components: { Modal, SudokuRuleModalContent, KnowModalActions, SudokuAboutModalContent, BasicModalHeader }
}
</script>
