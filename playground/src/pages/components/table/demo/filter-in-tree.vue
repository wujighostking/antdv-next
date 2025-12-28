<docs lang="zh-CN">
树形筛选。
</docs>

<docs lang="en-US">
Tree filter menu.
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
      {
        text: 'Jim',
        value: 'Jim',
        children: [
          { text: 'Jim Green', value: 'Jim Green' },
          { text: 'Jim Red', value: 'Jim Red' },
        ],
      },
      {
        text: 'Joe',
        value: 'Joe',
        children: [{ text: 'Joe Black', value: 'Joe Black' }],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(String(value)),
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = [
  { key: '1', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '2', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>
