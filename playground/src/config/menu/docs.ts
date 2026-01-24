import type { AntdvMenuItem } from './interface'
import { components } from './components'

export const docsMenuLocales = {
  '/docs/vue/introduce': {
    'zh-CN': 'Ant Design of Vue',
    'en-US': 'Ant Design of Vue',
  },
  '/docs/vue/use': {
    'zh-CN': '如何使用',
    'en-US': 'How to Use',
  },
  '/docs/vue/getting-started': {
    'zh-CN': '快速上手',
    'en-US': 'Getting Started',
  },
  '/blog/antdv-next-release': {
    'en-US': 'Antdv Next Release v1',
    'zh-CN': 'Antdv Next v1 发布啦！',
  },
}

export const docsMenus: Record<string, AntdvMenuItem[]> = {
  '/docs/vue': [
    {
      key: '/docs/vue/introduce',
      label: '介绍',
    },
    {
      key: '/docs/vue/use',
      label: '如何使用',
      type: 'group',
      children: [
        {
          key: '/docs/vue/getting-started',
          label: '快速上手',
        },
      ],
    },
  ],
  '/components': components,
  '/blog': [
    {
      key: '/blog/antdv-next-release',
      label: 'Antdv Next Release v1',
    },
  ],
}
