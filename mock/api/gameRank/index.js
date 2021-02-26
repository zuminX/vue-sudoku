const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

const baseUrl = '/gameRank'

const gameRankAPI = {
  getLeaderboard: new APIInfo(RegExp(`${baseUrl}/leaderboard.*`), 'get'),
  getRankingName: new APIInfo(`${baseUrl}/rankingName`, 'get'),
  getRank: new APIInfo(`${baseUrl}/rank`, 'get')
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
