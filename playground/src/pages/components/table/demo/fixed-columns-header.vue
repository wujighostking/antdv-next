<docs lang="zh-CN">
固定表头和固定列。
</docs>

<docs lang="en-US">
Fixed header and columns.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  company: string
  email: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 150, fixed: 'start' },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 200 },
  { title: 'Company', dataIndex: 'company', key: 'company', width: 200 },
  { title: 'Email', dataIndex: 'email', key: 'email', width: 220 },
  { title: 'Action', key: 'action', fixed: 'end', width: 120 },
]

const dataSource: DataType[] = Array.from({ length: 12 }).map((_, i) => ({
  key: String(i + 1),
  name: `John Brown ${i + 1}`,
  age: 30 + (i % 10),
  address: `New York No. ${i + 1} Lake Park`,
  company: 'Ant Design',
  email: `john${i + 1}@demo.com`,
}))
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :scroll="{ x: 1000, y: 240 }"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <a>Action</a>
      </template>
    </template>
  </a-table>
</template>
