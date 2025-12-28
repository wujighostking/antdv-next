<docs lang="zh-CN">
动态显示/隐藏列。
</docs>

<docs lang="en-US">
Show or hide columns.
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

const allColumns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const options = allColumns.map(col => ({ label: col?.title as string, value: col?.key as string }))
const checkedList = ref(options.map(opt => opt.value))

const columns = computed(() => allColumns.filter(col => checkedList.value.includes(col?.key as string)))

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <a-space direction="vertical" style="width: 100%" size="middle">
    <a-checkbox-group v-model:value="checkedList" :options="options" />
    <a-table :columns="columns" :data-source="dataSource" />
  </a-space>
</template>
