<docs lang="zh-CN">
自定义省略提示。
</docs>

<docs lang="en-US">
Custom tooltip for ellipsis.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  description: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 160, ellipsis: true },
  { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
]

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    description: 'This is a long description with a custom tooltip when hovering.',
  },
  {
    key: '2',
    name: 'Jim Green',
    description: 'Custom tooltip text appears here for ellipsis content.',
  },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource">
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'description'">
        <a-tooltip :title="text">
          <span class="ellipsis-text">{{ text }}</span>
        </a-tooltip>
      </template>
    </template>
  </a-table>
</template>

<style scoped>
.ellipsis-text {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
