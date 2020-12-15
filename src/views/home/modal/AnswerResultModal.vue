<template>
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
</template>

<script>
import { formatShowMS } from '@/utils/publicUtils'
import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import OKModalActions from '@/components/Modal/actions/OKModalActions'

export default {
  name: 'AnswerResultModal',
  components: { OKModalActions, BasicModalContent, BasicModalHeader, Modal },
  props: {
    answerInformation: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * 计算当前回答是否正确
     * @returns {boolean} 回答正确返回true，回答错误返回false
     */
    answerRight() {
      return this.answerInformation.situation !== 2
    },
    /**
     * 格式化显示花费的时间
     * @returns {string} 花费的秒数
     */
    spendTime() {
      return `${formatShowMS(this.answerInformation.spendTime)}秒`
    }
  }
}
</script>
