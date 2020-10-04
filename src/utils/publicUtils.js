import Vue from 'vue'

/**
 * 显示弹出层
 * @param selector ID选择器
 */
export const showModal = (selector) => {
  $(`#${selector}`).modal('setting', 'closable', false).modal('show')
}

/**
 * 显示侧边栏
 * @param selector ID选择器
 */
export const showSidebar = (selector) => {
  $(`#${selector}`).sidebar('toggle')
}

/**
 * 初始化菜单项
 * @param selector 选择器
 * @param contentSelector 内容项的选择器
 */
export const initMenuItem = (selector, contentSelector = null) => {
  $(selector).tab({
    history: false,
    content: contentSelector ? $(contentSelector) : undefined
  })
}

/**
 * 设置动画
 * @param element 元素
 * @param animation 动画名字
 * @param prefix animate前缀
 */
export const animateCSS = (element, animation, prefix = 'animate__') => {
  return new Promise((resolve, reject) => {
    // 拼接动画名
    const animationName = `${prefix}${animation}`
    // 获取节点
    const node = document.querySelector(element)
    // 添加class
    node.classList.add(`${prefix}animated`, animationName)

    // 处理动画结束后的事件
    function handleAnimationEnd() {
      // 移除添加的class
      node.classList.remove(`${prefix}animated`, animationName)
      // 移除动画结束后的事件监听器
      node.removeEventListener('animationend', handleAnimationEnd)
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd)
  })
}

/**
 * 格式化毫秒为秒
 * @param milliseconds 毫秒
 * @returns {string} 对应的秒
 */
export const formatShowMS = (milliseconds) => {
  if (milliseconds === undefined || milliseconds === null || typeof milliseconds !== 'number') {
    return '--'
  }
  return Math.ceil(milliseconds / 1000) + ''
}

/**
 * 格式化空数据
 * @param data 数据
 * @returns {string} 格式化后的数据
 */
export const formatData = (data) => {
  return data || '----'
}

/**
 * 响应式的设置数独矩阵中的一个格子
 * @param array 数独矩阵
 * @param sudokuMatrixGrid 数独矩阵中的一个格子
 */
export const responseSetTwoDimensionalArray = (array, sudokuMatrixGrid) => {
  const { row, column, value } = sudokuMatrixGrid
  const rowArrayData = array[row]
  rowArrayData[column] = value
  Vue.set(array, row, rowArrayData)
}

/**
 * 显示成功的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showSuccessToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'success',
      position,
      showIcon: 'checkmark',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 显示警告的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showWarnToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'warning',
      position,
      showIcon: 'exclamation',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 显示错误的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showErrorToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'error',
      position,
      showIcon: 'remove',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 深拷贝数据
 * @param data 数据
 * @returns {string} 拷贝数据
 */
export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}
