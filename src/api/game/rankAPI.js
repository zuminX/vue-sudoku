import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 游戏排行API的基地址
 */
const baseUrl = 'game/rank'

const rankAPI = {
  getLeaderboard: new APIInfo('leaderboard', baseUrl),
  getRankingName: new APIInfo('rankingName', baseUrl),
  getRank: new APIInfo('rank', baseUrl)
}

/**
 * 获取数独游戏排行榜
 *
 * @param rankingName 排行类型名
 * @param sudokuLevelName 数独等级名称
 * @param page 当前查询页
 * @param pageSize 每页显示的条数
 */
export const getLeaderboard = (rankingName, sudokuLevelName, page, pageSize) => {
  return request(rankAPI.getLeaderboard, { rankingName, sudokuLevelName, page, pageSize })
}

/**
 * 获取排行类型名
 */
export const getRankingName = () => {
  return request(rankAPI.getRankingName)
}

/**
 * 获取指定排行的排名
 *
 * @param rankingName 排行类型名
 * @param sudokuLevelName 数独等级名称
 */
export const getRank = (rankingName, sudokuLevelName) => {
  return request(rankAPI.getRank, { rankingName, sudokuLevelName })
}

