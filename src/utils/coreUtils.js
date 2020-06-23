/**
 * 获取二维number型数组
 * @returns {number[][]} 二维number型数组
 */
export const getTwoDimeNumArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, 0);
}

/**
 * 获取二维boolean型数组
 * @returns {boolean[][]} 二维boolean型数组
 */
export const getTwoDimeBoolArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, false);
}

const getTwoDimeArray = (row, column, data) => {
  let result = [];
  for (let i = 0; i < row; i++) {
    result.push([]);
    for (let j = 0; j < column; j++) {
      result[i].push(data);
    }
  }
  return result;
}

/**
 * 用户校验规则
 */
export const usernameRules = () => {
  return [
    {
      type: 'minLength[4]',
      prompt: '用户名的长度不能小于4位'
    },
    {
      type: 'maxLength[16]',
      prompt: '用户名的长度不能大于16位'
    },
    {
      type: 'empty',
      prompt: '请输入你的用户名'
    }
  ];
}

/**
 * 密码校验规则
 */
export const passwordRules = () => {
  return [
    {
      type: 'minLength[6]',
      prompt: '密码的长度不能小于6位'
    },
    {
      type: 'maxLength[32]',
      prompt: '密码的长度不能大于32位'
    },
    {
      type: 'empty',
      prompt: '请输入你的密码'
    }
  ];
}

/**
 * 校验表单
 * @param selector 选择器
 * @returns {boolean} 合法返回true，否则返回false
 */
export const validateForm = (selector) => {
  let $form = $(selector);
  $form.form('validate form');
  return $form.form('is valid');
}


