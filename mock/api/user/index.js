const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 用户API的基地址
 */
const baseUrl = 'user'

const userAPI = {
  register: new APIInfo('register', baseUrl, 'post'),
  getUserGameInformation: new APIInfo('gameInformation', baseUrl),
  getHistoryGameRecord: new APIInfo('historyGameRecord.*', baseUrl, 'get', true)
}

module.exports = [
  new MockInfo(userAPI.register, () => {
    return require('../../data/voidSuccess.json')
  }),
  new MockInfo(userAPI.getUserGameInformation, () => {
    return require('./data/gameInformation.json')
  }),
  new MockInfo(userAPI.getHistoryGameRecord, () => {
    return require('./data/historyGameRecord.json')
  })
]
