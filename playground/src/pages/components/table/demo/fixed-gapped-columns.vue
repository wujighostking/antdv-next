<docs lang="zh-CN">
固定列与超宽表格。
</docs>

<docs lang="en-US">
Fixed columns with wide table.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Full Name', dataIndex: 'name', key: 'name', width: 120, fixed: 'start' },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 160 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 160 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 160 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 160 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 160 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 160 },
  { title: 'Action 1', key: 'action1', fixed: 'end', width: 100 },
  { title: 'Action 2', key: 'action2', fixed: 'end', width: 100 },
]

const dataSource: DataType[] = [
  { key: '1', name: 'Olivia', age: 32, address: 'New York Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
]
</script>

<template>
  <a-table
    bordered
    :columns="columns"
    :data-source="dataSource"
    :scroll="{ x: 'max-content' }"
    :pagination="false"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action1' || column.key === 'action2'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>
