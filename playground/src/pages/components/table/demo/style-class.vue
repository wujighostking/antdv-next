<docs lang="zh-CN">
自定义 class 和 style。
</docs>

<docs lang="en-US">
Custom classNames and styles.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
]

const classNames: TableProps<DataType>['classNames'] = {
  header: { row: 'custom-header-row', cell: 'custom-header-cell' },
  body: { row: 'custom-body-row', cell: 'custom-body-cell' },
}

const styles: TableProps<DataType>['styles'] = {
  header: { row: { background: '#fafafa' }, cell: { fontWeight: 600 } },
  body: { row: { transition: 'background 0.2s' } },
}
</script>

<template>
  <a-table
    root-class="custom-table-root"
    :columns="columns"
    :data-source="dataSource"
    :class-names="classNames"
    :styles="styles"
  />
</template>

<style scoped>
.custom-table-root :deep(.custom-body-row:hover) {
  background: #f5f5f5;
}

.custom-header-cell {
  color: var(--ant-color-text);
}
</style>
