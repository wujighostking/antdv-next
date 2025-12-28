<docs lang="zh-CN">
虚拟列表。
</docs>

<docs lang="en-US">
Virtual list.
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
  { title: 'Name', dataIndex: 'name', key: 'name', width: 180 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = Array.from({ length: 1000 }).map((_, i) => ({
  key: i,
  name: `John Brown ${i}`,
  age: 20 + (i % 10),
  address: `London, Park Lane no. ${i}`,
}))
</script>

<template>
  <a-table virtual :columns="columns" :data-source="dataSource" :scroll="{ y: 320 }" />
</template>
