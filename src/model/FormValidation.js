export class FormValidation {
  /**
   * 校验表单
   * @param selector ID选择器
   * @returns {boolean} 合法返回true，否则返回false
   */
  static validateForm(selector) {
    const $form = $(`#${selector}`)
    $form.form('validate form')
    return $form.form('is valid')
  }

  /**
   * 初始化表单校验
   * @param selector ID选择器
   * @param fields 字段校验规则
   * @param transition 过渡动画
   */
  static init(selector, fields, transition = 'slide down') {
    $(`#${selector}`).form({
      transition,
      fields,
      /**
       * 防止表单验证成功后自动发送GET请求
       */
      onSuccess() {
      }
    })
  }

  /**
   * 用户校验规则
   */
  static get usernameRules() {
    return [
      {
        type: 'minLength[4]',
        prompt: '用户名的长度不能小于4位'
      },
      {
        type: 'maxLength[16]',
        prompt: '用户名的长度不能大于16位'
      }
    ]
  }

  /**
   * 密码校验规则
   */
  static get passwordRules() {
    return [
      {
        type: 'minLength[6]',
        prompt: '密码的长度不能小于6位'
      },
      {
        type: 'maxLength[32]',
        prompt: '密码的长度不能大于32位'
      }
    ]
  }

  static get repeatPasswordRules() {
    return [
      {
        type: 'match[password]',
        prompt: '重复输入的密码与密码不一致'
      }
    ]
  }

  static get nicknameRules() {
    return [
      {
        type: 'minLength[4]',
        prompt: '昵称的长度不能小于4位'
      },
      {
        type: 'maxLength[32]',
        prompt: '昵称的长度不能大于32位'
      }
    ]
  }

  /**
   * 验证码校验规则
   */
  static get captchaRules() {
    return [
      {
        type: 'exactLength[4]',
        prompt: '验证码的长度必须为4位'
      }
    ]
  }
}
