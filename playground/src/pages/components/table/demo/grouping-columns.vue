<docs lang="zh-CN">
分组表头。
</docs>

<docs lang="en-US">
Grouped columns.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  street: string
  building: string
  number: number
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'start',
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        children: [
          { title: 'Street', dataIndex: 'street', key: 'street' },
          { title: 'Building', dataIndex: 'building', key: 'building' },
          { title: 'Number', dataIndex: 'number', key: 'number' },
        ],
      },
    ],
  },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, street: 'Lake Park', building: 'A', number: 2035 },
  { key: '2', name: 'Jim Green', age: 42, street: 'Ocean Park', building: 'B', number: 1121 },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 600 }" />
</template>
