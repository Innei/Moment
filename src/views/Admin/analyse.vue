<template>
  <layout>
    <template #main>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </template>
  </layout>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { getAnalytics } from '../../api/options'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    VeLine
  },
  async created () {
    const { data } = await getAnalytics()
    if (data.ok === 1) {
      // const today = Date.now()

      this.chartData.rows = data.weekNum

    }
  },
  data () {
    this.chartSettings = {
      labelMap: {
        PV: '访问用户',
        day: '日期'
      }
    }
    return {

      chartData: {
        columns: ['day', 'PV'],
        rows: []
      }
    }
  }


}
</script>

<style>
</style>