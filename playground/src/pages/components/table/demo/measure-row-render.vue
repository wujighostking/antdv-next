<docs lang="zh-CN">
虚拟滚动与行测量。
</docs>

<docs lang="en-US">
Virtual table with row measurement.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { h } from 'vue'

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

const dataSource: DataType[] = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  name: `John Brown ${i}`,
  age: 20 + (i % 10),
  address: `London, Park Lane no. ${i}`,
}))

const measureRowRender: TableProps<DataType>['measureRowRender'] = (row: any) =>
  h('div', { class: 'measure-row' }, row)
</script>

<template>
  <a-table
    virtual
    :columns="columns"
    :data-source="dataSource"
    :scroll="{ y: 240 }"
    :measure-row-render="measureRowRender"
  />
</template>

<style scoped>
.measure-row {
  padding-inline: 4px;
}
</style>
