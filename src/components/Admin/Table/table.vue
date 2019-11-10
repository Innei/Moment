<template>
  <ps class="table">
    <div class="theader">
      <div class="status_bar">
        <div class="col" v-if="options.showID">#</div>
        <div
          class="col"
          v-for="col in cols"
          :key="col.prop"
          :style="{width: col.width}"
        >{{col.name}}</div>
        <div class="col" v-if="action" :style="{width: action.width}">{{action.name}}</div>
      </div>
    </div>
    <div class="tbody">
      <div class="row" v-for="(row, i) in data" :key="row._id">
        <div class="col" v-show="options.showID" :style="{overflow: 'hidden'}">{{i}}</div>
        <div
          class="col"
          :style="{width: col.width, overflow: 'hidden',textOverflow:'ellipsis'}"
          v-for="col in cols"
          :key="col.prop"
          :title="col.tips ? row[col.prop]: ''"
        >{{row[col.prop]}}</div>
        <div class="col" v-if="action" :style="{width: action.width}">
          <span
            v-for="action in action.actions"
            :key="action"
            class="action_btn"
            @click="$emit(action, i, action, row._id)"
          >{{action}}</span>
        </div>
      </div>
    </div>
    <div class="tfooter">
      <!-- TODO 分页器 -->
    </div>
  </ps>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    ps: PerfectScrollbar
  },
  created () {
    if (this.cols[this.cols.length - 1].actions) {
      const action = this.cols.splice(-1, 1)[0]
      this.action = Object.assign({}, action)
    }
  },
  data () {
    return {
      action: null,

    }
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Overpass+Mono&display=swap);
$table-col-gap: 20px;
.table {
  overflow: auto;
}
* {
  font-family: 'Overpass Mono', monospace;
  user-select: none;
}
.table::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

.table {
  min-height: 10rem;
  .theader {
    display: inline-block;
  }
  .status_bar {
    white-space: nowrap;
    display: inline-block;
    padding: 12px;
    border-bottom: 1px #eee solid;
    color: #909399;
    font-weight: 800;
  }
  .tbody {
    display: inline-block;
    .row {
      white-space: nowrap;
      display: inline-block;
      padding: 12px;
      border-bottom: 1px #eee solid;
      // min-width: 100%;
    }
  }
}
.col {
  display: inline-block;
  margin-right: $table-col-gap;
}

.action_btn {
  margin-right: 12px;
  color: #1188e8;
  transition: color 0.5s;
  cursor: pointer;
}
.action_btn:hover {
  color: #1187e8c2;
}
</style>