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

import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import SudokuAboutModalContent from '@/views/home/sudoku/help/informationModal/components/SudokuAboutModalContent'
import SudokuRuleModalContent from '@/views/home/sudoku/help/informationModal/components/SudokuRuleModalContent'
import KnowModalActions from '@/components/Modal/actions/KnowModalActions'
export default {
  name: 'SudokuInformationModal',
  components: { KnowModalActions, SudokuRuleModalContent, SudokuAboutModalContent, BasicModalHeader, Modal }
}
</script>
