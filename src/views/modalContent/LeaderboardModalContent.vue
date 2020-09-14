<template>
  <div id="context">
    <div class="ui menu">
      <a :data-tab="index" :key="index" class="item" v-for="(rankData,index) in leaderboardData">
        {{rankData.rankName}}
      </a>
    </div>
    <div :class="[i===0?'active':'']" :data-tab="i" :key="i" class="ui tab segment" v-for="(rankData,i) in leaderboardData">
      <div class="ui top attached tabular menu">
        <a :data-tab="`${i}-${key}`" :key="`${i}-${key}`" class="active item" v-for="(value,key) in rankData.rankItemMap">
          {{key}}
        </a>
      </div>
      <div :class="[index===0?'active':'']" :data-tab="`${i}-${key}`" :key="`${i}-${key}`" class="ui bottom tab segment"
           v-for="(value,key,index) in rankData.rankItemMap">
        <div class="ui three statistics">
          <div :class="[j!==0?(j!==1?'brown tiny':'yellow large'):'grey']" :key="`${i}-${key}-${j}`" class="ui statistic"
               v-for="(item, j) in
          value">
            <div class="value absolute-center">
              {{formatData(item.data)}}
            </div>
            <div class="label absolute-center">
              {{formatData(item.nickname)}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLeaderboardData} from "@/api/gameApi";
  import {
    formatData,
    initMenuItem
  } from "@/utils/publicUtils";

  import("jquery-address")

  export default {
    name: "LeaderboardModalContent",
    data() {
      return {
        leaderboardData: []
      }
    },
    mounted() {
      this.initLeaderboardData();
    },
    updated() {
      initMenuItem('#context .menu .item', '#context');
    },
    methods: {
      formatData,
      /**
       * 交换显示的排行
       */
      swapDataToShowThreeUser(data) {
        for (let i = 0, size = data.length; i < size; i++) {
          const rankItemMap = data[i].rankItemMap;
          for (let i in rankItemMap) {
            const itemList = rankItemMap[i];
            let temp = itemList[0];
            itemList[0] = itemList[1];
            itemList[1] = temp;
          }
        }
        return data;
      },
      /**
       * 初始化排行榜数据
       */
      async initLeaderboardData() {
        const {success, data} = await getLeaderboardData()
        if (success) {
          this.leaderboardData = this.swapDataToShowThreeUser(data);
        }
      },
    }
  }
</script>

<style scoped>

</style>