<template>
  <div>
    <div class="ui segment">
      <p>用户名：{{currentUser.username}}</p>
      <p>昵称：{{currentUser.nickname}}</p>
    </div>
    <div class="ui top attached tabular menu">
      <a class="item active" data-tab="-1">总览</a>
      <a :data-tab="index" :key="index" class="item" v-for="(information,index) in gameInformationList">
        {{information.sudokuLevelName}}
      </a>
    </div>
    <div class="ui bottom attached tab segment active" data-tab="-1">
      <div class="ui five statistics">
        <div class="statistic">
          <div class="value">
            {{overviewGameInformation.total}}
          </div>
          <div class="label">
            总局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{overviewGameInformation.correctNumber}}
          </div>
          <div class="label">
            提交正确的局数(次)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{overviewGameInformation.averageSpendTime}}
          </div>
          <div class="label">
            各模式的平均用时(秒)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{overviewGameInformation.minSpendTime}}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{overviewGameInformation.maxSpendTime}}
          </div>
          <div class="label">
            最长用时(秒)
          </div>
        </div>
      </div>
    </div>
    <div :data-tab="index" :key="index" class="ui bottom attached tab segment" v-for="(information,index) in gameInformationList">
      <div class="ui five statistics">
        <div class="statistic">
          <div class="value">
            {{information.total}}
          </div>
          <div class="label">
            局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{information.correctNumber}}
          </div>
          <div class="label">
            提交正确的局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{information.averageSpendTime}}
          </div>
          <div class="label">
            平均用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{information.minSpendTime}}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{information.maxSpendTime}}
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
  import {getUserGameInformation} from "../../api/userApi";
  import {formatShowMilliseconds} from "../../utils/publicUtils";
  import {
    mapMutations,
    mapState
  } from "vuex";

  import("jquery-address")

  export default {
    name: "UserGameInformationModalContent",
    data() {
      return {
        gameInformationList: [],
        overviewGameInformation: {
          total: 0,
          correctNumber: 0,
          averageSpendTime: null,
          minSpendTime: null,
          maxSpendTime: null
        },
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.currentUser,
        gameFinishCallback: state => state.sudoku.gameFinishCallback
      }),
    },
    mounted() {
      this.initGameInformation();
      //添加游戏结束后调用初始游戏信息
      this.addGameFinishCallback(() => this.initGameInformation());
    },
    updated() {
      //更新菜单项
      $('.menu .item').tab({
        history: false
      });
    },
    methods: {
      /**
       * 根据各模式的游戏信息，计算出总的游戏信息
       */
      calculateOverviewGameInformation(data) {
        let total = 0, correctNumber = 0, averageSpendTime = 0, minSpendTime = Number.MAX_VALUE, maxSpendTime = -1, size = 0;
        for (let i = 0; i < data.length; i++) {
          const dataMinSpendTime = data[i].minSpendTime;
          const dataMaxSpendTime = data[i].maxSpendTime;
          //计算游戏总数和回答正确数
          total += data[i].total;
          correctNumber += data[i].correctNumber;
          //计算平均用时
          if (data[i].averageSpendTime !== null) {
            averageSpendTime += data[i].averageSpendTime;
            size++;
          }
          //若数据的最短用时不为空且该时间小于当前最短用时，将当前最短用时替换为该数据
          if (dataMinSpendTime !== null && dataMinSpendTime < minSpendTime) {
            minSpendTime = dataMinSpendTime;
          }
          //若数据的最长用时不为空且该时间大于当前最长用时，将当前最长用时替换为该数据
          if (dataMaxSpendTime !== null && dataMaxSpendTime > maxSpendTime) {
            maxSpendTime = dataMaxSpendTime;
          }
        }
        if (minSpendTime === Number.MAX_VALUE) {
          minSpendTime = null;
        }
        if (maxSpendTime === -1) {
          maxSpendTime = null;
        }
        //计算平均用时
        if (size !== 0) {
          averageSpendTime = averageSpendTime / size;
        } else {
          averageSpendTime = null;
        }
        return {total, correctNumber, averageSpendTime, minSpendTime, maxSpendTime};
      },
      /**
       * 格式化花费的时间
       */
      formatSpendTime(overviewData, data) {
        overviewData.averageSpendTime = formatShowMilliseconds(overviewData.averageSpendTime);
        overviewData.minSpendTime = formatShowMilliseconds(overviewData.minSpendTime);
        overviewData.maxSpendTime = formatShowMilliseconds(overviewData.maxSpendTime);
        for (let i = 0; i < data.length; i++) {
          data[i].averageSpendTime = formatShowMilliseconds(data[i].averageSpendTime);
          data[i].minSpendTime = formatShowMilliseconds(data[i].minSpendTime);
          data[i].maxSpendTime = formatShowMilliseconds(data[i].maxSpendTime);
        }
        return {overviewData, data};
      },
      ...mapMutations([
        'addGameFinishCallback'
      ]),
      /**
       * 初始化用户游戏信息
       */
      initGameInformation() {
        getUserGameInformation().then(data => {
          if (data) {
            let overviewGameInformation = this.calculateOverviewGameInformation(data);
            const formatData = this.formatSpendTime(overviewGameInformation, data);
            this.overviewGameInformation = formatData.overviewData;
            this.gameInformationList = formatData.data;
          }
        });
      }
    },
  }
</script>

<style scoped>
  .ui.attached.segment {
    margin: 0 !important;
    width: calc(100%) !important;
  }
</style>