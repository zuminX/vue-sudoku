<template>
  <div>
    <div class="ui segment">
      <p>用户名：{{ currentUser.username }}</p>
      <p>昵称：{{ currentUser.nickname }}</p>
    </div>
    <div class="ui top attached tabular menu">
      <a class="item active" data-tab="-1">总览</a>
      <a v-for="(information,index) in gameInformationList" :key="index" :data-tab="index" class="item">
        {{ information.sudokuLevelName }}
      </a>
    </div>
    <div class="ui bottom attached tab segment active" data-tab="-1">
      <div class="ui five statistics">
        <div class="statistic">
          <div class="value">
            {{ overviewGameInformation.total }}
          </div>
          <div class="label">
            总局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ overviewGameInformation.correctNumber }}
          </div>
          <div class="label">
            提交正确的局数(次)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{ overviewGameInformation.averageSpendTime }}
          </div>
          <div class="label">
            各模式的平均用时(秒)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{ overviewGameInformation.minSpendTime }}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ overviewGameInformation.maxSpendTime }}
          </div>
          <div class="label">
            最长用时(秒)
          </div>
        </div>
      </div>
    </div>
    <div v-for="(information,index) in gameInformationList" :key="index" :data-tab="index" class="ui bottom attached tab segment">
      <div class="ui five statistics">
        <div class="statistic">
          <div class="value">
            {{ information.total }}
          </div>
          <div class="label">
            局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.correctNumber }}
          </div>
          <div class="label">
            提交正确的局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.averageSpendTime }}
          </div>
          <div class="label">
            平均用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.minSpendTime }}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.maxSpendTime }}
          </div>
          <div class="label">
            最长用时(秒)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserGameInformation } from '@/api/userApi'
import {
  formatShowMS,
  initMenuItem
} from '@/utils/publicUtils'
import {
  mapMutations,
  mapState
} from 'vuex'

import('jquery-address')

export default {
  name: 'UserGameInformationModalContent',
  data() {
    return {
      gameInformationList: [],
      overviewGameInformation: {
        total: 0,
        correctNumber: 0,
        averageSpendTime: null,
        minSpendTime: null,
        maxSpendTime: null
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.currentUser,
      gameFinishCallback: state => state.sudoku.gameFinishCallback
    })
  },
  mounted() {
    this.initGameInformation()
    this.addGameFinishCallback(() => this.initGameInformation())
  },
  updated() {
    initMenuItem('.menu .item')
  },
  methods: {
    ...mapMutations([
      'addGameFinishCallback'
    ]),
    /**
     * 初始化用户游戏信息
     */
    async initGameInformation() {
      const { success, data } = await getUserGameInformation()
      if (success) {
        this.overviewGameInformation = this.calculateOverviewGameInformation(data)
        this.gameInformationList = this.formatSpendTime(data)
      }
    },
    /**
     * 根据各模式的游戏信息，计算出总的游戏信息
     */
    calculateOverviewGameInformation(data) {
      const total = this.calculateTotal(data)
      const correctNumber = this.calculateCorrectNumber(data)
      const averageSpendTime = formatShowMS(this.calculateAverageSpendTime(data))
      const minSpendTime = formatShowMS(this.calculateMinSpendTime(data))
      const maxSpendTime = formatShowMS(this.calculateMaxSpendTime(data))
      return { total, correctNumber, averageSpendTime, minSpendTime, maxSpendTime }
    },
    /**
     * 格式化花费的时间
     */
    formatSpendTime(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].averageSpendTime = formatShowMS(data[i].averageSpendTime)
        data[i].minSpendTime = formatShowMS(data[i].minSpendTime)
        data[i].maxSpendTime = formatShowMS(data[i].maxSpendTime)
      }
      return data
    },
    calculateAverageSpendTime(data) {
      let times = 0; let correctNum = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].averageSpendTime) {
          times += data[i].averageSpendTime
          correctNum++
        }
      }
      return correctNum === 0 ? null : times / correctNum
    },
    calculateMinSpendTime(data) {
      let result = Number.MAX_VALUE
      for (let i = 0; i < data.length; i++) {
        const dataMinSpendTime = data[i].minSpendTime
        if (dataMinSpendTime !== null && dataMinSpendTime < result) {
          result = dataMinSpendTime
        }
      }
      return result !== Number.MAX_VALUE ? result : null
    },
    calculateMaxSpendTime(data) {
      let result = -1
      for (let i = 0; i < data.length; i++) {
        const dataMaxSpendTime = data[i].maxSpendTime
        if (dataMaxSpendTime !== null && dataMaxSpendTime > result) {
          result = dataMaxSpendTime
        }
      }
      return result || null
    },
    calculateTotal(data) {
      let result = 0
      for (let i = 0; i < data.length; i++) {
        result += data[i].total
      }
      return result
    },
    calculateCorrectNumber(data) {
      let result = 0
      for (let i = 0; i < data.length; i++) {
        result += data[i].correctNumber
      }
      return result
    }
  }
}
</script>

<style scoped>
.ui.attached.segment {
  margin: 0 !important;
  width: calc(100%) !important;
}
</style>
