<template>
  <div>
    <Modal class="large" modal-id="userInformationModal">
      <template v-slot:header>
        <BasicModalHeader class="blue">用户信息</BasicModalHeader>
      </template>
      <UserGameInformationModalContent />
      <template v-slot:actions>
        <OKModalActions />
      </template>
    </Modal>
  </div>
</template>

<script>
import BasicModalHeader from '../../../../components/Modal/header/BasicModalHeader'
import OKModalActions from '../../../../components/Modal/actions/OKModalActions'
import Modal from '../../../../components/Modal/index'
import UserGameInformationModalContent from './components/UserGameInformationModalContent'

export default {
  name: 'UserInformationModal',
  components: { UserGameInformationModalContent, Modal, OKModalActions, BasicModalHeader }
}
</script>

