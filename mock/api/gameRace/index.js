const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

/**
 * 数独游戏竞赛API的基地址
 */
const baseUrl = 'gameRace'

const gameRaceAPI = {
  getPublicRaceList: new APIInfo('publicRaceList', baseUrl),
  joinPublicRace: new APIInfo('joinPublicRace', baseUrl)
}

module.exports = [
  new MockInfo(gameRaceAPI.getPublicRaceList, {}),
  new MockInfo(gameRaceAPI.joinPublicRace, {})
]
