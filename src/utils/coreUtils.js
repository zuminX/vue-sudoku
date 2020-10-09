/**
 * 获取二维number型数组
 * @returns {number[][]} 二维number型数组
 */
export const getTwoDimeNumArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, 0)
}

/**
 * 获取二维boolean型数组
 * @returns {boolean[][]} 二维boolean型数组
 */
export const getTwoDimeBoolArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, false)
}

/**
 * 判断角色列表中是否包含管理员
 * @param roleList 角色列表
 * @returns {boolean} 包含则返回true，否则返回false
 */
export const roleListHasAdmin = (roleList) => {
  return (roleList.map(role => role.name)).includes('ROLE_ADMIN')
}

/**
 * 判断角色名是否为管理员
 * @param roleName 角色名
 * @returns {boolean} 是则返回true，否则返回false
 */
export const roleNameHasAdmin = (roleName) => {
  return roleName === 'ROLE_ADMIN'
}

/**
 * 获取二维数组
 * @param row 行
 * @param column 列
 * @param initData 初始数据啊
 * @returns {[]} 二维数组
 */
const getTwoDimeArray = (row, column, initData) => {
  const result = []
  for (let i = 0; i < row; i++) {
    result.push([])
    for (let j = 0; j < column; j++) {
      result[i].push(initData)
    }
  }
  return result
}
