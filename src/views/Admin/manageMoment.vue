<template>
  <layout @btn-click="$parent.$data.dialogs.post = true;$parent.$data.editData = null">
    <template #header>
      <div class="name">
        <div class>New Moment</div>
      </div>
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
      </div>
    </template>

    <template #main>
      <Table
        :data="data"
        :cols="cols"
        :options="options"
        :page="page"
        @to="handleTo"
        @v-edit="handleEdit"
        @v-del="handleDel"
        class="table"
      ></Table>
    </template>
  </layout>
</template>

<script>
import api from '@/api/moment'
import moment from 'moment'
import { pick } from '@/utils'

import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    Table: () => import('@/components/Admin/Table/table.vue')
  },
  computed: {
    ...mapGetters(['isPost'])
  },
  async created () {
    const { data } = await api.getRecentlyMoment({ size: this.size, page: 1 })
    this.data = this.filterData(data)
  },
  watch: {
    isPost (val) {
      if (val) {
        this.reload()
        this.resetPost()
      }
    }
  },
  methods: {
    ...mapActions(['togglePost', 'resetPost']),
    filterData (data) {
      this.oData = data.data // 原始数据挂载 不需要响应式
      this.page = Object.assign({}, data.pageOptions)

      const filter = []

      for (const d of data.data) {
        filter.push(pick(d, ['createdTime', 'modifiedTime', 'type', '_id']))
      }

      filter.map((item, i) => {
        item.createdTime = this.parseDate(item.createdTime)
        item.modifiedTime = this.parseDate(item.modifiedTime)
        item.desc = data.data[i].content.body || data.data[i].content.comment || ''
      })
      return filter
    },
    parseDate (date) {
      return moment(new Date(Number(date))).format('YYYY-MM-DD HH:mm:ss')
    },
    async handleTo (page) {
      // console.log(page)
      if (!isNaN(page) && page !== this.page.currentPage) {
        const { data } = await api.getRecentlyMoment({ size: this.size, page })
        this.data = this.filterData(data)
      }
    },
    async handleEdit (i) {
      // console.log(i, name, id);
      this.$parent.$data.editData = Object.assign({}, this.oData[i])
      this.$parent.$data.dialogs.post = true
    },
    async handleDel (i, name, id) {
      // console.log(i, name, id);
      const { data } = await api.deleteOneMoment(id)
      if (data.ok === 1) {
        this.$msg({ msg: '删除成功' })
        this.data.splice(i, 1)
        if (!this.data.length) {
          if (this.page.currentPage === 1) {
            return
          }
          const { data } = await api.getRecentlyMoment({ size: this.size, page: this.page.currentPage - 1 })
          this.data = this.filterData(data)
          return
        }
        const { data } = await api.getRecentlyMoment({ size: this.size, page: this.page.currentPage })
        this.data = this.filterData(data)
      }
    },
    async reload () {
      const { data } = await api.getRecentlyMoment({ size: this.size, page: this.page.currentPage })
      this.data = this.filterData(data)
    }
  },
  data () {
    return {
      size: 10,
      page: null,
      oData: null,
      cols: [{
        name: '创建时间',
        prop: 'createdTime',
        width: '250px'
      }, {
        name: '类型',
        prop: 'type',
        width: '100px'
      }, {
        name: '描述',
        prop: 'desc',
        width: '500px',
        tips: true
      },
      {
        name: '操作',
        actions: [{ name: '编辑', alias: 'v-edit' }, { name: '删除', color: '#e74c3c', alias: 'v-del' }],
        width: '80px'
      }
      ],
      options: {
        showID: true
      },
      data: [],

    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  max-height: 60vh;
}
</style>