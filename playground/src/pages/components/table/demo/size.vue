<docs lang="zh-CN">
三种尺寸。
</docs>

<docs lang="en-US">
Table sizes.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { ref } from 'vue'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const size = ref<TableProps<DataType>['size']>('middle')

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
]
</script>

<template>
  <a-space direction="vertical" size="middle" style="width: 100%">
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">
        Large
      </a-radio-button>
      <a-radio-button value="middle">
        Middle
      </a-radio-button>
      <a-radio-button value="small">
        Small
      </a-radio-button>
    </a-radio-group>
    <a-table :columns="columns" :data-source="dataSource" :size="size" />
  </a-space>
</template>
