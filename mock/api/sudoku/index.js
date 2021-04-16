const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 数独API的基地址
 */
const baseUrl = 'sudoku'

const sudokuAPI = {
  getSudokuLevels: new APIInfo('sudokuLevels', baseUrl)
}

module.exports = [
  new MockInfo(sudokuAPI.getSudokuLevels, () => {
    return require('./data/sudokuLevels.json')
  })
]
