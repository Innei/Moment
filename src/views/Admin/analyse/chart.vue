<template>
  <layout>
    <template #main>
      <h1>最近 7 天 访客数据</h1>
      <ve-line :data="PVchartData" :settings="chartSettings"></ve-line>
      <!-- <ve-pie :data="WeekChartData"></ve-pie> -->
    </template>
  </layout>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
// import VePie from 'v-charts/lib/pie.common'
import { getAnalytics } from '@/api/options'
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
      // this.WeekChartData.rows = [{'本周 PV': data.week, '全年 PV': data.year}]
    }
  },
  data () {
    this.chartSettings = {
      labelMap: {
        PV: 'PV',
        day: '日期',
        IP: 'IP'
      }
    }
    return {
      PVchartData: {
        columns: ['day', 'PV', 'IP'],
        rows: []
      },
      // WeekChartData: {
      //   columns: ['本周 PV', '全年 PV'],
      //   rows: []
      // }
    }
  }


}
</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
}
</style>