<template>
  <layout>
    <template #main>
      <!-- <h1>最近 7 天 访客数据</h1> -->
      <div class="chart">
        <ve-line :title="title" :loading="loading" :data="PVchartData" :settings="chartSettings" />
      </div>

      <!-- <ve-pie :data="WeekChartData"></ve-pie> -->
    </template>
  </layout>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
// import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/title'
import 'v-charts/lib/style.css'

import { getAnalytics } from '@/api/options'
// import VePie from 'v-charts/lib/pie.common'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    VeLine
  },
  async created () {
    const { data } = await getAnalytics()
    if (data.ok === 1) {
      // const today = Date.now()
      this.PVchartData.rows = data.weekNum
      this.loading = false
      // this.WeekChartData.rows = [{'本周 PV': data.week, '全年 PV': data.year}]
    }
  },
  data () {
    return {
      PVchartData: {
        columns: ['day', 'PV', 'IP'],
        rows: []
      },
      chartSettings: {
        labelMap: {
          PV: 'PV',
          day: '日期',
          IP: 'IP'
        }
      },
      title: {
        text: '最近 7 天 访客数据',
        // left: 'center'
      },
      loading: true
    }
  }
}
</script>

<style scoped>
/* h1 {
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
} */
/* .chart {
  display: flex;
  justify-content: center;
} */
</style>