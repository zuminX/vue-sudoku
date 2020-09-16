<template>
  <div>
    <Modal class="mini" modal-id="answerResultModal">
      <template v-slot:header>
        <BasicModalHeader :class="[answerRight?'green':'orange']">
          {{ answerRight ? '填写正确' : '填写错误' }}
        </BasicModalHeader>
      </template>
      <BasicModalContent>
        <p>{{ answerRight ? '恭喜你，你的答案是正确的！' : '很遗憾，你的答案是错误的！' }}</p>
        <p>共计用时：{{ spendTime }}</p>
      </BasicModalContent>
      <template v-slot:actions>
        <OKModalActions />
      </template>
    </Modal>
  </div>
</template>

<script>
import BasicModalHeader from '../../components/modal/header/BasicModalHeader'
import BasicModalContent from '../../components/modal/content/BasicModalContent'
import OKModalActions from '../../components/modal/actions/OKModalActions'
import Modal from '../../components/modal/Modal'
import { formatShowMS } from '@/utils/publicUtils'

export default {
  name: 'AnswerResultModal',
  components: { Modal, OKModalActions, BasicModalContent, BasicModalHeader },
  props: {
    answerInformation: {
      type: Object,
      required: true
    }
  },
  computed: {
    answerRight() {
      return this.answerInformation.situation !== 2
    },
    spendTime() {
      return `${formatShowMS(this.answerInformation.spendTime)}秒`
    }
  }
}
</script>
