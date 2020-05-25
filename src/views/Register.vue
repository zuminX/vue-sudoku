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
  import {
    passwordRules,
    usernameRules,
    validateForm
  } from "../utils/coreUtils";
  import {Message} from "element-ui";

  export default {
    name: "Register",
    data() {
      return {
        //注册表单
        registerForm: {
          username: '',
          password: '',
          repeatPassword: '',
          nickname: ''
        },
      }
    },
    mounted() {
      //视图渲染完后调用
      this.$nextTick(() => {
        //加载表单验证规则
        $('#registerForm').form({
          transition: 'slide down',
          fields: {
            username: {
              rules: usernameRules()
            },
            password: {
              rules: passwordRules()
            },
            repeatPassword: {
              rules: [
                {
                  type: 'match[password]',
                  prompt: '重复输入的密码与密码不一致'
                }
              ]
            },
            nickname: {
              rules: [
                {
                  type: 'minLength[4]',
                  prompt: '昵称的长度不能小于4位'
                },
                {
                  type: 'maxLength[32]',
                  prompt: '昵称的长度不能大于32位'
                },
                {
                  type: 'empty',
                  prompt: '请输入你的昵称'
                }
              ]
            }
          },
          /**
           * 防止表单验证成功后自动发送GET请求
           */
          onSuccess() {
          }
        });
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
      submitRegister() {
        //验证表单
        if (validateForm('#registerForm')) {
          register(this.registerForm).then(data => {
            //注册成功
            if (data) {
              Message.success({message: `${data.nickname}，恭喜你注册成功，现在正在跳转到登陆页面`});
              //跳转到登陆页面，并携带用户名
              this.$router.replace(`/?username=${data.username}`);
            }
          })
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
