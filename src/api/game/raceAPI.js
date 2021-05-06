import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api/index'

/**
 * 游戏竞赛API的基地址
 */
const baseUrl = 'game/race'

const raceAPI = {
  getPublicRaceList: new APIInfo('publicRaceList', baseUrl),
  joinPublicRace: new APIInfo('joinPublicRace', baseUrl)
}

/**
 * 获取公开的数独游戏竞赛
 */
export const getPublicRaceList = () => {
  return request(raceAPI.getPublicRaceList)
}

/**
 * 参加公开数独游戏竞赛
 * @param raceId 竞赛ID
 */
export const joinPublicRace = (raceId) => {
  return request(raceAPI.joinPublicRace, { raceId })
}

