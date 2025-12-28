<docs lang="zh-CN">
树形数据。
</docs>

<docs lang="en-US">
Tree data.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  children?: DataType[]
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    children: [
      { key: '1-1', name: 'John Brown Jr.', age: 12, address: 'New York No. 1 Lake Park' },
      { key: '1-2', name: 'John Brown Sr.', age: 72, address: 'New York No. 1 Lake Park' },
    ],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
