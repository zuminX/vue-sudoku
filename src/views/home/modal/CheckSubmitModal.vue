<template>
  <Modal class="basic" modal-id="checkSubmitModal">
    <template v-slot:header>
      <BasicModalHeader>
        <i class="upload icon" />提交填写的数据
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <p>你是否确认将填写的数独数据提交（无法撤回），并显示正确或错误？</p>
    </BasicModalContent>
    <template v-slot:actions>
      <OkOrCancelModalActions @clickCheck="$emit('clickCheck')" />
    </template>
  </Modal>
</template>

<script>
import BasicModalHeader from '../../../components/Modal/header/BasicModalHeader'
import BasicModalContent from '../../../components/Modal/content/BasicModalContent'
import OkOrCancelModalActions from '../../../components/Modal/actions/OkOrCancelModalActions'
import Modal from '../../../components/Modal/index'

export default {
  name: 'CheckSubmitModal',
  components: { Modal, OkOrCancelModalActions, BasicModalContent, BasicModalHeader }
}
</script>
