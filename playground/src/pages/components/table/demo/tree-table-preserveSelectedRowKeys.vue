<docs lang="zh-CN">
保留树形勾选项。
</docs>

<docs lang="en-US">
Preserve selected keys for tree data.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { computed, ref } from 'vue'

interface DataType {
  key: string
  name: string
  children?: DataType[]
}

const dataSetA: DataType[] = [
  {
    key: '1',
    name: 'Parent A',
    children: [
      { key: '1-1', name: 'Child A-1' },
      { key: '1-2', name: 'Child A-2' },
    ],
  },
  {
    key: '2',
    name: 'Parent B',
    children: [{ key: '2-1', name: 'Child B-1' }],
  },
]

const dataSetB: DataType[] = [
  {
    key: '1',
    name: 'Parent A',
    children: [{ key: '1-1', name: 'Child A-1' }],
  },
  {
    key: '3',
    name: 'Parent C',
    children: [{ key: '3-1', name: 'Child C-1' }],
  },
]

const useAltData = ref(false)
const selectedRowKeys = ref<string[]>([])

const dataSource = computed(() => (useAltData.value ? dataSetB : dataSetA))

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
]

const rowSelection = computed<TableProps<DataType>['rowSelection']>(() => ({
  selectedRowKeys: selectedRowKeys.value,
  preserveSelectedRowKeys: true,
  onChange: (keys) => {
    selectedRowKeys.value = keys as string[]
  },
}))
</script>

<template>
  <a-space direction="vertical" size="middle" style="width: 100%">
    <a-button @click="useAltData = !useAltData">
      Switch data
    </a-button>
    <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" />
  </a-space>
</template>
