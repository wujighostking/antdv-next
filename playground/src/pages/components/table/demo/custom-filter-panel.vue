<docs lang="zh-CN">
自定义筛选面板。
</docs>

<docs lang="en-US">
Custom filter panel.
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { SearchOutlined } from '@antdv-next/icons'
import { h, ref } from 'vue'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

type DataIndex = keyof DataType
type FilterDropdownArgs = {
  setSelectedKeys: (keys: string[]) => void
  selectedKeys: string[]
  confirm: (params?: { closeDropdown?: boolean }) => void
  clearFilters?: () => void
}

const dataSource: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Joe Black', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Jim Green', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
]

const searchText = ref('')
const searchedColumn = ref<DataIndex | ''>('')

function handleSearch(selectedKeys: string[], confirm: FilterDropdownArgs['confirm'], dataIndex: DataIndex) {
  confirm()
  searchText.value = selectedKeys[0] || ''
  searchedColumn.value = dataIndex
}

function handleReset(clearFilters?: () => void) {
  clearFilters?.()
  searchText.value = ''
}

function highlightText(text: string, keyword: string) {
  if (!keyword) {
    return text
  }
  const lowerText = text.toLowerCase()
  const lowerKey = keyword.toLowerCase()
  const index = lowerText.indexOf(lowerKey)
  if (index === -1) {
    return text
  }
  const before = text.slice(0, index)
  const match = text.slice(index, index + keyword.length)
  const after = text.slice(index + keyword.length)
  return [before, h('mark', { class: 'table-highlight' }, match), after]
}

function getColumnSearchProps(dataIndex: DataIndex): TableProps<DataType>['columns'][number] {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const value = String(selectedKeys[0] || '')
      return h('div', { class: 'table-filter' }, [
        h('input', {
          value,
          placeholder: `Search ${dataIndex}`,
          class: 'table-filter-input',
          onInput: (event: Event) => {
            const target = event.target as HTMLInputElement
            setSelectedKeys(target.value ? [target.value] : [])
          },
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
          },
        }),
        h('div', { class: 'table-filter-actions' }, [
          h('button', {
            class: 'table-filter-btn primary',
            onClick: () => handleSearch(selectedKeys as string[], confirm, dataIndex),
          }, 'Search'),
          h('button', {
            class: 'table-filter-btn',
            onClick: () => handleReset(clearFilters),
          }, 'Reset'),
        ]),
      ])
    },
    filterIcon: (filtered: boolean) => h(SearchOutlined, { style: { color: filtered ? '#1677ff' : undefined } }),
    onFilter: (value, record) => String(record[dataIndex]).toLowerCase().includes(String(value).toLowerCase()),
    render: (text) => {
      const raw = text ? String(text) : ''
      if (searchedColumn.value === dataIndex) {
        return highlightText(raw, searchText.value)
      }
      return raw
    },
  }
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    ...getColumnSearchProps('name'),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '20%',
    ...getColumnSearchProps('age'),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    ...getColumnSearchProps('address'),
  },
]
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" />
</template>

<style scoped>
.table-filter {
  padding: 8px;
  width: 200px;
}

.table-filter-input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  padding: 4px 6px;
  border: 1px solid var(--ant-color-border);
  border-radius: 4px;
}

.table-filter-actions {
  display: flex;
  gap: 8px;
}

.table-filter-btn {
  flex: 1;
  border: 1px solid var(--ant-color-border);
  background: var(--ant-color-bg-container);
  border-radius: 4px;
  padding: 2px 6px;
  cursor: pointer;
}

.table-filter-btn.primary {
  border-color: var(--ant-color-primary);
  color: var(--ant-color-primary);
}

.table-highlight {
  background: #ffc069;
  padding: 0;
}
</style>
