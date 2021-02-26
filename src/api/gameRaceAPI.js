import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 数独游戏竞赛API的基地址
 */
const baseUrl = 'gameRace'

const gameRaceAPI = {
  getPublicRaceList: new APIInfo('publicRaceList', 'get', baseUrl),
  joinPublicRace: new APIInfo('joinPublicRace', 'get', baseUrl)
}

/**
 * 获取公开的数独游戏竞赛
 */
export const getPublicRaceList = () => {
  return request(gameRaceAPI.getPublicRaceList)
}

/**
 * 参加公开数独游戏竞赛
 * @param raceId 竞赛ID
 */
export const joinPublicRace = (raceId) => {
  return request(gameRaceAPI.joinPublicRace, { raceId })
}

