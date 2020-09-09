/**
 * 向storage中设置数据
 * @param key
 * @param value
 */
export const setData = (key, value) => {
  window.sessionStorage.setItem(key, value);
}

/**
 * 从storage中取出数据
 * @param key
 */
export const getData = (key) => {
  return window.sessionStorage.getItem(key);
}