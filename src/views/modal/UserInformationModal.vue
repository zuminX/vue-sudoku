<template>
  <div>
    <Modal class="large" modal-id="userInformationModal">
      <template v-slot:header>
        <BasicModalHeader class="blue">用户信息</BasicModalHeader>
      </template>
      <UserGameInformationModalContent/>
      <template v-slot:actions>
        <OKModalActions/>
      </template>
    </Modal>
  </div>
</template>

<script>
  import BasicModalHeader from "../../components/modal/header/BasicModalHeader";
  import BasicModalContent from "../../components/modal/content/BasicModalContent";
  import OKModalActions from "../../components/modal/actions/OKModalActions";
  import Modal from "../../components/modal/Modal";
  import UserGameInformationModalContent from "../modalContent/UserGameInformationModalContent";

  export default {
    name: "UserInformationModal",
    components: {UserGameInformationModalContent, Modal, OKModalActions, BasicModalContent, BasicModalHeader}
  }
</script>

