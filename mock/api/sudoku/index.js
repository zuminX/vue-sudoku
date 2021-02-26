const { MockInfo } = require('../../MockInfo')
const { APIInfo } = require('../../APIInfo')

const baseUrl = '/sudoku'

const sudokuAPI = {
  getSudokuLevels: new APIInfo(`${baseUrl}/sudokuLevels`, 'get')
}

module.exports = [
  new MockInfo(sudokuAPI.getSudokuLevels, () => {
    return require('./data/sudokuLevels.json')
  })
]
