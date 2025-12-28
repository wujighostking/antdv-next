<docs lang="zh-CN">
粘性表头。
</docs>

<docs lang="en-US">
Sticky header.
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
  { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i,
  name: `John Brown ${i}`,
  age: 20 + i,
  address: `London, Park Lane no. ${i}`,
}))
</script>

<template>
  <a-table sticky :columns="columns" :data-source="dataSource" :scroll="{ y: 240 }" />
</template>
