<template>
  <div class="dashboard-editor-container">

    <div class="dashboard-text">欢迎您: {{ name }}</div>
    <PanelGroup @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from '@/views/admin/dashboard/components/PanelGroup'
import LineChart from '@/views/admin/dashboard/components/LineChart'

const lineChartData = {
  newVisitis: {
    dayData: [100, 120, 161, 134, 105, 160, 165],
    monthData: [1200, 820, 910, 1540, 1620, 1400, 1450]
  },
  purchases: {
    dayData: [100, 120, 161, 134, 105, 160, 165],
    monthData: [120, 82, 91, 154, 162, 140, 145]
  }
}

export default {
  name: 'Dashboard',
  components: { LineChart, PanelGroup },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
