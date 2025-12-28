<docs lang="zh-CN">
汇总行。
</docs>

<docs lang="en-US">
Summary row.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  amount: number
  address: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', amount: 1200, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', amount: 800, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', amount: 500, address: 'Sydney No. 1 Lake Park' },
]

const total = dataSource.reduce((sum, item) => sum + item.amount, 0)
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false">
    <template #summary>
      <a-table-summary>
        <a-table-summary-row>
          <a-table-summary-cell index="0">
            Total
          </a-table-summary-cell>
          <a-table-summary-cell index="1">
            {{ total }}
          </a-table-summary-cell>
          <a-table-summary-cell index="2" />
        </a-table-summary-row>
      </a-table-summary>
    </template>
  </a-table>
</template>
