<docs lang="zh-CN">
树形数据省略。
</docs>

<docs lang="en-US">
Tree data with ellipsis.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  description: string
  children?: DataType[]
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 160, ellipsis: true },
  { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
]

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'Parent',
    description: 'A very long description for the parent row that should be truncated.',
    children: [
      {
        key: '1-1',
        name: 'Child A',
        description: 'Another long description for a child row that should be truncated too.',
      },
    ],
  },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
