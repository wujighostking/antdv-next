<docs lang="zh-CN">
嵌套表格。
</docs>

<docs lang="en-US">
Nested table.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { h, resolveComponent } from 'vue'

interface ExpandedDataType {
  key: string
  date: string
  name: string
  status: string
}

interface DataType {
  key: string
  name: string
  platform: string
  version: string
  upgradeNum: number
  creator: string
  createdAt: string
}

const innerColumns: TableProps<ExpandedDataType>['columns'] = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
]

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
]

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  },
  {
    key: '2',
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  },
]

const ATable = resolveComponent('ATable') as any

function expandedRowRender() {
  const innerData: ExpandedDataType[] = [
    { key: '1', date: '2014-12-24', name: 'This is production name', status: 'Finished' },
    { key: '2', date: '2014-12-25', name: 'This is production name', status: 'Finished' },
  ]
  return h(ATable, {
    columns: innerColumns,
    dataSource: innerData,
    pagination: false,
    size: 'small',
  })
}
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :expanded-row-render="expandedRowRender"
  />
</template>
