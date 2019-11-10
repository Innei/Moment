<template>
  <layout @btn-click="$parent.$data.dialogs.post = true">
    <template #header>
      <div class>New Moment</div>
    </template>

    <template #main>
      <Table :data="data" :cols="cols" :options="options" class="table"></Table>
    </template>
  </layout>
</template>

<script>
import api from '@/api/moment'
import moment from 'moment'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    Table: () => import('@/components/Admin/Table/table.vue')
  },
  async created () {
    const { data } = await api.getRecentlyMoment({ size: 10, page: 1 })
    this.data = this.filterData(data)
  },
  methods: {
    filterData (data) {
      this.oData = data.data // 原始数据挂载 不需要响应式
      this.page = Object.assign({}, data.pageOptions)
      // const data = data.data
      const pick = (obj, arr) =>
        arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});

      const filter = []

      for (const d of data.data) {
        filter.push(pick(d, ['createdTime', 'modifiedTime', 'type']))
      }

      filter.map((item, i) => {
        item.createdTime = this.parseDate(item.createdTime)
        item.modifiedTime = this.parseDate(item.modifiedTime)
        item.desc = data.data[i].content.body || ''
      })
      return filter
    },
    parseDate (date) {
      return moment(new Date(Number(date))).format('YYYY-MM-DD')
    }
  },
  data () {
    return {
      page: null,
      oData: null,
      cols: [{
        name: 'Created Time',
        prop: 'createdTime',
        width: '180px'
      }, {
        name: 'Type',
        prop: 'type',
        width: '100px'
      }, {
        name: 'Description',
        prop: 'desc',
        width: '500px',
        tips: true
      },
      {
        name: 'Action',
        actions: ['Edit', 'Delete'],
        width: '80px'
      }
      ],
      options: {
        showID: true
      },
      data: null

    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  max-height: 60vh ;
}
</style>