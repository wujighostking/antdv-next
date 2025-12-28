<docs lang="zh-CN">
多列排序优先级。
</docs>

<docs lang="en-US">
Multiple sorter priority.
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
    sorter: {
      compare: (a, b) => a.name.length - b.name.length,
      multiple: 3,
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 2,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: {
      compare: (a, b) => a.address.length - b.address.length,
      multiple: 1,
    },
  },
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
