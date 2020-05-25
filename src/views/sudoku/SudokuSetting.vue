<template>
  <div>
    <div class="ui top attached segment">
      <div class="ui middle aligned two column grid">
        <div class="column">
          <h3 class="ui teal header"><i class="settings icon"></i>设置</h3>
        </div>
      </div>
    </div>
    <div class="ui bottom attached segment m-padded-tb-large">
      <div class="ui two column very relaxed stackable grid">
        <div class="column">
          <h4 class="ui blue basic header m-padded-lr">模式设置</h4>
          <div class="ui center aligned container">
            <div class="m-padded-tb">
              <label>
                <select class="ui dropdown" v-model:value="gameModel">
                  <option :key="index" :value="level.level" v-for="(level, index) in sudokuLevels">{{level.name}}</option>
                </select>
              </label>
            </div>
            <div class="m-padded-tb-large">
              <button @click="$emit('clickNewGame')" class="ui blue basic circular button">
                <i class="gamepad icon"></i>新游戏
              </button>
            </div>
          </div>
        </div>
        <div class="column">
          <h4 class="ui green basic header">其他设置</h4>
          <div class="ui container">
            <div class="ui toggle checkbox m-padded-tb tip-popup" data-content="辅助显示鼠标所在的行、列和3x3宫格中">
              <input id="tipsStyleSwitchCheckbox" type="checkbox" v-model="positionTips">
              <label for="tipsStyleSwitchCheckbox">位置提示</label>
            </div>
            <div class="ui toggle checkbox m-padded-tb tip-popup" data-content="选择该模式后，点击空缺的数独框，将弹出数字选择框">
              <input id="clickModeSwitchCheckbox" type="checkbox" v-model="clickMode">
              <label for="clickModeSwitchCheckbox">点击模式</label>
            </div>
            <div class="ui toggle checkbox m-padded-tb tip-popup" data-content="选择该模式后，将记录你的每次游戏记录到服务器中">
              <input id="recordModeSwitchCheckbox" type="checkbox" v-model="recordMode">
              <label for="recordModeSwitchCheckbox">记录模式</label>
            </div>
          </div>
        </div>
      </div>
      <div class="ui vertical divider"><i class="setting icon"></i></div>
    </div>
  </div>
</template>

<script>
  import {getSudokuLevels} from "../../api/gameApi";

  export default {
    name: "SudokuSetting",
    data() {
      return {
        sudokuLevels: []
      }
    },
    computed: {
      clickMode: {
        get() {
          return this.$store.state.sudoku.clickMode;
        },
        set(value) {
          this.$store.commit('updateClickMode', value);
        }
      },
      gameModel: {
        get() {
          return this.$store.state.sudoku.gameModel;
        },
        set(value) {
          this.$store.commit('updateGameModel', value);
        }
      },
      positionTips: {
        get() {
          return this.$store.state.sudoku.positionTips;
        },
        set(value) {
          this.$store.commit('updatePositionTips', value);
        }
      },
      recordMode: {
        get() {
          return this.$store.state.sudoku.recordMode;
        },
        set(value) {
          this.$store.commit('updateRecordMode', value);
        }
      }
    },
    mounted() {
      //初始化下拉选
      $(".ui.dropdown").dropdown();
      this.initSudokuLevels();
    },
    methods: {
      /**
       * 初始化数独难度等级
       */
      initSudokuLevels() {
        getSudokuLevels().then(data => {
          if (data) {
            this.sudokuLevels = data;
          }
        })
      }
    }
  }
</script>

<style scoped>
  /*小屏时隐藏分隔线*/
  @media only screen and (max-width: 770px) {
    .divider {
      display: none;
    }
  }
</style>