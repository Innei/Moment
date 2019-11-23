<template>
  <layout>
    <template #header>
      <div @click="handleReflesh">
        <div class="name">Reflesh</div>
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'sync']"></font-awesome-icon>
        </div>
      </div>
    </template>
    <template #main>
      <Table :data="data" :cols="cols" :options="options" :page="page" @to="handleTo" class="table"></Table>
    </template>
  </layout>
</template>

<script>
import Table from '@/components/Admin/Table/table.vue'
import { pick } from '@/utils'
import { getAccessData } from '../../../api/options.js'
export default {
  components: {
    Table,
    layout: () => import('@/components/Admin/layout.vue'),
  },
  data () {
    return {
      size: 50,
      page: null,
      oData: null,
      cols: [{
        name: '访问时间',
        prop: 'formatTime',
        width: '10rem'
      }, {
        name: '方式',
        prop: 'method',
        width: '4rem'
      }, {
        name: 'IP',
        prop: 'ip',
        width: '8rem'
      }, {
        name: '路径',
        prop: 'path',
        width: '300px',
        tips: true
      },
      {
        name: '浏览器',
        prop: 'browser',
        width: '8rem',
      },
      {
        name: '访客系统',
        prop: 'os',
        width: '8rem',
      },
      {
        name: '用户代理',
        prop: 'userAgent',
        // width: '15rem',
        tips: true
      }],
      options: {
        showID: true
      },
      data: [],
    }
  },
  async created () {
    const { data } = await getAccessData({ size: this.size })
    this.data = this.filterData(data)
  },
  methods: {
    filterData (data) {
      this.oData = data.data // 原始数据挂载 不需要响应式
      this.page = Object.assign({}, data.pageOptions)

      const filter = []

      for (const d of data.data) {
        filter.push(pick(d, ['ip', 'formatTime', 'method', 'path', '_id']))
      }

      filter.map((item, i) => {
        if (data.data[i].userAgent) {
          item.userAgent = data.data[i].userAgent.source
          item.browser = data.data[i].userAgent.browser
          item.os = data.data[i].userAgent.os
        }
      })
      return filter
    },
    async handleTo (page) {
      // console.log(page)
      if (!isNaN(page) && page !== this.page.currentPage) {
        const { data } = await getAccessData({ size: this.size, page })
        this.data = this.filterData(data)
      }
    },
    async handleReflesh () {
      const { data } = await getAccessData({ size: this.size, page: this.page.currentPage })
      this.data = this.filterData(data)
    }
  }
}
</script>

<style scoped>
.icon {
  animation: rotate 1s;
}
.icon:hover {
  animation: rotate 1s reverse linear infinite;
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>