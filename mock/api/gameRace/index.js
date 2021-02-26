const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

const baseUrl = '/gameRace'

const gameRaceAPI = {
  getPublicRaceList: new APIInfo(`${baseUrl}/publicRaceList`, 'get'),
  joinPublicRace: new APIInfo(`${baseUrl}/joinPublicRace`, 'get')
}

module.exports = [
  new MockInfo(gameRaceAPI.getPublicRaceList, {}),
  new MockInfo(gameRaceAPI.joinPublicRace, {})
]
