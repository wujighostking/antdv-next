import type { SlotsType } from 'vue'
import type { ClosableType } from '../_util/hooks/useClosable'
import type { EmitsType, RenderNodeFn, SlotsDefineType } from '../_util/type.ts'
import type { ComponentBaseProps } from '../config-provider/context'
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@antdv-next/icons'
import { classNames } from '@v-c/util'
import { computed, createVNode, defineComponent } from 'vue'
import { useConfig } from '../config-provider/context'
import useStyle from './style'

export interface AlertProps extends ComponentBaseProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error'
  /** Whether Alert can be closed */
  closable?: ClosableType
  /** Content of Alert */
  message?: RenderNodeFn
  /** Additional content of Alert */
  description?: RenderNodeFn
  /** Trigger when animation ending of Alert */
  afterClose?: () => void
  /** Whether to show icon */
  showIcon?: boolean
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string
  banner?: boolean
  icon?: RenderNodeFn
  closeIcon?: RenderNodeFn
  action?: RenderNodeFn

  id?: string
}

export type AlertSlots = SlotsDefineType<{
  message?: () => any
  description?: () => any
  icon?: () => any
  closeIcon?: () => any
  action?: () => any
}>

export type AlertEmits = EmitsType<{
  /** Callback when close Alert */
  close: (e: MouseEvent) => void
  mouseenter: (e: MouseEvent) => void
  mouseleave: (e: MouseEvent) => void
  click: (e: MouseEvent) => void
}>

const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
}

interface IconNodeProps {
  type: AlertProps['type']
  icon: AlertProps['icon']
  prefixCls: AlertProps['prefixCls']
  description: AlertProps['description']
}
const alertDefaultProps = {

} as any

const IconNode = defineComponent<IconNodeProps>(
  (props) => {
    return () => {
      const { type, prefixCls, icon } = props
      const iconType = iconMapFilled[type!] || null
      if (icon) {
        return null
      }
      return createVNode(
        iconType,
        { class: `${prefixCls}-icon` },
      )
    }
  },
)

const Alert = defineComponent<
  AlertProps,
  AlertEmits,
  string,
  SlotsType<AlertSlots>
>(
  (props = alertDefaultProps, { slots }) => {
    const configContext = useConfig()
    const prefixCls = computed(() => configContext.value?.getPrefixCls('alert', props.prefixCls))
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls.value)
    const alertCls = computed(() => classNames(prefixCls.value, hashId, cssVarCls))
    return () => {
      return wrapCSSVar(
        <div class={alertCls.value}>
          {slots?.default?.()}
        </div>,
      )
    }
  },
  {
    name: 'AAlert',
    inheritAttrs: false,
  },
)
;(Alert as any).install = (app: any) => {
  app.component(Alert.name, Alert)
}
export default Alert
