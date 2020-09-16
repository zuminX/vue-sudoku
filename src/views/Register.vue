<template>
  <div class="ui middle aligned center aligned grid fullHeight">
    <div class="column">
      <h2 class="ui teal header">
        注册你的账户
      </h2>

      <form id="registerForm" class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon" />
              <input v-model="registerForm.username" name="username" placeholder="用户名" type="text">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon" />
              <input v-model="registerForm.password" name="password" placeholder="密码" type="password">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="blue lock icon" />
              <input v-model="registerForm.repeatPassword" name="repeatPassword" placeholder="重复输入密码" type="password">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="green user icon" />
              <input v-model="registerForm.nickname" name="nickname" placeholder="昵称" type="text">
            </div>
          </div>
          <div class="field">
            <CaptchaInput
              ref="registerCaptcha"
              v-model="registerForm.code"
              :code="registerForm.code"
              :uuid.sync="registerForm.uuid"
            />
          </div>
          <div class="ui fluid large teal button" @click="submitRegister">注册</div>
        </div>
        <div class="ui error message" />
      </form>

      <div class="ui message">
        已有账户? <a href="javascript:void(0)" @click="jumpToLogin">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/userApi'
import { showSuccessToast } from '@/utils/publicUtils'
import { FormValidation } from '@/model/FormValidation'
import CaptchaInput from '@/components/CaptchaInput'

export default {
  name: 'Register',
  components: { CaptchaInput },
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        repeatPassword: '',
        nickname: '',
        code: '',
        uuid: ''
      }
    }
  },
  mounted() {
    this.refreshCaptcha()
    this.$nextTick(() => {
      this.initRegisterForm()
    })
  },
  methods: {
    /**
     * 跳转到登陆页面
     */
    jumpToLogin() {
      this.$router.replace('/')
    },
    /**
     * 提交表单，进行注册
     */
    async submitRegister() {
      if (FormValidation.validateForm('registerForm')) {
        const { success, data } = await register(this.registerForm)
        if (success) {
          showSuccessToast({
            message: `${data.nickname}，恭喜你注册成功，现在正在跳转到登陆页面`
          })
          // 跳转到登陆页面，并携带用户名
          await this.$router.replace(`/?username=${data.username}`)
        } else {
          this.refreshCaptcha()
        }
      }
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
        },
        code: {
          rules: FormValidation.captchaRules
        }
      })
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha() {
      this.$refs.registerCaptcha.getCaptchaImage()
    }
  }
}
</script>

<style scoped>
.column {
  max-width: 450px !important;
}
</style>
