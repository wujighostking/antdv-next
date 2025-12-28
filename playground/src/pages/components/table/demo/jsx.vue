<docs lang="zh-CN">
在列中使用渲染函数。
</docs>

<docs lang="en-US">
Use render functions for column titles and cells.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { h } from 'vue'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: () => h('span', { style: { fontWeight: 600 } }, 'Name'),
    dataIndex: 'name',
    key: 'name',
    render: text => h('a', text),
  },
  {
    title: () => h('span', { style: { color: '#1677ff' } }, 'Age'),
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
