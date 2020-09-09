<template>
  <div class="ui middle aligned center aligned grid fullHeight">
    <div class="column">
      <h2 class="ui teal header">
        登录你的账户
      </h2>

      <form class="ui large form" id="loginForm">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input name="username" placeholder="用户名" type="text" v-model="loginForm.username">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input name="password" placeholder="密码" type="password" v-model="loginForm.password">
            </div>
          </div>
          <div class="field">
            <CaptchaInput ref="loginCaptcha" :code="loginForm.code" @changeUuid="updateUuid" v-model="loginForm.code"/>
          </div>
          <div @click="submitLogin" class="ui fluid large teal button">登录</div>
        </div>
        <div class="ui error message"></div>
      </form>

      <div class="ui message">
        还没有账户? <a @click="jumpToRegister" href="javascript:void(0)">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from "../api/securityApi";
  import {setData} from "../utils/sessionStorageUtils";
  import CaptchaInput from "../components/CaptchaInput";
  import {FormValidation} from "../model/FormValidation";

  export default {
    name: "Login",
    components: {CaptchaInput},
    data() {
      return {
        //登陆表单
        loginForm: {
          username: '',
          password: '',
          code: '',
          uuid: ''
        },
        captchaBaseUrl: ''
      }
    },
    mounted() {
      this.setUsername();
      this.refreshCaptcha();
      this.$nextTick(() => {
        this.initLoginForm();
      });
    },
    methods: {
      /**
       * 跳转到注册页面
       */
      jumpToRegister() {
        this.$router.replace('/register');
      },
      /**
       * 提交表单，进行登录
       */
      async submitLogin() {
        if (FormValidation.validateForm('loginForm')) {
          const {success, data} = await login(this.loginForm);
          if (success) {
            const user = data.user;
            this.$store.commit('INIT_CURRENT_USER', user);
            setData("user", JSON.stringify(user));
            setData("token", data.token);
            this.$router.replace('/home');
          } else {
            this.refreshCaptcha();
          }
        }
      },
      /**
       * 从路由中获取用户名，并设置到表单中
       */
      setUsername() {
        let username = this.$router.currentRoute.query.username;
        if (username) {
          this.loginForm.username = username;
        }
      },
      /**
       * 更新UUID
       */
      updateUuid(uuid) {
        this.loginForm.uuid = uuid;
      },
      /**
       * 加载登录表单验证规则
       */
      initLoginForm() {
        FormValidation.init('loginForm', {
          username: {
            rules: FormValidation.usernameRules
          },
          password: {
            rules: FormValidation.passwordRules
          },
          code: {
            rules: FormValidation.captchaRules
          }
        });
      },
      /**
       * 刷新验证码
       */
      refreshCaptcha() {
        this.$refs.loginCaptcha.getCaptchaImage();
      }
    }
  }
</script>

<style scoped>
  .column {
    max-width: 450px !important;
  }
</style>
