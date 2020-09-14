<template>
  <div>
    <Modal class="mini" modal-id="errorMessageModal">
      <template v-slot:header>
        <BasicModalContent class="red">错误</BasicModalContent>
      </template>
      <div class="ui text container content">
        <p>该操作出现了异常情况，请检查你的网络连接。</p>
        <p>若确认本机无问题，请将此情况上报网站管理员。</p>
        <p v-if="errorMessage!==''">异常原因：{{errorMessage}}</p>
      </div>
      <template v-slot:actions>
        <OKModalActions/>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "../Modal";
import BasicModalContent from "../content/BasicModalContent";
import OKModalActions from "../actions/OKModalActions";

export default {
  name: "ErrorMessageModal",
  components: {OKModalActions, BasicModalContent, Modal},
  props: {
    errorMessage: String
  }
}
</script>
