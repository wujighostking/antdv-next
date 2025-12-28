<docs lang="zh-CN">
响应式列。
</docs>

<docs lang="en-US">
Responsive columns.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  email: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age', responsive: ['md'] },
  { title: 'Address', dataIndex: 'address', key: 'address', responsive: ['lg'] },
  { title: 'Email', dataIndex: 'email', key: 'email', responsive: ['xl'] },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', email: 'john@example.com' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', email: 'jim@example.com' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
