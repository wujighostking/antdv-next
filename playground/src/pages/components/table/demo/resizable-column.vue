<docs lang="zh-CN">
可调整列宽。
</docs>

<docs lang="en-US">
Resizable column width.
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

const nameWidth = ref(160)

const columns = computed<TableProps<DataType>['columns']>(() => [
  { title: 'Name', dataIndex: 'name', key: 'name', width: nameWidth.value },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
])

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
]
</script>

<template>
  <a-space direction="vertical" size="middle" style="width: 100%">
    <div>
      <span style="margin-right: 8px">Name column width</span>
      <a-slider v-model:value="nameWidth" :min="120" :max="260" style="max-width: 260px" />
    </div>
    <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 600 }" />
  </a-space>
</template>
