/**
 * 获取9x9的二维数组
 * @returns {number[][]} 二维数组
 */
export const getTwoDimensionalArray = () => {
  return [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
}

/**
 * 获取数独数字数组
 * @returns {number[][]} 数独数组
 */
export const getSudokuArray = () => {
  return [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
}

/**
 * 隐藏数独数据中为零的数据
 * @param sudokuData 数独数据
 * @param holesData 挖洞数据
 */
export const hideSudokuZeroData = (sudokuData, holesData) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      //若该位置为空缺，则修改该位置的数独数据为null
      if (holesData[i][j] === 1) {
        sudokuData[i][j] = null;
      }
    }
  }
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

/**
 * 将字符串转化为数独矩阵
 * @param sudokuData 数独矩阵的字符串形式
 */
export const convertToSudokuMatrix = (sudokuData) => {
  let array = getTwoDimensionalArray();
  for (let i = 0, num = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      array[i][j] = sudokuData.charAt(num++);
    }
  }
  return array;
}

