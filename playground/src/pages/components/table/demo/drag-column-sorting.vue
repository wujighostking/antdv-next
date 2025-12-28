<docs lang="zh-CN">
拖动上方列表项调整列顺序。
</docs>

<docs lang="en-US">
Drag list items to reorder columns.
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

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
]

const columns = ref<TableProps<DataType>['columns']>([
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
])

const dragKey = ref<string | null>(null)

function onDragStart(key: string) {
  dragKey.value = key
}

function onDrop(targetKey: string) {
  if (!dragKey.value || dragKey.value === targetKey) {
    return
  }
  const current = [...(columns.value || [])]
  const fromIndex = current.findIndex(col => col?.key === dragKey.value)
  const toIndex = current.findIndex(col => col?.key === targetKey)
  if (fromIndex === -1 || toIndex === -1) {
    return
  }
  const [moved] = current.splice(fromIndex, 1)
  current.splice(toIndex, 0, moved)
  columns.value = current
  dragKey.value = null
}
</script>

<template>
  <div class="column-dragger">
    <div
      v-for="col in columns"
      :key="col?.key"
      class="column-pill"
      draggable="true"
      @dragstart="onDragStart(String(col?.key))"
      @dragover.prevent
      @drop="onDrop(String(col?.key))"
    >
      {{ col?.title }}
    </div>
  </div>
  <a-table :columns="columns" :data-source="dataSource" />
</template>

<style scoped>
.column-dragger {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.column-pill {
  padding: 4px 10px;
  border: 1px dashed var(--ant-color-border);
  border-radius: 999px;
  cursor: grab;
  user-select: none;
  background: var(--ant-color-bg-container);
}
</style>
