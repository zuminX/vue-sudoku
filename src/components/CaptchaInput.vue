<template>
  <div class="ui left icon input">
    <i class="shield alternate icon"></i>
    <input :value="code" @input="$emit('input', $event.target.value)" :name="inputName" placeholder="验证码" type="text">
    <img :src="captchaBaseUrl" @click="getCaptchaImage" class="m-margin-l captcha"/>
  </div>
</template>

<script>
  import {captchaImage} from "../api/securityApi";

  export default {
    name: "CaptchaInput",
    props: {
      code: String,
      inputName: {
        type: String,
        default: 'code'
      }
    },
    data() {
      return {
        captchaBaseUrl: ''
      }
    },
    methods: {
      async getCaptchaImage() {
        const {success, data} = await captchaImage();
        if (success) {
          this.captchaBaseUrl = `data:image/gif;base64,${data.captchaBase64}`;
          this.$emit('changeUuid', data.uuid);
        }
      },
    }
  }
</script>

<style scoped>
  .captcha {
    width: 111px;
    height: 36px;
    cursor: pointer;
  }
</style>