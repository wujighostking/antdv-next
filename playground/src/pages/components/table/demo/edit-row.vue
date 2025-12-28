<docs lang="zh-CN">
整行编辑。
</docs>

<docs lang="en-US">
Editable rows.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { ref } from 'vue'

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

const columns: TableProps<DataType>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Operation', key: 'operation' },
]

const editingKey = ref<string | null>(null)
const editRow = ref({ name: '', age: '', address: '' })

function edit(record: DataType) {
  editingKey.value = record.key
  editRow.value = {
    name: record.name,
    age: record.age,
    address: record.address,
  }
}

function save(key: string) {
  dataSource.value = dataSource.value.map((item) => {
    if (item.key === key) {
      return { ...item, ...editRow.value }
    }
    return item
  })
  editingKey.value = null
}

function cancel() {
  editingKey.value = null
}
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, record, text }">
      <template v-if="column.key === 'operation'">
        <template v-if="editingKey === record.key">
          <a-space size="small">
            <a @click="save(record.key)">Save</a>
            <a @click="cancel">Cancel</a>
          </a-space>
        </template>
        <template v-else>
          <a @click="edit(record)">Edit</a>
        </template>
      </template>
      <template v-else>
        <template v-if="editingKey === record.key">
          <a-input v-model:value="editRow[column.dataIndex]" size="small" />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </template>
  </a-table>
</template>
