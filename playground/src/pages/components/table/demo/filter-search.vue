<docs lang="zh-CN">
筛选面板搜索。
</docs>

<docs lang="en-US">
Search in filter menu.
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
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [
      { text: 'Joe Black', value: 'Joe Black' },
      { text: 'Jim Green', value: 'Jim Green' },
      { text: 'John Brown', value: 'John Brown' },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(String(value)),
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
