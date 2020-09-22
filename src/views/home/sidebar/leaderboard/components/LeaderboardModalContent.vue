<template>
  <div id="context">
    <div class="ui menu">
      <a v-for="(rankData,index) in leaderboardData" :key="index" :data-tab="index" class="item">
        {{ rankData.rankName }}
      </a>
    </div>
    <div v-for="(rankData,i) in leaderboardData" :key="i" :class="[i===0?'active':'']" :data-tab="i" class="ui tab segment">
      <div class="ui top attached tabular menu">
        <a v-for="(value,key) in rankData.rankItemMap" :key="`${i}-${key}`" :data-tab="`${i}-${key}`" class="active item">
          {{ key }}
        </a>
      </div>
      <div
        v-for="(value,key,index) in rankData.rankItemMap"
        :key="`${i}-${key}`"
        :class="[index===0?'active':'']"
        :data-tab="`${i}-${key}`"
        class="ui bottom tab segment"
      >
        <div class="ui three statistics">
          <div
            v-for="(item, j) in
              value"
            :key="`${i}-${key}-${j}`"
            :class="[j!==0?(j!==1?'brown tiny':'yellow large'):'grey']"
            class="ui statistic"
          >
            <div class="value absolute-center">
              {{ formatData(item.data) }}
            </div>
            <div class="label absolute-center">
              {{ formatData(item.nickname) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLeaderboardData } from '@/api/gameApi'
import {
  formatData,
  initMenuItem
} from '@/utils/publicUtils'

import('jquery-address')

export default {
  name: 'LeaderboardModalContent',
  data() {
    return {
      leaderboardData: []
    }
  },
  mounted() {
    this.initLeaderboardData()
  },
  updated() {
    initMenuItem('#context .menu .item', '#context')
  },
  methods: {
    formatData,
    /**
       * 交换显示的排行
       */
    swapDataToShowThreeUser(data) {
      for (let i = 0, size = data.length; i < size; i++) {
        const rankItemMap = data[i].rankItemMap
        for (const i in rankItemMap) {
          const itemList = rankItemMap[i]
          const temp = itemList[0]
          itemList[0] = itemList[1]
          itemList[1] = temp
        }
      }
      return data
    },
    /**
       * 初始化排行榜数据
       */
    async initLeaderboardData() {
      const { success, data } = await getLeaderboardData()
      if (success) {
        this.leaderboardData = this.swapDataToShowThreeUser(data)
      }
    }
  }
}
</script>

<style scoped>

</style>
