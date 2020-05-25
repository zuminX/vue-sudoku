<template>
  <div class="scrolling content">
    <div class="ui segment" id="historyTable">
      <div class="ui inverted dimmer">
        <div class="ui text loader">加载中</div>
      </div>
      <table class="ui celled padded table">
        <thead ref="tableHead">
        <tr class="center aligned">
          <th>数独矩阵</th>
          <th>难度</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>提交情况</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="index" class="center aligned" v-for="(record, index) in recordData">
          <td>
            <div :key="i" class="sudoku-row absolute-center" v-for="(rowData, i) in record.sudokuMatrix">
              <div :key="j" class="mini-number" v-for="(data, j) in rowData">
                <input :class="[record.sudokuHoles[i][j]==='1'?'input-color':'background-color-gray']" :value="data"
                       class="sudoku-number-input" disabled type="text">
              </div>
            </div>
          </td>
          <td>
            {{record.sudokuLevelName}}
          </td>
          <td>
            {{handleNullTime(record.startTime)}}
          </td>
          <td>
            {{handleNullTime(record.endTime)}}
          </td>
          <td>
            <i :class="[record.correct ? 'checkmark green' : 'remove red']" class="icon"></i>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <th class="center aligned" colspan="5">
            <div class="ui pagination menu">
              <el-pagination
                  :current-page.sync="currentPage"
                  :page-count="totalPage"
                  :page-size="pageSize"
                  :page-sizes="[1, 5, 10, 20]"
                  @current-change="updateCurrentPageData"
                  @size-change="handleSizeChange"
                  background
                  layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </th>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  import {getHistoryGameRecord} from "../../api/userApi";
  import {convertToSudokuMatrix} from "../../utils/coreUtils";
  import {
    mapMutations,
    mapState
  } from "vuex";

  export default {
    name: "HistoryRecordModalContent",
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        totalPage: 0,
        recordData: []
      }
    },
    computed: {
      ...mapState({
        gameFinishCallback: state => state.sudoku.gameFinishCallback
      }),
    },
    mounted() {
      this.updateCurrentPageData();
      //添加游戏结束后调用初始游戏信息
      this.addGameFinishCallback(() => this.updateCurrentPageData());
    },
    methods: {
      /**
       * 转换游戏记录中的数独矩阵和空缺字符串为二维数组
       * @param recordData 游戏记录数据
       * @returns {Object} 处理后的游戏记录数据
       */
      convertGameRecordToMatrix(recordData) {
        for (let i = 0, size = recordData.length; i < size; i++) {
          recordData[i].sudokuMatrix = convertToSudokuMatrix(recordData[i].sudokuMatrix);
          recordData[i].sudokuHoles = convertToSudokuMatrix(recordData[i].sudokuHoles);
        }
        return recordData;
      },
      /**
       * 处理空日期
       * @param time 日期
       * @returns {String} 处理后的字符串
       */
      handleNullTime(time) {
        return time === null ? "----" : time;
      },
      ...mapMutations([
        'addGameFinishCallback'
      ]),
      /**
       * 更新当前页的数据
       * @param page 页数
       */
      updateCurrentPageData(page = 1) {
        this.changeTableDimmer(true);
        getHistoryGameRecord(page, this.pageSize).then(data => {
          if (data) {
            this.recordData = this.convertGameRecordToMatrix(data.gameRecord);
            this.currentPage = data.currentPage;
            this.totalPage = data.totalPage;
            this.pageSize = data.pageSize;
            //滚动到表头
            this.$refs.tableHead.scrollIntoView();
            this.changeTableDimmer(false);
          }
        })
      },
      /**
       * 处理每页条数的改变
       */
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.updateCurrentPageData();
      },
      /**
       * 控制历史记录表的调光器的显示状态
       * @param show 显示
       */
      changeTableDimmer(show) {
        $('#historyTable').dimmer(show ? 'show' : 'hide');
      }
    }
  }
</script>

<style scoped>
  /*缩小的数独数字*/
  .mini-number {
    width: 25px;
    height: 25px;
    float: left;
  }

  /*用户输入数独框的颜色*/
  .input-color {
    background-color: #c4e3ff;
  }
</style>