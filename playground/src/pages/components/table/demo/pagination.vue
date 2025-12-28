<docs lang="zh-CN">
分页。
</docs>

<docs lang="en-US">
Pagination.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: number
  name: string
  age: number
  address: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = Array.from({ length: 46 }).map((_, i) => ({
  key: i,
  name: `John Brown ${i}`,
  age: 20 + (i % 10),
  address: `London, Park Lane no. ${i}`,
}))
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="{ pageSize: 8, showSizeChanger: true, showQuickJumper: true }"
  />
</template>
