<template>
  <layout>
    <template #main>
      <!-- <h1>最近 7 天 访客数据</h1> -->
      <div class="chart">
        <ve-line
        @ready-once="handleRenderChart"
          :title="{text: '最近 7 天 访客数据'}"
          :loading="loading"
          :data="PVchartData"
          :settings="chartSettings"
        />
      </div>
      <!-- <ve-pie :data="WeekChartData"></ve-pie> -->
      <div class="chart">
        <ve-line
        @ready-once="handleRenderChart"
          :title="{text: '今天 访客数据'}"
          :loading="loading"
          :data="dayChartData"
          :settings="chartSettings"
        />
      </div>
    </template>
  </layout>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/title'
import 'v-charts/lib/style.css'

import { getAnalytics } from '@/api/options'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    VeLine
  },
  async created () {
    const { data } = await getAnalytics()
    if (data.ok === 1) {
      this.PVchartData.rows = data.weekNum
      this.dayChartData.rows = data.dayNum
      this.loading = false
    }
  },
  methods: {
    handleRenderChart (e) {
      // console.log(e);
      setTimeout(() => {
        e.resize()
      }, 1500);
    },
  },
  data () {
    return {
      PVchartData: {
        columns: ['day', 'PV', 'IP'],
        rows: []
      },
      dayChartData: {
        columns: ['hour', 'PV', 'IP'],
        rows: []
      },
      chartSettings: {
        labelMap: {
          PV: 'PV',
          day: '日期',
          IP: 'IP'
        }
      },
      loading: true
    }
  }
}
</script>
