import Vue from 'vue'

/**
 * 显示弹出层
 * @param selector 选择器
 */
export const showModal = (selector) => {
  $(selector).modal('show');
}

/**
 * 设置动画
 * @param element 元素
 * @param animationName 动画名字
 */
export const animateCSS = (element, animationName) => {
  //获取节点
  const node = document.querySelector(element)
  //添加class
  node.classList.add('animated', animationName)

  //处理动画结束后的事件
  function handleAnimationEnd() {
    //移除添加的class
    node.classList.remove('animated', animationName)
    //移除动画结束后的事件监听器
    node.removeEventListener('animationend', handleAnimationEnd)
  }

  //增加动画结束后的事件监听器
  node.addEventListener('animationend', handleAnimationEnd)
}

/**
 * 格式化毫秒为秒
 * @param milliseconds 毫秒
 * @returns {string} 对应的秒
 */
export const formatShowMilliseconds = (milliseconds) => {
  if (milliseconds === undefined || milliseconds === null || typeof milliseconds !== 'number') {
    return '--';
  }
  return Math.ceil(milliseconds / 1000) + "";
}

/**
 * 响应式的设置二维数组中的一个值
 * @param array 二维数组
 * @param twoDimensionalArrayValue 二维数组中的一个值
 */
export const responseSetTwoDimensionalArray = (array, twoDimensionalArrayValue) => {
  let {row, column, value} = twoDimensionalArrayValue;
  let rowArrayData = array[row];
  rowArrayData[column] = value;
  Vue.set(array, row, rowArrayData);
}

