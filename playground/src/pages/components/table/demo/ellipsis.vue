<docs lang="zh-CN">
超出省略。
</docs>

<docs lang="en-US">
Text overflow ellipsis.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  description: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 160, ellipsis: true },
  { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
]

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    description: 'This is a long description that should be truncated with ellipsis in the table cell.',
  },
  {
    key: '2',
    name: 'Jim Green',
    description: 'Another long description for demonstrating ellipsis in table columns.',
  },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
