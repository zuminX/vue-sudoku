<template>
  <div>
    <div class="ui top attached segment">
      <h3 class="ui orange header"><i class="help icon" />帮助</h3>
    </div>
    <div class="ui bottom attached segment m-padded-tb-large">
      <div class="center aligned">
        <button class="ui green basic circular button fluid" @click="showModal('sudokuWhatModal')">
          数独是什么？
        </button>
      </div>
      <div class="center aligned m-padded-tb-large">
        <button class="ui green basic circular button fluid" @click="showModal('sudokuHowModal')">
          数独如何玩？
        </button>
      </div>
    </div>

    <SudokuInformationModal />
  </div>
</template>

<script>
import SudokuInformationModal from './informationModal/index'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'SudokuHelp',
  components: { SudokuInformationModal },
  methods: {
    showModal
  }
}
</script>
