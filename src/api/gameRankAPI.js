import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 数独游戏排行API的基地址
 */
const baseUrl = 'gameRank'

const gameRankAPI = {
  getLeaderboard: new APIInfo('leaderboard', 'get', baseUrl),
  getRankingName: new APIInfo('rankingName', 'get', baseUrl),
  getRank: new APIInfo('rank', 'get', baseUrl)
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
  return request(gameRankAPI.getLeaderboard, { rankingName, sudokuLevelName, page, pageSize })
}

/**
 * 获取排行类型名
 */
export const getRankingName = () => {
  return request(gameRankAPI.getRankingName)
}

/**
 * 获取指定排行的排名
 *
 * @param rankingName 排行类型名
 * @param sudokuLevelName 数独等级名称
 */
export const getRank = (rankingName, sudokuLevelName) => {
  return request(gameRankAPI.getRank, { rankingName, sudokuLevelName })
}

