<docs lang="zh-CN">
可展开行与粘性表头。
</docs>

<docs lang="en-US">
Expandable rows with sticky header.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  description: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 180 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 120 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = Array.from({ length: 6 }).map((_, i) => ({
  key: String(i + 1),
  name: `John Brown ${i + 1}`,
  age: 30 + i,
  address: `New York No. ${i + 1} Lake Park`,
  description: `Detail for row ${i + 1}.`,
}))
</script>

<template>
  <a-table
    sticky
    :columns="columns"
    :data-source="dataSource"
    :scroll="{ y: 240 }"
    :expanded-row-render="record => record.description"
  />
</template>
