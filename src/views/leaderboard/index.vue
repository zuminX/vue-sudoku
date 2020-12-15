<template>
  <div>
    <div class="ui top attached buttons">
      <div
        v-for="(level, index) in sudokuLevelList"
        :key="index"
        class="ui button"
        :class="{'active' : selectSudokuLevelName===level.name}"
        @click="updateSelectSudokuLevel(level.name)"
      >
        {{ level.name }}
      </div>
    </div>
    <div class="ui attached segment">
      <Loader :show="loaderShow">
        <table class="ui celled padded table">
          <thead>
            <tr class="center aligned">
              <th>用户名</th>
              <th>{{ rankingName }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rankItem, index) in rankItemList" :key="index" class="center aligned">
              <td> {{ rankItem.username }} </td>
              <td> {{ rankItem.data }} </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="center aligned" colspan="2">
                <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
              </th>
            </tr>
          </tfoot>
        </table>
      </Loader>
    </div>
  </div>
</template>

<script>
import PaginationMenu from '@/components/PaginationMenu/index'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import Loader from '@/components/Loader/index'
import { constStore } from '@/store/constStore'
import { getLeaderboard } from '@/api/gameRankApi'

export default {
  name: 'LeaderboardModal',
  components: { Loader, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      loaderShow: false,
      sudokuLevelList: [],
      selectSudokuLevelName: '',
      rankItemList: [],
      rankingName: this.$route.meta.rankingName
    }
  },
  async mounted() {
    await this.initSudokuLevels()
    await this.updateCurrentPageData()
  },
  methods: {
    /**
     * 更新当前页的数据
     * @param page 页数
     * @param pageSize 每条条数
     */
    async updateCurrentPageData(page = 1, pageSize = 5) {
      this.loaderShow = true
      const { success, data } = await getLeaderboard(this.rankingName, this.selectSudokuLevelName, page, pageSize)
      this.loaderShow = false
      if (success) {
        this.rankItemList = data.list
        this.pageInformation = data.pageInformation
      }
    },
    /**
     * 初始化数独难度等级
     */
    async initSudokuLevels() {
      this.sudokuLevelList = await constStore.getSudokuLevelList()
      this.selectSudokuLevelName = this.sudokuLevelList[0].name
    },
    /**
     * 更新选择的数独等级
     * @param sudokuLevelName 数独等级名称
     */
    updateSelectSudokuLevel(sudokuLevelName) {
      this.selectSudokuLevelName = sudokuLevelName
      this.updateCurrentPageData()
    }
  }
}
</script>
