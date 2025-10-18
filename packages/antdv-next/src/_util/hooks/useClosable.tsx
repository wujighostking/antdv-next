import type { AriaAttributes } from 'vue'
import type { RenderNodeFn } from '../type.ts'

export type ClosableType = boolean | ({
  closeIcon?: RenderNodeFn
  disabled?: boolean
} & AriaAttributes)
