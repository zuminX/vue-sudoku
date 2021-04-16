const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 数独游戏竞赛API的基地址
 */
const baseUrl = 'gameRace'

const gameRaceAPI = {
  getPublicRaceList: new APIInfo('publicRaceList', baseUrl),
  joinPublicRace: new APIInfo('joinPublicRace', baseUrl)
}

module.exports = [
  new MockInfo(gameRaceAPI.getPublicRaceList, () => {
    return require('../../data/voidSuccess.json')
  }),
  new MockInfo(gameRaceAPI.joinPublicRace, () => {
    return require('../../data/voidSuccess.json')
  })
]
