/**
 * 数独游戏排行API的基地址
 */
import { getRequest } from '@/api/basicApi'

const base = '/gameRank'

/**
 * 获取数独游戏排行榜
 *
 * @param rankingName 排行类型名
 * @param sudokuLevelName 数独等级名称
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getLeaderboard = (rankingName, sudokuLevelName, page, pageSize) => {
  return getRequest(`${base}/leaderboard`, { rankingName, sudokuLevelName, page, pageSize })
}

/**
 * 获取排行类型名
 */
export const getRankingName = () => {
  return getRequest(`${base}/rankingName`)
}

/**
 * 获取指定排行的排名
 *
 * @param rankingName 排行类型名
 * @param sudokuLevelName 数独等级名称
 */
export const getRank = (rankingName, sudokuLevelName) => {
  return getRequest(`${base}/rank`, { rankingName, sudokuLevelName })
}

