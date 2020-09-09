<template>
  <div class="ui middle aligned center aligned grid fullHeight">
    <div class="column">
      <h2 class="ui teal header">
        注册你的账户
      </h2>

      <form class="ui large form" id="registerForm">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input name="username" placeholder="用户名" type="text" v-model="registerForm.username">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input name="password" placeholder="密码" type="password" v-model="registerForm.password">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="blue lock icon"></i>
              <input name="repeatPassword" placeholder="重复输入密码" type="password" v-model="registerForm.repeatPassword">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="green user icon"></i>
              <input name="nickname" placeholder="昵称" type="text" v-model="registerForm.nickname">
            </div>
          </div>
          <div class="field">
            <CaptchaInput ref="registerCaptcha" :code="registerForm.code" @changeUuid="updateUuid" v-model="registerForm.code"/>
          </div>
          <div @click="submitRegister" class="ui fluid large teal button">注册</div>
        </div>
        <div class="ui error message"></div>
      </form>

      <div class="ui message">
        已有账户? <a @click="jumpToLogin" href="javascript:void(0)">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {register} from "../api/userApi";
  import {showSuccessToast} from "../utils/publicUtils";
  import {FormValidation} from "../model/FormValidation";

  export default {
    name: "Register",
    data() {
      return {
        registerForm: {
          username: '',
          password: '',
          repeatPassword: '',
          nickname: '',
          code: '',
          uuid: ''
        },
      }
    },
    mounted() {
      this.refreshCaptcha();
      this.$nextTick(() => {
        this.initRegisterForm();
      });
    },
    methods: {
      /**
       * 跳转到登陆页面
       */
      jumpToLogin() {
        this.$router.replace('/');
      },
      /**
       * 提交表单，进行注册
       */
      async submitRegister() {
        if (FormValidation.validateForm('registerForm')) {
          const {success, data} = await register(this.registerForm);
          if (success) {
            showSuccessToast({
              message: `${data.nickname}，恭喜你注册成功，现在正在跳转到登陆页面`
            });
            //跳转到登陆页面，并携带用户名
            this.$router.replace(`/?username=${data.username}`);
          } else {
            this.refreshCaptcha();
          }
        }
      },
      /**
       * 更新UUID
       */
      updateUuid() {
        this.registerForm.uuid = uuid;
      },
      /**
       * 加载注册表单验证规则
       */
      initRegisterForm() {
        FormValidation.init('registerForm', {
          username: {
            rules: FormValidation.usernameRules
          },
          password: {
            rules: FormValidation.passwordRules
          },
          repeatPassword: {
            rules: FormValidation.repeatPasswordRules
          },
          nickname: {
            rules: FormValidation.nicknameRules
          }
        });
      },
      /**
       * 刷新验证码
       */
      refreshCaptcha() {
        this.$refs.registerCaptcha.getCaptchaImage();
      }
    }
  }
</script>

<style scoped>
  .column {
    max-width: 450px !important;
  }
</style>
