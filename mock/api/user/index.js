const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

const baseUrl = '/user'

const userAPI = {
  register: new APIInfo(`${baseUrl}/register`, 'post'),
  getUserGameInformation: new APIInfo(`${baseUrl}/gameInformation`, 'get'),
  getHistoryGameRecord: new APIInfo(RegExp(`${baseUrl}/historyGameRecord.*`), 'get')
}

module.exports = [
  new MockInfo(userAPI.register, {}),
  new MockInfo(userAPI.getUserGameInformation, () => {
    return require('./data/gameInformation.json')
  }),
  new MockInfo(userAPI.getHistoryGameRecord, () => {
    return require('./data/historyGameRecord.json')
  })
]
