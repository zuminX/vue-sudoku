const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

/**
 * 数独API的基地址
 */
const baseUrl = 'game'

const gameAPI = {
  generateSudokuTopic: new APIInfo('generateTopic.*', baseUrl, 'get', true),
  submitSudokuData: new APIInfo('check', baseUrl, 'post'),
  getSudokuHelp: new APIInfo('help', baseUrl, 'post')
}

module.exports = [
  new MockInfo(gameAPI.generateSudokuTopic, () => {
    return require('./data/generateTopic.json')
  }),
  new MockInfo(gameAPI.submitSudokuData, {}),
  new MockInfo(gameAPI.getSudokuHelp, {})
]
