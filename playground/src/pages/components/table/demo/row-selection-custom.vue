<docs lang="zh-CN">
自定义选择菜单。
</docs>

<docs lang="en-US">
Custom selection actions.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { computed, ref } from 'vue'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
]

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const selectedRowKeys = ref<string[]>([])

const rowSelection = computed<TableProps<DataType>['rowSelection']>(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys) => {
    selectedRowKeys.value = keys as string[]
  },
  selections: [
    {
      key: 'odd',
      text: 'Select Odd Row',
      onSelect: (changeableRowKeys) => {
        selectedRowKeys.value = (changeableRowKeys as string[]).filter((_key, index) => index % 2 === 0)
      },
    },
    {
      key: 'even',
      text: 'Select Even Row',
      onSelect: (changeableRowKeys) => {
        selectedRowKeys.value = (changeableRowKeys as string[]).filter((_key, index) => index % 2 === 1)
      },
    },
  ],
  getCheckboxProps: record => ({
    disabled: record.name === 'Joe Black',
  }),
}))
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" />
</template>
