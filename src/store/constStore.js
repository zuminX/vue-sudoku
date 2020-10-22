import { getSudokuLevels } from '@/api/gameApi'
import { getRankingName } from '@/api/gameRankApi'

export const constStore = {
  data: {
    _sudokuLevelList: null,
    _rankingNameList: null
  },
  getSudokuLevelList() {
    return this._singletonRequest(getSudokuLevels, '_sudokuLevelList')
  },
  getRankingNameList() {
    return this._singletonRequest(getRankingName, '_rankingNameList')
  },
  async _singletonRequest(request, dataName) {
    if (!this.data[dataName]) {
      const { success, data } = await request()
      if (success) {
        this.data[dataName] = data
      }
    }
    return this.data[dataName]
  }
}
