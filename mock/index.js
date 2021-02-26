const { mockAPI } = require('./utils')

const game = require('./api/game')
const gameRace = require('./api/gameRace')
const gameRank = require('./api/gameRank')
const security = require('./api/security')
const sudoku = require('./api/sudoku')
const user = require('./api/user')

const mocks = [
  ...game,
  ...gameRace,
  ...gameRank,
  ...security,
  ...sudoku,
  ...user
]

for (const mock of mocks) {
  mockAPI(mock)
}

