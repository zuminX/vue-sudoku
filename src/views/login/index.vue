<template>
  <div class="ui middle aligned center aligned grid fullHeight">
    <div class="column">
      <h2 class="ui teal header">
        登录你的账户
      </h2>

      <Form form-id="loginForm" class="large" :validate-rule="validateRule()">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon" />
            <input v-model="loginForm.username" name="username" placeholder="用户名" type="text">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon" />
            <input v-model="loginForm.password" name="password" placeholder="密码" type="password">
          </div>
        </div>
        <div class="field">
          <CaptchaInput ref="loginCaptcha" v-model="loginForm.code" :uuid.sync="loginForm.uuid" />
        </div>
        <div class="ui fluid large teal button" @click="submitLogin">登录</div>
      </Form>

      <div class="ui message">
        还没有账户? <a href="javascript:void(0)" @click="jumpToRegister">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/securityApi'
import { FormValidation } from '@/model/FormValidation'
import CaptchaInput from '@/components/CaptchaInput/index'
import Form from '@/components/Form/index'

export default {
  name: 'Login',
  components: { Form, CaptchaInput },
  data() {
    return {
      // 登陆表单
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
    this.setUsername()
    this.refreshCaptcha()
  },
  methods: {
    /**
     * 跳转到注册页面
     */
    jumpToRegister() {
      this.$router.replace('/register')
    },
    /**
     * 提交表单，进行登录
     */
    async submitLogin() {
      if (FormValidation.validateForm('loginForm')) {
        const { success, data } = await login(this.loginForm)
        if (success) {
          this.$store.commit('SET_USER', data.user)
          this.$store.commit('SET_TOKEN', data.token)
          await this.$router.push({ path: '/' })
        } else {
          this.refreshCaptcha()
        }
      }
    },
    /**
     * 从路由中获取用户名，并设置到表单中
     */
    setUsername() {
      const username = this.$router.currentRoute.query.username
      if (username) {
        this.loginForm.username = username
      }
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha() {
      this.$refs.loginCaptcha.getCaptchaImage()
    },
    /**
     * 设置登录表单验证规则
     */
    validateRule() {
      return {
        username: FormValidation.usernameRules,
        password: FormValidation.passwordRules,
        code: FormValidation.captchaRules
      }
    }
  }
}
</script>

<style scoped>
.column {
  max-width: 450px !important;
}
</style>
