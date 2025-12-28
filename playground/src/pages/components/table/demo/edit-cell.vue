<docs lang="zh-CN">
单元格内编辑。
</docs>

<docs lang="en-US">
Editable cells.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { computed, ref } from 'vue'

interface DataType {
  key: string
  name: string
  age: string
  address: string
}

const dataSource = ref<DataType[]>([
  { key: '0', name: 'Edward King 0', age: '32', address: 'London, Park Lane no. 0' },
  { key: '1', name: 'Edward King 1', age: '32', address: 'London, Park Lane no. 1' },
])

const editing = ref<{ key: string, dataIndex: keyof DataType } | null>(null)
const inputValue = ref('')

const editableColumns = new Set(['name', 'age', 'address'])

const columns = computed<TableProps<DataType>['columns']>(() => [
  { title: 'Name', dataIndex: 'name', key: 'name', width: '30%' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Operation', key: 'operation' },
])

function startEdit(record: DataType, dataIndex: keyof DataType) {
  editing.value = { key: record.key, dataIndex }
  inputValue.value = String(record[dataIndex])
}

function saveEdit(record: DataType) {
  if (!editing.value) {
    return
  }
  const { dataIndex } = editing.value
  dataSource.value = dataSource.value.map((item) => {
    if (item.key === record.key) {
      return { ...item, [dataIndex]: inputValue.value }
    }
    return item
  })
  editing.value = null
}

function cancelEdit() {
  editing.value = null
}
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, record, text }">
      <template v-if="column.key === 'operation'">
        <a @click="cancelEdit">Cancel</a>
      </template>
      <template v-else-if="editableColumns.has(String(column.dataIndex))">
        <template v-if="editing && editing.key === record.key && editing.dataIndex === column.dataIndex">
          <a-input
            v-model:value="inputValue"
            size="small"
            @keyup.enter="saveEdit(record)"
            @blur="saveEdit(record)"
          />
        </template>
        <template v-else>
          <div class="editable-cell" @click="startEdit(record, column.dataIndex)">
            {{ text }}
          </div>
        </template>
      </template>
    </template>
  </a-table>
</template>

<style scoped>
.editable-cell {
  cursor: pointer;
  padding-inline-end: 24px;
}
</style>
