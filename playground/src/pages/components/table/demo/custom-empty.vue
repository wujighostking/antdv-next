<docs lang="zh-CN">
自定义空状态。
</docs>

<docs lang="en-US">
Custom empty content.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="[]">
    <template #emptyText>
      <div class="table-empty">No data yet</div>
    </template>
  </a-table>
</template>

<style scoped>
.table-empty {
  color: var(--ant-color-text-tertiary);
  padding: 8px 0;
}
</style>
