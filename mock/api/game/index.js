const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

const baseUrl = '/game'

const gameAPI = {
  generateSudokuTopic: new APIInfo(RegExp(`${baseUrl}/generateTopic.*`), 'get'),
  submitSudokuData: new APIInfo(`${baseUrl}/check`, 'post'),
  getSudokuHelp: new APIInfo(`${baseUrl}/help`, 'post')
}

module.exports = [
  new MockInfo(gameAPI.generateSudokuTopic, () => {
    return require('./data/generateTopic.json')
  }),
  new MockInfo(gameAPI.submitSudokuData, {}),
  new MockInfo(gameAPI.getSudokuHelp, {})
]
