<template>
  <Modal class="large" modal-id="userInformationModal">
    <template v-slot:header>
      <BasicModalHeader class="blue">用户信息</BasicModalHeader>
    </template>
    <UserGameInformationModalContent />
    <template v-slot:actions>
      <OKModalActions />
    </template>
  </Modal>
</template>

<script>

import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import UserGameInformationModalContent from '@/views/home/sidebar/userInformation/components/UserGameInformationModalContent'
import OKModalActions from '@/components/Modal/actions/OKModalActions'
export default {
  name: 'UserInformationModal',
  components: { OKModalActions, UserGameInformationModalContent, BasicModalHeader, Modal }
}
</script>

