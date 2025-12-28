<docs lang="zh-CN">
重置筛选和排序。
</docs>

<docs lang="en-US">
Reset filters and sorters.
</docs>

<script setup lang="ts">
import type { TableProps, SorterResult } from 'antdv-next'
import { computed, ref } from 'vue'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London' },
]

const filteredInfo = ref<Record<string, any> | null>(null)
const sortedInfo = ref<SorterResult<DataType>>({})

const columns = computed<TableProps<DataType>['columns']>(() => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' },
    ],
    filteredValue: filteredInfo.value?.name || null,
    onFilter: (value, record) => record.name.includes(String(value)),
    sorter: (a, b) => a.name.length - b.name.length,
    sortOrder: sortedInfo.value.columnKey === 'name' ? sortedInfo.value.order : null,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
    sortOrder: sortedInfo.value.columnKey === 'age' ? sortedInfo.value.order : null,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    filters: [
      { text: 'London', value: 'London' },
      { text: 'New York', value: 'New York' },
    ],
    filteredValue: filteredInfo.value?.address || null,
    onFilter: (value, record) => record.address.includes(String(value)),
  },
])

const handleChange: TableProps<DataType>['onChange'] = (_pagination, filters, sorter) => {
  filteredInfo.value = filters
  sortedInfo.value = Array.isArray(sorter) ? (sorter[0] || {}) : sorter
}

function clearFilters() {
  filteredInfo.value = null
}

function clearAll() {
  filteredInfo.value = null
  sortedInfo.value = {}
}
</script>

<template>
  <a-space direction="vertical" size="middle" style="width: 100%">
    <a-space>
      <a-button @click="clearFilters">
        Clear filters
      </a-button>
      <a-button @click="clearAll">
        Clear filters and sorters
      </a-button>
    </a-space>
    <a-table :columns="columns" :data-source="dataSource" @change="handleChange" />
  </a-space>
</template>
