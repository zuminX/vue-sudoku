const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

/**
 * 数独游戏排行API的基地址
 */
const baseUrl = 'gameRank'

const gameRankAPI = {
  getLeaderboard: new APIInfo('leaderboard.*', baseUrl, 'get', true),
  getRankingName: new APIInfo('rankingName', baseUrl),
  getRank: new APIInfo('rank', baseUrl)
}

module.exports = [
  new MockInfo(gameRankAPI.getLeaderboard, () => {
    return require('./data/leaderboard.json')
  }),
  new MockInfo(gameRankAPI.getRankingName, () => {
    return require('./data/rankingName.json')
  }),
  new MockInfo(gameRankAPI.getRank, {})
]
