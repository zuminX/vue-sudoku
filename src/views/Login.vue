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
  import {login} from "../api/userApi";
  import {
    passwordRules,
    usernameRules,
    validateForm
  } from "../utils/coreUtils";

  export default {
    name: "Login",
    data() {
      return {
        //登陆表单
        loginForm: {
          username: '',
          password: '',
        },
      }
    },
    mounted() {
      //从路由中获取用户名
      let username = this.$router.currentRoute.query.username;
      //若存在，则设置为登陆表单的用户名
      if (username !== undefined) {
        this.loginForm.username = username;
      }
      //视图渲染完后调用
      this.$nextTick(() => {
        //加载表单验证规则
        $('#loginForm').form({
          transition: 'slide down',
          fields: {
            username: {
              rules: usernameRules()
            },
            password: {
              rules: passwordRules()
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
       * 跳转到注册页面
       */
      jumpToRegister() {
        this.$router.replace('/register');
      },
      /**
       * 提交表单，进行登录
       */
      submitLogin() {
        if (validateForm('#loginForm')) {
          login(this.loginForm).then(data => {
            if (data) {
              //初始化当前用户
              this.$store.commit('INIT_CURRENT_USER', data);
              //设置用户信息
              window.sessionStorage.setItem("user", JSON.stringify(data));
              //跳转到主页
              this.$router.replace('/home');
            }
          })
        }
      },
    }
  }
</script>

<style scoped>
  .column {
    max-width: 450px !important;
  }
</style>
